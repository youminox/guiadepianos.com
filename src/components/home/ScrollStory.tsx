"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "61 vs 88 teclas según tu espacio y presupuesto inicial",
    d: "Si tienes un escritorio de 95 cm o presupuesto menor a $200, un teclado de 61 teclas con sensibilidad al tacto (Yamaha PSR-E383 o Casio CT-S300) te permite empezar hoy. Si tienes 133 cm de ancho, un piano de 88 teclas te da el registro completo.",
  },
  {
    n: "02",
    t: "La sensación al tocar: acción de martillo graduado (GHC / PHA-4)",
    d: "Las 88 teclas contrapesadas (Yamaha P-145, Roland FP-10, Casio PX-S1100) oponen mayor resistencia en los graves y menor en los agudos mediante martillos físicos sin resortes, desarrollando la fuerza real de tus dedos.",
  },
  {
    n: "03",
    t: "Pedal de sustain con polaridad compatible, soporte en Z y banco",
    d: "Cambias el interruptor de plástico por un pedal metálico M-Audio SP-2 (con selector N.O./N.C. que evita que suene al revés) y montas el piano sobre un soporte en Z a 72 cm del suelo con un banco regulable para no chocar las rodillas.",
  },
  {
    n: "04",
    t: "Práctica nocturna silenciosa con audífonos 1/4\" y apps USB-MIDI",
    d: "Conectas unos audífonos de estudio de 47 Ω (Audio-Technica ATH-M20x con adaptador de 6.35 mm) para 0 ms de latencia de noche, y enlazas tu iPad por USB-MIDI o Bluetooth con Simply Piano, Flowkey o Smart Pianist.",
  },
];

/** Escena fijada con GSAP ScrollTrigger clonada de prunex1.com: muestra las 4 etapas para armar tu primer piano digital o teclado en casa. */
export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#B87A28", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".piano-key-press"),
            { y: 0 },
            { y: 10, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#5C3B0E", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".hammer-arm"),
            { rotate: -22, svgOrigin: "200 165", duration: 0.5 },
            1.15
          )
          .to(q(".sound-wave"), { opacity: 0.65, scaleX: 0.6, duration: 0.5 }, 1.25)
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#E5A93C", color: "#1e1206", duration: 0.2 },
            2
          )
          .to(
            q(".pedal-lever"),
            { rotate: 12, svgOrigin: "170 355", duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".stand-bars"), { opacity: 1, duration: 0.6 }, 2.4)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#B87A28", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-pianista"
      ref={root}
      className="relative bg-gradient-to-b from-white via-fxsky to-white"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">Progresión Real del Estudiante en Casa</span>
            <h2 className="section-title mt-3">
              Cuatro decisiones.{" "}
              <span className="text-prune">De tu primera tecla a tocar de noche con pedal y audífonos.</span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-drinklight to-prune" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#5c4b3e] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Regla de oro del estudio: coloca el teclado a 70–73 cm del suelo y
              usa siempre audífonos con cable de 32–63 Ω con adaptador de 1/4&quot;
              (nunca Bluetooth, cuya latencia de 180 ms retrasa cada nota).
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(70,45,15,0.25)]"
              role="img"
              aria-label="Animación interactiva de piano digital: teclas contrapesadas, martillo graduado, soporte en Z, pedal de sustain con interruptor de polaridad y audífonos"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#faf8f4" />
                  <stop offset="1" stopColor="#efe6d5" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#141312" />
                  <stop offset="0.65" stopColor="#211910" />
                  <stop offset="1" stopColor="#332009" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                {/* Mecanismo Interno de Martillo Graduado (GHC / PHA-4) */}
                <g className="hammer-arm">
                  <path
                    d="M125 165 L275 135"
                    stroke="#b87a28"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <circle cx="275" cy="135" r="16" fill="#e5a93c" />
                  <circle cx="200" cy="150" r="8" fill="#141312" stroke="#fef08a" strokeWidth="2.5" />
                  <text
                    x="200"
                    y="112"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10"
                    fill="#b87a28"
                  >
                    MARTILLO GRADUADO (GHC / PHA-4)
                  </text>
                </g>

                {/* Chasis del Piano Digital de 88 Teclas */}
                <rect
                  x="56"
                  y="196"
                  width="288"
                  height="64"
                  rx="12"
                  fill="#18181b"
                  stroke="#d4d4d8"
                  strokeWidth="2.5"
                />
                {/* Teclas blancas y negras */}
                <g className="piano-key-press">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                    <rect
                      key={k}
                      x={68 + k * 33}
                      y="212"
                      width="30"
                      height="42"
                      rx="3"
                      fill={k === 3 ? "#fef08a" : "#ffffff"}
                    />
                  ))}
                  {[0, 1, 3, 4, 5].map((k) => (
                    <rect
                      key={k}
                      x={89 + k * 33}
                      y="212"
                      width="18"
                      height="25"
                      rx="2"
                      fill="#141312"
                    />
                  ))}
                </g>

                {/* Onda Acústica Armónica */}
                <line
                  className="sound-wave"
                  x1="76"
                  y1="278"
                  x2="324"
                  y2="278"
                  stroke="#e5a93c"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.35"
                />

                {/* Soporte en Z Heavy Duty + Pedal de Sustain Metálico M-Audio SP-2 */}
                <g className="stand-bars" opacity="0.85">
                  <path
                    d="M90 260 L90 385 L310 385 L310 260"
                    fill="none"
                    stroke="#52525b"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Pedal de Sustain con Selector de Polaridad */}
                <g className="pedal-lever">
                  <rect
                    x="145"
                    y="355"
                    width="110"
                    height="24"
                    rx="7"
                    fill="#27272a"
                    stroke="#e5a93c"
                    strokeWidth="2"
                  />
                  <path
                    d="M170 355 L235 338"
                    stroke="#fef08a"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <text
                    x="200"
                    y="371"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="9.5"
                    fill="#fef08a"
                  >
                    PEDAL SP-2 (N.O. / N.C.)
                  </text>
                </g>

                {/* Badge Superior de Compatibilidad */}
                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(55 18)"
                >
                  <rect
                    width="290"
                    height="46"
                    rx="14"
                    fill="#ffffff"
                    stroke="#E5A93C"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="23" r="13" fill="#E5A93C" />
                  <text
                    x="24"
                    y="27"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#141312"
                  >
                    🎧
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#141312"
                  >
                    Audífonos 1/4&quot; (0 ms) + Pedal Polaridad
                  </text>
                  <text
                    x="44"
                    y="34"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#855216"
                  >
                    Soporte en Z 72 cm · USB-MIDI para Apps
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
