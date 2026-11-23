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
  title: `Política de Privacidad | ${SITE_NAME}`,
  description: `Política de privacidad y protección de datos personales de ${SITE_NAME} (guiadepianos.com), responsable ${LEGAL_OWNER} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad y Protección de Datos"
      crumb="Política de privacidad"
      href="/politica-de-privacidad/"
      intro={`En ${SITE_NAME} respetamos tu privacidad y protegemos tus datos personales con total transparencia.`}
    >
      <h2>1. Responsable del Tratamiento de los Datos</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico para ejercicio de derechos:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Normativa Aplicable</h2>
      <p>
        Esta Política de Privacidad se adapta a la{" "}
        <strong>
          Ley N.º 29733 — Ley de Protección de Datos Personales del Perú
        </strong>{" "}
        y su Reglamento, así como a los estándares internacionales del{" "}
        <strong>Reglamento General de Protección de Datos (RGPD / GDPR)</strong>{" "}
        para visitantes europeos y la{" "}
        <strong>California Consumer Privacy Act (CCPA / CPRA)</strong> para
        usuarios residentes en los Estados Unidos.
      </p>

      <h2>3. Datos que Recopilamos y Finalidad</h2>
      <p>
        <strong>{SITE_NAME}</strong> es un portal de consulta abierta que no
        exige registro de cuenta para leer sus 600 guías. Únicamente tratamos
        los siguientes datos técnicos y voluntarios:
      </p>
      <ul>
        <li>
          <strong>Consultas en el Chat Online (Asesor de Pianos IA):</strong>{" "}
          cuando utilizas nuestro asistente interactivo para preguntar por un
          piano digital de 88 teclas, un teclado de 61 teclas o accesorios
          compatibles, se almacena un identificador anónimo de sesión (
          <code>gdp_visitor</code>), la URL desde donde consultas y el texto de
          tu pregunta en nuestra base de datos segura en Supabase con el único
          fin de responderte y mejorar las recomendaciones del portal.
        </li>
        <li>
          <strong>Comunicaciones por correo electrónico:</strong> si nos
          escribes a <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>,
          utilizaremos tu dirección de correo exclusivamente para responder a tu
          solicitud.
        </li>
        <li>
          <strong>Preferencia de tienda Amazon:</strong> guardamos en tu
          navegador (<code>localStorage</code>) si prefieres ver enlaces de{" "}
          <code>Amazon.com (US)</code> o <code>Amazon.es (ES)</code>.
        </li>
      </ul>

      <h2>4. Enlaces a Terceros (Amazon.com y Amazon.es)</h2>
      <p>
        Al hacer clic en cualquiera de nuestras tarjetas de productos hacia{" "}
        <code>Amazon.com</code> o <code>Amazon.es</code>, abandonas{" "}
        <strong>{SITE_NAME}</strong> y pasas a navegar bajo la política de
        privacidad y cookies de Amazon. No tenemos acceso a tus datos de pago,
        dirección de envío ni cuenta personal de Amazon.
      </p>

      <h2>5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso,
        rectificación, supresión, limitación u oposición enviando un correo
        electrónico a <strong>{LEGAL_OWNER}</strong> en{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> indicando en el
        asunto «Privacidad – GuiaDePianos.com».
      </p>
    </SimplePage>
  );
}
