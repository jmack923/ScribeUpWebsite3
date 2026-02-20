import * as React from "react";
import { useVisibility } from "./performance/VisibilityManager";
import { useInView } from "framer-motion";
import { PhoneFrame } from "./phone-demo/PhoneFrame";

export const APP_DEMO_VIDEO_SRC = "/video/scribeup-demo-bank.mp4";

function prefersReducedMotion() {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  } catch {
    return false;
  }
}

export function AppDemoPhoneVideo({
  src = APP_DEMO_VIDEO_SRC,
  startAt = 0,
  className,
  frameClassName,
}: {
  src?: string;
  startAt?: number;
  className?: string;
  frameClassName?: string;
}) {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);
  const inView = useInView(wrapRef, { margin: "-12% 0px -18% 0px", once: false });
  const isVisible = useVisibility("hero-demo-video");
  const rm = prefersReducedMotion();

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let retryTimer: number | null = null;
    let rafId: number | null = null;

    const shouldPlay = () => document.visibilityState === "visible" && !rm && inView && isVisible;

    const safePlay = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (v.paused) v.play().catch(() => {});
        rafId = null;
      });
    };

    const pause = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (!v.paused) v.pause();
      rafId = null;
    };

    // Handle visibility changes to pause when tab is hidden (save resources)
    const onVisChange = () => {
      if (document.visibilityState === "hidden") {
        pause();
      } else if (shouldPlay()) {
        safePlay();
      }
    };

    document.addEventListener("visibilitychange", onVisChange);

    // Initial play attempt (viewport-aware).
    if (shouldPlay()) {
      safePlay();
    } else {
      pause();
    }

    // Ensure we're roughly at the intended segment before we play.
    const seek = () => {
      if (!Number.isFinite(startAt) || startAt <= 0) return;
      try {
        if (v.currentTime < startAt) {
          v.currentTime = startAt;
        }
      } catch {}
    };
    if (v.readyState >= 1) seek();
    const onMeta = () => seek();
    v.addEventListener("loadedmetadata", onMeta);

    const onCanPlay = () => {
      if (shouldPlay()) {
        safePlay();
      }
    };
    v.addEventListener("canplay", onCanPlay);
    const onWaiting = () => {
      if (!shouldPlay()) return;
      if (retryTimer) window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => safePlay(), 150);
    };
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("stalled", onWaiting);
    
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("stalled", onWaiting);
      if (retryTimer) window.clearTimeout(retryTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [startAt, inView, isVisible, rm]);

  return (
    <div ref={wrapRef} className={className} data-vis-id="hero-demo-video">
      <PhoneFrame className={frameClassName}>
        {videoError ? (
          <div
            className="h-full w-full min-h-[280px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm"
            aria-hidden="true"
          >
            Demo video placeholder
          </div>
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover bg-gray-50"
            src={src}
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            // @ts-ignore - fetchpriority is valid in modern browsers
            fetchpriority="high"
            onError={() => setVideoError(true)}
            onLoadedData={(e) => {
              // Force play once data is loaded (resilience against browser autoplay policies/quirks)
              if (document.visibilityState === "visible" && !rm && inView && isVisible) {
                e.currentTarget.play().catch(() => {});
              }
            }}
            style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
          />
        )}
      </PhoneFrame>
    </div>
  );
}

export function AppDemoVideoStill({
  src = APP_DEMO_VIDEO_SRC,
  time = 0,
  className,
  roundedClassName = "rounded-2xl",
}: {
  src?: string;
  /** time offset (seconds) to freeze on */
  time?: number;
  className?: string;
  roundedClassName?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const apply = () => {
      try {
        if (Number.isFinite(time) && time > 0) v.currentTime = time;
      } catch {}
      // Freeze — this is “a screenshot from the video”, without needing a separate image pipeline.
      v.pause();
    };

    if (v.readyState >= 1) apply();
    v.addEventListener("loadedmetadata", apply);
    v.addEventListener("seeked", apply);
    return () => {
      v.removeEventListener("loadedmetadata", apply);
      v.removeEventListener("seeked", apply);
    };
  }, [time]);

  if (videoError) {
    return (
      <div
        className={`w-full h-full min-h-[120px] flex items-center justify-center bg-gray-100 text-gray-500 text-sm ${roundedClassName} ${className ?? ""}`}
        aria-hidden="true"
      >
        Video
      </div>
    );
  }
  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${roundedClassName} ${className ?? ""}`}
      src={src}
      muted
      playsInline
      preload="metadata"
      onError={() => setVideoError(true)}
    />
  );
}
