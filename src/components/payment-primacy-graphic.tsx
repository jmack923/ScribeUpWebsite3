import React from "react";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

export type PaymentOverlayMode = "brands" | "signals";

type OverlayMark = {
  name: string;
  tone: string;
  icon?: string;
  emoji?: string;
};

const BRAND_MARKS: ReadonlyArray<OverlayMark> = [
  { name: "Netflix", icon: "simple-icons:netflix", tone: "text-red-500" },
  { name: "Geico", icon: "lucide:shield", tone: "text-emerald-600" },
  { name: "AT&T", icon: "simple-icons:atandt", tone: "text-sky-600" },
];

const SIGNAL_MARKS: ReadonlyArray<OverlayMark> = [
  { name: "Calendar", emoji: "📅", tone: "text-sky-600" },
  { name: "Savings", emoji: "💰", tone: "text-emerald-600" },
];

function MarkIcon({ mark }: { mark: OverlayMark }) {
  if (mark.emoji) {
    return <span className="text-[12px] leading-none">{mark.emoji}</span>;
  }
  if (mark.icon) {
    return <Icon icon={mark.icon} width={10} height={10} />;
  }
  return null;
}

function MarksRow({ marks }: { marks: ReadonlyArray<OverlayMark> }) {
  return (
    <motion.div
      className="mx-auto inline-flex items-center justify-center gap-2 flex-nowrap rounded-full border border-white/22 bg-white/58 backdrop-blur-[8px] px-2 py-1.5 shadow-[0_14px_34px_rgba(2,6,23,0.10)] [box-shadow:0_14px_34px_rgba(2,6,23,0.10),0_1px_0_rgba(255,255,255,0.22)_inset]"
      animate={prefersReducedMotion() ? { y: 0 } : { y: [0, -2, 0] }}
      transition={prefersReducedMotion() ? { duration: 0.2 } : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {marks.map((b) => (
        <div
          key={`mark-${b.name}`}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/70 border border-white/18 shadow-[0_10px_24px_rgba(2,6,23,0.08)]"
        >
          <div className={`h-4 w-4 shrink-0 rounded grid place-items-center ${b.tone}`}>
            <MarkIcon mark={b} />
          </div>
          <span className="text-[8px] font-semibold text-slate-700">{b.name}</span>
        </div>
      ))}
    </motion.div>
  );
}

function CardBase({
  className = "",
  variant = "before",
}: {
  className?: string;
  variant?: "before" | "after";
}) {
  const rm = prefersReducedMotion();
  return (
    <div
      className={`relative overflow-hidden rounded-[22px] ${variant === "after" ? "shadow-[0_8px_15px_rgba(2,6,23,0.22),0_30px_70px_rgba(2,6,23,0.3)]" : "shadow-[0_6px_10px_rgba(2,6,23,0.12),0_22px_48px_rgba(2,6,23,0.18)]"} ${className}`}
      style={{ aspectRatio: "1.586 / 1", width: "100%" }}
    >
      {/* metal surface */}
      <div className={`absolute inset-0 ${variant === "after" ? "bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#0f172a_100%)]" : "bg-[linear-gradient(135deg,#111827_0%,#1f2937_42%,#111827_100%)]"}`} />
      
      {/* brushed texture for 'after' card */}
      {variant === "after" && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* subtle diagonal grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 1px, transparent 1px, transparent 6px)",
        }}
      />
      {/* specular highlight sweep (premium metal feel) */}
      <motion.div
        aria-hidden="true"
        className={`absolute -inset-6 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,${variant === "after" ? "0.20" : "0.12"})_50%,transparent_62%)] opacity-80`}
        animate={
          rm || variant !== "after"
            ? { x: 0 }
            : { x: ["-55%", "55%"] }
        }
        transition={
          rm || variant !== "after"
            ? { duration: 0.2 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {/* top strip */}
      <div aria-hidden="true" className={`absolute top-0 left-0 right-0 h-10 ${variant === "after" ? "bg-black/40" : "bg-black/30"}`} />
      {/* chip (premium on AFTER, muted on BEFORE) */}
      <div
        className={`absolute top-6 left-4 w-8 h-6 rounded-[5px] ${
          variant === "after"
            ? "bg-[linear-gradient(135deg,#c9a227,#e8d48b_50%,#b8921f)]"
            : "bg-[linear-gradient(135deg,rgba(148,163,184,0.55),rgba(226,232,240,0.35),rgba(148,163,184,0.22))]"
        } shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_4px_rgba(0,0,0,0.18)]`}
      />
      <div className="absolute top-5 right-4 font-mono text-[13px] font-medium text-white/95 tracking-[0.18em] drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
        4521
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 pt-6">
        <div className={`text-[9px] uppercase tracking-[0.12em] ${variant === "after" ? "text-white/70 font-bold" : "text-white/50"}`}>Debit</div>
        <div className="text-[10px] text-white/60 mt-0.5 tracking-[0.12em]">•••• •••• ••••</div>
      </div>
      {/* inner edge + emboss */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,${variant === "after" ? "0.15" : "0.10"}),inset_0_-28px_60px_rgba(0,0,0,${variant === "after" ? "0.3" : "0.22"})]`} />
    </div>
  );
}

export function PaymentPrimacyGraphic({
  onOverlayModeChange,
}: {
  onOverlayModeChange?: (mode: PaymentOverlayMode) => void;
} = {}) {
  const rm = prefersReducedMotion();
  const [overlayMode, setOverlayMode] = React.useState<PaymentOverlayMode>("brands");
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const lastPt = React.useRef<{ x: number; y: number } | null>(null);

  const marks = overlayMode === "brands" ? BRAND_MARKS : SIGNAL_MARKS;

  // Mouse-parallax (no React rerenders)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 140, damping: 26, mass: 0.5 });
  const mySpring = useSpring(my, { stiffness: 140, damping: 26, mass: 0.5 });
  const tiltX = useTransform(mySpring, (v) => v * -6); // invert for natural tilt
  const tiltY = useTransform(mxSpring, (v) => v * 8);
  const driftX = useTransform(mxSpring, (v) => v * 10);
  const driftY = useTransform(mySpring, (v) => v * 6);
  // For the “after” card, mirror the parallax so the pair feels balanced.
  const afterTiltY = useTransform(tiltY, (v) => v * -1);
  const afterDriftX = useTransform(driftX, (v) => v * -1);

  const applyMove = React.useCallback(() => {
    rafRef.current = null;
    const el = wrapRef.current;
    const pt = lastPt.current;
    if (!el || !pt) return;
    const r = el.getBoundingClientRect();
    const px = r.width ? (pt.x - r.left) / r.width : 0.5;
    const py = r.height ? (pt.y - r.top) / r.height : 0.5;
    const nx = (px - 0.5) * 2; // -1..1
    const ny = (py - 0.5) * 2; // -1..1
    mx.set(nx);
    my.set(ny);
  }, [mx, my]);

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rm) return;
      lastPt.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(applyMove);
    },
    [applyMove, rm]
  );

  const onLeave = React.useCallback(() => {
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  React.useEffect(() => {
    if (rm) return;
    const t = window.setInterval(() => {
      setOverlayMode((m) => (m === "brands" ? "signals" : "brands"));
    }, 3600);
    return () => window.clearInterval(t);
  }, [rm]);

  React.useEffect(() => {
    onOverlayModeChange?.(overlayMode);
  }, [overlayMode, onOverlayModeChange]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-none mx-auto flex justify-center items-center px-4 sm:px-6 py-4 md:py-6"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* ambient lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute -left-10 top-8 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(238,242,255,0.95),transparent_68%)] blur-2xl" />
        <div className="absolute -right-8 bottom-4 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(240,253,250,0.80),transparent_70%)] blur-2xl" />
      </div>

      {/* Mobile: stacked. Desktop: side-by-side; keep sizes locked so overlayMode never “resizes” cards. */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* OLD: Card not made for bills */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Before</span>
          <motion.div
            className="relative w-[160px] sm:w-[180px] lg:w-[194px]"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, y: 10, rotateX: 6, rotateY: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 6, rotateY: -8 }}
            whileHover={{ rotateX: 4, rotateY: -10, y: -2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative"
              style={
                rm
                  ? undefined
                  : {
                      rotateX: tiltX,
                      rotateY: tiltY,
                      x: driftX,
                      y: driftY,
                    }
              }
              animate={rm ? { y: 0 } : { y: [0, -3, 0] }}
              transition={rm ? { duration: 0.2 } : { duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CardBase variant="before" className="opacity-[0.92] grayscale-[0.14]" />
            </motion.div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
              <div className="h-3 w-px border-l border-dashed border-slate-400/50" />
              <span className="text-[8px] text-slate-400 italic">Not built for bills</span>
            </div>
          </motion.div>
          <p className="mt-4 text-center text-[10px] text-slate-500 max-w-[120px] leading-relaxed">
            Just a card—no link to bill visibility
          </p>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center justify-center text-slate-400">
          <div className="relative h-14 w-[2px] md:h-[2px] md:w-16 overflow-hidden rounded-full bg-slate-200/70 shadow-[0_0_22px_rgba(30,162,255,0.14)]">
            {/* dual-tone gradient conduit: faint ends → powered blue center → faint ends */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-95"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.10) 22%, rgba(37,99,235,1) 50%, rgba(255,255,255,0.10) 78%, rgba(255,255,255,0.0))",
              }}
            />
            {/* subtle motion shimmer (keeps it feeling “alive” without dots) */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))",
                opacity: 0.55,
              }}
              animate={rm ? { opacity: 0.55 } : { x: ["-120%", "120%"] }}
              transition={rm ? { duration: 0.2 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-2 md:mt-0 md:ml-0 md:hidden h-0" />
          <div className="hidden md:flex items-center gap-2 mt-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.20),transparent_70%)] blur-[6px]" />
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[linear-gradient(135deg,rgba(37,99,235,1),rgba(30,162,255,0.78))] shadow-[0_0_15px_rgba(37,99,235,0.60),0_0_0_4px_rgba(37,99,235,0.14)]"></span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-600">Transformation</span>
          </div>
        </div>

        {/* NEW: Card made for on-file */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 mb-2">With ScribeUp</span>
          <div className="mb-3 h-10 flex items-center justify-center w-[160px] sm:w-[180px] lg:w-[194px]">
            <MarksRow marks={marks} />
          </div>
          <motion.div
            className="relative w-[160px] sm:w-[180px] lg:w-[194px]"
            style={{ perspective: 1200 }}
            initial={{ opacity: 0, y: 12, rotateX: 7, rotateY: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 7, rotateY: 10 }}
            whileHover={{ rotateX: 4, rotateY: 14, y: -3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* high-contrast “after” glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10">
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(closest-side,rgba(30,162,255,0.18),transparent_62%)] blur-[18px]" />
              <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(closest-side,rgba(16,185,129,0.10),transparent_66%)] blur-[22px]" />
            </div>

            <motion.div
              className="relative"
              style={
                rm
                  ? undefined
                  : {
                      rotateX: tiltX,
                      rotateY: afterTiltY,
                      x: afterDriftX,
                      y: driftY,
                    }
              }
            >
              <CardBase variant="after" />
              {/* frosted sheen panel */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_40%,rgba(255,255,255,0.0))] opacity-90" />
              {/* On file badge */}
              <motion.div
                className="absolute bottom-4 right-4 z-50 scale-[0.75] sm:scale-[0.8]"
                animate={rm ? { scale: 0.78 } : { scale: [0.75, 0.8, 0.75] }}
                transition={rm ? { duration: 0.2 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 border border-white/35 bg-[linear-gradient(180deg,rgba(16,185,129,0.32),rgba(16,185,129,0.18))] shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_0_0_1px_rgba(255,255,255,0.18),0_12px_28px_rgba(2,6,23,0.30),0_0_18px_rgba(16,185,129,0.28)] backdrop-blur-[10px] ring-1 ring-emerald-400/18">
                  <Icon icon="lucide:file-check" width={10} height={10} className="text-emerald-50 drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]" style={{ strokeWidth: 1.5 }} />
                  <span className="text-[7px] font-bold tracking-[0.12em] uppercase text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.4)] whitespace-nowrap">
                    On file
                  </span>
                </div>
              </motion.div>
            </motion.div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="h-2 w-px bg-emerald-400/50" />
              <span className="text-[8px] text-emerald-600 font-semibold">Made for bills</span>
            </div>
          </motion.div>
          <div className="mt-4 min-h-[32px] flex items-center justify-center">
            <p className="text-center text-[10px] text-slate-600 max-w-[140px] font-bold leading-relaxed">
              {overlayMode === "brands"
                ? "Built to be put on file—bills tracked in your app"
                : "Calendar sync + savings nudges—before the charge hits"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
