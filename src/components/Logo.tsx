import { useId } from "react";

/** Logotipo de GuiaDePianos.com: Teclas de Piano de Concierto + Cuerda Armónica Dorada */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B87A28" />
          <stop offset="0.55" stopColor="#141312" />
          <stop offset="1" stopColor="#5C3B0E" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#D99B26" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      {/* Marco dorado armónico */}
      <rect
        x="11"
        y="16"
        width="42"
        height="32"
        rx="5"
        fill="#FFFFFF"
        stroke={`url(#${id}gold)`}
        strokeWidth="2.5"
      />
      {/* Divisiones de teclas blancas */}
      <line x1="21.5" y1="16" x2="21.5" y2="48" stroke="#D6CFC2" strokeWidth="1.8" />
      <line x1="32" y1="16" x2="32" y2="48" stroke="#D6CFC2" strokeWidth="1.8" />
      <line x1="42.5" y1="16" x2="42.5" y2="48" stroke="#D6CFC2" strokeWidth="1.8" />
      {/* Teclas negras de ébano */}
      <rect x="17.5" y="16" width="7" height="19" rx="1.5" fill="#141312" />
      <rect x="28.5" y="16" width="7" height="19" rx="1.5" fill="#141312" />
      <rect x="39.5" y="16" width="7" height="19" rx="1.5" fill="#141312" />
      {/* Onda acústica superior */}
      <path
        d="M16 11 Q32 5 48 11"
        stroke="#FEF08A"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        GuíaDe<span className={dark ? "text-fxlime" : "text-fxblue"}>Pianos</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
