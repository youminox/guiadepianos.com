/** SVG animado clonado de FiberGel.tsx de prunex1.com: muestra la respuesta dinámica y resonancia armónica de un piano digital (Acción de Martillo Graduado 88 Teclas + Triple Sensor + Polifonía y Pedal Damper). */
export default function KeyActionMechanismSvg() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 120,
      y2 = 210 + Math.sin(a) * 120;
    const mx = 200 + Math.cos(a + 0.5) * 80,
      my = 210 + Math.sin(a + 0.5) * 80;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Ilustración técnica animada: transferencia de energía desde la tecla contrapesada al martillo graduado, sensores de velocidad y resonancia con pedal de sustain"
      >
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#fef08a" />
            <stop offset="0.55" stopColor="#b87a28" />
            <stop offset="1" stopColor="#5c3b0e" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#e5a93c" stopOpacity="0.38" />
            <stop offset="1" stopColor="#b87a28" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle
          cx="200"
          cy="210"
          r="150"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeDasharray="3 7"
        />
        <circle
          cx="200"
          cy="210"
          r="105"
          fill="none"
          stroke="rgba(229,169,60,0.34)"
          strokeDasharray="5 5"
        />
        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke="#e5a93c"
            strokeOpacity="0.7"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <g filter="url(#fg-goo)">
          <circle className="gel-blob" cx="200" cy="210" r="46" fill="url(#fg-gel)" />
          <circle
            className="gel-blob"
            cx="178"
            cy="196"
            r="26"
            fill="#b87a28"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            className="gel-blob"
            cx="224"
            cy="226"
            r="24"
            fill="#855216"
            style={{ animationDelay: "0.9s" }}
          />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#fbbf24"
              style={{
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
                animationDelay: p.d,
              }}
            />
          ))}
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="11.5" fontWeight="700">
          <g transform="translate(8 38)">
            <rect
              width="162"
              height="26"
              rx="13"
              fill="rgba(229,169,60,0.18)"
              stroke="rgba(229,169,60,0.55)"
            />
            <text x="81" y="17" textAnchor="middle" fill="#fef08a">
              Martillo Graduado (88 Teclas)
            </text>
          </g>
          <g transform="translate(226 54)">
            <rect
              width="164"
              height="26"
              rx="13"
              fill="rgba(184,122,40,0.2)"
              stroke="rgba(184,122,40,0.6)"
            />
            <text x="82" y="17" textAnchor="middle" fill="#fde68a">
              61 Teclas Touch Response
            </text>
          </g>
          <g transform="translate(96 372)">
            <rect
              width="208"
              height="26"
              rx="13"
              fill="rgba(146,96,24,0.24)"
              stroke="rgba(245,158,11,0.6)"
            />
            <text x="104" y="17" textAnchor="middle" fill="#fef3c7">
              Pedal Sustain + Audífonos 1/4&quot; (0 ms)
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
