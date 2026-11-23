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
  title: `Política Editorial y Metodología de Pruebas | ${SITE_NAME}`,
  description: `Criterios técnicos con los que evaluamos pianos digitales de 88 teclas, teclados de 61 teclas, pedales, soportes, bancos y audífonos en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología de Evaluación"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Cómo analizamos cada piano digital, teclado y accesorio compatible para que aciertes en tu primera compra."
    >
      <h2>1. Dirección Editorial</h2>
      <p>
        Todo el contenido de <strong>{SITE_NAME}</strong> está dirigido y
        supervisado por <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        {LEGAL_LOCATION} · <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>).
        Nuestra misión es ofrecer una guía clara y honesta en español para quien
        compra su primer piano digital o teclado en Estados Unidos, Latinoamérica
        o España.
      </p>

      <h2>2. Los 4 Pilares de Nuestras Comparativas</h2>
      <ol>
        <li>
          <strong>Presupuesto honesto en USD:</strong> descartamos los teclados
          de juguete con miniteclas sin sensibilidad a la velocidad y
          clasificamos modelos reales por tramos de inversión (
          <code>&lt;$200</code>, <code>$200–$380</code>, <code>$450–$650</code> y{" "}
          <code>$650–$1,000</code>).
        </li>
        <li>
          <strong>Espacio disponible y medidas exactas:</strong> documentamos el
          ancho, fondo y peso real de cada instrumento en centímetros y pulgadas
          (desde un Casio CT-S300 de <code>93 × 25.6 cm</code> o un Casio Privia
          PX-S1100 de <code>23.2 cm</code> de fondo hasta un piano con mueble
          consola).
        </li>
        <li>
          <strong>Sensación al tocar y mecanismo de tecla:</strong> explicamos a
          fondo la diferencia física en los dedos entre una tecla contrapesada
          con acción de martillo graduado (<code>Yamaha GHC/GHS</code>,{" "}
          <code>Roland PHA-4 con escape</code>,{" "}
          <code>Casio Smart Scaled</code>, <code>Kawai RHC</code>), una tecla
          semicontrapesada y una tecla tipo órgano con sensibilidad al tacto (
          <em>Touch Response</em>).
        </li>
        <li>
          <strong>Verificación de accesorios compatibles:</strong> especificamos
          siempre la polaridad del pedal de sustain (<code>N.O.</code> vs{" "}
          <code>N.C.</code> y medio pedal <code>TRS</code>), la estabilidad del
          soporte (en Z, doble X o mueble oficial <code>L-100 / KSC-70 / CS-68</code>),
          la altura del banco y la impedancia e interfaz de los audífonos (
          <code>32–63 Ω</code> con conector <code>1/4&quot;</code> o{" "}
          <code>3.5 mm</code>).
        </li>
      </ol>

      <h2>3. Revisión y Actualización Continua</h2>
      <p>
        Si detectas algún cambio en el catálogo de un fabricante o deseas
        sugerir el análisis de un modelo específico disponible en Amazon, puedes
        escribirnos directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
