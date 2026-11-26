export const AMAZON_TAG_US = "guiadepianos-20";
export const AMAZON_TAG_ES = "guiadepianos02-21";

export type AmazonStoreRegion = "US" | "ES";

export type AmazonCategoryType =
  | "piano-88"
  | "keyboard-61"
  | "console-piano"
  | "pedal"
  | "stand-bench"
  | "headphones"
  | "midi-accessory";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType: AmazonCategoryType;
  specs?: {
    budget: string;
    keyFeel: string;
    spaceSize: string;
    compatibility: string;
  };
  asinUS?: string;
  asinES?: string;
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

/**
 * Genera el enlace oficial de afiliado Amazon según la región:
 * - EE. UU. / Latinoamérica / Global (US - Predeterminado): amazon.com con tag=guiadepianos-20
 * - España / Europa (ES): amazon.es con tag=guiadepianos02-21
 */
export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    if (product.asinES) {
      return `https://www.amazon.es/dp/${product.asinES}?tag=${AMAZON_TAG_ES}`;
    }
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }

  if (product.asinUS) {
    return `https://www.amazon.com/dp/${product.asinUS}?tag=${AMAZON_TAG_US}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

/**
 * Detecta automáticamente la región del visitante.
 * Por defecto prioriza Amazon Estados Unidos ("US") y activa "ES" si navega desde España/Europa.
 */
export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("gdp_amazon_region");
    if (saved === "US" || saved === "ES") return saved;
  } catch {
    // ignore
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG: Record<string, AmazonProductRecommendation> = {
  YAMAHA_P145: {
    id: "yamaha-p-145",
    badge: "🏆 #1 Mejor Primer Piano 88 Teclas · Equilibrio Total",
    title: "Yamaha P-145 (Serie P) — Piano Digital de 88 Teclas Contrapesadas GHC con Sonido de Cola Yamaha CFIIIS",
    subtitle:
      "El piano digital de 88 teclas más recomendado en Amazon Estados Unidos para principiantes y estudiantes: estrena el mecanismo Graded Hammer Compact (GHC) que conserva el peso real de un piano acústico reduciendo el fondo a solo 26.8 cm para caber en cualquier habitación.",
    features: [
      "88 teclas contrapesadas con acción de martillo graduado (GHC): más firmes en las notas graves y más ágiles en las agudas con teclas negras acabado mate",
      "Diseño más corto y delgado que el clásico P-45 (132.6 × 26.8 cm y solo 11.1 kg), ideal para apartamentos, dormitorios y escritorios",
      "Puerto USB-to-Host para conectar directo a iPad/PC (Simply Piano, Flowkey, Smart Pianist) y salida de audífonos estéreo de 1/4\" (6.35 mm)",
    ],
    categoryType: "piano-88",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "88 Teclas Contrapesadas GHC (Martillo Graduado)",
      spaceSize: "132.6 × 26.8 cm (52.2\" × 10.5\") · 11.1 kg",
      compatibility: "Pedal Yamaha FC4A / M-Audio SP-2 · Mueble L-100 · Audífonos 1/4\"",
    },
    queryUS: "Yamaha P-145 88-Key Weighted Action Digital Piano",
    queryES: "Yamaha P-145 Piano Digital 88 Teclas Contrapesadas",
    ctaLabel: "Ver Precio y Oferta de Yamaha P-145 en Amazon",
  },
  ROLAND_FP10: {
    id: "roland-fp-10",
    badge: "🎹 Mejor Sensación al Tocar · Teclado PHA-4 con Escape",
    title: "Roland FP-10 — Piano Digital de 88 Teclas con Mecanismo PHA-4 Standard, Textura de Marfil y Bluetooth MIDI",
    subtitle:
      "Si tu prioridad número uno es que las teclas se sientan idénticas a un piano acústico de cola, el Roland FP-10 monta el mismo teclado PHA-4 con simulación de escape y triple sensor que los modelos Roland de más de precio variable en Amazon.",
    features: [
      "Teclado PHA-4 Standard de 88 teclas con mecanismo de escape (let-off) y superficie Ivory Feel que absorbe el sudor de los dedos",
      "Motor de sonido SuperNATURAL Piano con 96 notas de polifonía y Bluetooth MIDI integrado para conectar sin cables a iPad y apps de aprendizaje",
      "Chasis ultracompacto de 128.4 × 25.8 cm (el más corto en ancho entre los pianos de 88 teclas con martillo real)",
    ],
    categoryType: "piano-88",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "88 Teclas PHA-4 Standard con Escape y Marfil Sintético",
      spaceSize: "128.4 × 25.8 cm (50.5\" × 10.1\") · 12.3 kg",
      compatibility: "Pedal Roland DP-10 / M-Audio SP-2 · Soporte KSCFP10 o Z · Audífonos 3.5mm",
    },
    queryUS: "Roland FP-10 88-key Entry Level Digital Piano PHA-4",
    queryES: "Roland FP-10 Piano Digital 88 Teclas Contrapesadas PHA-4",
    ctaLabel: "Consultar Precio de Roland FP-10 en Amazon",
  },
  ROLAND_FP30X: {
    id: "roland-fp-30x",
    badge: "👑 Gama Media-Alta Favorita · 256 Polifonía + Bluetooth Audio",
    title: "Roland FP-30X — Piano Digital de 88 Teclas PHA-4 con 256 Notas de Polifonía, Altavoces de 22W y Bluetooth Audio/MIDI",
    subtitle:
      "El piano definitivo para quienes buscan un instrumento para los próximos 8–10 años: duplica la potencia acústica del FP-10, añade Bluetooth Audio para reproducir pistas por sus altavoces y ofrece doble salida de audífonos.",
    features: [
      "Polifonía de 256 notas (cero notas cortadas en pasajes clásicos con pedal) y sistema de altavoces estéreo de 11W + 11W llenos de cuerpo",
      "Doble toma de audífonos frontal (una de 1/4\" y otra de 3.5 mm) para tocar a cuatro manos con tu profesor o en silencio total de noche",
      "Compatible tanto con pedal damper progresivo DP-10 como con el mueble oficial KSC-70 y la pedalera triple KPD-70",
    ],
    categoryType: "piano-88",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "88 Teclas PHA-4 Standard con Escape · Polifonía 256",
      spaceSize: "130.0 × 28.4 cm (51.2\" × 11.2\") · 14.8 kg",
      compatibility: "Pedal DP-10 / KPD-70 · Mueble KSC-70 · Audífonos 1/4\" y 3.5mm",
    },
    queryUS: "Roland FP-30X Digital Piano with Bluetooth",
    queryES: "Roland FP-30X Piano Digital 88 Teclas",
    ctaLabel: "Ver Roland FP-30X en Amazon",
  },
  CASIO_PX_S1100: {
    id: "casio-privia-px-s1100",
    badge: "📐 El Más Delgado para Espacios Pequeños · Solo 23.2 cm de Fondo",
    title: "Casio Privia PX-S1100 — Piano Digital Ultradelgado de 88 Teclas Contrapesadas con Adaptador Bluetooth Audio/MIDI",
    subtitle:
      "El piano de 88 teclas con acción de martillo más estilizado del mundo: con apenas 23.2 cm de profundidad cabe en escritorios estrechos y habitaciones pequeñas donde ningún otro piano de 88 teclas entra, e incluye el adaptador Bluetooth WU-BT10.",
    features: [
      "Mecanismo Smart Scaled Hammer Action que simula el peso individual de los 88 martillos con acabado texturizado de ébano y marfil",
      "Panel táctil iluminado minimalista, 192 notas de polifonía y funcionamiento tanto enchufado como con 6 pilas AA para tocar sin cables",
      "Incluye el adaptador inalámbrico WU-BT10 para Bluetooth Audio y Bluetooth MIDI con la app Casio Music Space, Flowkey y Simply Piano",
    ],
    categoryType: "piano-88",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "88 Teclas Smart Scaled Hammer Action (Ébano/Marfil)",
      spaceSize: "132.2 × 23.2 cm (52.0\" × 9.1\") · 11.2 kg",
      compatibility: "Pedal M-Audio SP-2 / Casio SP-34 · Mueble CS-68 · Audífonos 3.5mm (×2)",
    },
    queryUS: "Casio Privia PX-S1100 88-Key Slim Digital Piano",
    queryES: "Casio Privia PX-S1100 Piano Digital 88 Teclas",
    ctaLabel: "Ver Casio Privia PX-S1100 en Amazon",
  },
  ALESIS_RECITAL_PRO: {
    id: "alesis-recital-pro",
    badge: "💰 Mejor 88 Teclas Contrapesadas Económico",
    title: "Alesis Recital Pro / Donner DEP-20 — Piano Digital de 88 Teclas con Acción de Martillo y Altavoces de 20W",
    subtitle:
      "Para quien quiere empezar con las 88 teclas completas y peso de martillo real pero tiene un presupuesto menor a precio variable en Amazon: ofrece 128 notas de polifonía, pantalla LCD guía, modo lección para profesor/alumno y 12 voces integradas.",
    features: [
      "88 teclas de tamaño completo con acción de martillo (Hammer Action) y respuesta al tacto ajustable en 4 niveles (Fijo, Suave, Medio, Duro)",
      "Altavoces integrados de 20W, funciones Split, Layer y Lesson Mode (divide las 88 teclas en dos zonas iguales para practicar con profesor)",
      "Salida de audífonos de 1/4\" (6.35 mm), entrada para pedal de sustain universal de 1/4\" y puerto USB-MIDI plug-and-play",
    ],
    categoryType: "piano-88",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "88 Teclas Acción de Martillo (Hammer Action)",
      spaceSize: "131.0 × 35.1 cm (51.6\" × 13.8\") · 11.8 kg",
      compatibility: "Pedal M-Audio SP-2 · Soporte en Z / Doble X · Audífonos 1/4\"",
    },
    queryUS: "Alesis Recital Pro 88 Key Digital Piano Hammer Action Weighted Keys",
    queryES: "Alesis Recital Pro Piano Digital 88 Teclas Contrapesadas",
    ctaLabel: "Ver Alesis Recital Pro Económico en Amazon",
  },
  YAMAHA_PSR_E383: {
    id: "yamaha-psr-e383",
    badge: "✨ #1 Mejor Teclado de 61 Teclas para Principiantes y Niños",
    title: "Yamaha PSR-E383 (Sucesor del PSR-E373) — Teclado Portátil de 61 Teclas Sensibles al Tacto con 650 Sonidos",
    subtitle:
      "Si buscas tu primer teclado de 61 teclas por presupuesto accesible o poco espacio, el Yamaha PSR-E383 es el estándar de oro de los profesores: sus teclas tienen sensibilidad a la velocidad (suenan suave o fuerte según cómo pulses).",
    features: [
      "61 teclas tipo órgano con Touch Response (sensibilidad a la pulsación en 4 niveles) indispensable para aprender dinámica musical real",
      "650 voces de alta calidad (con piano de cola Yamaha), modo de lecciones Keys to Success y función Auto Chord Play",
      "Interfaz de audio y MIDI por un solo cable USB para conectar a iPad/PC, entrada para pedal de sustain y salida de audífonos de 1/4\"",
    ],
    categoryType: "keyboard-61",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "61 Teclas con Sensibilidad al Tacto (Touch Response)",
      spaceSize: "94.1 × 31.7 cm (37.0\" × 12.5\") · Solo 4.4 kg",
      compatibility: "Pedal M-Audio SP-2 / Yamaha FC4A · Soporte en X · Audífonos 1/4\"",
    },
    queryUS: "Yamaha PSR-E383 61-Key Touch Sensitive Portable Keyboard",
    queryES: "Yamaha PSR-E383 Teclado Portátil 61 Teclas Sensibles al Tacto",
    ctaLabel: "Ver Yamaha PSR-E383 (61 Teclas) en Amazon",
  },
  CASIO_CT_S300: {
    id: "casio-ct-s300",
    badge: "🎒 Mejor 61 Teclas Económico y Ultracompacto",
    title: "Casio Casiotone CT-S300 / CT-S1 — Teclado Portátil de 61 Teclas Sensibles al Tacto con Asa de Transporte",
    subtitle:
      "El teclado de 61 teclas con sensibilidad al tacto más fácil de guardar debajo de la cama o colocar sobre un escritorio: pesa apenas 3.3 kg, tiene teclas estilo caja de piano y funciona tanto con corriente como con pilas.",
    features: [
      "61 teclas de tamaño completo con acabado texturizado tipo piano y sensibilidad al tacto configurable (2 niveles + apagado)",
      "Diseño ultradelgado (93 × 25.6 cm) con asa integrada en el chasis, rueda de Pitch Bend y 400 tonos + 77 ritmos",
      "Salida de audífonos de 3.5 mm (conecta cualquier auricular con cable directo), entrada para pedal de sustain de 1/4\" y puerto USB-MIDI",
    ],
    categoryType: "keyboard-61",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "61 Teclas Sensibles al Tacto (Textura Tipo Piano)",
      spaceSize: "93.0 × 25.6 cm (36.6\" × 10.1\") · Solo 3.3 kg",
      compatibility: "Pedal M-Audio SP-2 · Soporte Plegable X · Audífonos 3.5mm Directo",
    },
    queryUS: "Casio Casiotone CT-S300 61-Key Touch Sensitive Portable Keyboard",
    queryES: "Casio Casiotone CT-S300 Teclado 61 Teclas Sensibles",
    ctaLabel: "Ver Casio Casiotone CT-S300 en Amazon",
  },
  DONNER_DDP80_CONSOLE: {
    id: "donner-ddp-80-console",
    badge: "🏠 Mejor Piano 88 Teclas con Mueble de Madera y 3 Pedales",
    title: "Donner DDP-80 / Yamaha Arius YDP-145 — Piano Digital de 88 Teclas Contrapesadas con Mueble y Pedalera Triple",
    subtitle:
      "Para quienes quieren un piano fijo elegante en la sala o dormitorio sin tener que comprar soporte ni pedalera por separado: combina 88 teclas con acción de martillo graduado, mueble compacto de madera y los 3 pedales metálicos integrados.",
    features: [
      "Incluye de serie el mueble con patas de madera de acabado natural/nogal y la unidad completa de 3 pedales (Sustain, Sostenuto y Soft/Una Corda)",
      "88 teclas contrapesadas de tamaño estándar con respuesta dinámica graduada y sistema de altavoces estéreo envolventes de 20W+20W",
      "Fondo compacto ideal para paredes de apartamento, conexión USB-MIDI para apps y salida de audífonos para practicar en silencio",
    ],
    categoryType: "console-piano",
    specs: {
      budget: "precio variable en Amazon (Mueble + 3 Pedales Incluidos)",
      keyFeel: "88 Teclas Contrapesadas Hammer Action + 3 Pedales",
      spaceSize: "126.8 × 35.5 × 74.5 cm · Mueble Completo",
      compatibility: "Incluye Soporte y 3 Pedales · Compatible con Banco y Audífonos 1/4\"",
    },
    queryUS: "Donner DDP-80 88 Key Weighted Wooden Digital Piano with 3 Pedals",
    queryES: "Donner DDP-80 Piano Digital 88 Teclas Contrapesadas Mueble Madera",
    ctaLabel: "Ver Piano con Mueble y 3 Pedales en Amazon",
  },
  MAUDIO_SP2_PEDAL: {
    id: "m-audio-sp2-pedal",
    badge: "🦶 #1 Pedal de Sustain Universal · Interruptor de Polaridad Compatible",
    title: "M-Audio SP-2 — Pedal de Sustain Universal Estilo Piano Acústico con Selector de Polaridad (N.O. / N.C.)",
    subtitle:
      "El accesorio n.º 1 que todo pianista compra junto a su teclado o piano digital: reemplaza el pequeño pedal cuadrado de plástico que viene en la caja por un pedal metálico cromado con peso real y compatibilidad universal.",
    features: [
      "Interruptor de polaridad en la base que lo hace 100 % compatible con TODAS las marcas: Yamaha, Casio, Roland, Kawai, Korg, Alesis y Donner (nunca suena al revés)",
      "Base recubierta de goma antideslizante de alto agarre para que el pedal no se escape hacia adelante sobre pisos de madera, cerámica o alfombra",
      "Cable reforzado de 1.8 metros (6 ft) con conector estándar de 1/4\" (6.35 mm) y muelle de tensión calibrada estilo piano vertical",
    ],
    categoryType: "pedal",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "Pedal Metálico Cromado con Resistencia de Piano Real",
      spaceSize: "Base Antideslizante · Cable 1.8m con Jack 1/4\" (6.35 mm)",
      compatibility: "100% Universal (Selector Polaridad): Yamaha, Casio, Roland, Alesis",
    },
    queryUS: "M-Audio SP-2 Universal Sustain Pedal with Piano Style Action",
    queryES: "M-Audio SP-2 Pedal Sustain Universal Piano Teclado",
    ctaLabel: "Ver Pedal Universal M-Audio SP-2 en Amazon",
  },
  STAND_Z_AND_BENCH: {
    id: "stand-z-and-bench",
    badge: "🪑 Soporte en Z Ultra-Estable + Banco Ajustable · Cero Temblores",
    title: "Soporte de Teclado en Z Heavy Duty (Plixio / Liquid Stands) + Banco de Piano Acolchado Ajustable On-Stage",
    subtitle:
      "A diferencia de los soportes en X baratos donde chocan las rodillas al usar el pedal, el soporte en Z soporta hasta 113 kg (250 lb) sin vibrar con pianos pesados de 88 teclas y deja todo el espacio central libre para tus piernas y pedales.",
    features: [
      "Estructura en Z de acero reforzado ajustable en ancho (57 a 85 cm, sirve tanto para 61 como para 88 teclas) y en altura (60 a 85 cm)",
      "Incluye correas de seguridad (security straps) que se atornillan debajo del piano para evitar caídas accidentales y gancho lateral para colgar los audífonos",
      "Acompáñalo con el banco acolchado de altura regulable (44 a 56 cm) para mantener los antebrazos paralelos al suelo sin dolor de espalda",
    ],
    categoryType: "stand-bench",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "Estabilidad Total hasta 113 kg (250 lb) · Espacio Libre de Piernas",
      spaceSize: "Ancho Ajustable 57–85 cm · Altura 60–85 cm (Apto 61, 76 y 88 Teclas)",
      compatibility: "Compatible con Yamaha P-145/PSR, Roland FP-10/30X, Casio y Alesis",
    },
    queryUS: "Heavy Duty Z Style Keyboard Piano Stand and Adjustable Padded Piano Bench",
    queryES: "Soporte Teclado Piano en Z Heavy Duty y Banqueta Piano Ajustable",
    ctaLabel: "Ver Soporte en Z y Banco de Piano en Amazon",
  },
  HEADPHONES_ATH_M20X: {
    id: "headphones-ath-m20x",
    badge: "🎧 #1 Audífonos para Piano Digital · Cero Latencia + Adaptador 1/4\"",
    title: "Audio-Technica ATH-M20x / Sony MDR-7506 — Audífonos de Estudio Cerrados con Cable de 3m y Adaptador 1/4\"",
    subtitle:
      "Los audífonos Bluetooth tienen retraso al tocar el piano. Estos audífonos de estudio con cable de 47 Ω reproducen los graves profundos y los armónicos agudos del piano en tiempo real sin cansar el oído en sesiones nocturnas.",
    features: [
      "Incluye el adaptador a presión/rosca de 3.5 mm (1/8\") a 6.35 mm (1/4\") compatible con todas las salidas de auriculares de Yamaha, Roland, Casio y Alesis",
      "Impedancia ideal de 47 Ω (suenan potentes y cristalinos conectados directamente al piano sin necesitar amplificador adicional)",
      "Almohadillas circumaurales que rodean toda la oreja, aíslan el ruido exterior y cuentan con un cable largo de 3 metros que no estorba al tocar",
    ],
    categoryType: "headphones",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "Drivers de 40 mm (47 Ω) · 0 ms de Latencia · Cable de 3 Metros",
      spaceSize: "Orejeras Circumaurales Cómodas · Aislamiento Nocturno",
      compatibility: "Incluye Conector 3.5 mm + Adaptador 1/4\" (6.35 mm) para Todo Piano",
    },
    queryUS: "Audio-Technica ATH-M20x Professional Studio Monitor Headphones 1/4 Adapter",
    queryES: "Audio-Technica ATH-M20x Auriculares Estudio Piano Digital Adaptador 6.35mm",
    ctaLabel: "Ver Audífonos Audio-Technica ATH-M20x en Amazon",
  },
  MIDI_CABLE_DUST_COVER_KIT: {
    id: "midi-cable-dust-cover-kit",
    badge: "📱 Kit Conexión iPad (USB-MIDI) + Cubrepolvo Elástico 61/88 Teclas",
    title: "Cable USB-MIDI Tipo B a USB-C / Lightning (para Simply Piano y Flowkey) + Cubrepolvo Elástico Antipolvo",
    subtitle:
      "Conecta tu teclado o piano digital directamente al iPad, iPhone o tablet para que las apps reconozcan cada nota al instante sin errores del micrófono, y protege los sensores de las teclas del polvo cuando no estás tocando.",
    features: [
      "Cable USB 2.0 Tipo B (USB to Host cuadrado) a USB-C / USB-A de 2 metros con blindaje sin latencia para Simply Piano, Flowkey, Yousician y GarageBand",
      "Cubrepolvo de tela spandex transpirable con cordón ajustable en medidas para 61/76 teclas y para 88 teclas (evita que el polvo calle las teclas)",
      "Opcional con funda acolchada impermeable (Gig Bag) para guardar o transportar el teclado con total seguridad",
    ],
    categoryType: "midi-accessory",
    specs: {
      budget: "precio variable en Amazon",
      keyFeel: "Reconocimiento MIDI Instantáneo en Apps + Protección de Sensores",
      spaceSize: "Cable de 2 Metros + Cubrepolvo Elástico (Tallas 61 y 88 Teclas)",
      compatibility: "Puertos USB-to-Host de Yamaha, Casio, Roland, Alesis y Korg",
    },
    queryUS: "USB B to USB C MIDI Cable for Digital Piano Keyboard and 88 Key Dust Cover",
    queryES: "Cable USB MIDI Tipo B a USB C Piano Digital Teclado y Cubrepolvo 88 61 Teclas",
    ctaLabel: "Ver Cable USB-MIDI y Cubrepolvo en Amazon",
  },
};

export interface ContextualAmazonBundle {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
}

/**
 * Selecciona los 3 productos de Amazon más relevantes según el slug, categoría y título de la página,
 * garantizando recomendaciones exactas por número de teclas (61 vs 88), presupuesto, espacio disponible,
 * sensación al tocar y compatibilidad de pedales, soportes, bancos y audífonos.
 */
export function getContextualAmazonProducts(
  slug: string,
  category: string,
  title?: string
): ContextualAmazonBundle {
  const text = `${slug} ${category} ${title || ""}`.toLowerCase();

  // 1. Duelo Yamaha P-145 vs Roland FP-10
  if (
    (text.includes("p-145") || text.includes("p145")) &&
    (text.includes("fp-10") || text.includes("fp10"))
  ) {
    return {
      sectionTitle: "Duelo en Amazon: Yamaha P-145 (Compacto GHC) vs Roland FP-10 (Teclado PHA-4 con Escape)",
      sectionSubtitle:
        "Compara precio actual en dólares, tamaño para tu habitación, sensación de tecla contrapesada y el pedal universal compatible con ambos.",
      products: [
        CATALOG.YAMAHA_P145,
        CATALOG.ROLAND_FP10,
        CATALOG.MAUDIO_SP2_PEDAL,
      ],
      vsCompetitor: CATALOG.ROLAND_FP10,
    };
  }

  // 2. Duelo 88 Teclas vs 61 Teclas
  if (
    (text.includes("88") && text.includes("61")) ||
    (text.includes("psr-e383") && text.includes("ct-s300"))
  ) {
    return {
      sectionTitle: "Comparativa en Amazon: Mejor Piano de 88 Teclas Contrapesadas vs Mejor Teclado de 61 Teclas",
      sectionSubtitle:
        "Elige según tu presupuesto, el espacio disponible en centímetros y la sensación al tocar que necesitas al empezar.",
      products: [
        CATALOG.YAMAHA_P145,
        CATALOG.YAMAHA_PSR_E383,
        CATALOG.CASIO_CT_S300,
      ],
      vsCompetitor: CATALOG.YAMAHA_PSR_E383,
    };
  }

  // 3. Roland FP-30X / FP-10 / Kawai ES120
  if (
    text.includes("fp-30x") ||
    text.includes("fp30x") ||
    text.includes("es120") ||
    text.includes("kawai") ||
    (text.includes("roland") && !text.includes("go-piano"))
  ) {
    const is30X = text.includes("30x") || text.includes("es120") || text.includes("gama-media");
    return {
      sectionTitle: "Selección Oficial Amazon: Roland FP-10 / FP-30X (Teclado PHA-4) + Pedal y Audífonos Compatibles",
      sectionSubtitle:
        "La acción de martillo con textura de marfil y escape más realista para estudiantes de piano, acompañada de su pedal y audífonos sin latencia.",
      products: [
        is30X ? CATALOG.ROLAND_FP30X : CATALOG.ROLAND_FP10,
        CATALOG.MAUDIO_SP2_PEDAL,
        CATALOG.HEADPHONES_ATH_M20X,
      ],
      vsCompetitor: CATALOG.YAMAHA_P145,
    };
  }

  // 4. Espacios Pequeños / Apartamentos / Casio Privia PX-S1100 / PX-S3100 / CDP-S160
  if (
    category === "espacio-medidas-y-ergonomia" ||
    text.includes("px-s1100") ||
    text.includes("px-s3100") ||
    text.includes("cdp-s") ||
    text.includes("apartamento") ||
    text.includes("espacio") ||
    text.includes("delgado") ||
    text.includes("compacto") ||
    text.includes("medidas")
  ) {
    return {
      sectionTitle: "Los Pianos y Soportes Más Compactos en Amazon para Apartamentos, Dormitorios y Escritorios",
      sectionSubtitle:
        "Desde el Casio Privia PX-S1100 (88 teclas contrapesadas en solo 23.2 cm de fondo) hasta el soporte en Z y banco regulable de postura ergonómica.",
      products: [
        CATALOG.CASIO_PX_S1100,
        CATALOG.STAND_Z_AND_BENCH,
        CATALOG.CASIO_CT_S300,
      ],
      vsCompetitor: CATALOG.YAMAHA_P145,
    };
  }

  // 5. Teclados de 61 / 76 Teclas, Niños y Presupuesto precio variable en Amazon
  if (
    text.includes("61-teclas") ||
    text.includes("61 teclas") ||
    text.includes("76-teclas") ||
    text.includes("psr-e383") ||
    text.includes("psr-e373") ||
    text.includes("ct-s300") ||
    text.includes("ct-s1") ||
    text.includes("ct-x700") ||
    text.includes("np-15") ||
    text.includes("np-35") ||
    text.includes("go-piano") ||
    text.includes("ninos") ||
    text.includes("menos-de-200")
  ) {
    return {
      sectionTitle: "Los Mejores Teclados de 61 Teclas con Sensibilidad al Tacto en Amazon EE. UU.",
      sectionSubtitle:
        "Ligeros, ocupan menos de 95 cm en tu escritorio y tienen teclas sensibles a la velocidad para aprender con dinámica real.",
      products: [
        CATALOG.YAMAHA_PSR_E383,
        CATALOG.CASIO_CT_S300,
        CATALOG.HEADPHONES_ATH_M20X,
      ],
      vsCompetitor: CATALOG.CASIO_CT_S300,
    };
  }

  // 6. Pianos de 88 Teclas Económicos
  if (
    text.includes("alesis") ||
    text.includes("dep-20") ||
    text.includes("recital") ||
    text.includes("prestige") ||
    text.includes("menos-de-350") ||
    text.includes("barato") ||
    text.includes("economico")
  ) {
    return {
      sectionTitle: "Pianos de 88 Teclas con Acción de Martillo Económicos en Amazon EE. UU.",
      sectionSubtitle:
        "Empieza con las 88 teclas completas sin superar tu presupuesto, añadiendo un pedal metálico estilo piano con selector de polaridad.",
      products: [
        CATALOG.ALESIS_RECITAL_PRO,
        CATALOG.YAMAHA_P145,
        CATALOG.MAUDIO_SP2_PEDAL,
      ],
      vsCompetitor: CATALOG.YAMAHA_P145,
    };
  }

  // 7. Pianos con Mueble de Madera y 3 Pedales (Donner DDP-80 / Yamaha Arius YDP-145 / Casio PX-770)
  if (
    text.includes("ddp-80") ||
    text.includes("arius") ||
    text.includes("ydp-145") ||
    text.includes("ydp-105") ||
    text.includes("px-770") ||
    text.includes("mueble") ||
    text.includes("consola")
  ) {
    return {
      sectionTitle: "Pianos Digitales de 88 Teclas con Mueble de Madera y 3 Pedales Integrados en Amazon",
      sectionSubtitle:
        "Listos para instalar en la sala o habitación con soporte fijo de madera, pedalera triple integrada y estética minimalista.",
      products: [
        CATALOG.DONNER_DDP80_CONSOLE,
        CATALOG.HEADPHONES_ATH_M20X,
        CATALOG.STAND_Z_AND_BENCH,
      ],
      vsCompetitor: CATALOG.YAMAHA_P145,
    };
  }

  // 8. Pedales Compatibles y Polaridad (Silo 7)
  if (
    category === "pedales-compatibles-y-polaridad" ||
    text.includes("pedal") ||
    text.includes("sustain") ||
    text.includes("damper") ||
    text.includes("polaridad") ||
    text.includes("sp-2") ||
    text.includes("fc4a") ||
    text.includes("dp-10")
  ) {
    return {
      sectionTitle: "Pedales de Sustain Compatibles en Amazon (Con Interruptor de Polaridad para Yamaha, Casio, Roland y Alesis)",
      sectionSubtitle:
        "Soluciona al instante el problema del pedal que suena invertido y mejora tu control expresivo con base de goma antideslizante.",
      products: [
        CATALOG.MAUDIO_SP2_PEDAL,
        CATALOG.YAMAHA_P145,
        CATALOG.STAND_Z_AND_BENCH,
      ],
      vsCompetitor: CATALOG.ROLAND_FP10,
    };
  }

  // 9. Soportes, Bancos y Muebles (Silo 8)
  if (
    category === "soportes-bancos-y-muebles" ||
    text.includes("soporte") ||
    text.includes("banco") ||
    text.includes("banqueta") ||
    text.includes("stand") ||
    text.includes("en-z") ||
    text.includes("en-x")
  ) {
    return {
      sectionTitle: "Soportes en Z Heavy Duty, Muebles y Bancos Regulables Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "Elimina el tambaleo al tocar acordes fuertes en pianos de 88 teclas y deja espacio libre para tus rodillas y el pedal de sustain.",
      products: [
        CATALOG.STAND_Z_AND_BENCH,
        CATALOG.MAUDIO_SP2_PEDAL,
        CATALOG.DONNER_DDP80_CONSOLE,
      ],
      vsCompetitor: CATALOG.DONNER_DDP80_CONSOLE,
    };
  }

  // 10. Audífonos, Sonido y Práctica Silenciosa (Silo 9)
  if (
    category === "audifonos-sonido-y-practica-silenciosa" ||
    text.includes("audifono") ||
    text.includes("auricular") ||
    text.includes("ath-m20x") ||
    text.includes("mdr-7506") ||
    text.includes("sennheiser") ||
    text.includes("silencio") ||
    text.includes("noche") ||
    text.includes("latencia")
  ) {
    return {
      sectionTitle: "Los Mejores Audífonos con Cable y Adaptador 1/4\" (6.35 mm) para Piano Digital en Amazon",
      sectionSubtitle:
        "Practica de noche sin despertar a nadie, con 0 ms de retraso y la impedancia perfecta (32–63 Ω) para que tu teclado suene fuerte y natural.",
      products: [
        CATALOG.HEADPHONES_ATH_M20X,
        CATALOG.MAUDIO_SP2_PEDAL,
        CATALOG.YAMAHA_P145,
      ],
      vsCompetitor: CATALOG.ROLAND_FP30X,
    };
  }

  // 11. Conexiones MIDI, Apps, Solución de Problemas y Mantenimiento (Silos 10, 11 y 12)
  if (
    category === "conexiones-midi-apps-y-aprendizaje" ||
    category === "solucion-de-problemas-y-configuracion" ||
    category === "mantenimiento-limpieza-y-transporte" ||
    text.includes("midi") ||
    text.includes("ipad") ||
    text.includes("simply-piano") ||
    text.includes("flowkey") ||
    text.includes("cubrepolvo") ||
    text.includes("funda") ||
    text.includes("limpi")
  ) {
    return {
      sectionTitle: "Accesorios Esenciales en Amazon: Cable USB-MIDI para iPad/Apps, Cubrepolvo y Audífonos",
      sectionSubtitle:
        "Conecta tu teclado sin fallos a Simply Piano o Flowkey y protege las teclas del polvo y la humedad para evitar que fallen los sensores.",
      products: [
        CATALOG.MIDI_CABLE_DUST_COVER_KIT,
        CATALOG.HEADPHONES_ATH_M20X,
        CATALOG.MAUDIO_SP2_PEDAL,
      ],
      vsCompetitor: CATALOG.YAMAHA_PSR_E383,
    };
  }

  // 12. Sensación al Tocar y Tipos de Tecla (Silo 5)
  if (
    category === "sensacion-al-tocar-y-tipos-de-tecla" ||
    text.includes("contrapesada") ||
    text.includes("martillo") ||
    text.includes("ghs") ||
    text.includes("ghc") ||
    text.includes("pha-4") ||
    text.includes("sensacion")
  ) {
    return {
      sectionTitle: "Los 3 Pianos Digitales con Mejor Sensación de Tecla Contrapesada en Amazon EE. UU.",
      sectionSubtitle:
        "Compara los mecanismos de acción de martillo graduado Yamaha GHC, Roland PHA-4 con escape y Casio Smart Scaled.",
      products: [
        CATALOG.ROLAND_FP10,
        CATALOG.YAMAHA_P145,
        CATALOG.CASIO_PX_S1100,
      ],
      vsCompetitor: CATALOG.YAMAHA_P145,
    };
  }

  // 13. Default: Primer Piano o Teclado (Top 3 Superventas Amazon US: 88 Teclas + 61 Teclas + Pedal/Accesorios)
  return {
    sectionTitle: "Los 3 Mejores Pianos Digitales y Teclados para Empezar en Casa (Comparados por Teclas, Espacio y Presupuesto)",
    sectionSubtitle:
      "Tanto si buscas tus primeras 88 teclas contrapesadas como un teclado compacto de 61 teclas sensible al tacto, estos son los líderes en Amazon Estados Unidos.",
    products: [
      CATALOG.YAMAHA_P145,
      CATALOG.ROLAND_FP10,
      CATALOG.YAMAHA_PSR_E383,
    ],
    vsCompetitor: CATALOG.ROLAND_FP10,
  };
}
