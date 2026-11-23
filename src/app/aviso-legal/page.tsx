import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  PIANO_DISCLAIMER,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: `Aviso Legal | ${SITE_NAME}`,
  description: `Aviso legal y condiciones de uso de ${SITE_NAME} (guiadepianos.com), titularidad de ${LEGAL_OWNER}, domiciliado en ${LEGAL_LOCATION}.`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Condiciones de Uso"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro={`Información legal oficial y condiciones generales de uso del portal ${SITE_NAME} (guiadepianos.com).`}
    >
      <h2>1. Datos Identificativos del Titular</h2>
      <p>
        En cumplimiento de las disposiciones legales vigentes aplicables a los
        servicios de la sociedad de la información y comercio electrónico, se
        informa a los usuarios que el presente sitio web{" "}
        <strong>{SITE_URL}</strong> es titularidad de:
      </p>
      <ul>
        <li>
          <strong>Titular del sitio web:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio legal:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Nombre del portal:</strong> {SITE_NAME} (
          <code>guiadepianos.com</code>)
        </li>
      </ul>

      <h2>2. Objeto y Naturaleza del Sitio Web</h2>
      <p>
        <strong>{SITE_NAME}</strong> es una guía editorial en español dedicada a
        orientar a quienes buscan su primer piano digital o teclado, comparando
        modelos de 61 y 88 teclas según el presupuesto, el espacio disponible en
        el hogar y la sensación al tocar (acción de martillo graduado vs tecla
        semicontrapesada o sensible a la velocidad), así como a recomendar
        pedales de sustain, soportes, bancos y audífonos compatibles.
      </p>
      <p>
        En este sitio {PIANO_DISCLAIMER}. Toda la información publicada tiene
        carácter técnico, educativo e informativo.
      </p>

      <h2>3. Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{LEGAL_OWNER}</strong>, a través de <strong>{SITE_NAME}</strong>
        , participa en el Programa de Afiliados de Amazon.com Associates (Estados
        Unidos, con ID de seguimiento <code>{AMAZON_TAG_US}</code>) y en el
        Programa de Afiliados de Amazon EU (España, con ID de seguimiento{" "}
        <code>{AMAZON_TAG_ES}</code>), programas de publicidad para afiliados
        diseñados para ofrecer a sitios web un modo de obtener comisiones por
        publicidad, publicitando e incluyendo enlaces a{" "}
        <code>Amazon.com</code> y <code>Amazon.es</code>.
      </p>
      <p>
        En calidad de Afiliado de Amazon, obtenemos ingresos por las compras
        adscritas que cumplen los requisitos aplicables, sin que ello suponga
        ningún recargo ni variación de precio para el usuario final.
      </p>

      <h2>4. Propiedad Intelectual e Industrial</h2>
      <p>
        Los textos, comparativas técnicas, tablas de medidas y compatibilidad de
        pedales, soportes y audífonos, fotografías generadas, código fuente y
        diseño visual de <strong>{SITE_NAME}</strong> son propiedad intelectual
        de <strong>{LEGAL_OWNER}</strong> o cuentan con las licencias
        correspondientes. Las denominaciones comerciales de fabricantes (Yamaha,
        Roland, Casio, Kawai, Korg, Alesis, Donner, M-Audio, Audio-Technica,
        Sony, Sennheiser, AKG, On-Stage, Liquid Stands, Plixio, entre otros) se
        citan exclusivamente con fines descriptivos y de compatibilidad técnica.
      </p>

      <h2>5. Legislación Aplicable y Jurisdicción</h2>
      <p>
        Las presentes condiciones se rigen por la legislación de la República del
        Perú (domicilio del titular en {LEGAL_LOCATION}), sin perjuicio de las
        normas imperativas de protección al consumidor aplicables en la
        jurisdicción del usuario. Para cualquier consulta o notificación legal,
        puede escribir directamente a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
