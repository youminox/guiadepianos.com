#!/usr/bin/env python3
"""
Genera imágenes fotorrealistas y diversas para guiadepianos.com vía la Edge Function guiadepianos-images
(Supabase charlielingan → OpenAI ChatGPT Image API con quality="medium") y las comprime en WebP
ligeros (<= 68 KB, estrictamente < 100 KB) en public/img/.

Uso:
  python3 scripts/gen_images.py home        # genera las 58 imágenes de la Home/silos/escenas + 24 artículos top
  python3 scripts/gen_images.py articles    # genera imágenes individuales por artículo
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import json, sys, io, pathlib, urllib.request, concurrent.futures as cf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/guiadepianos-images"
TOKEN = "guiadepianos-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

# 58 escenas fotográficas diversas (diferentes ángulos, instrumentos, accesorios, espacios e iluminación para evitar repetición visual)
HOME_PROMPTS = {
    "home-hero-piano": "Three-quarter editorial studio shot of a sleek black 88-key weighted digital piano mounted on a heavy-duty Z-style stand in a sunlit modern apartment, chrome piano-style sustain pedal on a woven rug, padded adjustable bench and studio headphones with gold 1/4-inch jack, warm morning sunlight",
    "og-default": "Inviting sunlit home music room featuring an 88-key weighted digital piano next to a compact 61-key portable keyboard on an oak desk, universal chrome sustain pedal, padded piano bench and wired studio monitor headphones, editorial interior photography",
    "home-yamaha-p145": "Eye-level three-quarter photograph of a compact matte black 88-key digital piano (26.8 cm slim depth) on a matching wooden stand in a bright Scandinavian living room, sheet music on the music rest and a chrome sustain pedal below, soft natural daylight",
    "home-roland-fp10": "Close-up oblique angle of 88 weighted keys with textured synthetic ivory white keys and matte ebony black keys on a compact digital piano, a tablet showing interactive music sheets on the stand, warm golden hour window light",
    "home-teclado-61": "Compact 61-key touch-sensitive portable keyboard with an integrated carry handle resting on a small birch wood bedroom study desk next to a laptop and closed-back headphones, cozy afternoon light",
    "home-teclas-88-martillo": "Macro side-profile photograph of a pianist's fingers depressing weighted hammer-action digital piano keys showing the physical key travel depth and matte ivory texture, shallow depth of field, warm studio spotlight",
    "home-espacio-apartamento": "Wide interior view of an ultra-slim 88-key digital piano (23 cm depth) tucked neatly into a compact urban apartment bedroom corner beside a floor-to-ceiling window, a yellow measuring tape on the adjustable bench",
    "home-pedal-sustain": "Macro studio photograph of a chrome piano-style universal sustain damper pedal on a dark rubber non-slip base over hardwood flooring, showing the side N.O./N.C. polarity switch and 1/4-inch TS cable",
    "home-soporte-banco": "Low-angle studio shot of a sturdy black heavy-duty Z-style steel keyboard stand supporting an 88-key digital piano with safety straps, paired with a thick padded adjustable piano bench and open knee clearance",
    "home-audifonos-piano": "Close-up of professional wired closed-back studio monitor headphones with a gold-plated 1/4-inch (6.35 mm) screw-on adapter plugged into the headphone jack of a digital piano at dusk, warm amber LED music light",
    "cat-resenas-pianos-y-teclados": "A bright modern apartment music corner with an 88-key weighted digital piano on a Z-stand, a metallic sustain pedal on the rug, padded piano bench and studio headphones, warm morning daylight",
    "cat-comparativas": "Side-by-side comparison of an 88-key weighted digital piano and a compact 61-key touch-sensitive keyboard on a wide wooden studio table with sustain pedals and studio headphones, natural daylight",
    "cat-mejores-pianos-teclados-y-accesorios": "An organized home piano setup featuring a top-rated 88-key digital piano, a universal piano-style sustain pedal, adjustable padded bench, studio monitor headphones with 1/4 adapter and tablet on music rest",
    "cat-primer-piano-o-teclado": "Over-the-shoulder close-up of beginner hands playing a C major chord on realistic matte black and ivory-textured digital piano keys in a warm sunlit home room",
    "cat-sensacion-al-tocar-y-tipos-de-tecla": "Macro side-profile photograph of weighted digital piano keys with textured synthetic ivory and matte ebony surfaces showing key depth and graded hammer action feel, shallow depth of field",
    "cat-espacio-medidas-y-ergonomia": "A slim 88-key digital piano fitting neatly in a compact apartment bedroom corner next to a window with a measuring tape, Z-stand and adjustable bench at ergonomic 72 cm height",
    "cat-pedales-compatibles-y-polaridad": "Macro shot of a chrome piano-style universal sustain pedal with a polarity switch on a wooden floor with a 1/4 inch jack cable connected to a digital piano",
    "cat-soportes-bancos-y-muebles": "A sturdy heavy-duty Z-style keyboard stand supporting an 88-key weighted digital piano with security straps and an adjustable padded bench on a home rug, bright natural light",
    "cat-audifonos-sonido-y-practica-silenciosa": "Professional wired studio monitor headphones with a gold-plated 1/4 inch 6.35mm adapter resting on the keys of a digital piano at night with warm LED music stand light",
    "cat-conexiones-midi-apps-y-aprendizaje": "An iPad tablet displaying interactive piano sheet music on a digital piano music rest connected via a USB-B to USB-C MIDI cable, hands playing keys, warm daylight",
    "cat-solucion-de-problemas-y-configuracion": "Close-up of a hand checking the control panel, transpose and metronome buttons and rear DC power and pedal jacks of a modern digital piano in a bright studio",
    "cat-mantenimiento-limpieza-y-transporte": "A fitted black spandex dust cover partially pulled back over an 88-key digital piano alongside a clean microfiber cloth and a padded wheeled gig bag in a tidy room",
    # 36 variantes temáticas diversas por subtema, ángulo, luz y superficie (evita imágenes similares entre artículos)
    "scene-resenas-2": "Overhead flat-lay of a sleek white 88-key slim digital piano on a light oak studio table with a chrome sustain pedal, studio headphones and a hardcover classical sheet music book, crisp daylight",
    "scene-resenas-3": "Three-quarter photograph of a Nordic natural wood console digital piano with three integrated brass pedals and a matching wooden bench in a sunlit minimalist living room",
    "scene-resenas-4": "Close-up of a minimalist red weave 61-key portable keyboard with bass-reflex fabric speaker grille resting on a modern coffee table with wired headphones",
    "scene-comparativas-2": "Split overhead composition comparing a chrome piano-style damper pedal and a small black plastic square footswitch pedal side by side on a light wooden floor with a 1/4-inch jack",
    "scene-comparativas-3": "Side-by-side studio comparison of a heavy-duty Z-style keyboard stand and a double-braced X-style keyboard stand in a bright rehearsal room",
    "scene-comparativas-4": "Macro comparison of two headphone plugs on a piano keybed: a 3.5 mm stereo mini-jack and a gold-plated 6.35 mm (1/4-inch) thread-on studio adapter next to open-back and closed-back headphones",
    "scene-mejores-2": "Curated flat-lay of essential digital piano accessories on an oak surface: universal chrome sustain pedal, wired studio headphones, 1/4-inch gold adapter, USB-B to USB-C MIDI cable and clip-on LED music lamp",
    "scene-mejores-3": "Bright family music corner with a compact 61-key touch-sensitive keyboard on a low X-stand adjusted for a child, padded bench and color-coded music workbook",
    "scene-mejores-4": "Modern home recording and piano practice desk with an 88-key weighted digital piano on a sliding tray under a wooden desk, pair of compact white studio monitor speakers and laptop",
    "scene-principiantes-2": "Close-up of adult beginner hands practicing a five-finger scale on weighted piano keys with removable silicone note strip labels resting gently behind the black keys, warm morning light",
    "scene-principiantes-3": "Parent and 8-year-old child sitting together on a wide padded piano bench playing a 61-key touch-sensitive keyboard connected to a tablet learning app, natural home lighting",
    "scene-principiantes-4": "Detailed view of a digital piano music rest holding an open beginner piano method book clipped with a brass page holder and illuminated by a rechargeable LED lamp",
    "scene-sensacion-2": "Extreme macro cutaway-style studio shot of graded hammer action piano keys showing the heavier bass keys on the left and lighter treble keys on the right with synthetic ivory grain",
    "scene-sensacion-3": "Close-up of box-shaped piano-style keys on a 61-key keyboard being pressed softly and firmly to demonstrate touch-sensitive velocity response, soft side lighting",
    "scene-sensacion-4": "Side profile of a pianist's relaxed wrist and curved fingers playing an arpeggio on matte black and ivory weighted digital piano keys, warm concert-style lighting",
    "scene-espacio-2": "Overhead architectural view of a small bedroom desk setup where a 93-centimeter 61-key keyboard sits comfortably in front of a computer monitor with a foldable bench tucked underneath",
    "scene-espacio-3": "Side view showing the ergonomic 90-degree elbow posture of a pianist seated on a height-adjustable bench at an 88-key digital piano set at 72 centimeters from the floor",
    "scene-espacio-4": "A folded X-stand and a lightweight 61-key keyboard in a slim padded bag being stored vertically inside a narrow apartment closet next to coats",
    "scene-pedales-2": "Extreme close-up of the underside of a universal sustain pedal showing a finger flipping the recessed N.O./N.C. polarity selector switch",
    "scene-pedales-3": "A pianist's right heel resting on the extended rubber non-slip base plate of a Roland damper pedal while pressing the metal pedal smoothly for half-damper control",
    "scene-pedales-4": "Close-up of a portable three-pedal unit bar (Soft, Sostenuto and Damper pedals) connected beneath a slim 88-key digital piano on a hardwood rug",
    "scene-soportes-2": "Close-up of heavy-duty black nylon security straps screwed into the underside threads of an 88-key digital piano anchoring it firmly to a steel stand",
    "scene-soportes-3": "A stationary wooden furniture stand with matching three-pedal crossbar transforming a portable 88-key slab digital piano into an upright living room console",
    "scene-soportes-4": "Close-up of an open hinged wooden piano bench seat revealing a velvet-lined storage compartment filled with sheet music books, a dust cover and MIDI cables",
    "scene-audifonos-2": "Close-up of open-back velour-pad studio headphones resting on a digital piano keybed, warm evening lamp light creating an intimate silent practice atmosphere",
    "scene-audifonos-3": "Macro shot of a dual headphone splitter adapter plugged into the front 1/4-inch jack of a digital piano allowing two sets of wired headphones for teacher and student",
    "scene-audifonos-4": "Low angle of an 88-key digital piano stand resting on thick high-density acoustic anti-vibration rubber mats over an apartment wooden floor to prevent downstairs noise",
    "scene-midi-2": "Macro shot of the rear connectivity panel of a digital piano showing a square USB-to-Host Type-B port connected to a braided USB-C cable leading to an iPad",
    "scene-midi-3": "Close-up of a smartphone screen running a smart piano control app displaying voice layering and metronome settings next to a Bluetooth-enabled digital piano",
    "scene-midi-4": "Home producer setup showing a digital piano connected via USB-MIDI to a laptop running a virtual grand piano VST instrument with waveform tracks on screen",
    "scene-problemas-2": "Close-up of a digital piano power input jack and an AC power adapter label showing 12V DC center-positive polarity symbol clearly on a wooden workbench",
    "scene-problemas-3": "Hands holding down the highest C key while pressing the power button on an 88-key digital piano to perform a factory reset, clear studio lighting",
    "scene-problemas-4": "Close-up of a can of compressed air with a fine nozzle gently blowing dust from the gap between two weighted piano keys without disassembling the cabinet",
    "scene-mantenimiento-2": "Close-up of a hand wiping matte white and black digital piano keys from back to front with a slightly damp light-grey microfiber cloth",
    "scene-mantenimiento-3": "An 88-key digital piano being placed into a thick 20mm foam-padded nylon gig bag with heavy-duty zippers and inline skate wheels for safe transport",
    "scene-mantenimiento-4": "A tailored black stretch spandex keyboard dust cover with an elastic drawstring snugly covering a 61-key keyboard on a stand in a sunny room",
}

TOP_ARTICLE_SLUGS = [
    "yamaha-p-145-piano-digital-88-teclas",
    "roland-fp-10-piano-digital-88-teclas",
    "roland-fp-30x-piano-digital",
    "yamaha-p-225-piano-digital",
    "casio-privia-px-s1100-88-teclas",
    "yamaha-p-45-piano-digital",
    "casio-cdp-s160-88-teclas",
    "kawai-es120-piano-digital",
    "alesis-recital-pro-88-teclas",
    "donner-dep-20-piano-digital-88-teclas",
    "yamaha-psr-e383-teclado-61-teclas",
    "casio-casiotone-ct-s300-61-teclas",
    "casio-casiotone-ct-s1-61-teclas",
    "roland-go-piano-61p-bluetooth",
    "pedal-sustain-m-audio-sp-2-universal",
    "soporte-teclado-en-z-plixio-liquid-stands",
    "banco-piano-ajustable-on-stage-kt7800-y-songmics",
    "audifonos-audio-technica-ath-m20x-y-ath-m40x-piano",
    "piano-88-teclas-vs-teclado-61-teclas-principiantes",
    "yamaha-p-145-vs-roland-fp-10",
    "mejores-pianos-digitales-y-teclados-para-principiantes-amazon",
    "mejores-pianos-digitales-88-teclas-contrapesadas-calidad-precio",
    "mejores-teclados-61-teclas-sensibles-al-tacto-principiantes",
    "mejores-pedales-de-sustain-compatibles-yamaha-casio-roland",
]


def call(slug, prompt):
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json", "x-guiadepianos-token": TOKEN},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error"))
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def save_variants(slug, raw_bytes, outdir):
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    # Límite estricto: <= 68 KB para la imagen 1200x675 (siempre < 100 KB como pidió el usuario)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out = {}
    for suf, width in sizes.items():
        cur_w = width
        q = 78
        while True:
            r = im.resize((cur_w, round(cur_w * 9 / 16)), Image.LANCZOS)
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf]:
                break
            if q > 28:
                q -= 5
            elif cur_w > 640:
                cur_w = int(cur_w * 0.88)
            else:
                break
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug, prompt, outdir):
    final = outdir / f"{slug}.webp"
    if final.exists() and final.stat().st_size <= 68_000:
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    tasks = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text())
                tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append((a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos"))
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))
    with cf.ThreadPoolExecutor(max_workers=10) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)


if __name__ == "__main__":
    main()
