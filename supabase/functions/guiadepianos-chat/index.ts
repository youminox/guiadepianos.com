import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://guiadepianos.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "guiadepianos-20";
const AMAZON_TAG_ES = "guiadepianos02-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "yamaha-p-145": {
    id: "yamaha-p-145",
    badge: "🏆 #1 Mejor Primer Piano 88 Teclas · Equilibrio Total",
    title: "Yamaha P-145 — Piano Digital de 88 Teclas Contrapesadas GHC con Sonido de Cola Yamaha CFIIIS",
    subtitle:
      "Teclado GHC de martillo graduado compacto (132.6 × 26.8 cm · 11.1 kg), puerto USB-to-Host y salida de audífonos 1/4\".",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Yamaha P-145 88-Key Weighted Action Digital Piano")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Yamaha P-145 Piano Digital 88 Teclas Contrapesadas")}&tag=${AMAZON_TAG_ES}`,
  },
  "roland-fp-10": {
    id: "roland-fp-10",
    badge: "🎹 Mejor Sensación al Tocar · Teclado PHA-4 con Escape",
    title: "Roland FP-10 — Piano Digital de 88 Teclas con Mecanismo PHA-4 Standard, Marfil Sintético y Bluetooth MIDI",
    subtitle:
      "Mecanismo PHA-4 con simulación de escape y triple sensor en solo 128.4 × 25.8 cm con Bluetooth MIDI integrado.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Roland FP-10 88-key Entry Level Digital Piano PHA-4")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Roland FP-10 Piano Digital 88 Teclas Contrapesadas PHA-4")}&tag=${AMAZON_TAG_ES}`,
  },
  "roland-fp-30x": {
    id: "roland-fp-30x",
    badge: "👑 Gama Media-Alta Favorita · 256 Polifonía + Bluetooth Audio",
    title: "Roland FP-30X — Piano Digital de 88 Teclas PHA-4 con 256 Notas de Polifonía y Bluetooth Audio/MIDI",
    subtitle:
      "Altavoces de 22W, doble salida frontal de audífonos (1/4\" y 3.5 mm) y compatibilidad con mueble KSC-70 y 3 pedales KPD-70.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Roland FP-30X Digital Piano with Bluetooth")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Roland FP-30X Piano Digital 88 Teclas")}&tag=${AMAZON_TAG_ES}`,
  },
  "casio-privia-px-s1100": {
    id: "casio-privia-px-s1100",
    badge: "📐 El Más Delgado para Espacios Pequeños · Solo 23.2 cm de Fondo",
    title: "Casio Privia PX-S1100 — Piano Digital Ultradelgado de 88 Teclas Contrapesadas con Bluetooth Audio/MIDI",
    subtitle:
      "Profundidad récord de 23.2 cm ideal para escritorios y apartamentos pequeños, 192 polifonía y adaptador Bluetooth WU-BT10 incluido.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Casio Privia PX-S1100 88-Key Slim Digital Piano")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Casio Privia PX-S1100 Piano Digital 88 Teclas")}&tag=${AMAZON_TAG_ES}`,
  },
  "alesis-recital-pro": {
    id: "alesis-recital-pro",
    badge: "💰 Mejor 88 Teclas Contrapesadas Económico",
    title: "Alesis Recital Pro / Donner DEP-20 — Piano Digital de 88 Teclas con Acción de Martillo y 20W",
    subtitle:
      "88 teclas con peso de martillo real, 128 notas de polifonía, pantalla LCD y salida de audífonos de 1/4\" por menos de $380.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Alesis Recital Pro 88 Key Digital Piano Hammer Action Weighted Keys")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Alesis Recital Pro Piano Digital 88 Teclas Contrapesadas")}&tag=${AMAZON_TAG_ES}`,
  },
  "yamaha-psr-e383": {
    id: "yamaha-psr-e383",
    badge: "✨ #1 Mejor Teclado de 61 Teclas para Principiantes y Niños",
    title: "Yamaha PSR-E383 — Teclado Portátil de 61 Teclas Sensibles al Tacto (Touch Response) con 650 Sonidos",
    subtitle:
      "Compacto (94.1 cm · 4.4 kg), sensibilidad a la velocidad en 4 niveles, interfaz USB Audio/MIDI y entrada para pedal de sustain.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Yamaha PSR-E383 61-Key Touch Sensitive Portable Keyboard")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Yamaha PSR-E383 Teclado Portátil 61 Teclas Sensibles al Tacto")}&tag=${AMAZON_TAG_ES}`,
  },
  "casio-ct-s300": {
    id: "casio-ct-s300",
    badge: "🎒 Mejor 61 Teclas Económico y Ultracompacto",
    title: "Casio Casiotone CT-S300 / CT-S1 — Teclado Portátil de 61 Teclas Sensibles al Tacto con Asa",
    subtitle:
      "Solo 93 × 25.6 cm y 3.3 kg de peso, teclas tipo caja de piano con Touch Response, salida de audífonos y entrada de pedal 1/4\".",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Casio Casiotone CT-S300 61-Key Touch Sensitive Portable Keyboard")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Casio Casiotone CT-S300 Teclado 61 Teclas Sensibles")}&tag=${AMAZON_TAG_ES}`,
  },
  "m-audio-sp2-pedal": {
    id: "m-audio-sp2-pedal",
    badge: "🦶 #1 Pedal de Sustain Universal · Interruptor de Polaridad Compatible",
    title: "M-Audio SP-2 — Pedal de Sustain Universal Estilo Piano Acústico con Selector de Polaridad (N.O. / N.C.)",
    subtitle:
      "Interruptor de polaridad 100 % compatible con Yamaha, Casio, Roland, Kawai, Korg y Alesis, base de goma antideslizante y jack 1/4\".",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("M-Audio SP-2 Universal Sustain Pedal with Piano Style Action")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("M-Audio SP-2 Pedal Sustain Universal Piano Teclado")}&tag=${AMAZON_TAG_ES}`,
  },
  "stand-z-and-bench": {
    id: "stand-z-and-bench",
    badge: "🪑 Soporte en Z Ultra-Estable + Banco Ajustable · Cero Temblores",
    title: "Soporte de Teclado en Z Heavy Duty (Plixio / Liquid Stands) + Banco de Piano Acolchado Ajustable",
    subtitle:
      "Soporta hasta 113 kg (250 lb) sin vibrar con pianos de 88 teclas, correas de seguridad y espacio libre para las rodillas y el pedal.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Heavy Duty Z Style Keyboard Piano Stand and Adjustable Padded Piano Bench")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Soporte Teclado Piano en Z Heavy Duty y Banqueta Piano Ajustable")}&tag=${AMAZON_TAG_ES}`,
  },
  "headphones-ath-m20x": {
    id: "headphones-ath-m20x",
    badge: "🎧 #1 Audífonos para Piano Digital · Cero Latencia + Adaptador 1/4\"",
    title: "Audio-Technica ATH-M20x / Sony MDR-7506 — Audífonos de Estudio Cerrados con Cable de 3m y Adaptador 1/4\"",
    subtitle:
      "Impedancia ideal de 47 Ω, 0 ms de latencia, cable largo de 3 metros y adaptador de 3.5 mm a 6.35 mm (1/4\") incluido en la caja.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Audio-Technica ATH-M20x Professional Studio Monitor Headphones 1/4 Adapter")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Audio-Technica ATH-M20x Auriculares Estudio Piano Digital Adaptador 6.35mm")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "piano",
  "pianos",
  "teclado",
  "teclados",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const { data } = await supabase
    .from("guiadepianos_articles")
    .select(
      "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
    )
    .eq("active", true)
    .range(0, 999);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  if (Array.isArray(data)) {
    for (const r of data as ArticleRow[]) {
      if (!bySlug.has(r.slug)) {
        bySlug.set(r.slug, r);
        rows.push(r);
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-piano.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "mejores-pianos-digitales-y-teclados-para-principiantes-amazon",
    "piano-88-teclas-vs-teclado-61-teclas-principiantes",
    "yamaha-p-145-vs-roland-fp-10",
    "yamaha-p-145-piano-digital-88-teclas",
    "roland-fp-10-piano-digital-88-teclas",
    "casio-privia-px-s1100-88-teclas",
    "yamaha-psr-e383-teclado-61-teclas",
    "mejores-pedales-de-sustain-compatibles-yamaha-casio-roland",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "guiadepianos-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("guiadepianos_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini as requested by user)
    const { data: configRow } = await supabase
      .from("guiadepianos_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🎹 Soy tu Asesor de Pianos y Teclados IA de GuiaDePianos.com (modelo mini rápido). Cuéntame tu presupuesto en Amazon, cuántos centímetros libres tienes en casa y si buscas 61 u 88 teclas contrapesadas, o pregúntame qué pedal, soporte, banco y audífonos son compatibles con tu modelo.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("guiadepianos_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug ? String(article_slug).slice(0, 180) : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("guiadepianos_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("guiadepianos_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Pianos IA está en mantenimiento breve. Puedes ver nuestras comparativas en [GuiaDePianos.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Ver Top 9 en Amazon", "88 vs 61 Teclas"],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "gdp-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("guiadepianos_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("guiadepianos_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("guiadepianos_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const systemPrompt = `Eres el Asesor de Pianos y Teclados IA Oficial de GuiaDePianos.com (${SITE}), la guía líder en español con 600 artículos para quienes buscan su primer piano digital o teclado de 61 y 88 teclas según su presupuesto, espacio disponible y sensación al tocar, además de pedales, soportes, bancos y audífonos compatibles en Amazon Estados Unidos y España (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER TODAS LAS DUDAS DEL USUARIO con precisión práctica:
   - Comparar pianos de 88 teclas contrapesadas: Yamaha P-145, Roland FP-10, Roland FP-30X, Casio Privia PX-S1100 y Alesis Recital Pro / Donner DEP-20.
   - Comparar teclados de 61 teclas con sensibilidad al tacto (Touch Response): Yamaha PSR-E383 y Casio Casiotone CT-S300 / CT-S1.
   - Indicar siempre la compatibilidad exacta de accesorios: pedal de sustain universal M-Audio SP-2, soporte en Z Heavy Duty (deja espacio libre para las rodillas y soporta 113 kg) con banco ajustable a 71–73 cm de altura de tecla, y audífonos con cable de 32–64 Ω con adaptador de 1/4" como los Audio-Technica ATH-M20x (0 ms de latencia; nunca Bluetooth para tocar).
   - Enlazar en tu respuesta a entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluir sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EL PRODUCTO IDEAL EN AMAZON (${storeName}):
   - Recomienda siempre el piano digital, teclado, pedal, soporte o audífonos exactos de nuestro CATÁLOGO AMAZON OFICIAL de abajo.
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN GUIADEPIANOS.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta experta en español con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["yamaha-p-145"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["yamaha-p-145"],
        suggested_options: [
          "¿Yamaha P-145 vs Roland FP-10?",
          "¿Elijo 61 u 88 teclas para mi espacio?",
          "¿Qué pedal y audífonos compatibles comprar?",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["yamaha-p-145"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo explorar nuestro ranking en [GuiaDePianos.com](${SITE}/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-y-teclados-para-principiantes-amazon/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("guiadepianos_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("guiadepianos_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "guiadepianos.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras 600 guías en [GuiaDePianos.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
