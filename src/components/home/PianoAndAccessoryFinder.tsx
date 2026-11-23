"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type PianoTier = {
  key: string;
  label: string;
  budgetUsd: string;
  keyAction: string;
  dimensionsCm: string;
  compatibleGear: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
};

/**
 * Recomendador interactivo de Piano/Teclado (61 vs 88 teclas) + Verificador de Espacio en Habitación y Accesorios Compatibles (clonado de PriceBlock.tsx de prunex1.com).
 */
export default function PianoAndAccessoryFinder({
  options,
}: {
  options: PianoTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [spaceWidthCm, setSpaceWidthCm] = useState(140);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.YAMAHA_P145;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const spaceInches = Math.round(spaceWidthCm / 2.54);
  const fits88 = spaceWidthCm >= 133;
  const fitsSlim88 = spaceWidthCm >= 129;

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-drink/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de piano o teclado por teclas, presupuesto y espacio"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-fxbluedeep shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("—")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs">
                <p className="font-bold text-prune">
                  Presupuesto: {p.budgetUsd} · Tacto: {p.keyAction}
                </p>
                <p className="mt-0.5 font-semibold text-fxink">
                  Medidas: {p.dimensionsCm} · Compatibilidad: {p.compatibleGear}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-buy shine flex-1 text-sm"
              data-magnetic
            >
              🛒 Ver precio en {storeName} ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-sm">
              Leer reseña y accesorios →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#1d1711] via-[#0e0d0c] to-[#332009] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fxlime/15 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-fxlime">
          Calculadora de Espacio en Casa (61 vs 88 Teclas) y Compatibilidad
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Te cabe un piano de 88 teclas o te conviene uno de 61 teclas?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Desliza según el ancho libre (en centímetros / pulgadas) que tienes en
          tu pared o escritorio. Un piano de 88 teclas mide entre 128.4 cm
          (Roland FP-10) y 132.6 cm (Yamaha P-145); uno de 61 teclas mide ~93 cm.
        </p>
        <label
          htmlFor="space-width"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Ancho libre disponible en tu habitación o escritorio</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-fxlime">
            {spaceWidthCm} cm ({spaceInches}&quot;)
          </span>
        </label>
        <input
          id="space-width"
          type="range"
          min={85}
          max={175}
          step={5}
          value={spaceWidthCm}
          onChange={(e) => setSpaceWidthCm(Number(e.target.value))}
          className="mt-3 w-full accent-[#E5A93C]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>85 cm (Escritorio chico)</span>
          <span>115 cm (61/76 teclas)</span>
          <span>133 cm+ (88 teclas)</span>
          <span>175 cm (Sala amplia)</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            [
              "Tamaño que entra",
              fits88
                ? "88 Teclas (Todos)"
                : fitsSlim88
                ? "88 Compacto (FP-10)"
                : "61 / 76 Teclas",
            ],
            [
              "Fondo necesario",
              fits88 ? "23.2 a 29 cm" : "25.6 cm (Escritorio)",
            ],
            ["Pedal compatible", "M-Audio SP-2 (1/4\")"],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-fxlime/50 bg-fxlime/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-base text-fxlime sm:text-xl"
                    : "text-sm sm:text-lg"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/60">
          <span>
            {fits88
              ? "¡Excelente! Tienes espacio suficiente para un piano de 88 teclas contrapesadas con soporte en Z."
              : "Para tu espacio actual de menos de 128 cm, un teclado de 61 teclas (Yamaha PSR-E383 o Casio CT-S300) encaja sin estorbar."}
          </span>
          <OpenChatButton
            label="Armar mi setup completo con el Asesor IA"
            prompt={`Tengo ${spaceWidthCm} cm (${spaceInches} pulgadas) de espacio libre y me interesa el ${p.label} (${p.budgetUsd}). ¿Qué pedal de sustain, soporte, banco y audífonos compatibles me recomiendas en Amazon?`}
            className="text-fxlime font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
