import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import KeyActionMechanismSvg from "@/components/home/KeyActionMechanismSvg";
import SetupCompatibilityOrbit, {
  type OrbitItem,
} from "@/components/home/SetupCompatibilityOrbit";
import MetricsCounters, {
  type MetricItem,
} from "@/components/home/MetricsCounters";
import SetupComparisonSlider from "@/components/home/SetupComparisonSlider";
import MomentsCarousel, { type Moment } from "@/components/home/MomentsCarousel";
import PianoAndAccessoryFinder, {
  type PianoTier,
} from "@/components/home/PianoAndAccessoryFinder";
import {
  getContextualAmazonProducts,
  AMAZON_TAG_US,
  AMAZON_TAG_ES,
} from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  PIANO_DISCLAIMER,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "Guía de Pianos 2026: Tu Primer Piano Digital o Teclado (61 y 88 Teclas) en Amazon EE. UU. y Accesorios Compatibles",
  description:
    "Guía en español para quienes buscan su primer piano digital o teclado: comparamos modelos de 61 y 88 teclas (Yamaha P-145, Roland FP-10, Casio Privia PX-S1100, Yamaha PSR-E383 y Casio CT-S300) según presupuesto, espacio disponible y sensación al tocar, además de pedales, soportes, bancos y audífonos compatibles en Amazon Estados Unidos.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "Guía de Pianos: Comparativas de Pianos Digitales y Teclados (88 y 61 Teclas) en Amazon US",
    description:
      "600 guías especializadas para elegir tu primer piano digital o teclado según presupuesto, espacio y sensación al tocar, más pedales, soportes, bancos y audífonos compatibles.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Piano digital de 88 teclas contrapesadas y teclado de 61 teclas con pedal de sustain, soporte, banco y audífonos de estudio",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué debo comprar primero: un teclado de 61 teclas o un piano digital de 88 teclas contrapesadas?",
    a: "Depende de tres factores: presupuesto, espacio disponible y objetivo musical. Si tu presupuesto es menor a $220 USD o solo tienes entre 95 y 115 cm libres sobre un escritorio o dormitorio pequeño, un teclado de 61 teclas con sensibilidad al tacto (Touch Response) como el Yamaha PSR-E383 o el Casio Casiotone CT-S300 / CT-S1 te permite aprender acordes, lectura musical y el 85 % del repertorio pop y moderno desde el primer día. En cambio, si dispones de ~133 cm de ancho y un presupuesto de $350 a $550 USD, empezar directamente con un piano digital de 88 teclas contrapesadas con acción de martillo graduado (Yamaha P-145, Roland FP-10 o Casio Privia PX-S1100) desarrolla desde el inicio la fuerza real de los dedos para tocar piano clásico y acústico.",
  },
  {
    q: "¿Cuál es la diferencia en la sensación al tocar entre teclas contrapesadas (Hammer Action), semicontrapesadas y sensibles al tacto?",
    a: "Las teclas sensibles al tacto (Touch-Sensitive / Synth Action, presentes en teclados de 61 teclas como el Yamaha PSR-E383) usan un resorte ligero pero detectan la velocidad con la que bajas el dedo: si pulsas suave suena piano (p) y si pulsas rápido suena fuerte (f). Las teclas semicontrapesadas (como el Alesis Recital básico) añaden un resorte más firme, pero siguen teniendo retorno elástico. En cambio, las teclas contrapesadas con acción de martillo graduado (Graded Hammer Compact GHC de Yamaha, PHA-4 Standard de Roland o Smart Scaled de Casio) mueven un pequeño martillo físico contrapesado sin resortes: son más pesadas en las notas graves de la mano izquierda y más ligeras en las agudas de la derecha, replicando el tacto exacto de un piano acústico de cola.",
  },
  {
    q: "¿Cuál es el mejor piano digital de 88 teclas para espacios pequeños o apartamentos en Amazon EE. UU.?",
    a: "Para apartamentos con poco fondo, el campeón mundial es el Casio Privia PX-S1100, que tiene apenas 23.2 cm (9.1 pulgadas) de profundidad y cabe incluso en estantes o escritorios estrechos. Si buscas el piano de 88 teclas más corto de ancho, el Roland FP-10 mide solo 128.4 × 25.8 cm y monta el prestigioso teclado PHA-4 con textura de marfil. Y el nuevo Yamaha P-145 redujo su chasis a 132.6 × 26.8 cm con apenas 11.1 kg de peso.",
  },
  {
    q: "¿Por qué mi pedal de sustain suena al revés (mantiene el sonido cuando suelto el pie) y cuál es compatible?",
    a: "Ocurre por la polaridad del circuito: marcas como Yamaha y Roland suelen usar polaridad Normalmente Cerrada (N.C.), mientras que Casio, Korg o Alesis suelen usar polaridad Normalmente Abierta (N.O.). Por eso recomendamos el pedal universal M-Audio SP-2 en Amazon: incluye un pequeño interruptor de polaridad en la base que lo hace 100 % compatible con cualquier teclado o piano digital de todas las marcas con conector jack de 1/4\" (6.35 mm).",
  },
  {
    q: "¿Qué soporte es mejor para un piano de 88 teclas: soporte en X, soporte en Z o mueble de madera?",
    a: "Para un teclado ligero de 61 teclas (3 a 5 kg), un soporte en X con pasador de bloqueo es suficiente y se pliega en segundos. Pero para un piano digital de 88 teclas contrapesadas (11 a 15 kg), el soporte en Z Heavy Duty (como Plixio o Liquid Stands) o el mueble oficial de madera (Yamaha L-100, Roland KSC-70, Casio CS-68) son muy superiores: no tiemblan al tocar pasajes rápidos y dejan todo el espacio central despejado para que tus rodillas no choquen al usar el pedal de sustain.",
  },
  {
    q: "¿Por qué no debo usar audífonos Bluetooth para tocar el piano digital y qué audífonos recomiendan?",
    a: "Los audífonos Bluetooth estándar introducen entre 150 y 250 milisegundos de latencia (retraso): cuando tu dedo baja la tecla, el sonido llega tarde a tu oído, lo que confunde al cerebro e impide tocar a tiempo. Necesitas audífonos con cable de baja/media impedancia (32 a 63 Ω) como los Audio-Technica ATH-M20x, Sony MDR-7506 o Sennheiser HD 599, que incluyen adaptador de 3.5 mm a 1/4\" (6.35 mm) y entregan 0 ms de latencia.",
  },
  {
    q: "¿Cómo conecto mi piano digital o teclado al iPad para aprender con Simply Piano o Flowkey?",
    a: "Olvídate de usar el micrófono del iPad, que falla cuando hay ruido o cuando usas audífonos. Utiliza el puerto cuadrado trasero llamado 'USB to Host' (USB Tipo B) con un cable USB-B a USB-C (o a Lightning con adaptador Camera Connection), o activa el Bluetooth MIDI integrado en modelos como el Roland FP-10, FP-30X o Casio PX-S1100. Así la app detecta cada acorde al instante incluso mientras escuchas por tus audífonos.",
  },
];

