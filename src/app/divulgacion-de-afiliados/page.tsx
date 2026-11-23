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
  title: `Divulgación de Afiliados de Amazon | ${SITE_NAME}`,
  description: `Declaración de transparencia sobre enlaces de afiliado de Amazon Estados Unidos (${AMAZON_TAG_US}) y España (${AMAZON_TAG_ES}) en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionDeAfiliadosPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados de Amazon"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Transparencia total sobre cómo financiamos nuestras 600 guías gratuitas de pianos digitales, teclados y accesorios compatibles."
    >
      <h2>1. Declaración Oficial de Afiliación con Amazon</h2>
      <p>
        <strong>{SITE_NAME}</strong> (<code>guiadepianos.com</code>),
        titularidad de <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> (<a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        ), participa en el{" "}
        <strong>Programa de Afiliados de Amazon.com Associates</strong> (Estados
        Unidos y Global, con ID de rastreo oficial{" "}
        <code>{AMAZON_TAG_US}</code>) y en el{" "}
        <strong>Programa de Afiliados de Amazon EU</strong> (España, con ID de
        seguimiento oficial <code>{AMAZON_TAG_ES}</code>).
      </p>
      <p>
        <em>
          «En calidad de Afiliado de Amazon, GuiaDePianos.com obtiene ingresos
          por las compras adscritas que cumplen los requisitos aplicables.»
        </em>
      </p>

      <h2>2. ¿Te cuesta más caro comprar a través de nuestros enlaces?</h2>
      <p>
        <strong>No, nunca.</strong> El precio que pagas en{" "}
        <code>Amazon.com</code> o <code>Amazon.es</code> es exactamente el mismo
        (incluyendo ofertas Prime, cupones y descuentos del día) tanto si entras
        desde nuestras tarjetas de recomendación como si buscas el producto por
        tu cuenta. La pequeña comisión que sostiene este proyecto procede
        íntegramente del presupuesto publicitario de Amazon.
      </p>

      <h2>3. Independencia Editorial y Criterio de Recomendación</h2>
      <p>
        Nuestras recomendaciones de pianos digitales de 88 teclas y teclados de
        61/76 teclas (Yamaha, Roland, Casio, Kawai, Korg, Alesis, Donner), así
        como de pedales de sustain, soportes, bancos y audífonos compatibles se
        basan estrictamente en:
      </p>
      <ul>
        <li>
          La adecuación real al <strong>presupuesto</strong> y al{" "}
          <strong>espacio disponible en centímetros</strong> del lector.
        </li>
        <li>
          La <strong>sensación al tocar</strong> (acción de martillo graduado
          GHC, GHS, PHA-4, Smart Scaled, RHC o sensibilidad a la velocidad Touch
          Response).
        </li>
        <li>
          La <strong>compatibilidad técnica verificada</strong> (polaridad de
          pedal N.O./N.C., estabilidad de soporte en kilos, impedancia de
          audífonos en ohmios y conectores 1/4&quot; y USB-MIDI).
        </li>
      </ul>
    </SimplePage>
  );
}
