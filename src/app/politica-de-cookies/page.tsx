import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_ES, AMAZON_TAG_US } from "@/lib/amazon";

export const metadata: Metadata = {
  title: `Política de Cookies | ${SITE_NAME}`,
  description: `Información sobre el uso de cookies y almacenamiento local en ${SITE_NAME} (guiadepianos.com), titularidad de ${LEGAL_OWNER}.`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function PoliticaDeCookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies y Almacenamiento Local"
      crumb="Política de cookies"
      href="/politica-de-cookies/"
      intro={`Detalle técnico de los identificadores locales utilizados en ${SITE_NAME} para ofrecer una experiencia rápida y personalizada.`}
    >
      <h2>1. ¿Qué son las Cookies y el Almacenamiento Local?</h2>
      <p>
        Las cookies y las claves de almacenamiento local (
        <code>localStorage</code> / <code>sessionStorage</code>) son pequeños
        registros que tu navegador guarda en tu dispositivo para recordar tus
        preferencias entre páginas sin ralentizar la navegación.
      </p>

      <h2>2. Almacenamiento Local Utilizado en {SITE_NAME}</h2>
      <p>
        Nuestro portal está construido con arquitectura estática de alto
        rendimiento y utiliza únicamente las siguientes claves técnicas en tu
        navegador:
      </p>
      <ul>
        <li>
          <code>gdp_amazon_region</code>: recuerda si prefieres consultar los
          productos en <strong>Amazon Estados Unidos (US)</strong> o{" "}
          <strong>Amazon España (ES)</strong>.
        </li>
        <li>
          <code>gdp_visitor</code>: código aleatorio anónimo para mantener la
          continuidad de tu conversación con el Asesor de Pianos IA.
        </li>
        <li>
          <code>gdp_chat_session</code> y <code>gdp_chat_messages</code>:
          guardan el historial reciente de tu chat para que no pierdas las
          recomendaciones de pianos, teclados, pedales o audífonos al cambiar de
          guía.
        </li>
        <li>
          <code>gdp_chat_teaser</code> (<code>sessionStorage</code>): evita
          mostrar más de una vez por sesión el aviso flotante de bienvenida del
          chat.
        </li>
      </ul>

      <h2>3. Cookies de Terceros al Visitar Amazon</h2>
      <p>
        Cuando haces clic en un enlace de afiliado hacia{" "}
        <code>Amazon.com</code> (tag <code>{AMAZON_TAG_US}</code>) o{" "}
        <code>Amazon.es</code> (tag <code>{AMAZON_TAG_ES}</code>), Amazon
        establece sus propias cookies para reconocer que la visita procede de{" "}
        <strong>{SITE_NAME}</strong> y asignar la comisión correspondiente si
        realizas una compra elegible.
      </p>

      <h2>4. Cómo Borrar o Desactivar el Almacenamiento Local</h2>
      <p>
        Puedes borrar el historial del chat en cualquier momento pulsando el
        botón <strong>«Reiniciar»</strong> dentro del propio widget de chat, o
        eliminando los datos de navegación desde la configuración de tu
        navegador (Chrome, Safari, Firefox o Edge). Para cualquier consulta,
        contacta a <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION}) en{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
