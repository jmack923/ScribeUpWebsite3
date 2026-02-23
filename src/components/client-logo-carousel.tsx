import React from "react";
import { motion, useInView } from "framer-motion";
import { useVisibility } from "../components/performance/VisibilityManager";

type ClientLogo = {
  name: string;
  src?: string;
  fallback: string;
  /** Optical normalization: scale down tall/heavy marks so they feel equal weight */
  scale?: number;
  /** Vertical nudge in px so the logo content is visually centered (negative = up, positive = down) */
  offsetY?: number;
  /** Horizontal spacing adjustment (margin-left/right in px) to align with other logos */
  spacingX?: number;
  /** Override left margin only (px) to tighten/loosen gap before this logo */
  marginLeft?: number;
};

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

// Logo files in public/assets/clients/ — credit unions first (alphabetical), then others.
// Scales normalized to a tight band (0.88–1.12) so no logo dominates; spacing is uniform.
const clients: ClientLogo[] = [
  { name: "Advia Credit Union", src: withBase("assets/clients/advia.png"), fallback: "Advia Credit Union", scale: 1.2 },
  { name: "Chartway Credit Union", src: withBase("assets/clients/chartway-transparent.png"), fallback: "Chartway Credit Union", scale: 1.52, spacingX: -10 },
  { name: "Service Credit Union", src: withBase("assets/clients/service-cu-transparent.png"), fallback: "Service Credit Union", scale: 1.06, offsetY: -5 },
  { name: "NerdWallet", src: withBase("assets/clients/nerdwallet.svg"), fallback: "NerdWallet", scale: 0.9 },
  { name: "DailyPay", src: withBase("assets/clients/dailypay-transparent.png"), fallback: "DailyPay", scale: 0.88 },
  { name: "Kudos", src: withBase("assets/clients/kudos.png"), fallback: "Kudos", scale: 1.1 },
  { name: "Super.com", src: withBase("assets/clients/super.png"), fallback: "Super.com", scale: 1 },
];

function ClientLogoItem({ item }: { item: ClientLogo }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const hasImage = !!item.src;

  return (
    <div
      className="relative inline-flex h-[52px] md:h-[60px] w-[160px] md:w-[180px] flex-shrink-0 items-center justify-center opacity-95 hover:opacity-100 transition-opacity duration-300 [align-self:center]"
      style={
        item.spacingX != null || item.marginLeft != null
          ? { marginLeft: item.marginLeft ?? item.spacingX, marginRight: item.spacingX }
          : undefined
      }
      aria-label={item.name}
      title={item.name}
    >
      {hasImage ? (
        <>
          <span
            className={`absolute inset-0 grid place-items-center text-[13px] md:text-[14px] font-semibold tracking-[-0.02em] text-slate-500 whitespace-nowrap transition-opacity duration-300 ${
              loaded && !failed ? "opacity-0" : "opacity-100"
            }`}
          >
            {item.fallback}
          </span>
          <img
            src={item.src}
            alt={item.name}
            className={`absolute inset-0 m-auto h-[40px] w-[120px] md:h-[44px] md:w-[140px] object-contain object-center transition-opacity duration-300 ${
              loaded && !failed ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: (() => {
                const parts: string[] = [];
                if (item.scale != null) parts.push(`scale(${item.scale})`);
                if (item.offsetY != null) parts.push(`translateY(${item.offsetY}px)`);
                return parts.length ? parts.join(" ") : undefined;
              })(),
              transformOrigin: "center center",
              filter: "saturate(1.02) contrast(1.02)",
              opacity: 1,
            }}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <span className="text-[13px] md:text-[14px] font-semibold tracking-[-0.02em] text-slate-600 whitespace-nowrap">
          {item.fallback}
        </span>
      )}
    </div>
  );
}

export function ClientLogoCarousel() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });
  const isVisible = useVisibility("client-carousel");
  const [start, setStart] = React.useState(false);
  React.useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setStart(true), 400);
    return () => window.clearTimeout(t);
  }, [inView]);

  // Duplicate 4x for seamless infinite scroll (Knot/Pinwheel style - feels like many more)
  const items = start ? [...clients, ...clients, ...clients, ...clients] : clients;

  return (
    <motion.div
      ref={ref}
      className="relative w-full py-5 md:py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-vis-id="client-carousel"
    >
      <div className="mask-fade-x-wide">
        <div
          className={`flex items-center gap-6 md:gap-8 pl-6 md:pl-8 ${start && isVisible ? "animate-client-marquee" : ""} will-change-transform`}
          style={{ width: "max-content", animationPlayState: isVisible ? "running" : "paused" }}
        >
          {items.map((item, idx) => (
            <ClientLogoItem key={`${item.name}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
