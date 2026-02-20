import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Link as RouteLink } from "react-router-dom";
import { ClientLogoCarousel } from "../../components/client-logo-carousel";
import { AppDemoPhoneVideo } from "../../components/app-demo-media";
import { ImpactGraph } from "../../components/impact-graph";
import { IPhoneStory } from "../../components/iphone-story";
import { CountUp } from "../../components/count-up";
import { PaymentPrimacyGraphic, type PaymentOverlayMode } from "../../components/payment-primacy-graphic";
import { PlatformPartnersCarousel } from "../../components/platform-partners-carousel";
import { EASE_OUT } from "../../lib/motion";
import { useDemoModal } from "../../components/demo-modal-context";

function WhyNowPopout() {
  const items = [
    {
      k: "Alert",
      t: "Mobile plan due in 2 days",
      d: "Calendar sync + smart nudge",
      dot: "bg-blue-600/70",
    },
    {
      k: "Insight",
      t: "Recurring spend detected",
      d: "Surface external subscriptions",
      dot: "bg-blue-600/70",
    },
    {
      k: "Action",
      t: "Move payment‑on‑file",
      d: "1‑click updater (card + ACH)",
      dot: "bg-sky-500/70",
    },
  ] as const;

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
    const t = window.setInterval(() => setIdx((v) => (v + 1) % items.length), 3400);
    return () => window.clearInterval(t);
  }, []);

  const cur = items[idx];
  return (
    <div aria-hidden="true" className="hidden xl:block mt-2 h-[84px]">
      <div className="mx-auto w-[min(520px,100%)] h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.k}
            className="w-full rounded-2xl border border-slate-200/60 bg-[linear-gradient(180deg,#ffffff,rgba(252,253,255,0.92))] backdrop-blur-md px-4 py-2.5 shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_54px_rgba(2,6,23,0.08)]"
            initial={{ opacity: 0, y: 10, scale: 0.993 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <span className={`h-2 w-2 rounded-full ${cur.dot}`} />
                {cur.k}
              </div>
              <span className="spec-chip !px-2 !py-1 !text-[10px] normal-case tracking-[0.02em] font-semibold text-slate-600">
                Auto‑cycles
              </span>
            </div>
            <div className="mt-1 text-sm font-semibold text-[var(--ink)]">{cur.t}</div>
            <div className="text-[12px] text-slate-600">{cur.d}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SegmentedCTA() {
  const [active, setActive] = React.useState<"fintechs" | "credit-unions" | "banks">("fintechs");

  const items = [
    { key: "fintechs" as const, label: "Fintechs", to: "/who-we-serve?tab=fintechs", icon: "lucide:cpu" },
    { key: "credit-unions" as const, label: "Credit Unions", to: "/who-we-serve?tab=credit-unions", icon: "lucide:landmark" },
    { key: "banks" as const, label: "Banks", to: "/who-we-serve?tab=banks", icon: "lucide:building-2" },
  ];

  const idx = Math.max(0, items.findIndex((i) => i.key === active));

  return (
    <div className="mx-auto inline-flex rounded-full p-[1px] bg-[linear-gradient(135deg,rgba(30,162,255,0.12),rgba(255,255,255,0.85),rgba(16,185,129,0.08))] shadow-[0_1px_2px_rgba(2,6,23,0.03),0_18px_60px_rgba(2,6,23,0.07)]">
      <div className="inline-flex rounded-full border border-slate-200/60 bg-[linear-gradient(180deg,#ffffff,rgba(252,253,255,0.88))] p-1.5 backdrop-blur-[12px]">
      <div className="relative grid grid-cols-3 min-w-[min(540px,92vw)]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 w-1/3 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,251,252,0.9))] shadow-[0_1px_2px_rgba(2,6,23,0.08),0_12px_32px_rgba(2,6,23,0.06)]"
          animate={{ x: `${idx * 100}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]" />
        {items.map((it) => (
          <RouteLink
            key={it.key}
            to={it.to}
            onClick={() => setActive(it.key)}
            onFocus={() => setActive(it.key)}
            aria-current={active === it.key ? "page" : undefined}
            className={`relative z-10 flex items-center justify-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-[-0.01em] focus:outline-none transition-colors ${
              active === it.key ? "text-[var(--ink)]" : "text-slate-600 hover:text-[var(--ink)]"
            }`}
          >
            <Icon
              icon={it.icon}
              width={16}
              height={16}
              className={active === it.key ? "text-blue-700/70" : "text-slate-500"}
              style={{ strokeWidth: 1.5 }}
            />
            <span className="whitespace-nowrap">{it.label}</span>
          </RouteLink>
        ))}
      </div>
      </div>
    </div>
  );
}

function MetricCount({ metric }: { metric: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!inView) return;
    setStarted(true);
  }, [inView]);

  const m = metric.match(/(\d+(?:\.\d+)?)(.*)/);
  const num = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const decimals = m?.[1]?.includes(".") ? m[1].split(".")[1]?.length ?? 0 : 0;

  return (
    <motion.span
      ref={ref}
      className="inline-flex items-baseline"
      initial={{ scale: 0.985 }}
      animate={started ? { scale: [0.985, 1.03, 1] } : { scale: 0.985 }}
      transition={started ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] } : { duration: 0.2 }}
    >
      {started ? (
        <CountUp to={num} decimals={decimals} suffix={suffix} duration={1150} easing="expo" />
      ) : (
        <>
          {"0"}
          {suffix}
        </>
      )}
    </motion.span>
  );
}

export default function Home() {
  const { openDemoModal } = useDemoModal();
  const reducedMotion = useReducedMotion();
  const [showHeroSignals, setShowHeroSignals] = React.useState(false);
  const [paymentOverlayMode, setPaymentOverlayMode] = React.useState<PaymentOverlayMode>("brands");
  const [paymentCopyIdx, setPaymentCopyIdx] = React.useState<0 | 1>(0);
  const [paymentCopyHover, setPaymentCopyHover] = React.useState(false);
  const [heroCursorVisible, setHeroCursorVisible] = React.useState(false);
  const [heroCursorPressed, setHeroCursorPressed] = React.useState(false);
  // Hero headline: typewriter cycle on the key noun (elite “living system” feel).
  const heroWordCycle = React.useMemo(() => ["epicenter", "HQ", "dashboard", "anchor"] as const, []);
  const [heroWordIdx, setHeroWordIdx] = React.useState(0);
  const [heroWordPos, setHeroWordPos] = React.useState(heroWordCycle[0].length);
  const [heroWordDel, setHeroWordDel] = React.useState(false);
  // Hero “orbit” overlays: staggered content swaps (different cadences) without positional jitter.
  const [heroOrbitSavedIdx, setHeroOrbitSavedIdx] = React.useState(0);
  const [heroOrbitMoneyIdx, setHeroOrbitMoneyIdx] = React.useState(1);
  const [heroOrbitCalIdx, setHeroOrbitCalIdx] = React.useState(2);
  const [heroOrbitRightIdx, setHeroOrbitRightIdx] = React.useState(0);
  const heroCursorX = useMotionValue(0);
  const heroCursorY = useMotionValue(0);
  const heroCursorLeft = useTransform(heroCursorX, (v) => v - 30);
  const heroCursorTop = useTransform(heroCursorY, (v) => v - 30);
  const heroElRef = React.useRef<HTMLElement | null>(null);
  const heroMoveRaf = React.useRef<number | null>(null);
  const heroLastPt = React.useRef<{ x: number; y: number } | null>(null);

  const heroMx = useMotionValue(0);
  const heroMy = useMotionValue(0);
  const heroMxSpring = useSpring(heroMx, { stiffness: 110, damping: 24, mass: 0.5 });
  const heroMySpring = useSpring(heroMy, { stiffness: 110, damping: 24, mass: 0.5 });
  const gridParallaxX = useTransform(heroMxSpring, (v) => v * 4);
  const gridParallaxY = useTransform(heroMySpring, (v) => v * 4);
  const glowParallaxX = useTransform(heroMxSpring, (v) => v * 10);
  const glowParallaxY = useTransform(heroMySpring, (v) => v * 8);
  const phoneParallaxX = useTransform(heroMxSpring, (v) => v * 6);
  const phoneParallaxY = useTransform(heroMySpring, (v) => v * 4);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (rm) {
      setHeroWordIdx(0);
      setHeroWordPos(heroWordCycle[0].length);
      setHeroWordDel(false);
      return;
    }
    const cur = heroWordCycle[heroWordIdx];
    const doneTyping = !heroWordDel && heroWordPos >= cur.length;
    const doneDeleting = heroWordDel && heroWordPos <= 0;
    const holdMs = doneTyping ? 1100 : doneDeleting ? 220 : 0;
    const speedMs = heroWordDel ? 46 : 58;

    const t = window.setTimeout(() => {
      if (doneTyping) {
        setHeroWordDel(true);
        return;
      }
      if (doneDeleting) {
        setHeroWordDel(false);
        setHeroWordIdx((v) => (v + 1) % heroWordCycle.length);
        return;
      }
      setHeroWordPos((v) => {
        const next = v + (heroWordDel ? -1 : 1);
        return Math.max(0, Math.min(cur.length, next));
      });
    }, Math.max(0, holdMs || speedMs));

    return () => window.clearTimeout(t);
  }, [heroWordIdx, heroWordPos, heroWordDel, heroWordCycle]);

  const heroOrbitSavedItems = React.useMemo(
    () =>
      [
        { k: "saved", icon: "lucide:badge-dollar-sign", text: "Saved $120 yearly", glow: "rgba(84,100,255,0.14)" },
        { k: "cancel", icon: "lucide:wand-2", text: "1‑click cancel", glow: "rgba(16,185,129,0.14)" },
        { k: "tracked", icon: "lucide:repeat-2", text: "Bills auto‑tracked", glow: "rgba(30,162,255,0.14)" },
      ] as const,
    [],
  );
  const heroOrbitMoneyItems = React.useMemo(
    () =>
      [
        { k: "coins", icon: "lucide:coins", tone: "text-emerald-700", glow: "rgba(16,185,129,0.14)" },
        { k: "card", icon: "lucide:credit-card", tone: "text-slate-700", glow: "rgba(15,23,42,0.10)" },
        { k: "receipt", icon: "lucide:receipt-text", tone: "text-blue-700", glow: "rgba(30,162,255,0.14)" },
        { k: "spark", icon: "lucide:sparkles", tone: "text-slate-700", glow: "rgba(84,100,255,0.12)" },
      ] as const,
    [],
  );
  const heroOrbitCalItems = React.useMemo(
    () =>
      [
        { k: "cal", icon: "lucide:calendar-check", tone: "text-blue-700", glow: "rgba(30,162,255,0.14)" },
        { k: "bell", icon: "lucide:bell", tone: "text-slate-700", glow: "rgba(15,23,42,0.08)" },
        { k: "check", icon: "lucide:badge-check", tone: "text-emerald-700", glow: "rgba(16,185,129,0.12)" },
      ] as const,
    [],
  );
  const heroOrbitRightItems = React.useMemo(
    () =>
      [
        { k: "sync", icon: "lucide:link-2", text: "Bills synced", glow: "rgba(30,162,255,0.14)" },
        { k: "nudge", icon: "lucide:bell-ring", text: "Smart nudges", glow: "rgba(84,100,255,0.12)" },
        { k: "move", icon: "lucide:arrow-left-right", text: "Move on‑file", glow: "rgba(16,185,129,0.12)" },
      ] as const,
    [],
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const rm = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (rm) return;
    const a = window.setInterval(() => setHeroOrbitSavedIdx((v) => (v + 1) % heroOrbitSavedItems.length), 5400);
    const b = window.setInterval(() => setHeroOrbitMoneyIdx((v) => (v + 1) % heroOrbitMoneyItems.length), 4100);
    const c = window.setInterval(() => setHeroOrbitCalIdx((v) => (v + 1) % heroOrbitCalItems.length), 5900);
    const d = window.setInterval(() => setHeroOrbitRightIdx((v) => (v + 1) % heroOrbitRightItems.length), 4700);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
      window.clearInterval(c);
      window.clearInterval(d);
    };
  }, [heroOrbitSavedItems.length, heroOrbitMoneyItems.length, heroOrbitCalItems.length, heroOrbitRightItems.length]);
  React.useEffect(() => {
    // Reveal the “Calendar signals” module only after the user starts scrolling a bit.
    // This keeps the hero cleaner on load and makes the module feel more intentional.
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setShowHeroSignals(true);
      return;
    }
    let raf = 0;
    let t: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        // Once visible, keep it visible (no “where did it go” when near the top).
        if (window.scrollY > 4) setShowHeroSignals(true);
      });
    };
    // No fallback reveal: this module should feel like a “scroll discovery,” not a hero headline competitor.
    // (Keeps it faint/intentional, and avoids covering the Trusted-by band on first paint.)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Some input methods can “feel like scroll” before scrollY moves much (trackpad/wheel on short pages).
    // Treat these as intent to reveal the module.
    const onIntent = () => setShowHeroSignals(true);
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchmove", onIntent, { passive: true } as any);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onIntent as any);
      window.removeEventListener("touchmove", onIntent as any);
      if (raf) window.cancelAnimationFrame(raf);
      if (t) window.clearTimeout(t);
    };
  }, []);

  // Payment Primacy copy: rotate the “long paragraph” so the section isn’t a wall of text.
  const paymentCopyRef = React.useRef<HTMLDivElement | null>(null);
  const paymentCopyInView = useInView(paymentCopyRef as any, { margin: "-35% 0px -45% 0px", once: false });
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;
    if (!paymentCopyInView) return;
    if (paymentCopyHover) return;
    const id = window.setInterval(() => {
      setPaymentCopyIdx((v) => (v === 0 ? 1 : 0));
    }, 9000);
    return () => window.clearInterval(id);
  }, [paymentCopyInView, paymentCopyHover]);

  const applyHeroMove = React.useCallback(() => {
    heroMoveRaf.current = null;
    const el = heroElRef.current;
    const pt = heroLastPt.current;
    if (!el || !pt) return;

    const rect = el.getBoundingClientRect();
    const localX = pt.x - rect.left;
    const localY = pt.y - rect.top;

    const px = rect.width ? localX / rect.width : 0.5;
    const py = rect.height ? localY / rect.height : 0.5;
    const nx = (px - 0.5) * 2;
    const ny = (py - 0.5) * 2;

    heroMx.set(nx);
    heroMy.set(ny);
    heroCursorX.set(localX);
    heroCursorY.set(localY);
  }, [heroCursorX, heroCursorY, heroMx, heroMy]);

  const onHeroMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    heroElRef.current = e.currentTarget;
    heroLastPt.current = { x: e.clientX, y: e.clientY };
    if (heroMoveRaf.current != null) return;
    heroMoveRaf.current = window.requestAnimationFrame(applyHeroMove);
  }, [applyHeroMove]);

  const onHeroMouseLeave = React.useCallback(() => {
    if (heroMoveRaf.current != null) {
      window.cancelAnimationFrame(heroMoveRaf.current);
      heroMoveRaf.current = null;
    }
    heroMx.set(0);
    heroMy.set(0);
    setHeroCursorVisible(false);
    setHeroCursorPressed(false);
  }, [heroMx, heroMy]);

  const heroSignals: ReadonlyArray<{
    day: number;
    name: string;
    price: string;
    icon: string;
    side: "left" | "right";
    biasX?: number;
    biasY?: number;
  }> = [
    // Positioning notes:
    // - Netflix: further left
    // - Spotify: right edge (70% out / 30% in). No top chip in this module.
    { day: 12, name: "Netflix", price: "$19.99", icon: "simple-icons:netflix", side: "left" as const, biasX: 12, biasY: 0 },
    { day: 16, name: "Spotify", price: "$9.99", icon: "simple-icons:spotify", side: "right" as const, biasX: 18, biasY: -8 },
  ];

  return (
    <div className="w-full page-shell">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        onMouseEnter={() => setHeroCursorVisible(true)}
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
        onMouseDown={() => setHeroCursorPressed(true)}
        onMouseUp={() => setHeroCursorPressed(false)}
      >
        {/* background effects */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-5" />
          <div className="absolute inset-0 hero-glow opacity-0" /> {/* removed hero glow for pure white */}
          {/* Removed right-side blob for cleaner look */}
          <motion.div
            aria-hidden="true"
            animate={reducedMotion ? { y: 0, x: 0 } : { y: [0, -16, 0], x: [0, 6, 0] }}
            transition={reducedMotion ? { duration: 0.2 } : { duration: 14, repeat: Infinity, ease: EASE_OUT }}
            className="absolute top-[6%] left-[52%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-400/1 via-sky-400/0 to-transparent opacity-40" 
          />
          <motion.div className="absolute inset-0" style={{ x: gridParallaxX, y: gridParallaxY }}>
            <div className="absolute inset-0 soft-grid opacity-[0.015]" />
          </motion.div>
        </div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-20 hidden lg:block rounded-full bg-[radial-gradient(circle,rgba(84,100,255,0.20),rgba(84,100,255,0.04)_58%,transparent_74%)] blur-[8px]"
          style={{
            left: heroCursorLeft,
            top: heroCursorTop,
            width: heroCursorPressed ? 74 : 60,
            height: heroCursorPressed ? 74 : 60,
            opacity: heroCursorVisible ? 0.32 : 0,
            scale: heroCursorPressed ? 1.05 : 1,
          }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        />

        <div className="container-page relative z-10 pt-[clamp(34px,4.8vw,74px)] pb-[clamp(34px,4.6vw,68px)] lg:pt-[clamp(40px,4.2vw,76px)] lg:pb-[clamp(42px,4.0vw,76px)]">
          {/* strict 1200px hero horizon: prevents any “left-smash” */}
          <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid lg:grid-cols-12 items-start lg:items-center gap-10 lg:gap-14 xl:gap-16 relative -translate-y-4 md:-translate-y-6 lg:-translate-y-7 xl:-translate-y-9">
            {/* LEFT COLUMN - Content */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="min-w-0 lg:col-span-6 lg:pt-0 xl:pt-0 lg:self-center flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* Constrained column (Atomic-style): keep the hero copy in a precise stacked lane */}
              <div className="max-w-[520px] mx-auto lg:mx-0">
              <h1 className="text-pretty max-w-[22ch] text-[clamp(2.18rem,4.35vw,3.75rem)] leading-[1.03] tracking-tighter font-semibold text-[var(--ink)]">
                Turn your banking app into the{" "}
                <span className="relative inline-flex items-baseline font-semibold text-blue-700 whitespace-nowrap">
                  <span className="relative inline-block min-w-[9.2ch]">
                    {heroWordCycle[heroWordIdx].slice(0, heroWordPos)}
                    <motion.span
                    aria-hidden="true"
                      className="absolute -right-[0.1em] top-[0.15em] bottom-[0.12em] w-[2px] bg-blue-600/90 rounded-full"
                      animate={reducedMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                      transition={reducedMotion ? { duration: 0.2 } : { duration: 0.9, repeat: Infinity, ease: "linear" }}
                  />
                  </span>
                </span>{" "}
                for a user&apos;s bills
              </h1>
              
              <p className="mt-4 text-slate-700 text-[13px] md:text-[15px] leading-[1.62] mx-auto lg:mx-0 px-4 md:px-0">
                Embed subscription management directly inside your digital experience. Help customers save money, stay in control, and give them a reason to make your app their financial home.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 items-center justify-center lg:justify-start hidden md:flex">
                <Button
                  color="primary"
                  variant="solid"
                  className="nav-btn-base nav-btn-primary btn-focus !rounded-[10px] !h-[30px] !px-3 elite-cta"
                  startContent={<Icon icon="lucide:calendar" width={15} height={15} style={{ strokeWidth: 1.5 }} />}
                  onClick={openDemoModal}
                >
                  Book a demo
                </Button>
              </div>

              <div className="mt-6 relative">
                {/* faint calendar / signal module (adds space + premium “alive” feel) */}
                <motion.div
                  aria-hidden="true"
                  className="mt-3 w-[min(300px,100%)] rounded-2xl border border-slate-200/40 bg-white/52 backdrop-blur-lg shadow-[0_1px_2px_rgba(2,6,23,0.02),0_16px_44px_rgba(2,6,23,0.04)] overflow-visible lg:mt-0 lg:absolute lg:left-[52px] xl:left-[64px] lg:top-[28px] lg:scale-[0.90] z-20 hidden md:block"
                  initial={{ opacity: 0, y: 14 }}
                  animate={
                    showHeroSignals
                      ? { opacity: 0.92, y: [0, -2, 0] }
                      : { opacity: 0, y: 14 }
                  }
                  transition={
                    showHeroSignals
                      ? { duration: 7.2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.25, ease: EASE_OUT }
                  }
                >
                  <div className="rounded-2xl overflow-visible">
                  <div className="px-3.5 py-2.5 border-b border-slate-200/70 flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Calendar signals</div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
                      Live
                    </div>
                  </div>
                  <div className="p-3.5 relative">
                    <div className="grid grid-cols-7 gap-1 text-[10px] text-slate-400">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div key={`${d}-${i}`} className="text-center">{d}</div>
                      ))}
                    </div>
                    <div className="relative mt-2 px-7">
                      <div className="relative z-10 grid grid-cols-7 gap-1">
                        {Array.from({ length: 21 }).map((_, i) => {
                          const day = i + 7;
                          const hot = heroSignals.some((s) => s.day === day);
                          const hasSig = heroSignals.some((s) => s.day === day);
                          return (
                            <div
                              key={day}
                              className={`relative h-6 rounded-lg border text-center text-[10px] leading-6 ${
                                hot
                                  ? "border-slate-200/70 bg-slate-900/[0.03] text-slate-700 font-semibold"
                                  : "border-slate-200/70 bg-white/60 text-slate-500"
                              }`}
                            >
                              {day}
                              {hasSig ? (
                                <span
                                  aria-hidden="true"
                                  className="absolute right-[6px] top-[7px] h-[6px] w-[6px] rounded-full bg-sky-500/70 shadow-[0_0_0_2px_rgba(255,255,255,0.82),0_10px_20px_rgba(2,6,23,0.10)]"
                                />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      {/* External signal chips (70% out / 30% in) with clean connectors */}
                      {showHeroSignals ? (
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
                          {heroSignals.map((s, i) => {
                            const CELL = 24;
                            const GAP = 4;
                            const PAD_X = 28;
                            const gridW = 7 * CELL + 6 * GAP;

                            const idx = s.day - 7;
                            const col = ((idx % 7) + 7) % 7;
                            const row = Math.floor(idx / 7);

                            const ax = PAD_X + col * (CELL + GAP) + CELL * 0.78;
                            const ay = row * (CELL + GAP) + CELL * 0.52;

                            const dir = s.side;
                            const isLeft = dir === "left";
                            const isRight = dir === "right";

                            // Chips live on the EDGE (never over dates): ~70% out / ~30% in.
                            const bx = s.biasX ?? 0;
                            const by = s.biasY ?? 0;
                            const OUT = 44;
                            const cx = (isLeft ? PAD_X - OUT : PAD_X + gridW + OUT) + bx;
                            const cy = ay + by;
                            const chipTransform = isLeft ? "translate(-60%,-50%)" : "translate(-30%,-50%)";

                            const lineLeft = Math.min(ax, cx) + (isLeft ? 18 : 6);
                            const lineRight = Math.max(ax, cx) - 14;
                            const lineStyle: React.CSSProperties = {
                              left: lineLeft,
                              top: ay,
                              width: Math.max(18, lineRight - lineLeft),
                              height: 1,
                            };

                            const arrowStyle: React.CSSProperties = isLeft
                              ? { left: cx + 18, top: ay, transform: "translateY(-50%) rotate(180deg)" }
                              : { left: cx - 18, top: ay, transform: "translateY(-50%) rotate(0deg)" };

                            return (
                              <motion.div
                                key={s.day}
                                className="absolute inset-0"
                                initial={{ opacity: 0, y: 6, x: isLeft ? -10 : 10 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE_OUT }}
                              >
                                {/* connector line (behind chips) */}
                                <span
                                  className="absolute bg-[linear-gradient(90deg,rgba(15,25,45,0.08),rgba(30,162,255,0.18))]"
                                  style={lineStyle}
                                />
                                {/* arrow head */}
                                <span className="absolute h-2 w-2" style={arrowStyle}>
                                  <span className="block h-2 w-2 border-r border-b border-slate-400/35 rotate-[-45deg]" />
                                </span>

                                {/* chip */}
                                <div className="absolute z-30" style={{ left: cx, top: cy, transform: chipTransform }}>
                                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/64 backdrop-blur-[8px] px-2.5 py-1.5 shadow-[0_14px_34px_rgba(2,6,23,0.12)] [box-shadow:0_14px_34px_rgba(2,6,23,0.12),0_1px_0_rgba(255,255,255,0.20)_inset]">
                                    <span className="h-6 w-6 rounded-full bg-white/82 border border-slate-200/80 grid place-items-center shadow-[0_1px_0_rgba(255,255,255,0.75)_inset]">
                                      <Icon icon={s.icon} width={12.5} height={12.5} className="text-slate-700/90" />
                                    </span>
                                    <span className="text-[10.5px] font-semibold text-slate-700 whitespace-nowrap">{s.name}</span>
                                    <span className="text-[10.5px] font-semibold text-[var(--ink)] font-mono whitespace-nowrap">{s.price}</span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon icon="lucide:bell-ring" width={14} height={14} className="text-slate-500" style={{ strokeWidth: 1.5 }} />
                        Nudges scheduled
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.10em] text-slate-500">CAL_SYNC</span>
                    </div>
                  </div>
                  </div>
                </motion.div>
              </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN - iPhone */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-0 w-full lg:col-span-6 flex justify-center lg:justify-end lg:pr-8 lg:pt-0 relative isolate"
            >
              {/* IMPORTANT: keep blurred stage layers OUT of the parallax-transformed element to avoid “pillar” raster artifacts */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-1/2 top-[70%] h-14 w-[72%] -translate-x-1/2 rounded-full shadow-[0_25px_60px_-30px_rgba(15,23,42,.25),0_90px_160px_-90px_rgba(15,23,42,.2)] opacity-80" />
                <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 h-[640px] w-[640px] rounded-full blur-[64px] opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1),transparent_60%)]" />
              </div>

              {/* IMPORTANT: keep this wrapper w-fit so orbit assets position relative to the PHONE,
                  not the full-width column (prevents “pushed way left” overlays). */}
              <motion.div style={{ x: phoneParallaxX, y: phoneParallaxY }} className="relative z-20 w-fit mx-auto lg:ml-auto lg:mr-0">
                <div className="relative inline-block">
                  {/* Rebuilt orbit cluster (anchored to phone bounds) */}
              <motion.div
                aria-hidden="true"
                    className="pointer-events-none absolute z-40 hidden lg:inline-flex items-center gap-2 rounded-full border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,255,255,0.58))] backdrop-blur-[8px] px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-[0_14px_34px_rgba(2,6,23,0.10)] [box-shadow:0_14px_34px_rgba(2,6,23,0.10),0_1px_0_rgba(255,255,255,0.24)_inset] -translate-y-1/2 min-w-[176px] justify-center right-full mr-6"
                    style={{ top: "80%" }}
                    animate={reducedMotion ? { y: 0 } : { y: [0, -8, 0] }}
                    transition={reducedMotion ? { duration: 0.2 } : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -inset-10 blur-2xl opacity-85"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${heroOrbitSavedItems[heroOrbitSavedIdx]?.glow ?? "rgba(84,100,255,0.14)"}, transparent 62%)`,
                      }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroOrbitSavedItems[heroOrbitSavedIdx]?.k ?? "saved"}
                        className="relative inline-flex items-center gap-2"
                        initial={{ opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                      >
                        <Icon icon={heroOrbitSavedItems[heroOrbitSavedIdx]?.icon ?? "lucide:badge-dollar-sign"} width={13} height={13} className="text-blue-600/75" />
                        <span>{heroOrbitSavedItems[heroOrbitSavedIdx]?.text ?? "Saved $120 yearly"}</span>
                      </motion.span>
                    </AnimatePresence>
              </motion.div>

              <motion.div
                aria-hidden="true"
                    className="pointer-events-none absolute z-40 hidden lg:grid h-10 w-10 place-items-center rounded-full border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.54))] backdrop-blur-[8px] shadow-[0_14px_34px_rgba(2,6,23,0.12)] [box-shadow:0_14px_34px_rgba(2,6,23,0.12),0_1px_0_rgba(255,255,255,0.24)_inset] -translate-y-1/2 right-full mr-3"
                    style={{ top: "54%" }}
                    animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
                    transition={reducedMotion ? { duration: 0.2 } : { duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                aria-hidden="true"
                      className="absolute -inset-10 blur-2xl opacity-90"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${heroOrbitMoneyItems[heroOrbitMoneyIdx]?.glow ?? "rgba(16,185,129,0.14)"}, transparent 62%)`,
                      }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroOrbitMoneyItems[heroOrbitMoneyIdx]?.k ?? "money"}
                        className="relative grid place-items-center"
                        initial={{ opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <Icon
                          icon={heroOrbitMoneyItems[heroOrbitMoneyIdx]?.icon ?? "lucide:coins"}
                          width={18}
                          height={18}
                          className={heroOrbitMoneyItems[heroOrbitMoneyIdx]?.tone ?? "text-emerald-700"}
                          style={{ strokeWidth: 1.6 }}
                        />
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                aria-hidden="true"
                    className="pointer-events-none absolute z-40 hidden lg:grid h-10 w-10 place-items-center rounded-full border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.54))] backdrop-blur-[8px] shadow-[0_14px_34px_rgba(2,6,23,0.12)] [box-shadow:0_14px_34px_rgba(2,6,23,0.12),0_1px_0_rgba(255,255,255,0.24)_inset] -translate-y-1/2 left-full ml-3"
                    style={{ top: "36%" }}
                    animate={reducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
                    transition={reducedMotion ? { duration: 0.2 } : { duration: 9.0, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -inset-10 blur-2xl opacity-90"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${heroOrbitCalItems[heroOrbitCalIdx]?.glow ?? "rgba(30,162,255,0.14)"}, transparent 62%)`,
                      }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroOrbitCalItems[heroOrbitCalIdx]?.k ?? "cal"}
                        className="relative grid place-items-center"
                        initial={{ opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      >
                        <Icon
                          icon={heroOrbitCalItems[heroOrbitCalIdx]?.icon ?? "lucide:calendar-check"}
                          width={18}
                          height={18}
                          className={heroOrbitCalItems[heroOrbitCalIdx]?.tone ?? "text-blue-700"}
                          style={{ strokeWidth: 1.6 }}
                        />
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>

                  {/* Right-side pill (adds Knot-style “balanced orbit”) */}
                  <motion.div
                aria-hidden="true"
                    className="pointer-events-none absolute z-40 hidden lg:inline-flex items-center gap-2 rounded-full border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(255,255,255,0.58))] backdrop-blur-[8px] px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-[0_14px_34px_rgba(2,6,23,0.10)] [box-shadow:0_14px_34px_rgba(2,6,23,0.10),0_1px_0_rgba(255,255,255,0.24)_inset] -translate-y-1/2 left-full ml-7"
                    style={{ top: "58%" }}
                    animate={reducedMotion ? { y: 0 } : { y: [0, 7, 0] }}
                    transition={reducedMotion ? { duration: 0.2 } : { duration: 7.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -inset-10 blur-2xl opacity-85"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${heroOrbitRightItems[heroOrbitRightIdx]?.glow ?? "rgba(30,162,255,0.14)"}, transparent 62%)`,
                      }}
                    />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroOrbitRightItems[heroOrbitRightIdx]?.k ?? "sync"}
                        className="relative inline-flex items-center gap-2"
                        initial={{ opacity: 0, y: 6, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                      >
                        <Icon icon={heroOrbitRightItems[heroOrbitRightIdx]?.icon ?? "lucide:link-2"} width={13} height={13} className="text-blue-600/80" style={{ strokeWidth: 1.6 }} />
                        <span>{heroOrbitRightItems[heroOrbitRightIdx]?.text ?? "Bills synced"}</span>
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>

              <motion.div
                    // 0° orientation + centered authority (Atomic/Knot benchmark)
                    className="relative z-20 origin-center rotate-[-0.75deg] -translate-x-[2px] lg:translate-y-[14px] xl:translate-y-[10px] transform-gpu"
                animate={reducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
              >
                    <AppDemoPhoneVideo startAt={0.15} frameClassName="w-auto mx-0 max-w-[304px] sm:max-w-[332px] lg:max-w-[360px]" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          </div>
        </div>

        {/* curve divider */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 right-0 w-full z-0"
          viewBox="0 0 1440 84"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C240,90 480,90 720,40 C960,-10 1200,-10 1440,40 L1440,84 L0,84 Z" fill="#ffffff" />
        </svg>
        {/* bottom fade to prevent any “phone leftovers” peeking into next band */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))]"
        />
      </section>

      {/* Banner: Trusted by + client logo carousel + ICP buttons */}
      <section id="trusted-by" data-reveal="section" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.03] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-[0.015] [mask-image:radial-gradient(65%_65%_at_50%_30%,black,transparent_70%)]" />
        <div className="container-page section-pad relative z-10">
          <div className="pb-16 lg:pb-[88px]">
          <div data-reveal-item style={{ ["--reveal-delay" as any]: "90ms" }} className="mt-2 md:mt-3">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4 md:gap-6">
              {/* Always hard-left (Atomic/Knot) */}
                <p className="text-left text-[11px] font-semibold text-slate-600 uppercase tracking-[0.20em] whitespace-nowrap">
                Trusted by:
              </p>
              <div className="min-w-0">
                <ClientLogoCarousel />
              </div>
            </div>
              <div className="mt-6 flex items-center justify-center md:justify-end">
                <p className="text-center md:text-right text-[13px] md:text-[14px] text-slate-500 max-w-2xl">
              and 30+ other financial institutions
            </p>
          </div>
            </div>
            <motion.div
              className="mt-16 md:mt-[72px] lg:mt-[84px]"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mx-auto max-w-[820px] rounded-[30px] p-[1px] bg-[linear-gradient(135deg,rgba(30,162,255,0.12),rgba(255,255,255,0.85),rgba(16,185,129,0.08))] shadow-[0_1px_2px_rgba(2,6,23,0.02),0_18px_70px_rgba(2,6,23,0.06)]">
                <div className="rounded-[30px] border border-slate-200/60 bg-[linear-gradient(180deg,#ffffff,rgba(248,250,252,0.82))] backdrop-blur-[8px] px-6 py-5 md:px-10 md:py-7">
                <p className="text-center mt-1 text-[11px] md:text-[12px] font-semibold text-slate-600 uppercase tracking-[0.16em]">
              Learn more for your segment
            </p>
                <div className="mt-4 flex justify-center">
              <SegmentedCTA />
                </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mini break + ROI highlight */}
          <div aria-hidden="true" className="h-10 md:h-14" />
          
          <motion.div
            id="roi"
            className="text-center mx-auto max-w-5xl relative px-4"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Visual Bridge: Centered S-Curve */}
            <div aria-hidden="true" className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none opacity-20">
              <svg width="40" height="100" viewBox="0 0 40 100" fill="none">
                <path d="M20 0 C 20 40, 0 60, 0 100" stroke="url(#roiBridgeGrad)" strokeWidth="2" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="roiBridgeGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="rgba(37,99,235,0)" />
                    <stop offset="0.5" stopColor="rgba(37,99,235,1)" />
                    <stop offset="1" stopColor="rgba(37,99,235,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <p className="section-kicker mx-auto inline-block mb-3">Performance outcomes</p>
            <h3 className="text-[24px] md:text-[30px] lg:text-[38px] font-extrabold tracking-[-0.04em] text-[#0F172A] leading-tight max-w-3xl mx-auto">
              Customers achieve <span className="text-blue-700">5x ROI</span> with modern bill management.
            </h3>
            <p className="mt-4 text-[14px] md:text-[15px] text-[#64748B] font-medium leading-relaxed max-w-2xl mx-auto text-balance">
              Drive measurable activation outcomes that reinforce your product as the primary financial home.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 md:mt-14 relative max-w-6xl mx-auto px-4 md:px-0"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            {/* Massive ultra-soft radial glow for the "stage" */}
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.032),transparent_70%)] blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch relative z-10">
              {[
                { metric: "6+", title: "Card Primacy", icon: "lucide:credit-card", detail: "additional monthly card swipes" },
                { metric: "5%+", title: "Deepen Engagement", icon: "lucide:trending-up", detail: "lift in user retention" },
                { metric: "11%", title: "Personalized Cross-Sell", icon: "lucide:target", detail: "conversion on cross-sell across products" },
              ].map((card, idx) => {
                const metricTone = idx === 0 ? "text-blue-700" : idx === 1 ? "text-emerald-700" : "text-indigo-700";
                const accent = idx === 0 ? "rgba(37,99,235,0.15)" : idx === 1 ? "rgba(16,185,129,0.15)" : "rgba(99,102,241,0.15)";
                const isCenter = idx === 1;
                
                // "Depth V" formation
                const lift = isCenter ? "md:-translate-y-8" : "";
                const scale = isCenter ? "scale-100" : "md:scale-[0.95]";
                const outerOpacity = isCenter ? 1 : 0.92;

                return (
                  <motion.div 
                    key={card.title} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
                    className={`relative group ${lift}`}
                    style={{ opacity: outerOpacity }}
                  >
                    {/* Shadow Ramp Container */}
                    <div
                      className={`h-full relative rounded-[28px] bg-white shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_60px_rgba(2,6,23,0.06)] overflow-hidden border border-slate-900/[0.07] ${scale} transform-gpu transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(2,6,23,0.05),0_28px_86px_rgba(2,6,23,0.10)] hover:border-slate-900/[0.10]`}
                    >
                      {/* calm highlight wash (less “template-y” than noise/sweep) */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(37,99,235,0.035),transparent_62%),radial-gradient(70%_60%_at_90%_10%,rgba(16,185,129,0.03),transparent_64%)] opacity-90"
                      />
                      {/* hover edge glow + sheen (opacity-only; stays smooth) */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100"
                        style={{
                          background:
                            `radial-gradient(80% 65% at 18% 0%, ${accent}, transparent 60%), radial-gradient(80% 65% at 90% 12%, rgba(15,23,42,0.06), transparent 62%)`,
                        }}
                      />

                      {/* Top-edge micro-gradient border */}
                      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

                      <div className="p-6 lg:p-[26px] flex flex-col h-full relative z-10">
                        <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-slate-50 border border-slate-100 mb-5 ${metricTone} transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]`}>
                          <Icon icon={card.icon} width={16} height={16} />
                        </div>
                        
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-2.5">
                          {card.title}
                        </div>
                        
                        <div className={`text-[30px] md:text-[34px] lg:text-[38px] font-extrabold tracking-[-0.04em] leading-none mb-3 ${metricTone} transition-colors duration-300`}>
                          <MetricCount metric={card.metric} />
                        </div>
                        
                        <p className="text-[13px] lg:text-[14px] text-[#64748B] leading-relaxed font-medium">
                          {card.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          {/* give the ROI cards a clean “landing” before the next section */}
          <div aria-hidden="true" className="h-10 md:h-14" />
        </motion.div>
        </div>
      </section>

      {/* clean page break (consistent separators) */}
      <div aria-hidden="true" className="page-break page-break--tight" />

      {/* User expectation - adopt or lose */}
      <section id="user-expectation" data-reveal="section" className="relative section-haze section-pad bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_68%)] blur-3xl opacity-40" />
          <div className="absolute -right-24 top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_70%)] blur-3xl opacity-40" />
          <div className="absolute inset-0 distance-grid opacity-[0.03] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
          <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-[0.02] [mask-image:radial-gradient(65%_65%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page">
          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-[120px] items-start">
            {/* full-gap bridge (desktop): gradient-stroked path spanning the entire column gap */}
            <motion.svg
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute left-0 right-0 top-[156px] xl:top-[166px] h-[96px] opacity-100"
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <defs>
                <linearGradient id="expectBridgeGrad" x1="0" y1="0" x2="1000" y2="0">
                  <stop offset="0%" stopColor="rgba(84,100,255,0)" />
                  <stop offset="44%" stopColor="rgba(30,162,255,0.85)" />
                  <stop offset="56%" stopColor="rgba(16,185,129,0.70)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                </linearGradient>
              </defs>
              {/* clean conduit across the luxury gutter (no “hump” shape) */}
              <path d="M450 58 L 550 58" stroke="rgba(30,162,255,0.12)" strokeWidth="14" strokeLinecap="round" />
              <motion.path
                d="M450 58 L 550 58"
                stroke="url(#expectBridgeGrad)"
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* subtle pulse pass (luxury conduit) */}
              <motion.path
                d="M450 58 L 550 58"
                stroke="url(#expectBridgeGrad)"
                strokeWidth="4.2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                animate={reducedMotion ? { opacity: 0.18 } : { opacity: [0.10, 0.55, 0.10] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* moving “data node” (fintech signal) */}
              <motion.circle
                r="5.5"
                cx="450"
                cy="58"
                fill="rgba(30,162,255,0.95)"
                initial={{ opacity: 0, cx: 450 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                animate={reducedMotion ? { cx: 500 } : { cx: [450, 550] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
              <motion.circle
                r="12"
                cx="450"
                cy="58"
                fill="rgba(30,162,255,0.12)"
                initial={{ opacity: 0, cx: 450 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                animate={reducedMotion ? { cx: 500 } : { cx: [450, 550] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              />
            </motion.svg>

            <div className="max-w-2xl lg:max-w-none">
              <p className="section-kicker tracking-[0.15em]">User expectation</p>
              <h2 className="mt-3 text-[clamp(1.35rem,2.05vw,1.92rem)] font-bold tracking-[-0.035em] text-[var(--ink)] leading-[1.14]">
                Your customers expect subscription management from their primary financial app
              </h2>
              <p className="mt-6 text-slate-700 text-[15px] md:text-[16px] leading-relaxed">
                Recurring bills are one of the biggest sources of financial frustration for consumers—and one of the biggest opportunities for banking apps.
              </p>
              {/* premium quote treatment (balances the stage so the left side doesn’t “end early”) */}
              <div className="mt-9 rounded-[24px] border border-slate-200/70 bg-white/62 backdrop-blur-lg shadow-[0_1px_2px_rgba(2,6,23,0.04),0_18px_54px_rgba(2,6,23,0.08)] px-6 py-5 relative overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] rounded-[24px]" />
                <div aria-hidden="true" className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_30%_20%,rgba(84,100,255,0.10),transparent_62%)] blur-3xl opacity-80" />
                <div aria-hidden="true" className="pointer-events-none absolute -top-5 -right-2 text-[92px] leading-none font-black text-slate-900/5 select-none">
                  &ldquo;
                </div>
                <p className="text-[12.5px] md:text-[13.5px] font-medium italic text-slate-700 leading-relaxed relative">
                <span className="text-blue-600/80">—</span> If your financial app cannot help customers manage their bills, someone else&apos;s will.
              </p>
              </div>
            </div>

            {/* Right (55%): premium panel (more hierarchy + more “fintech UI” detail) */}
            <motion.div
              className="relative rounded-[32px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(250,251,252,0.54))] backdrop-blur-lg shadow-[0_1px_2px_rgba(2,6,23,0.04),0_26px_86px_rgba(2,6,23,0.12)] p-4 md:p-6 overflow-hidden"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] rounded-[32px]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E')] bg-repeat" />
              <div aria-hidden="true" className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_80%_25%,rgba(238,242,255,0.95),transparent_60%)] blur-3xl opacity-75" />

              <div className="space-y-5">
                {/* Demand */}
                <div>
                  <div className="flex items-center justify-center lg:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[14px] border border-slate-200/70 bg-white/70 text-blue-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                        <Icon icon="lucide:trending-up" width={16} height={16} style={{ strokeWidth: 1.5 }} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600">Demand signals</p>
                    </div>
                      <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 hidden sm:inline-flex">Demand</span>
                  </div>

                  <div className="mt-3 grid gap-3">
                      <div className="w-full elite-card flex items-center justify-between gap-4 px-4 py-3.5 bg-white/78">
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,255,0.66))] text-blue-700 border border-slate-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                          <Icon icon="lucide:bar-chart-3" width={18} height={18} style={{ strokeWidth: 1.5 }} />
                    </span>
                    <div>
                          <span className="block text-[14.5px] font-bold text-[var(--ink)] tracking-[-0.02em]">Top 3</span>
                          <span className="text-[12.5px] font-medium text-slate-600 leading-snug">desired banking feature amongst US consumers</span>
                    </div>
                  </div>
                        <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">Consumers</span>
                    </div>

                      <div className="w-full elite-card flex items-center justify-between gap-4 px-4 py-3.5 bg-white/78">
                      <div className="flex items-center gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,255,0.66))] text-blue-700 border border-slate-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                          <Icon icon="lucide:users" width={18} height={18} style={{ strokeWidth: 1.5 }} />
                        </span>
                        <div>
                          <span className="block text-[14.5px] font-bold text-[var(--ink)] tracking-[-0.02em]">
                            <MetricCount metric="50%" />
                          </span>
                          <span className="text-[12.5px] font-medium text-slate-600 leading-snug">would switch primary financial apps for subscription management</span>
                        </div>
                      </div>
                        <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">
                        Gen Z + Millennials
                      </span>
                  </div>
                </div>
              </div>

                {/* clean internal bridge (replaces “random separator” feeling) */}
                <div className="relative py-2">
                  <div aria-hidden="true" className="elite-hairline opacity-[0.7]" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/70 backdrop-blur px-3">
                    We deliver
                  </span>
                </div>

                {/* Happiness */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[14px] border border-emerald-600/16 bg-emerald-600/8 text-emerald-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                        <Icon icon="lucide:smile-plus" width={16} height={16} style={{ strokeWidth: 1.5 }} />
                      </span>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600">User happiness</p>
                    </div>
                    <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">Outcomes</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="w-full elite-card elite-interactive hover:elite-interactive-hover px-3.5 py-3.5 bg-white/80">
                      <div className="text-[26px] font-bold tracking-[-0.04em] text-emerald-700">
                        <MetricCount metric="60%" />
                      </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700/80">Discover</div>
                    <div className="mt-1 text-[12px] text-slate-600 leading-snug">discover a recurring bill they didn&apos;t realize</div>
                  </div>
                    <div className="w-full elite-card elite-interactive hover:elite-interactive-hover px-3.5 py-3.5 bg-white/80">
                      <div className="text-[26px] font-bold tracking-[-0.04em] text-emerald-700">
                        <MetricCount metric="4.5+" />
                      </div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-emerald-700/80">Rating</div>
                    <div className="mt-1 text-[12px] text-slate-600 leading-snug">Average user rating</div>
                  </div>
                </div>

                <motion.div
                    className="mt-3.5 w-full elite-card elite-interactive hover:elite-interactive-hover px-4 py-4 bg-white/80 relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.24, ease: EASE_OUT }}
                >
                  {/* editorial quote mark + soft blue glow */}
                    <div aria-hidden="true" className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(37,99,235,0.20),transparent_66%)] blur-2xl opacity-90" />
                  <div aria-hidden="true" className="pointer-events-none absolute -top-4 -right-1 text-[76px] leading-none font-black text-slate-900/5 select-none">
                    &ldquo;
                  </div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600 relative">User anecdote</div>
                  <div className="mt-2 text-[17px] md:text-[18px] font-semibold text-[var(--ink)] leading-snug relative">
                    &ldquo;Caught subscriptions I didn&apos;t even know I had.&rdquo;
                  </div>
                  <p className="mt-1 text-[13px] text-slate-600 leading-[1.6] relative">
                    &ldquo;All my subscriptions in one place. This should be in every banking app.&rdquo;
                  </p>
                </motion.div>
              </div>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clear break before Complete control */}
      <div aria-hidden="true" className="page-break page-break--tight" />

      <IPhoneStory />

      {/* Empower your payment forms */}
      <section
        id="payment-primacy"
        data-reveal="section"
        className="relative section-haze section-pad bg-white overflow-hidden"
      >
        {/* ultra-soft “elite” backdrop blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_68%)] blur-3xl opacity-80" />
          <div className="absolute -right-24 bottom-[-160px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#F8FAFC,transparent_70%)] blur-3xl opacity-80" />
          <div className="absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(55%_55%_at_50%_18%,black,transparent_74%)]" />
        </div>
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div data-reveal-item className="min-w-0 max-w-[480px]">
              <p className="section-kicker">Payment primacy</p>
              <h2 className="mt-3 section-title max-w-[24ch] text-[clamp(1.75rem,2.6vw,2.6rem)] tracking-tighter leading-[1.08]">
                Empower your payment forms—bills tracked the moment they&apos;re on file
              </h2>
              <div className="mt-3 min-h-[32px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={paymentOverlayMode}
                    className="text-[12px] font-semibold tracking-[-0.01em] text-slate-600"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {paymentOverlayMode === "brands"
                      ? "Put it on file — bills tracked in your app."
                      : "Calendar sync + savings nudges — before the charge hits."}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div
                ref={paymentCopyRef as any}
                className="mt-5 min-h-[80px] flex items-start"
                onMouseEnter={() => setPaymentCopyHover(true)}
                onMouseLeave={() => setPaymentCopyHover(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={paymentCopyIdx}
                    className="text-slate-700 text-[14.5px] md:text-[16px] leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {paymentCopyIdx === 0 ? (
                      <>
                When customers pay recurring bills with your cards or accounts, ScribeUp automatically detects and tracks those bills inside your app. No redirects, no extra steps—your branded payment forms become the gateway to full bill visibility and control.
                      </>
                    ) : (
                      <>
                As we discover bills paid elsewhere, customers can move them to your card or account with one click and unlock the same experience. Control, clarity, and convenience reinforce your products as the default payment on file.
                      </>
                    )}
                  </motion.p>
                </AnimatePresence>
              </div>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                  <span className={`h-1.5 w-1.5 rounded-full ${paymentCopyIdx === 0 ? "bg-blue-600/65" : "bg-slate-300"}`} />
                  <span className={`h-1.5 w-1.5 rounded-full ${paymentCopyIdx === 1 ? "bg-emerald-600/60" : "bg-slate-300"}`} />
                  <span className="ml-1 text-slate-500/90">Auto‑cycles</span>
                </div>
              </div>
            <div data-reveal-item className="order-first lg:order-none min-w-0 flex justify-center lg:justify-end">
              {/* Important: keep the graphic constrained to the grid column width to prevent overlap */}
              <div className="w-full max-w-[680px] xl:max-w-[720px]">
                <div className="rounded-[24px] p-[1px] bg-[linear-gradient(135deg,rgba(30,162,255,0.12),rgba(255,255,255,0.85),rgba(30,162,255,0.10))] shadow-[0_18px_54px_rgba(2,6,23,0.14)] overflow-hidden">
                  <div className="relative overflow-visible">
                    {/* rounded glass panel (clips its own background only; content can overflow for “before half-out”) */}
                    <div className="absolute inset-0 rounded-[24px] bg-white/72 backdrop-blur-[8px] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] overflow-hidden" />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.024] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E')] bg-repeat"
                    />
                    <div className="relative rounded-[24px] px-6 sm:px-10 md:px-14 py-6 md:py-10">
                      <PaymentPrimacyGraphic onOverlayModeChange={setPaymentOverlayMode} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* breathing room: prevent Payment → Integration feeling “stacked” */}
      <div aria-hidden="true" className="page-break page-break--tight" />

      {/* Easily integrated into your experiences */}
      <section id="integration" data-reveal="section" className="relative section-haze section-pad bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_10%,rgba(30,162,255,0.03),transparent_70%),radial-gradient(55%_55%_at_86%_18%,rgba(15,25,45,0.03),transparent_74%)]" />
        <div className="container-page">
          <div data-reveal-item className="max-w-3xl">
            <p className="section-kicker">Integration</p>
            <h2 className="mt-3 section-title max-w-[24ch]">
              Easily integrated into your experiences
            </h2>
            <p className="mt-4 text-slate-700 text-[14.5px] md:text-[16px] leading-relaxed">
              ScribeUp is designed to flexibly integrate directly into your existing infrastructure. Typical implementation in 30 to 45 days.
            </p>
          </div>

          <div data-reveal-item className="mt-16 md:mt-20 relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 mb-4">
              Choose what fits your stack
            </p>
            {/* faint animated data-flow line: iFrame → SDK → API */}
            <div aria-hidden="true" className="pointer-events-none hidden md:block absolute left-1/2 top-[78px] -translate-x-1/2 w-full max-w-5xl h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(15,25,45,0.14),rgba(15,25,45,0.10),transparent)] opacity-80" />
              <motion.div
                className="absolute top-1/2 h-2 w-2 rounded-full bg-[linear-gradient(135deg,rgba(37,99,235,0.85),rgba(30,162,255,0.60))] shadow-[0_0_0_5px_rgba(15,25,45,0.06),0_18px_44px_rgba(2,6,23,0.10)] -translate-y-1/2"
                initial={{ left: "12%" }}
                animate={reducedMotion ? { left: "50%" } : { left: ["12%", "50%", "88%"] }}
                transition={reducedMotion ? { duration: 0.2 } : { duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
              {[
                {
                  icon: "lucide:code-2",
                  title: "Embeddable iframe",
                  description: "Add subscription management UI with a few lines of code.",
                },
                {
                  icon: "lucide:smartphone",
                  title: "Mobile-native SDK",
                  description: "Integrate natively into your app—indistinguishable from your broader experience.",
                },
                {
                  icon: "lucide:plug-zap",
                  title: "API-based",
                  description: "Nest bill management features like 1-click cancellation, 1-click payment updating, and recurrence detection throughout your app via API.",
                },
              ].map((tile, idx) => (
                <div
                  key={tile.title}
                  className={`relative h-full transition-transform duration-300 ${
                    idx === 1 ? "md:-translate-y-2 hover:md:-translate-y-3" : "hover:-translate-y-1"
                  }`}
                >
                  {/* gradient border shell */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[24px] p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.85),rgba(226,232,240,0.45),rgba(255,255,255,0.75))] shadow-[0_1px_2px_rgba(2,6,23,0.04),0_24px_86px_rgba(2,6,23,0.12)]"
                  />
                  <div
                    className={`group h-full rounded-[24px] border border-white/22 bg-[linear-gradient(180deg,#ffffff,rgba(250,251,252,0.65))] backdrop-blur-md p-8 md:p-9 hover:shadow-[0_1px_2px_rgba(2,6,23,0.05),0_34px_120px_rgba(2,6,23,0.14)] transition-[box-shadow,border-color] duration-300 relative overflow-hidden ${
                      idx === 1 ? "shadow-[0_1px_2px_rgba(2,6,23,0.05),0_30px_100px_rgba(2,6,23,0.14)]" : "shadow-[0_1px_2px_rgba(2,6,23,0.04),0_22px_64px_rgba(2,6,23,0.10)]"
                    }`}
                >
                  {/* faint dev-grid texture */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(60%_60%_at_50%_10%,black,transparent_70%)]" />
                  </div>
                    {/* subtle matte grain (3%) - IDE finish */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%22.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22180%22 height=%22180%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E')] bg-repeat" />
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_20%_0%,rgba(84,100,255,0.045),transparent_55%),radial-gradient(80%_70%_at_90%_20%,rgba(30,162,255,0.035),transparent_55%)] opacity-90" />
                    {/* precision top edge highlight */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" />

                    {/* duo-tone icon container (uniform 1.5pt stroke via global lucide normalization) */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(248,250,255,0.70))] text-slate-800 mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_14px_34px_rgba(2,6,23,0.10)] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_20px_52px_rgba(2,6,23,0.14)] transition-shadow">
                    <Icon
                      icon={tile.icon}
                      width={24}
                      height={24}
                      className="text-blue-700"
                      style={{ strokeWidth: 1.5 }}
                    />
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{tile.title}</div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{tile.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="partner-dock" data-reveal-item className="mt-16 md:mt-20 lg:mt-24">
            <div className="max-w-6xl mx-auto">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Pre-integrated into leading digital banking platforms
            </p>
              <div className="mt-5">
                <PlatformPartnersCarousel />
              </div>
            </div>
          </div>

          <div data-reveal-item className="mt-8 md:mt-10 max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4">
            <Button as={RouteLink as any} to="/solution" variant="solid" color="default" className="nav-btn-base nav-btn-secondary btn-sheen btn-focus !h-[36px] !px-5 elite-cta text-[13px] font-semibold">
              Learn More &mdash; Our Solution
            </Button>
            <Button color="primary" variant="solid" className="nav-btn-base nav-btn-primary btn-focus !h-[36px] !px-5 elite-cta text-[13px] font-semibold" startContent={<Icon icon="lucide:calendar" width={16} height={16} style={{ strokeWidth: 1.5 }} />} onClick={openDemoModal}>
              Book a demo
            </Button>
          </div>
        </div>
      </section>

      {/* breathing room: prevent Integration → Trust/Security from visually colliding */}
      <div aria-hidden="true" className="page-break page-break--tight" />

      {/* Bank-grade security & compliance */}
      <section id="trust-security" data-reveal="section" className="relative section-haze section-pad bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_10%,rgba(30,162,255,0.02),transparent_70%),radial-gradient(55%_55%_at_86%_18%,rgba(15,25,45,0.015),transparent_74%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_70%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 dot-grid opacity-[0.02] [mask-image:radial-gradient(70%_70%_at_50%_12%,black,transparent_72%)]" />
        <div className="container-page">
          <div data-reveal-item className="max-w-3xl mx-auto text-center">
            <p className="section-kicker mx-auto inline-block">Trust & security</p>
            <h2 className="mt-3 section-title max-w-[24ch] mx-auto">
              Bank‑grade security & compliance
            </h2>
            <p className="mt-4 text-slate-700 text-[14.5px] md:text-[16px] leading-relaxed mx-auto">
              ScribeUp meets the strictest standards for financial data handling and system security.
            </p>
          </div>

          <div data-reveal-item className="mt-7 max-w-6xl mx-auto">
            <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(15,25,45,0.14),rgba(255,255,255,0.55),rgba(15,25,45,0.10))] shadow-[0_1px_2px_rgba(2,6,23,0.05),0_26px_110px_rgba(2,6,23,0.12)]">
              <div className="vault-container p-5 md:p-6 relative overflow-hidden rounded-[32px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.90),rgba(250,251,252,0.72))] backdrop-blur-[8px]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(15,25,45,0.035),transparent_70%)]" />
                {/* subtle “scan” sweep */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-y-8 -left-24 w-40 bg-[linear-gradient(90deg,transparent,rgba(15,25,45,0.12),transparent)] blur-[1px] opacity-60"
                  animate={reducedMotion ? { opacity: 0 } : { x: ["-10%", "130%"] }}
                  transition={reducedMotion ? { duration: 0.2 } : { duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 items-stretch">
                  {[
                    { label: "SOC 2 Type II", status: "Certified", icon: "lucide:file-badge-2", tone: "emerald" },
                    { label: "PCI DSS Level 1", status: "Compliant", icon: "lucide:shield-check", tone: "blue" },
                    { label: "256-bit Encryption", status: "Standard", icon: "lucide:lock-keyhole", tone: "slate" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="group flex min-w-0 items-center gap-4 rounded-[20px] border border-slate-200/60 bg-white/60 px-5 py-4 shadow-[0_1px_2px_rgba(2,6,23,0.02)] transition-[transform,box-shadow,border-color,background-color] duration-300 hover:bg-white hover:border-slate-300/80 hover:shadow-[0_4px_12px_rgba(2,6,23,0.04),0_12px_24px_rgba(2,6,23,0.02)]"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border shadow-sm ${
                          b.tone === "emerald"
                            ? "bg-emerald-50/50 border-emerald-100 text-emerald-700"
                            : b.tone === "blue"
                              ? "bg-blue-50/50 border-blue-100 text-blue-700"
                              : "bg-slate-50/50 border-slate-200/60 text-slate-700"
                        }`}
                      >
                        <Icon icon={b.icon} width={20} height={20} style={{ strokeWidth: 1.5 }} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-bold text-slate-900 leading-tight">{b.label}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`h-1.5 w-1.5 rounded-full ${b.tone === "emerald" ? "bg-emerald-500" : b.tone === "blue" ? "bg-blue-500" : "bg-slate-400"}`} />
                          <div className="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wide">{b.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div data-reveal-item className="mt-8 flex justify-center">
            <Button
              as={RouteLink as any}
              to="/company"
              variant="light"
              className="group h-[34px] px-5 rounded-full border border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300 text-[13px] font-semibold text-slate-700 transition-all"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} className="text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />}
            >
              Visit Trust Center
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
