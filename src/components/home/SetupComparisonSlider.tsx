"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Escena arrastrable Antes ↔ Después clonada de DayNightSlider.tsx de prunex1.com: Teclado Compacto de 61 Teclas en Escritorio (93 cm · <$200) vs Piano Digital de 88 Teclas Contrapesadas con Soporte en Z, Banco, Pedal y Audífonos (132 cm · Estudio Completo). */
export default function SetupComparisonSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const pro = clamp((t - 0.45) / 0.45);
  const full88 = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Opción A · Teclado 61 Teclas Sensible al Tacto (Escritorio)"
      : t < 0.68
      ? "Transición · Comparando Espacio (93 cm vs 132 cm) y Tacto"
      : "Opción B · Piano Digital 88 Teclas Contrapesadas + Setup Completo";

  const keyReading = t < 0.45 ? "61 Teclas · 93 cm" : "88 Teclas · 132 cm";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#0e0d0c] shadow-[0_40px_80px_-40px_rgba(30,20,5,0.7)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId))
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8e0d2" />
              <stop offset="1" stopColor="#faf8f4" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6e4212" />
              <stop offset="0.55" stopColor="#b87a28" />
              <stop offset="1" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e0d0c" />
              <stop offset="0.7" stopColor="#1e160d" />
              <stop offset="1" stopColor="#332009" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#e5a93c" stopOpacity="0.45" />
              <stop offset="1" stopColor="#b87a28" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={pro} />

          {/* Luz de estudio cálida */}
          <circle cx="400" cy="230" r="240" fill="url(#dn-lamp)" opacity={pro} />

          {/* Suelo de habitación */}
          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={pro > 0.5 ? "#181512" : "#d8ccb8"}
          />

          {/* Soporte: Escritorio compacto vs Soporte en Z de acero */}
          {pro < 0.5 ? (
            <g>
              <rect x="210" y="255" width="380" height="14" rx="4" fill="#8b5a2b" />
              <rect x="235" y="269" width="12" height="96" fill="#71717a" />
              <rect x="553" y="269" width="12" height="96" fill="#71717a" />
            </g>
          ) : (
            <g opacity={full88}>
              {/* Soporte en Z Heavy Duty */}
              <path
                d="M150 255 L150 365 M650 255 L650 365 M150 310 L650 265"
                stroke="#e5a93c"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Pedal Metálico M-Audio SP-2 en el centro del suelo */}
              <rect x="360" y="346" width="80" height="19" rx="5" fill="#27272a" stroke="#fef08a" strokeWidth="2" />
              <path d="M380 346 L425 334" stroke="#fef08a" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}

          {/* Chasis del instrumento: 61 teclas (380px ancho) vs 88 teclas (560px ancho) */}
          <rect
            x={pro > 0.5 ? 120 : 210}
            y="198"
            width={pro > 0.5 ? 560 : 380}
            height="58"
            rx="10"
            fill="#141312"
            stroke={pro > 0.5 ? "#e5a93c" : "#52525b"}
            strokeWidth="3"
          />

          {/* Teclas blancas y negras */}
          {Array.from({ length: pro > 0.5 ? 20 : 13 }).map((_, idx) => {
            const startX = pro > 0.5 ? 134 : 224;
            const kw = 26;
            return (
              <g key={idx}>
                <rect
                  x={startX + idx * 27}
                  y="214"
                  width={kw - 2}
                  height="36"
                  rx="2"
                  fill="#ffffff"
                />
                {idx % 7 !== 2 && idx % 7 !== 6 && (
                  <rect
                    x={startX + idx * 27 + 16}
                    y="214"
                    width="13"
                    height="22"
                    rx="1.5"
                    fill="#141312"
                  />
                )}
              </g>
            );
          })}

          {/* Caja de lectura inferior */}
          <rect
            x="210"
            y="314"
            width="380"
            height="32"
            rx="10"
            fill="#141312"
            stroke="#e5a93c"
            strokeWidth="2"
          />
          <text
            x="400"
            y="335"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12.5"
            fill="#fef08a"
          >
            {pro > 0.5
              ? "88 Teclas Contrapesadas (GHC/PHA-4) + Pedal SP-2 + Audífonos 1/4\""
              : "61 Teclas Sensibles al Tacto (3.3–4.4 kg) · Cabe en cualquier escritorio"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/40 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
            {keyReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/40 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fxlime">
            {pro > 0.5 ? "Sensación de Piano Acústico Real" : "Portabilidad y Presupuesto Accesible"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {pro > 0.5
              ? "Yamaha P-145 / Roland FP-10 / Casio PX-S1100 (~$499–$599)"
              : "Yamaha PSR-E383 / Casio CT-S300 (~$159–$199 en Amazon)"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Teclado 61 Teclas vs Piano 88 Teclas Contrapesadas →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#0e0d0c] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">🎒 61 Teclas (93 cm)</span>
        <label className="sr-only" htmlFor="dn-range">
          Comparador de espacio y teclas 61 vs 88
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${keyReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-fxlime">🎹 88 Teclas (132 cm)</span>
      </div>
    </div>
  );
}