const CLAIMS = [
  "Yamaha P-145 (88 Teclas Contrapesadas GHC Compactas)",
  "Roland FP-10 y FP-30X (Teclado PHA-4 con Escape)",
  "Casio Privia PX-S1100 (Solo 23.2 cm de Fondo)",
  "Yamaha PSR-E383 (#1 Teclado 61 Teclas Touch Response)",
  "Pedal Universal M-Audio SP-2 (Interruptor de Polaridad)",
  "Soportes en Z Heavy Duty y Bancos Ajustables",
  "Audífonos de Estudio ATH-M20x (0 ms Latencia · Jack 1/4\")",
  "Ofertas Verificadas en Amazon EE. UU. y España",
];

const CLAIMS_2 = [
  "Casio Casiotone CT-S300 y CT-S1 (61 Teclas Portátiles)",
  "Alesis Recital Pro y Donner DEP-20 (88 Teclas < $380)",
  "Donner DDP-80 y Yamaha Arius YDP-145 (Mueble + 3 Pedales)",
  "Kawai ES120 (Acción Responsive Hammer Compact)",
  "Muebles Oficiales Yamaha L-100 · Roland KSC-70 · Casio CS-68",
  "Cables USB-MIDI a USB-C para Simply Piano y Flowkey",
  "Cubrepolvos Elásticos y Fundas Acolchadas 61/88 Teclas",
  "Comparativas por Presupuesto, Espacio y Sensación al Tocar",
];

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const heroImg = ambient("home-hero-piano", "/img/ambiente/home-hero-piano.webp");

  const orbit: OrbitItem[] = [
    {
      k: "piano88",
      name: "Piano 88 Teclas Contrapesadas",
      img: null,
      icon: "🎹",
      role: "Acción de martillo graduado (GHC, PHA-4, Smart Scaled, RHC)",
      d: "Las 88 teclas con peso de martillo real (Yamaha P-145, Roland FP-10, Casio PX-S1100) replican la inercia de un piano acústico: más firmes en los graves y más ágiles en los agudos.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-88-teclas-contrapesadas-calidad-precio/"),
    },
    {
      k: "teclado61",
      name: "Teclado 61 Teclas Touch Response",
      img: null,
      icon: "🎼",
      role: "Compacto (~93 cm), ligero (3.3–4.4 kg) y sensible a la velocidad",
      d: "Ideal para escritorios, niños o presupuestos menores a $200 USD: el Yamaha PSR-E383 y el Casio Casiotone CT-S300/CT-S1 responden a la fuerza de tus dedos sin ocupar toda la habitación.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-teclados-61-teclas-sensibles-al-tacto-principiantes/"),
    },
    {
      k: "pedal",
      name: "Pedal Sustain con Polaridad",
      img: null,
      icon: "🦶",
      role: "M-Audio SP-2 / Yamaha FC4A / Roland DP-10 (Jack 1/4\")",
      d: "Sustituye el interruptor cuadrado de plástico por un pedal metálico estilo piano. Con el selector de polaridad N.O./N.C. del M-Audio SP-2 funciona en Yamaha, Casio, Roland y Alesis sin sonar invertido.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-pedales-de-sustain-compatibles-yamaha-casio-roland/"),
    },
    {
      k: "soporte",
      name: "Soporte en Z o Mueble Fijo",
      img: null,
      icon: "📐",
      role: "Estabilidad hasta 113 kg y espacio libre para las rodillas",
      d: "Un soporte en Z Heavy Duty o el mueble oficial de madera (Yamaha L-100, Roland KSC-70, Casio CS-68) sitúa las teclas blancas a la altura exacta de 71–73 cm sin tambalearse.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-soportes-para-piano-digital-88-teclas-estables/"),
    },
    {
      k: "banco",
      name: "Banco Acolchado Regulable",
      img: null,
      icon: "🪑",
      role: "Altura ajustable (44 a 56 cm) para antebrazos paralelos al suelo",
      d: "Tocar en una silla de comedor encorva los hombros y tensa las muñecas. Una banqueta regulable On-Stage o con cajón de partituras adapta la postura tanto a niños como a adultos.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-bancos-y-banquetas-para-piano-y-teclado-amazon/"),
    },
    {
      k: "audifonos",
      name: "Audífonos Estudio 1/4\" (0 ms)",
      img: null,
      icon: "🎧",
      role: "Audio-Technica ATH-M20x / Sony MDR-7506 (32–63 Ω con cable)",
      d: "Practica a medianoche sin molestar a nadie. Con cable de 3 metros y adaptador de 6.35 mm (1/4\") ofrecen cero latencia y la impedancia justa para sonar potentes directo desde el piano.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-audifonos-para-piano-digital-y-teclado-sin-latencia/"),
    },
    {
      k: "midi",
      name: "Cable USB-MIDI y Bluetooth",
      img: null,
      icon: "📱",
      role: "Conexión directa a iPad para Simply Piano, Flowkey y GarageBand",
      d: "Un cable USB Tipo B (USB to Host) a USB-C o Lightning transmite cada nota digitalmente a tu tablet sin que el micrófono falle aunque toques con audífonos puestos.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-cables-usb-midi-y-adaptadores-de-audifonos-para-teclado/"),
    },
    {
      k: "cubrepolvo",
      name: "Cubrepolvo y Funda Acolchada",
      img: null,
      icon: "🛡️",
      role: "Protección de sensores de goma contra polvo, humedad y mascotas",
      d: "El 90 % de las teclas que dejan de sonar o suenan de golpe fallan por polvo acumulado bajo las teclas. Un cubrepolvo de spandex a medida (61 u 88 teclas) lo previene por menos de $15.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-cubrepolvos-para-teclados-de-61-y-88-teclas/"),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 88,
      dec: 0,
      u: "teclas",
      l: "Rango completo de piano acústico",
      pct: 100,
      note: "7 octavas + 3 notas (La0 a Do8) con martillo graduado",
    },
    {
      v: 61,
      dec: 0,
      u: "teclas",
      l: "Formato compacto (5 octavas)",
      pct: 85,
      note: "93 cm de ancho · Toca el 85% de canciones pop y método inicial",
    },
    {
      v: 23.2,
      dec: 1,
      u: "cm",
      l: "Fondo mínimo récord en 88 teclas",
      pct: 96,
      note: "Casio Privia PX-S1100 (cabe en cualquier escritorio)",
    },
    {
      v: 47,
      dec: 0,
      u: "Ω",
      l: "Impedancia ideal de audífonos",
      pct: 94,
      note: "Audio-Technica ATH-M20x con adaptador 1/4\" (6.35 mm)",
    },
    {
      v: 72,
      dec: 0,
      u: "cm",
      l: "Altura ergonómica del suelo a la tecla",
      pct: 98,
      note: "Ajuste estándar en soporte en Z con banco a 48–50 cm",
    },
    {
      v: 192,
      dec: 0,
      u: "notas",
      l: "Polifonía recomendada con pedal",
      pct: 92,
      note: "Evita que se apaguen notas al mantener pisado el sustain",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-yamaha-p145", heroImg),
      t: "Yamaha P-145 a Fondo",
      d: "Por qué su nuevo teclado GHC de 88 teclas más compacto y ligero es el #1 en ventas en Amazon EE. UU.",
      href: safeHref("/resenas-pianos-y-teclados/yamaha-p-145-piano-digital-88-teclas/"),
      alt: "Piano digital Yamaha P-145 de 88 teclas contrapesadas en apartamento",
    },
    {
      img: ambient("home-roland-fp10", heroImg),
      t: "Yamaha P-145 vs Roland FP-10",
      d: "Duelo de sensación al tocar por menos de $550: teclado GHC frente al mecanismo PHA-4 con escape y marfil sintético.",
      href: safeHref("/comparativas/yamaha-p-145-vs-roland-fp-10/"),
      alt: "Comparativa entre pianos digitales Yamaha P-145 y Roland FP-10",
    },
    {
      img: ambient("home-teclado-61", heroImg),
      t: "88 Teclas vs 61 Teclas: Cómo Elegir",
      d: "Comparativa honesta de medidas en centímetros, presupuesto en dólares y canciones que puedes tocar en cada uno.",
      href: safeHref("/comparativas/piano-88-teclas-vs-teclado-61-teclas-principiantes/"),
      alt: "Comparación de tamaño entre teclado de 61 teclas y piano de 88 teclas",
    },
    {
      img: ambient("home-espacio-apartamento", heroImg),
      t: "Pianos Compactos para Apartamentos",
      d: "Los 7 modelos más delgados (desde 23.2 cm de fondo) para dormitorios pequeños y escritorios.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-compactos-para-apartamentos-pequenos/"),
      alt: "Piano digital ultradelgado Casio Privia PX-S1100 en dormitorio pequeño",
    },
    {
      img: ambient("home-pedal-sustain", heroImg),
      t: "Pedales de Sustain y Polaridad",
      d: "Qué pedal comprar para Yamaha, Casio, Roland o Alesis y cómo usar el selector N.O./N.C. para que no suene al revés.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-pedales-de-sustain-compatibles-yamaha-casio-roland/"),
      alt: "Pedal de sustain metálico M-Audio SP-2 con interruptor de polaridad",
    },
    {
      img: ambient("home-soporte-banco", heroImg),
      t: "Soportes en Z vs en X y Bancos",
      d: "Cómo evitar que tu piano de 88 teclas tiemble y a qué altura exacta regular el soporte y la banqueta.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-soportes-para-piano-digital-88-teclas-estables/"),
      alt: "Piano digital sobre soporte en Z heavy duty con banco acolchado ajustable",
    },
    {
      img: ambient("home-audifonos-piano", heroImg),
      t: "Audífonos sin Latencia para Piano",
      d: "Los mejores auriculares de estudio con adaptador 1/4\" (6.35 mm) para practicar de noche con sonido natural.",
      href: safeHref("/mejores-pianos-teclados-y-accesorios/mejores-audifonos-para-piano-digital-y-teclado-sin-latencia/"),
      alt: "Audífonos de estudio cerrados con conector dorado de 1/4 pulgada sobre teclas de piano",
    },
  ];

  const finderOptions: PianoTier[] = [
    {
      key: "yamaha-p145",
      label: "Yamaha P-145 (88 Teclas Contrapesadas #1)",
      budgetUsd: "~$499–$549 USD",
      keyAction: "88 Teclas Contrapesadas GHC (Martillo Graduado)",
      dimensionsCm: "132.6 × 26.8 cm · 11.1 kg",
      compatibleGear: "Pedal M-Audio SP-2 / FC4A · Soporte Z o Mueble L-100 · Jack 1/4\"",
      img: ambient("home-yamaha-p145", heroImg),
      alt: "Piano digital Yamaha P-145 de 88 teclas contrapesadas",
      idealFor:
        "Quienes buscan el primer piano digital de 88 teclas más fiable y compacto de Amazon EE. UU.: tacto de martillo graduado GHC, sonido del piano de cola Yamaha CFIIIS y solo 26.8 cm de fondo.",
      reviewHref: safeHref("/resenas-pianos-y-teclados/yamaha-p-145-piano-digital-88-teclas/"),
      productKey: "YAMAHA_P145",
    },
    {
      key: "roland-fp10",
      label: "Roland FP-10 (88 Teclas Mejor Tacto PHA-4)",
      budgetUsd: "~$499–$549 USD",
      keyAction: "88 Teclas PHA-4 Standard con Escape y Marfil",
      dimensionsCm: "128.4 × 25.8 cm · 12.3 kg",
      compatibleGear: "Pedal Roland DP-10 / SP-2 · Bluetooth MIDI · Jack 3.5 mm",
      img: ambient("home-roland-fp10", heroImg),
      alt: "Piano digital Roland FP-10 con teclado PHA-4 Standard",
      idealFor:
        "Quienes priorizan la sensación al tocar más cercana a un piano acústico de cola por menos de $550, con mecanismo de escape, textura Ivory Feel, Bluetooth MIDI integrado y solo 128.4 cm de ancho.",
      reviewHref: safeHref("/resenas-pianos-y-teclados/roland-fp-10-piano-digital-88-teclas/"),
      productKey: "ROLAND_FP10",
    },
    {
      key: "yamaha-psre383",
      label: "Yamaha PSR-E383 (61 Teclas < $210 · Poco Espacio)",
      budgetUsd: "~$189–$219 USD",
      keyAction: "61 Teclas con Sensibilidad al Tacto (Touch Response)",
      dimensionsCm: "94.1 × 31.7 cm · Solo 4.4 kg",
      compatibleGear: "Pedal M-Audio SP-2 · Soporte en X · Audífonos 1/4\" · USB Audio/MIDI",
      img: ambient("home-teclado-61", heroImg),
      alt: "Teclado portátil Yamaha PSR-E383 de 61 teclas sensibles al tacto",
      idealFor:
        "Quienes tienen poco espacio (cabe en cualquier escritorio de 95 cm), buscan un instrumento para niños o adultos principiantes por menos de $210 y exigen teclas sensibles a la fuerza de pulsación.",
      reviewHref: safeHref("/resenas-pianos-y-teclados/yamaha-psr-e383-teclado-61-teclas/"),
      productKey: "YAMAHA_PSR_E383",
    },
  ];

  const POPULAR_PATHS = [
    "/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-y-teclados-para-principiantes-amazon/",
    "/comparativas/piano-88-teclas-vs-teclado-61-teclas-principiantes/",
    "/comparativas/yamaha-p-145-vs-roland-fp-10/",
    "/resenas-pianos-y-teclados/yamaha-p-145-piano-digital-88-teclas/",
    "/resenas-pianos-y-teclados/roland-fp-10-piano-digital-88-teclas/",
    "/mejores-pianos-teclados-y-accesorios/mejores-pedales-de-sustain-compatibles-yamaha-casio-roland/",
  ];
  const popular: Article[] = POPULAR_PATHS.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  const homeAmazon = getContextualAmazonProducts(
    "home",
    "mejores-pianos-teclados-y-accesorios",
    "Mejores Pianos Digitales y Teclados para Principiantes en Amazon"
  );

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "Guía de Pianos 2026: Tu Primer Piano Digital o Teclado (61 y 88 Teclas) en Amazon EE. UU. y Accesorios Compatibles",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${heroImg}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D Tilt + Partículas + Buscador */}
        <Hero heroImage={heroImg} />

        {/* 3. Doble Cinta Marquee en sentido opuesto */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/80"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-fxlime to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-prune/75"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-drinklight" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ¿Cómo elegir tu primer piano digital o teclado? + Mosaico Spotlight (.spot) */}
        <section id="que-es" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía de Compra en Español para Amazon EE. UU.
              </span>
              <SplitHeading
                text="Tu primer piano digital o teclado,"
                accent={{
                  text: "comparado por presupuesto, espacio y sensación al tocar",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Elegir entre un{" "}
                <strong className="text-fxink">teclado de 61 teclas</strong> y
                un{" "}
                <strong className="text-fxink">
                  piano digital de 88 teclas contrapesadas
                </strong>{" "}
                es mucho más sencillo cuando mides tres variables reales:{" "}
                <strong className="text-fxink">
                  tu presupuesto en dólares, los centímetros disponibles en tu
                  habitación o escritorio y la resistencia que buscas bajo tus
                  dedos
                </strong>
                .
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/70 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-900">
                  🎹 Cómo acertar en Amazon según tu presupuesto y espacio
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] text-fxink">
                  <li>
                    • <strong>Menos de $210 USD y poco espacio (~93 cm):</strong>{" "}
                    el <strong>Yamaha PSR-E383</strong> y el{" "}
                    <strong>Casio Casiotone CT-S300 / CT-S1</strong> ofrecen 61
                    teclas con sensibilidad al tacto real para aprender en
                    escritorio.
                  </li>
                  <li>
                    • <strong>$320–$380 USD (88 teclas de entrada):</strong> el{" "}
                    <strong>Alesis Recital Pro</strong> y el{" "}
                    <strong>Donner DEP-20</strong> te dan las 88 teclas con
                    acción de martillo a precio contenido.
                  </li>
                  <li>
                    • <strong>$499–$649 USD (Estándar de conservatorio):</strong>{" "}
                    el <strong>Yamaha P-145</strong> (GHC), el{" "}
                    <strong>Roland FP-10</strong> (PHA-4 con escape) y el
                    ultradelgado <strong>Casio Privia PX-S1100</strong> (23.2 cm
                    de fondo).
                  </li>
                  <li>
                    • <strong>Accesorios 100 % compatibles:</strong> completamos
                    tu compra con el pedal universal{" "}
                    <strong>M-Audio SP-2</strong>, soporte en Z, banco regulable
                    y audífonos de estudio <strong>1/4&quot;</strong> sin latencia.
                  </li>
                </ul>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/comparativas/piano-88-teclas-vs-teclado-61-teclas-principiantes/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Comparativa: 88 Teclas vs 61 Teclas
                </Link>
                <Link
                  href="/comparativas/yamaha-p-145-vs-roland-fp-10/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Duelo: Yamaha P-145 vs Roland FP-10
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(30,15,5,0.6)]"
                data-reveal
              >
                <Image
                  src={ambient("home-espacio-apartamento", heroImg)}
                  alt="Rincón de estudio en apartamento con piano digital de 88 teclas, soporte en Z, banco ajustable, pedal y audífonos"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-fxink">
                  De un escritorio de 93 cm a un setup de 88 teclas en apartamento
                </span>
              </div>
              {[
                [
                  "💵",
                  "Por Presupuesto Real",
                  "Filtramos teclados de juguete sin sensibilidad y comparamos modelos desde $150 hasta $900 en Amazon US.",
                ],
                [
                  "📐",
                  "Por Espacio Disponible",
                  "Tablas en centímetros y pulgadas para saber qué modelo de 61 u 88 teclas cabe exactamente en tu cuarto.",
                ],
                [
                  "🎼",
                  "Por Sensación al Tocar",
                  "Explicamos la diferencia táctil entre martillo graduado (GHC/PHA-4), semicontrapesada y Touch Response.",
                ],
                [
                  "🎧",
                  "Accesorios Compatibles",
                  "Pedales con selector de polaridad N.O./N.C., soportes en Z que no tiemblan, bancos y audífonos de 1/4\".",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory: Las 4 etapas del pianista en casa */}
        <ScrollStory />

        {/* 6. Mecánica de Acción de Martillo Graduado, Polaridad de Pedal y Audífonos sin Latencia (KeyActionMechanismSvg) */}
        <section className="relative isolate overflow-hidden bg-[#0e0d0c] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/40 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Ingeniería Táctil y Acústica sin Errores
              </span>
              <SplitHeading
                text="Lo que nadie te cuenta antes de comprar"
                accent={{
                  text: "tu primer piano digital, pedal y audífonos",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                El 80 % de las devoluciones de principiantes ocurren por tres
                descuidos fáciles de evitar: comprar un teclado cuyas teclas
                suenan siempre al mismo volumen (sin{" "}
                <strong className="text-white">Touch Response</strong> ni{" "}
                <strong className="text-white">Acción de Martillo</strong>),
                comprar un pedal de sustain sin{" "}
                <strong className="text-white">interruptor de polaridad</strong>{" "}
                que mantiene el sonido cuando NO lo pisas, o intentar tocar con
                audífonos Bluetooth que retrasan cada nota 200 milisegundos.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["🎹", "Martillo Graduado"],
                  ["🦶", "Polaridad N.O./N.C."],
                  ["🎧", "47 Ω · 0 ms Cable"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div className="glass mt-6 p-5 text-sm text-white/75" data-reveal>
                <strong className="text-white">
                  ¿Cómo evitar que el golpe mecánico de las teclas contrapesadas
                  moleste al vecino de abajo de noche?
                </strong>{" "}
                Coloca tu soporte en Z sobre una alfombra densa o tapete de EVA,
                separa el piano 8 cm de la pared para no transmitir vibración y
                conecta unos audífonos cerrados{" "}
                <strong>Audio-Technica ATH-M20x</strong> a la toma de{" "}
                <code>1/4&quot; (6.35 mm)</code>.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/comparativas/teclas-contrapesadas-vs-semicontrapesadas-vs-sensibles-al-tacto/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Guía de teclas contrapesadas vs sensibles
                </Link>
                <Link
                  href={safeHref(
                    "/resenas-pianos-y-teclados/pedal-sustain-m-audio-sp-2-universal/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Por qué el pedal M-Audio SP-2 es universal
                </Link>
              </div>
            </div>
            <div data-reveal>
              <KeyActionMechanismSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita interactiva de los 8 elementos del setup */}
        <section className="wrap py-24">
          <SetupCompatibilityOrbit items={orbit} center={heroImg} />
        </section>

        {/* 8. Contadores animados + Tabla comparativa por Teclas, Presupuesto, Espacio y Sensación */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#1d1711] via-[#0e0d0c] to-[#332009] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.18fr_1fr]">
            <div>
              <span className="eyebrow !text-fxlime" data-reveal>
                Medidas, Sensación y Compatibilidad Verificada
              </span>
              <SplitHeading
                text="Compara 61 y 88 teclas antes de"
                accent={{
                  text: "comprar en Amazon EE. UU.",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/70" data-reveal>
                Verificamos el precio en dólares, el mecanismo exacto de la
                tecla, cuántos centímetros de ancho y fondo ocupa en tu
                habitación y qué pedal, soporte y audífonos usa cada modelo.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/comparativas/yamaha-p-145-vs-roland-fp-10/"
                  className="btn btn-lime shine text-sm"
                  data-magnetic
                >
                  Yamaha P-145 vs Roland FP-10 (88 Teclas)
                </Link>
                <Link
                  href="/comparativas/yamaha-psr-e383-vs-casio-ct-s300/"
                  className="btn btn-glass text-sm"
                  data-magnetic
                >
                  Yamaha PSR-E383 vs Casio CT-S300 (61 Teclas)
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/95 p-5 sm:p-6 text-fxink shadow-2xl"
              data-reveal
            >
              <span className="inline-block rounded-full bg-fxsky px-3 py-1 text-xs font-extrabold text-fxbluedeep">
                📊 Tabla Comparativa Oficial Amazon EE. UU.
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold">
                Top 6 Modelos por Teclas, Espacio (cm) y Sensación
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--line)] bg-fxsky text-fxink font-display">
                      <th className="p-2.5">Modelo</th>
                      <th className="p-2.5">Teclas / Tacto</th>
                      <th className="p-2.5">Medidas (An × Fo)</th>
                      <th className="p-2.5">Precio Est.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    <tr>
                      <td className="p-2.5 font-bold">Yamaha P-145</td>
                      <td className="p-2.5 font-bold text-amber-800">88 Martillo GHC</td>
                      <td className="p-2.5">132.6 × 26.8 cm</td>
                      <td className="p-2.5">~$499</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Roland FP-10</td>
                      <td className="p-2.5 font-bold text-amber-800">88 PHA-4 Escape</td>
                      <td className="p-2.5">128.4 × 25.8 cm</td>
                      <td className="p-2.5">~$499</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Casio PX-S1100</td>
                      <td className="p-2.5 font-bold text-amber-800">88 Smart Scaled</td>
                      <td className="p-2.5">132.2 × 23.2 cm</td>
                      <td className="p-2.5">~$599</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Alesis Recital Pro</td>
                      <td className="p-2.5 font-bold text-amber-800">88 Hammer Action</td>
                      <td className="p-2.5">131.0 × 35.1 cm</td>
                      <td className="p-2.5">~$349</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Yamaha PSR-E383</td>
                      <td className="p-2.5 font-bold text-emerald-800">61 Touch Response</td>
                      <td className="p-2.5">94.1 × 31.7 cm</td>
                      <td className="p-2.5">~$199</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Casio CT-S300</td>
                      <td className="p-2.5 font-bold text-emerald-800">61 Touch Portátil</td>
                      <td className="p-2.5">93.0 × 25.6 cm</td>
                      <td className="p-2.5">~$159</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Nota: los 6 modelos aceptan el pedal de sustain universal{" "}
                <strong>M-Audio SP-2 (1/4&quot; con selector de polaridad)</strong> y
                conexión <strong>USB-MIDI</strong> para iPad/PC.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Comparador interactivo Antes ↔ Después (Teclado 61 Teclas Compacto vs Piano 88 Teclas Contrapesadas) */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Comparador Visual de Espacio y Teclas
              </span>
              <SplitHeading
                text="Visualiza la diferencia real entre"
                accent={{
                  text: "61 teclas en escritorio y 88 teclas con soporte en Z",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
               Arrastra el control para comparar cuánto ocupa un{" "}
              <strong className="text-fxink">teclado de 61 teclas (93 cm)</strong>{" "}
              frente a un{" "}
              <strong className="text-fxink">
                piano digital de 88 teclas contrapesadas (132 cm)
              </strong>{" "}
              con su pedal de sustain y soporte estable.
            </p>
          </div>
          <div data-reveal>
            <SetupComparisonSlider />
          </div>
        </section>

        {/* 10. MomentsCarousel 4:5 */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Guías visuales paso a paso
              </span>
              <SplitHeading
                text="Acierta con cada detalle de"
                accent={{
                  text: "tu primer piano digital o teclado",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Recomendador por Teclas/Presupuesto/Espacio + Calculadora de Espacio en Centímetros */}
        <section id="calculadora" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Simulador de Espacio (cm / in), Sensación y Accesorios
              </span>
              <SplitHeading
                text="Descubre qué piano o teclado entra en tu cuarto"
                accent={{
                  text: "y qué pedal, soporte y audífonos necesita",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)] text-sm" data-reveal>
              {[
                "Compara Yamaha P-145 (88), Roland FP-10 (88) y Yamaha PSR-E383 (61)",
                "Calcula si tus centímetros libres admiten 88 teclas o 61 teclas",
                "Enlaces directos a Amazon.com (EE. UU.) y Amazon.es (España)",
                "Asesor de Pianos IA en línea (modelo mini rápido) para armar tu setup",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fxlime/25 text-sm text-[#5c3b0e]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <PianoAndAccessoryFinder options={finderOptions} />
          </div>

          {/* Vitrina Amazon Showcase en la Home */}
          <div className="mt-12" data-reveal>
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={homeAmazon.sectionTitle}
              sectionSubtitle={homeAmazon.sectionSubtitle}
              products={homeAmazon.products}
              source="home"
            />
          </div>
        </section>

        {/* 12. Bento Grid de los 12 Silos + Las 6 Guías Más Consultadas */}
        <section className="bg-gradient-to-b from-white to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Arquitectura de 12 Silos Temáticos · 600 Artículos
              </span>
              <SplitHeading
                text="Explora nuestras 600 guías"
                accent={{
                  text: "sin canibalización y 100% prácticas",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 2;
                const isTrans = i < 3;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-6 sm:p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#1b1713] via-[#5c3b0e] to-[#b87a28] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {c.icon || "🎹"}
                      </span>
                      <div className="flex items-center gap-2">
                        {isTrans && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                              big
                                ? "bg-amber-400 text-slate-950"
                                : "bg-amber-100 text-amber-900"
                            }`}
                          >
                            🛒 Transaccional Amazon
                          </span>
                        )}
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-fxlime" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      </div>
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 text-sm ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 text-sm font-semibold ${
                        big ? "text-fxlime" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar silo completo →
                    </span>
                  </Link>
                );
              })}
            </div>

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 reseñas y comparativas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Criterio Editorial E-E-A-T de CARLOS LINGAN BORJA */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Rigor Musical & Transparencia
              </span>
              <SplitHeading
                text="Comparativas honestas por tacto y espacio,"
                accent={{
                  text: "pensadas para compradores en Amazon EE. UU.",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Dirigido por <strong className="text-fxink">{LEGAL_OWNER}</strong>{" "}
                ({LEGAL_LOCATION} ·{" "}
                <a
                  href={`mailto:${LEGAL_EMAIL}`}
                  className="text-fxblue underline"
                >
                  {LEGAL_EMAIL}
                </a>
                ), en GuiaDePianos.com evaluamos cada piano digital y teclado
                según su presupuesto real, el espacio que ocupa en centímetros,
                la respuesta mecánica de sus 61 u 88 teclas y la compatibilidad
                física de pedales de sustain, soportes, bancos y audífonos.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Nuestra metodología de pruebas
                </Link>
                <Link
                  href="/sobre-nosotros/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Sobre Carlos Lingan Borja
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-fxlime/25 px-3 py-1 text-xs font-bold text-[#5c3b0e]">
                  ✓ Lo que verificamos en cada piano y teclado
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Presupuesto en dólares y relación calidad-precio</li>
                  <li>• Medidas exactas (ancho, fondo y peso) para apartamentos</li>
                  <li>• Sensación real de tecla (GHC, PHA-4, Smart Scaled, Touch)</li>
                  <li>• Compatibilidad de pedales, soportes, bancos y audífonos</li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                  🛒 Transparencia Amazon Associates
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Enlaces directos a Amazon.com ({AMAZON_TAG_US})</li>
                  <li>• Soporte dual para Amazon.es ({AMAZON_TAG_ES})</li>
                  <li>• Recomendación de accesorios 100 % compatibles</li>
                  <li>• Nota legal: {PIANO_DISCLAIMER}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. FAQ */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Todo lo que debes saber antes de comprar tu primer piano o teclado"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿Dudas entre 61 y 88 teclas, o entre el Yamaha P-145, el Roland
                FP-10 y el Casio Privia PX-S1100? Nuestro Asesor de Pianos IA te
                responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  className="btn btn-buy"
                />
                <Link href="/comparativas/" className="btn btn-ghost">
                  Ver todas las comparativas
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Aurora Final */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1b1713] via-[#5c3b0e] to-[#b87a28] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={heroImg}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-drinklight/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-fxlime/25 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Estrena hoy tu primer piano digital o teclado"
                  accent={{
                    text: "con el pedal, soporte, banco y audífonos compatibles",
                    className: "text-fxlime",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Consulta nuestro ranking actualizado con precios, ofertas y
                  envío rápido en Amazon Estados Unidos (
                  <code>{AMAZON_TAG_US}</code>) y Amazon España (
                  <code>{AMAZON_TAG_ES}</code>).
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-y-teclados-para-principiantes-amazon/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    🏆 Ver Ranking Top 9 en Amazon
                  </Link>
                  <OpenChatButton
                    label="Pedir recomendación al Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[340px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <div className="float-y relative aspect-[4/3] overflow-hidden rounded-3xl border-2 border-white/25 shadow-2xl">
                  <Image
                    src={heroImg}
                    alt="Piano digital recomendado en Amazon"
                    fill
                    sizes="340px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
