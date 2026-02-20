import React from "react";
import { motion, useInView } from "framer-motion";
import { useVisibility } from "../components/performance/VisibilityManager";

type ClientLogo = {
  name: string;
  src?: string;
  fallback: string;
  /** Optical normalization: scale down tall/heavy marks so they feel equal weight */
  scale?: number;
};

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

// Add logo files to public/assets/clients/ to use images; otherwise styled text is used
const clients: ClientLogo[] = [
  // Optical normalization: tuned so marks read with similar visual weight in a monochrome rail.
  { name: "NerdWallet", src: withBase("assets/clients/nerdwallet.svg"), fallback: "NerdWallet", scale: 0.92 },
  { name: "DailyPay", src: withBase("assets/clients/dailypay.svg"), fallback: "DailyPay", scale: 0.86 },
  { name: "Service Credit Union", src: withBase("assets/clients/service-cu.svg"), fallback: "Service Credit Union", scale: 0.84 },
  { name: "Kudos", src: withBase("assets/clients/kudos.svg"), fallback: "Kudos", scale: 0.86 },
  { name: "Super.com", src: withBase("assets/clients/super.svg"), fallback: "Super.com", scale: 0.86 },
  { name: "Chartway Credit Union", src: withBase("assets/clients/chartway.svg"), fallback: "Chartway Credit Union", scale: 0.80 },
];

function ClientLogoItem({ item }: { item: ClientLogo }) {
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const hasImage = !!item.src;

  return (
    <div
      className="relative inline-flex h-[52px] md:h-[60px] min-w-[185px] md:min-w-[220px] items-center justify-center px-9 opacity-90 hover:opacity-100 transition-all duration-300 shrink-0"
      aria-label={item.name}
      title={item.name}
    >
      {hasImage ? (
        <>
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
            className={`absolute inset-0 m-auto h-9 md:h-11 w-[92%] object-contain object-center transition-all duration-300 ${
              loaded && !failed ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `scale(${item.scale ?? 0.9})`,
              // Full‑color enterprise marks (Atomic/Knot “enterprise reality” feel)
              filter: "saturate(1.06) contrast(1.02) brightness(0.98)",
              opacity: 0.98,
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
          className={`flex items-center ${start && isVisible ? "animate-client-marquee" : ""} will-change-transform`}
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
