import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: `Contacto | ${SITE_NAME}`,
  description: `Ponte en contacto con ${LEGAL_OWNER} (${LEGAL_LOCATION}), titular de ${SITE_NAME}, en ${LEGAL_EMAIL} o consulta en vivo a nuestro Asesor de Pianos IA.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto Oficial"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes dudas sobre si elegir 61 u 88 teclas, qué pedal o soporte encaja con tu piano o deseas comunicarte con la dirección del portal?"
    >
      <h2>1. Datos de Contacto Directo</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico oficial:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>2. Respuesta Instantánea con Nuestro Asesor de Pianos IA</h2>
      <p>
        Si necesitas saber ahora mismo qué piano digital o teclado comprar según
        tu presupuesto y espacio en Amazon Estados Unidos, o qué pedal de
        sustain, soporte en Z, banco y audífonos son compatibles con tu Yamaha,
        Roland, Casio o Alesis, abre nuestro chat interactivo:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Pianos IA Ahora"
          prompt="Hola, quiero ayuda para elegir mi primer piano digital o teclado y saber qué pedal, soporte, banco y audífonos compatibles comprar en Amazon."
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
