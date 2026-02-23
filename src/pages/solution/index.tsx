import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { FeatureItem } from "../../components/feature-item";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";

const AVAILABLE_FEATURES = [
  { title: "End-to-end subscription management", tag: "SDK or i-frame" },
  { title: "1-click cancellation", tag: "API or in-product" },
  { title: "1-click payment updater", tag: "API or in-product" },
  { title: "Personalized cross-sell", tag: "API or in-product" },
  { title: "Alerts & nudges", tag: "API or in-product" },
  { title: "Transaction enrichment & recurrence detection", tag: "API or in-product" },
] as const;

export default function Solution() {
  const { openDemoModal } = useDemoModal();
  const [selectedFeatureIndex, setSelectedFeatureIndex] = React.useState(0);
  const selectedFeature = AVAILABLE_FEATURES[selectedFeatureIndex];

  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.08),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.06),transparent_72%)]" />
          <div className="absolute inset-0 distance-grid opacity-[0.24] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page page-hero-pad relative">
          <div className="flex flex-col items-start max-w-4xl">
            <p className="section-kicker">Our solution</p>
            <h1 className="mt-4 page-title tracking-tight leading-[1.05]">
              Comprehensive Subscription Management. Your Way.
            </h1>
            <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17.5px] leading-relaxed">
              Every feature. One platform. Embedded seamlessly via SDK, iFrame, or API to match your architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button
                color="primary"
                className="nav-btn-base nav-btn-primary !rounded-[14px] !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold"
                startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
                onClick={openDemoModal}
              >
                Book a demo
              </Button>
              <Button
                as={RouteLink as any}
                to="/developer"
                variant="flat"
                color="default"
                className="nav-btn-base nav-btn-secondary !rounded-[14px] !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold border border-slate-200/60 bg-white/50"
                startContent={<Icon icon="lucide:key" width={18} height={18} />}
              >
                Request API access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why ScribeUp is Best-in-Class */}
      <section data-reveal="section" className="relative py-[var(--section-padding)] bg-slate-50/80 overflow-hidden border-b border-slate-200/60">
        <div className="container-page">
          <h2 className="section-title tracking-tight text-2xl md:text-3xl max-w-2xl">
            Why ScribeUp is Best-in-Class?
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Pure-Play Focus",
                desc: "We are 100% dedicated to subscription management. No competing priorities. Just best-in-class tooling.",
              },
              {
                title: "Most Comprehensive Toolset",
                desc: "From infrastructure to user experience, we provide the deepest and most complete subscription management capabilities available in one platform.",
              },
              {
                title: "Flexible Integration",
                desc: "SDK, iFrame or API-based features. White-labeled or customized. We fit into your architecture, not the other way around.",
              },
              {
                title: "Enterprise-Grade Reliability",
                desc: "Built for scale, compliance, and operational resilience from day one.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold tracking-tight text-[var(--ink)]">{title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(84,100,255,0.025),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="mb-12 pt-8 md:pt-12">
            <p className="section-kicker">Available Features</p>
            <h2 className="mt-4 section-title tracking-tight text-2xl md:text-3xl max-w-2xl">
              Explore features by integration path
            </h2>
          </div>

          <div data-reveal-item className="grid lg:grid-cols-[1fr_1.12fr] gap-8 lg:gap-12 items-start lg:py-8">
            {/* Clickable feature list */}
            <div className="space-y-2">
              {AVAILABLE_FEATURES.map((feature, idx) => {
                const isActive = idx === selectedFeatureIndex;
                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => setSelectedFeatureIndex(idx)}
                    className={`w-full text-left rounded-2xl border px-5 py-4 transition-all duration-200 ${
                      isActive
                        ? "border-primary/40 bg-primary/5 shadow-sm"
                        : "border-slate-200/60 bg-white/80 hover:bg-white hover:border-slate-200/80 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`font-semibold text-[15px] tracking-tight ${isActive ? "text-[var(--ink)]" : "text-slate-700"}`}>
                        {feature.title}
                      </span>
                      <Icon icon="lucide:chevron-right" width={18} height={18} className={isActive ? "text-primary shrink-0" : "text-slate-400 shrink-0"} />
                    </div>
                    <span className="mt-2 inline-block text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {feature.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Demo area for selected feature */}
            <div className="rounded-2xl border border-slate-200/60 bg-slate-50/50 min-h-[320px] lg:min-h-[380px] p-6 md:p-8 flex flex-col items-center justify-center">
              <div className="text-center max-w-md">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-2">Demo</p>
                <h3 className="text-lg font-bold tracking-tight text-[var(--ink)]">{selectedFeature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{selectedFeature.tag}</p>
                <div className="mt-6 rounded-xl border border-dashed border-slate-300/80 bg-white/60 py-12 px-6 text-slate-400 text-[13px]">
                  Demo placeholder for this feature
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_74%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_14%,rgba(84,100,255,0.02),transparent_66%),radial-gradient(55%_55%_at_86%_22%,rgba(30,162,255,0.015),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="max-w-3xl mb-12">
            <p className="section-kicker">Capabilities</p>
            <h2 className="mt-4 section-title tracking-tight">
              Find. Track. Manage. Monetize.
            </h2>
            <p className="mt-5 text-slate-700 text-[16px] md:text-[17px] max-w-2xl leading-relaxed">
              An end‑to‑end recurring bill platform designed for regulated environments and measurable outcomes.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeatureItem
            icon="lucide:search-check"
            title="Find"
            points={[
              "Automatically identify and track recurring bills paid on your cards and accounts",
              "Give customers visibility into recurring bills from external bank accounts",
              "Uncover hidden subscriptions and recurring charges across institutions",
            ]}
          />
          <FeatureItem
            icon="lucide:radar"
            title="Track"
            points={[
              "Alert your users before bills are due",
              "Sync bill dates onto their personal calendars",
              "Deliver price hikes, personalized insights and savings opportunities when it matters most",
            ]}
          />
          <FeatureItem
            icon="lucide:settings-2"
            title="Manage"
            points={[
              "1-click Payment Updater — migrate recurring bills with one click. Supports card and ACH for 100s of merchants",
              "1-click Cancellation — instantly cancel unwanted subscriptions for 100s of merchants",
              "Guided cancellation flows available for 1,000s of merchants",
            ]}
          />
          <FeatureItem
            icon="lucide:banknote"
            title="Monetize"
            points={[
              "Cross-sell on personalized opportunities",
              "Refinancing and insurance opportunities",
              "Promote core banking products and premium plans",
            ]}
          />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.015),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(84,100,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div className="max-w-3xl">
            <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.2),rgba(255,255,255,0.8),rgba(30,162,255,0.1))] shadow-[0_18px_54px_rgba(2,6,23,0.06)] h-full">
              <div className="elite-card rounded-[31px] p-8 md:p-10 bg-white/95 h-full flex flex-col">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">Outcomes</div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">Measurable, activation‑tied ROI</h3>
                    <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[66ch]">
                      Not a “nice-to-have” UX: activation drives primacy, retention lift, and conversion.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/80 border-slate-200/60 shadow-sm">Measured</span>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4 flex-1">
                  {[
                    ["+5%", "Retention lift", "From deeper bill engagement"],
                    ["6+", "Card swipes / mo", "After activation"],
                    ["11%", "Offer conversion", "Across products"],
                  ].map(([val, label, desc]) => (
                    <div key={label} className="rounded-2xl border border-slate-200/60 bg-white/85 p-5 hover:bg-white/95 transition-all duration-300 group hover:shadow-md">
                      <div className="text-4xl font-bold tracking-tighter text-primary group-hover:scale-105 transition-transform">{val}</div>
                      <div className="mt-3 text-[15px] font-bold text-slate-800 leading-tight tracking-tight">{label}</div>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button as={RouteLink as any} to="/who-we-serve" variant="flat" className="elite-card !rounded-xl !h-[40px] !px-5 elite-interactive hover:elite-interactive-hover text-[13px] font-bold border border-slate-200/60 bg-white/50">
                    See segments
                  </Button>
                  <Button as={RouteLink as any} to="/developer" color="primary" className="!rounded-xl !h-[40px] !px-5 elite-interactive hover:elite-interactive-hover text-[13px] font-bold shadow-md">
                    Get integration guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden pb-[140px] md:pb-[180px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_20%,rgba(84,100,255,0.03),transparent_70%),radial-gradient(55%_55%_at_86%_30%,rgba(30,162,255,0.02),transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent_74%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="relative rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.25),rgba(255,255,255,0.8),rgba(30,162,255,0.15))] shadow-[0_24px_80px_rgba(2,6,23,0.08)]">
            <div className="rounded-[31px] border border-slate-200/70 p-10 md:p-16 bg-white/95 shadow-sm overflow-hidden relative">
              <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-10">
                <div className="max-w-2xl">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">Next steps</div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
                    Built to ship fast &mdash; <br className="hidden md:block" /> and prove value quickly.
                  </h3>
                  <p className="mt-6 text-slate-700 text-[17px] md:text-[18px] leading-relaxed">
                    Get the implementation guide and deploy in weeks with a clean <span className="text-primary font-semibold">activation &rarr; outcomes</span> loop.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <Button
                    as={RouteLink as any}
                    to="/developer"
                    variant="flat"
                    color="default"
                    className="nav-btn-base nav-btn-secondary !rounded-xl !h-[48px] !px-8 elite-interactive hover:elite-interactive-hover text-[15px] font-bold border border-slate-200/60 bg-white/50"
                    startContent={<Icon icon="lucide:key" width={20} height={20} />}
                  >
                    Integration guide
                  </Button>
                  <Button
                    color="primary"
                    className="nav-btn-base nav-btn-primary !rounded-xl !h-[48px] !px-8 elite-interactive hover:elite-interactive-hover text-[15px] font-bold shadow-lg"
                    startContent={<Icon icon="lucide:calendar" width={20} height={20} />}
                    onClick={openDemoModal}
                  >
                    Book a demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}