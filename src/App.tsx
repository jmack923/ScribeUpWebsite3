import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Routes } from "./routes";
import { SiteNavbar } from "./components/navbar";
import { SiteFooter } from "./components/footer";
import { RevealInit } from "./components/reveal-init";
import { DemoModal } from "./components/demo-modal";

export default function App() {
  const location = useLocation();
  const firstPaintRef = React.useRef(true);

  React.useLayoutEffect(() => {
    // Pre-paint: prevent browser scroll restoration from landing users at the footer,
    // then "jumping" after effects run (common on refresh + Safari).
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {}

    // Pre-paint: always start routes at top (no smooth behavior to avoid scroll-linked conflicts).
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  React.useEffect(() => {
    // Ensure the "first paint" flag flips even when there's no route animation (initial={false}).
    firstPaintRef.current = false;
  }, []);

  React.useEffect(() => {
    // Re-init attribute-based reveal animations after route transitions.
    // Use a single debounced fire to avoid layout thrashing during mount.
    const fire = () => window.dispatchEvent(new Event("anm:refresh"));

    // Fire immediately for cached content, then once more after a beat for lazy loads.
    fire();
    const id = window.setTimeout(fire, 150);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  React.useEffect(() => {
    // Safari Reader mode can be toggled via ⌘⇧R and can look like a "summary card" overlay.
    // We can't control the browser UI, but we can prevent accidental toggles while users are on the site.
    try {
      const root = document.documentElement;
      const isSafari = root.classList.contains("is-safari");
      if (!isSafari) return;

      const onKeyDown = (e: KeyboardEvent) => {
        // Safari: Toggle Reader (⌘⇧R). Prevent so the site doesn't jump into Reader UI.
        if (e.metaKey && e.shiftKey && (e.key === "r" || e.key === "R")) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      window.addEventListener("keydown", onKeyDown, { capture: true });
      return () => window.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    } catch {
      return;
    }
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-[#f4f7ff] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.16),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.12),transparent_72%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 distance-grid opacity-[0.32] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]"
      />
      <RevealInit />
      <SiteNavbar />
      <DemoModal />
      {/* Build tag removed */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          // Don't hide the page on the very first paint (prevents footer "flash" on load).
          initial={
            firstPaintRef.current
              ? false
              : { opacity: 0, y: 12, scale: 0.995 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.995 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => {
            // Refresh reveals after route transition settles.
            window.dispatchEvent(new Event("anm:refresh"));
          }}
          className="flex-1"
        >
          <Routes />
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}