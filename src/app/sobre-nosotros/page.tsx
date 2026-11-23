import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Sobre Nosotros y Carlos Lingan Borja | ${SITE_NAME}`,
  description: `Conoce la misión de ${SITE_NAME} y a su fundador ${LEGAL_OWNER} (${LEGAL_LOCATION}), especialistas en guías de pianos digitales, teclados y accesorios compatibles.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title={`Sobre ${SITE_NAME}`}
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="Tu guía independiente en español para elegir tu primer piano digital o teclado de 61 y 88 teclas según tu presupuesto, espacio y sensación al tocar, y acertar con cada pedal, soporte, banco y audífono."
    >
      <h2>¿Por qué creamos {SITE_NAME}?</h2>
      <p>
        Cuando alguien decide comprar su primer piano digital o teclado en
        Amazon Estados Unidos, suele enfrentarse a fichas en inglés llenas de
        siglas técnicas (<em>Graded Hammer Compact</em>, <em>PHA-4 Escapement</em>
        , <em>Half-Damper TRS</em>, <em>Polarity Switch</em>,{" "}
        <em>Touch Response</em>) y a la gran duda inicial: ¿compro un teclado de
        61 teclas o un piano de 88 teclas contrapesadas, y cabrá realmente en mi
        habitación?
      </p>
      <p>
        <strong>{SITE_NAME}</strong> nació para responder exactamente eso en
        español claro, práctico y estructurado en <strong>600 guías</strong>:
        comparamos cada modelo según tu presupuesto, el espacio libre en casa y
        la sensación en tus dedos, y te indicamos con exactitud qué pedales,
        soportes, bancos y audífonos son 100 % compatibles.
      </p>

      <h2>Fundador y Dirección Editorial</h2>
      <ul>
        <li>
          <strong>Titular y Director Editorial:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico directo:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>
      <p>
        Además de nuestras 600 guías escritas, hemos desarrollado el{" "}
        <strong>Asesor de Pianos IA</strong> integrado en la esquina inferior
        derecha de todas las páginas, disponible las 24 horas para responder tus
        dudas de compatibilidad y recomendarte el setup ideal en Amazon.
      </p>
    </SimplePage>
  );
}
