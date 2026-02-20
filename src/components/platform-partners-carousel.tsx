import React from "react";
import { motion, useInView } from "framer-motion";
import { useVisibility } from "../components/performance/VisibilityManager";

type PartnerLogo = {
  name: string;
  src: string;
  fallback: string;
  /** Optical normalization so marks feel equal weight in a rail */
  scale?: number;
};

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

const partners: PartnerLogo[] = [
  { name: "Q2", src: withBase("assets/partners/q2.svg"), fallback: "Q2", scale: 0.92 },
  { name: "Alkami", src: withBase("assets/partners/alkami.svg"), fallback: "Alkami", scale: 0.92 },
  { name: "Lumin", src: withBase("assets/partners/lumin.svg"), fallback: "Lumin", scale: 0.94 },
  { name: "Banno", src: withBase("assets/partners/banno.svg"), fallback: "Banno", scale: 0.92 },
  { name: "Candescent", src: withBase("assets/partners/candescent.svg"), fallback: "Candescent", scale: 0.92 },
];

function PartnerLogoItem({ item }: { item: PartnerLogo }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className="relative inline-flex h-[46px] md:h-[52px] min-w-[160px] md:min-w-[190px] items-center justify-center px-8 opacity-90 hover:opacity-100 transition-all duration-300 shrink-0"
      aria-label={item.name}
      title={item.name}
    >
      <span
        className={`absolute inset-0 grid place-items-center text-[13px] md:text-[14px] font-semibold tracking-[-0.02em] text-slate-600 whitespace-nowrap transition-opacity duration-300 ${
          loaded && !failed ? "opacity-0" : "opacity-100"
        }`}
      >
        {item.fallback}
      </span>
      <img
        src={item.src}
        alt={item.name}
        className={`absolute inset-0 m-auto h-8 md:h-9 w-[92%] object-contain object-center transition-all duration-300 ${
          loaded && !failed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `scale(${item.scale ?? 0.92})`,
          filter: "saturate(1.04) contrast(1.02) brightness(0.98)",
          opacity: 0.98,
        }}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function PlatformPartnersCarousel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const isVisible = useVisibility("partners-carousel");
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setStart(true), 380);
    return () => window.clearTimeout(t);
  }, [inView]);

  const rm = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const items = start && !rm ? [...partners, ...partners, ...partners] : partners;

  return (
    <motion.div
      ref={ref}
      className="relative w-full py-2 md:py-3"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      data-vis-id="partners-carousel"
    >
      <div className="mask-fade-x-wide">
        <div 
          className={`flex items-center ${start && !rm && isVisible ? "animate-client-marquee" : ""} will-change-transform`} 
          style={{ width: "max-content", animationPlayState: isVisible ? "running" : "paused" }}
        >
          {items.map((item, idx) => (
            <PartnerLogoItem key={`${item.name}-${idx}`} item={item} />
          ))}
          {/* lightweight “& more” tail */}
          <div className="inline-flex items-center justify-center h-[46px] md:h-[52px] px-8 text-[12px] md:text-[13px] font-semibold text-slate-500/80 shrink-0">
            &amp; more
          </div>
        </div>
      </div>
    </motion.div>
  );
}


