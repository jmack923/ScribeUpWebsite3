import React from "react";

type PlatformPartner = {
  name: string;
  slug: string;
  domain: string;
  localSrc?: string;
  /** Optical normalization so marks feel equal-weight in a dock */
  scale?: number;
};

function getPartnerAssetPath(filename: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  const basePath = base === "/" ? "" : base.replace(/\/$/, "");
  return `${basePath}/assets/partners/${filename}`;
}

const partners: PlatformPartner[] = [
  { name: "Q2", slug: "q2", domain: "q2.com", localSrc: getPartnerAssetPath("q2.svg"), scale: 0.9 },
  { name: "Alkami", slug: "alkami", domain: "alkami.com", localSrc: getPartnerAssetPath("alkami.svg"), scale: 0.9 },
  { name: "Lumin", slug: "lumin", domain: "lumindigital.com", localSrc: getPartnerAssetPath("lumin.svg") },
  { name: "Banno", slug: "banno", domain: "banno.com", localSrc: getPartnerAssetPath("banno.svg") },
  { name: "Candescent", slug: "candescent", domain: "candescent.com", localSrc: getPartnerAssetPath("candescent.svg") },
];

function PlatformPartnerLogo({ partner, isActive }: { partner: PlatformPartner; isActive?: boolean }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const logoSrc = partner.localSrc ?? `https://logo.clearbit.com/${partner.domain}`;
  const useImage = !failed;

  return (
    <div
      className={`relative flex h-14 min-w-0 items-center justify-center px-2 transition-[opacity,filter] duration-300 md:h-16 ${
        isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
      }`}
      aria-label={partner.name}
      title={partner.name}
    >
      {/* subtle “dock light” that moves logo-to-logo */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-2 left-2 right-2 rounded-2xl transition-opacity duration-500 ${
          isActive ? "opacity-100" : "opacity-0"
        } bg-[radial-gradient(60%_70%_at_50%_30%,rgba(30,162,255,0.10),transparent_70%)]`}
      />
      {useImage ? (
        <>
          <span
            className={`absolute inset-0 flex items-center justify-center text-[13px] md:text-[14px] font-semibold tracking-[-0.02em] text-slate-600 transition-opacity duration-300 ${
              loaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {partner.name}
          </span>
          <img
            src={logoSrc}
            alt={partner.name}
            className={`h-7 w-auto max-w-[120px] object-contain object-center transition-all duration-400 md:h-8 md:max-w-[140px] ${
              loaded ? (isActive ? "opacity-100 grayscale-0" : "opacity-90 grayscale-[0.22] hover:grayscale-0 hover:opacity-100") : "opacity-0 absolute"
            }`}
            style={partner.scale ? ({ transform: `scale(${partner.scale})` } as React.CSSProperties) : undefined}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <span className="text-[13px] md:text-[14px] font-semibold tracking-[-0.02em] text-slate-600">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export function PlatformPartnersBar({
  variant = "card",
  className,
}: {
  /** `card` renders a standalone floating dock. `embedded` renders only the dock contents (for wrapping inside another shell). */
  variant?: "card" | "embedded";
  className?: string;
}) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => {
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (rm) return;
    const t = window.setInterval(() => setActiveIdx((v) => (v + 1) % partners.length), 1400);
    return () => window.clearInterval(t);
  }, []);

  const Dock = (
    <div className={["relative", className ?? ""].join(" ")}>
      {/* soft “track” lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_20%_0%,rgba(255,255,255,0.65),transparent_58%),radial-gradient(55%_60%_at_86%_30%,rgba(84,100,255,0.06),transparent_66%)] opacity-70"
      />
      {/* “Dock”: normalized visual mass, consistent spacing */}
      <div className="relative grid grid-cols-3 sm:grid-cols-6 items-center gap-x-6 gap-y-4">
        {partners.map((partner, i) => (
          <div key={partner.slug} className="flex items-center justify-center">
            <PlatformPartnerLogo partner={partner} isActive={i === activeIdx} />
          </div>
        ))}
        <div className="flex h-14 items-center justify-center md:h-16">
          <span className="text-[12px] md:text-[13px] font-semibold tracking-[-0.01em] text-slate-500/80">& more</span>
        </div>
      </div>
    </div>
  );

  if (variant === "embedded") return Dock;

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-slate-200/60 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92),rgba(250,251,252,0.80))] px-4 py-4 md:px-5 md:py-5 shadow-[0_10px_22px_rgba(2,6,23,0.05),0_30px_90px_rgba(2,6,23,0.10)]">
      {Dock}
    </div>
  );
}
