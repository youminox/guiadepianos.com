import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts(
    "404",
    "mejores-pianos-teclados-y-accesorios",
    "Primer Piano Digital o Teclado"
  );
  return (
    <>
      <Header />
      <main className="pt-[88px] pb-16">
        <div className="wrap max-w-3xl text-center py-12">
          <span className="eyebrow">Página no encontrada · 404</span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold">
            Parece que esta tecla se quedó fuera de la partitura
          </h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Explora nuestras 600 guías prácticas sobre pianos digitales de 88
            teclas contrapesadas, teclados de 61 teclas y pedales, soportes,
            bancos y audífonos compatibles o consulta nuestro ranking en Amazon
            Estados Unidos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al inicio
            </Link>
            <Link
              href="/mejores-pianos-teclados-y-accesorios/mejores-pianos-digitales-y-teclados-para-principiantes-amazon/"
              className="btn btn-ghost"
            >
              Ver Top 9 en Amazon →
            </Link>
          </div>
        </div>
        <div className="wrap">
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={amz.sectionTitle}
            sectionSubtitle={amz.sectionSubtitle}
            products={amz.products}
            source="404"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
