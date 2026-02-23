import React from "react";
import type { SegmentData, SegmentMetric } from "./segment-data";

export function ServePanel({
  segment,
  openDemoModal,
}: {
  segment: SegmentData;
  openDemoModal: () => void;
}) {
  const { metrics } = segment;
  return (
    <div className="max-w-4xl">
      <div className="p-8 md:p-10 bg-transparent">
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-[var(--ink)]">Proven results from embedded bill management solutions</h3>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[66ch]">
              Our flexible solutions aren&apos;t just a feature, they drive real value for our clients by retaining users, upgrading users to your premium plans and leveraging key inflection points to cross-sell your core products.
            </p>
          </div>

          <div aria-hidden="true" className="mt-8 elite-hairline opacity-[0.9]" />

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {metrics.map((m: SegmentMetric) => (
              <div key={m.label} className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 hover:bg-white transition-all duration-300 group hover:shadow-md">
                <div className="text-4xl font-bold tracking-tighter text-primary group-hover:scale-105 transition-transform">{m.value}</div>
                <div className="mt-3 text-[15px] font-bold text-slate-800 leading-tight tracking-tight">{m.label}</div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}
