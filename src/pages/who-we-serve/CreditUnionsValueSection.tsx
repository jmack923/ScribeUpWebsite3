import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { PhoneFrame } from "../../components/phone-demo/PhoneFrame";
import type { SegmentMetric } from "./segment-data";

const VALUE_DEMO_VIDEOS = [
  "/assets/complete-control/find.mp4",
  "/assets/complete-control/track.mp4",
  "/assets/complete-control/control.mp4",
] as const;
// Metric order: Primacy, Retention, Refinancing → show control, track, find (Credit Unions)
const DEFAULT_VIDEO_INDEX_FOR_METRIC: [number, number, number] = [2, 1, 0];

export function CreditUnionsValueSection({
  metrics,
  openDemoModal,
  videoIndexForMetric,
}: {
  metrics: SegmentMetric[];
  openDemoModal?: () => void;
  /** Optional map from metric index to video index; used for Banks (Refinancing, Retention, Primacy). */
  videoIndexForMetric?: [number, number, number];
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const videoRefs = React.useRef<Array<HTMLVideoElement | null>>([]);

  const map = videoIndexForMetric ?? DEFAULT_VIDEO_INDEX_FOR_METRIC;
  const items = metrics.slice(0, 3);
  const progressPct = items.length > 0 ? ((activeIndex + 1) / items.length) * 100 : 0;
  const videoIndex = map[activeIndex] ?? 0;

  // Play the active video when selection changes
  React.useEffect(() => {
    const video = videoRefs.current[videoIndex];
    if (video) requestAnimationFrame(() => video.play().catch(() => {}));
  }, [videoIndex]);

  return (
    <div className="grid lg:grid-cols-[1fr_1.12fr] gap-8 lg:gap-12 items-center lg:py-12">
      {/* Left: value toggle cards */}
      <div className="relative py-10 lg:py-0">
        <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-slate-200/75" />
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-2 w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(84,100,255,0.0),rgba(30,162,255,0.85),rgba(16,185,129,0.55))] shadow-[0_0_0_6px_rgba(30,162,255,0.06)]"
          initial={false}
          animate={{ height: `calc(${progressPct}% - 8px)`, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="space-y-3 ml-4">
          {items.map((m, idx) => {
            const active = idx === activeIndex;
            const hovered = idx === hoverIndex;
            return (
              <article
                key={m.label}
                role="button"
                tabIndex={0}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setActiveIndex(idx)}
                onFocus={() => setHoverIndex(idx)}
                onBlur={() => setHoverIndex(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                className={`relative isolate rounded-[22px] p-[1px] transition-all duration-200 cursor-pointer max-w-[620px] ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(15,25,45,0.08),rgba(84,100,255,0.12),rgba(30,162,255,0.08)] shadow-[0_10px_30px_rgba(2,6,23,0.04)]"
                    : hovered
                      ? "bg-[linear-gradient(135deg,rgba(15,25,45,0.06),rgba(84,100,255,0.06),rgba(30,162,255,0.05)]"
                      : "bg-transparent hover:bg-[linear-gradient(135deg,rgba(15,25,45,0.04),rgba(84,100,255,0.04),rgba(30,162,255,0.03)]"
                }`}
              >
                <div
                  className={`rounded-[22px] pl-4 pr-4 py-4 border transition-all min-h-[100px] relative overflow-hidden ${
                    active
                      ? "border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(2,6,23,0.03),0_14px_36px_rgba(2,6,23,0.05)]"
                      : hovered
                        ? "border-slate-200/60 bg-white/92 shadow-[0_1px_2px_rgba(2,6,23,0.02),0_12px_30px_rgba(2,6,23,0.04)]"
                        : "border-transparent bg-white/84 hover:bg-white/92 hover:border-slate-200/60"
                  }`}
                >
                  {active ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-[22px] bg-[radial-gradient(80%_80%_at_25%_20%,rgba(84,100,255,0.07),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,255,255,0.90))]"
                    />
                  ) : null}
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-2xl md:text-3xl font-bold tracking-tighter text-primary">
                        {m.value}
                      </div>
                      <div className={`mt-1 text-[13.5px] font-semibold tracking-tight ${active ? "text-[var(--ink)]" : "text-slate-700"}`}>
                        {m.label}
                      </div>
                      <p className="mt-1.5 text-[12px] text-slate-600 max-w-prose leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                    <Icon icon="lucide:arrow-right" width={18} height={18} className={`shrink-0 mt-1 ${active ? "text-slate-700" : "text-slate-400"}`} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {openDemoModal && (
          <div className="mt-8 ml-4">
            <Button
              color="primary"
              className="nav-btn-base nav-btn-primary !rounded-xl !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold shadow-md"
              startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
              onClick={openDemoModal}
            >
              Book a demo
            </Button>
          </div>
        )}
      </div>

      {/* Right: live demo (phone with video) */}
      <div className="w-full max-w-[270px] lg:max-w-[290px] mx-auto lg:ml-auto flex justify-center lg:justify-end lg:items-center">
        <PhoneFrame className="max-w-[280px] sm:max-w-[300px]">
          <div className="relative w-full h-full bg-gray-50 overflow-hidden">
            {VALUE_DEMO_VIDEOS.map((src, idx) => (
              <video
                key={src}
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  videoIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                src={src}
                muted
                playsInline
                loop
                preload="auto"
                onLoadedData={(e) => {
                  if (videoIndex === idx) e.currentTarget.play().catch(() => {});
                }}
              />
            ))}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
