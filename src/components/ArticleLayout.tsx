import Image from "next/image";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs, { JsonLd } from "./Breadcrumbs";
import ArticleBody from "./ArticleBody";
import ArticleCard from "./ArticleCard";
import AmazonAffiliateBox from "./AmazonAffiliateBox";
import ClientEffects from "./ClientEffects";
import ReadingProgress from "./ReadingProgress";
import OpenChatButton from "./OpenChatButton";
import { slugify, stripMd } from "./Inline";
import { getContextualAmazonProducts } from "@/lib/amazon";
import type { Article, Block } from "@/lib/content";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  PIANO_DISCLAIMER,
  absolute,
  getArticlesIn,
  getByPath,
  getCategory,
} from "@/lib/content";

const fmt = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function ArticleLayout({ a }: { a: Article }) {
  const cat = getCategory(a.pillar)!;
  const url = `${SITE_URL}${a.path}`;
  const h2s = a.blocks.filter((b) => b.type === "h2") as {
    type: "h2";
    text: string;
  }[];
  const steps = a.blocks.find((b) => b.type === "steps") as
    | { type: "steps"; items: { name: string; text: string }[] }
    | undefined;
  const related = a.related.map((p) => getByPath(p)).filter(Boolean) as Article[];
  const children = a.isPillar ? getArticlesIn(a.pillar) : [];
  const crumbs = a.isPillar
    ? [{ name: cat.name, href: `/${cat.slug}/` }]
    : [
        { name: cat.name, href: `/${cat.slug}/` },
        { name: a.title, href: a.path },
      ];
  const image = a.imageUrl ? absolute(a.imageUrl) : absolute(OG_DEFAULT());

  // División del artículo en mitad (antes del 3.º H2) para insertar tarjeta Amazon inline de máximo CTR
  const h2Indices = a.blocks
    .map((b, idx) => (b.type === "h2" ? idx : -1))
    .filter((idx) => idx >= 0);
  const splitIndex =
    h2Indices.length >= 3
      ? h2Indices[2]
      : h2Indices.length >= 2
      ? h2Indices[1]
      : Math.ceil(a.blocks.length / 2);
  const firstHalfBlocks: Block[] = a.blocks.slice(0, splitIndex);
  const secondHalfBlocks: Block[] = a.blocks.slice(splitIndex);

  const amz = getContextualAmazonProducts(a.slug, a.pillar, a.title);
  const isVsPage = a.pillar === "comparativas" || a.slug.includes("-vs-");
  const isReviewOrTransactional =
    a.isTransactional ||
    a.pillar === "resenas-pianos-y-teclados" ||
    a.pillar === "mejores-pianos-teclados-y-accesorios" ||
    isVsPage;

  const graph: Record<string, unknown>[] = [
    {
      "@type": a.isPillar ? "CollectionPage" : "Article",
      "@id": `${url}#article`,
      ...(a.isPillar ? { name: a.title } : { headline: a.title }),
      description: a.metaDescription,
      image,
      inLanguage: "es",
      datePublished: a.datePublished,
      dateModified: a.dateModified,
      author: { "@id": `${SITE_URL}/#carlos` },
      publisher: { "@id": `${SITE_URL}/#org` },
      mainEntityOfPage: url,
      ...(a.isPillar
        ? {
            hasPart: children.map((c) => ({
              "@type": "Article",
              headline: c.title,
              url: `${SITE_URL}${c.path}`,
            })),
          }
        : {}),
    },
  ];
  if (a.faqs?.length)
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: stripMd(f.q),
        acceptedAnswer: { "@type": "Answer", text: stripMd(f.a) },
      })),
    });
  if (steps)
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: a.title,
      image,
      totalTime: "PT10M",
      step: steps.items.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: stripMd(s.text),
      })),
    });

  return (
    <>
      <ReadingProgress />
      <Header />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <main className="pt-[68px]">
        <section className="relative overflow-hidden bg-gradient-to-b from-fxsky via-white to-white">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-drink/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-fxblue/10 blur-3xl" />
          <div className="wrap relative pb-10 pt-10">
            <Breadcrumbs items={crumbs} />
            <div
              className={`mt-6 grid items-center gap-10 ${
                a.imageUrl ? "lg:grid-cols-[1.15fr_1fr]" : ""
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/${cat.slug}/`} className="eyebrow hover:underline">
                    {a.isPillar ? "Hub Principal del Silo" : cat.name}
                  </Link>
                  {isReviewOrTransactional && (
                    <span className="rounded-full bg-amber-400/90 px-2.5 py-0.5 text-[11px] font-extrabold text-slate-950">
                      🛒 Análisis & Ofertas Amazon
                    </span>
                  )}
                </div>
                <h1 className="mt-3 text-[2.05rem] font-extrabold leading-[1.06] sm:text-5xl">
                  {a.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
                  <span>
                    Por{" "}
                    <Link
                      href="/sobre-nosotros/"
                      className="font-semibold text-fxink hover:text-fxblue"
                    >
                      {LEGAL_OWNER}
                    </Link>
                  </span>
                  <span aria-hidden>·</span>
                  <time dateTime={a.dateModified}>
                    Actualizado el {fmt(a.dateModified)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{a.readingMinutes || 7} min de lectura</span>
                </div>
                <div className="mt-6 rounded-2xl border-l-4 border-fxlime bg-white p-5 shadow-[0_10px_40px_-25px_rgba(120,75,20,0.45)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-fxblue">
                    Respuesta rápida sobre teclas, espacio, sensación y compatibilidad
                  </p>
                  <p className="mt-1.5 text-[1.03rem] leading-relaxed text-fxink">
                    {stripMd(a.quickAnswer)}
                  </p>
                </div>
              </div>
              {a.imageUrl && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl border border-[var(--line)]">
                  <Image
                    src={a.imageUrl}
                    alt={a.image.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="wrap grid grid-cols-1 gap-12 pb-10 lg:grid-cols-[minmax(0,1fr)_310px]">
          <article className="min-w-0">
            {/* Si es artículo transaccional o comparativa, mostramos arriba la caja Verdict o VS */}
            {isVsPage ? (
              <AmazonAffiliateBox
                variant="vs"
                sectionTitle={amz.sectionTitle}
                sectionSubtitle={amz.sectionSubtitle}
                products={amz.products}
                vsCompetitor={amz.vsCompetitor}
                source={a.slug}
              />
            ) : isReviewOrTransactional ? (
              <AmazonAffiliateBox
                variant="verdict"
                sectionTitle={amz.sectionTitle}
                sectionSubtitle={amz.sectionSubtitle}
                products={amz.products}
                source={a.slug}
              />
            ) : null}

            {h2s.length > 2 && (
              <details className="toc mb-6 rounded-2xl border border-[var(--line)] p-4 text-sm lg:hidden">
                <summary className="cursor-pointer font-display font-bold text-fxink">
                  Índice de esta guía
                </summary>
                <ol className="mt-3 space-y-2">
                  {h2s.map((h) => (
                    <li key={h.text}>
                      <a href={`#${slugify(h.text)}`}>{stripMd(h.text)}</a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* Primera mitad del artículo */}
            <ArticleBody blocks={firstHalfBlocks} source={a.slug} />

            {/* Tarjeta Amazon INLINE en mitad de la lectura (100% de páginas) */}
            <AmazonAffiliateBox
              variant="inline"
              sectionTitle={amz.sectionTitle}
              sectionSubtitle={amz.sectionSubtitle}
              products={amz.products}
              source={a.slug}
            />

            {/* Segunda mitad del artículo */}
            {secondHalfBlocks.length > 0 && (
              <ArticleBody blocks={secondHalfBlocks} source={`${a.slug}-b`} />
            )}

            {/* Si es Hub Pilar de Categoría, listamos todas las guías del silo */}
            {a.isPillar && children.length > 0 && (
              <section className="mt-14">
                <h2
                  className="font-display text-3xl font-extrabold"
                  id="todas-las-guias"
                >
                  Todas las guías de {cat.name.toLowerCase()} ({children.length})
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {children.map((c) => (
                    <ArticleCard key={c.path} a={c} />
                  ))}
                </div>
              </section>
            )}

            {/* Preguntas frecuentes */}
            {a.faqs?.length > 0 && (
              <section className="mt-14" aria-labelledby="faq">
                <h2 id="faq" className="font-display text-3xl font-extrabold">
                  Preguntas frecuentes
                </h2>
                <div className="mt-5 space-y-3">
                  {a.faqs.map((f) => (
                    <details key={f.q} className="card group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                        {stripMd(f.q)}
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxblue transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-[var(--muted)]">{stripMd(f.a)}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Vitrina SHOWCASE de 3 productos Amazon al final del artículo (100% de páginas) */}
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={amz.sectionTitle}
              sectionSubtitle={amz.sectionSubtitle}
              products={amz.products}
              source={a.slug}
            />

            {a.sources && a.sources.length > 0 && (
              <section className="mt-10 rounded-2xl bg-fxsky/60 p-6 text-sm">
                <h2 className="font-display text-lg font-bold">
                  Fuentes técnicas y referencias
                </h2>
                <ul className="mt-3 space-y-1.5">
                  {a.sources.map((s) => (
                    <li key={s.url + s.label}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener nofollow"
                        className="text-fxblue hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Bloque E-E-A-T de CARLOS LINGAN BORJA */}
            <section className="mt-10 flex flex-col sm:flex-row gap-5 rounded-3xl border border-[var(--line)] p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-fxblue to-prune font-display text-xl font-extrabold text-white">
                CL
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-fxbluedeep">
                  Dirección Editorial & Verificación Técnica de Pianos
                </p>
                <p className="font-display text-lg font-bold">
                  {`Revisado por ${LEGAL_OWNER} · ${LEGAL_LOCATION} (${LEGAL_EMAIL})`}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Cada guía verifica presupuesto real en Amazon Estados Unidos,
                  dimensiones físicas en centímetros y pulgadas para
                  apartamentos, mecanismo y peso de pulsación de tecla (88
                  contrapesadas vs 61 sensibles al tacto) y compatibilidad exacta
                  de pedales de sustain, soportes, bancos y audífonos. En este
                  portal {PIANO_DISCLAIMER}.{" "}
                  <Link
                    href="/politica-editorial/"
                    className="text-fxblue hover:underline"
                  >
                    Política editorial
                  </Link>
                </p>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {h2s.length > 2 && (
                <nav
                  className="toc rounded-2xl border border-[var(--line)] p-5 text-sm"
                  aria-label="Contenido"
                >
                  <p className="mb-3 font-display font-bold text-fxink">
                    En esta guía
                  </p>
                  <ol className="space-y-2">
                    {h2s.map((h) => (
                      <li key={h.text}>
                        <a href={`#${slugify(h.text)}`}>{stripMd(h.text)}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {/* Widget Amazon SIDEBAR en escritorio */}
              <AmazonAffiliateBox
                variant="sidebar"
                sectionTitle={amz.sectionTitle}
                sectionSubtitle={amz.sectionSubtitle}
                products={amz.products}
                source={a.slug}
              />

              {/* Tarjeta del Asesor de Pianos IA en Sidebar */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#141312] to-[#36220b] p-5 text-white">
                <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-fxlime">
                  🎹 Asesor IA En Línea
                </span>
                <p className="mt-2.5 font-display text-lg font-bold leading-snug">
                  ¿Dudas entre 61 y 88 teclas, Yamaha P-145, Roland FP-10 o Casio?
                </p>
                <p className="mt-1 text-xs text-white/75 leading-relaxed">
                  Dime tu presupuesto y cuántos centímetros libres tienes en
                  casa. Te recomiendo el piano o teclado ideal y el pedal,
                  soporte, banco y audífonos compatibles en Amazon.
                </p>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  prompt={`Estoy leyendo "${a.title}" y quiero saber qué piano digital de 88 teclas, teclado de 61 teclas, pedal, soporte, banco o audífonos compatibles de Amazon me recomiendas.`}
                  className="btn btn-lime shine mt-4 w-full text-xs !py-3"
                />
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="bg-fxsky py-16">
            <div className="wrap">
              <h2 className="font-display text-3xl font-extrabold">
                Guías y comparativas relacionadas
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {related.slice(0, 4).map((r) => (
                  <ArticleCard key={r.path} a={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ClientEffects stickySource={`${a.slug}-sticky`} />
    </>
  );
}
