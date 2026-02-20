import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import { FeatureItem } from "../../components/feature-item";
import { Link as RouteLink } from "react-router-dom";
import { PhoneShowcase, type PhoneShowcaseMode } from "../../components/phone-showcase";
import { ShowcaseStepper, type ShowcaseStep } from "../../components/showcase-stepper";
import { useDemoModal } from "../../components/demo-modal-context";

export default function Solution() {
  const { openDemoModal } = useDemoModal();
  const rm = useReducedMotion();
  const steps: ShowcaseStep[] = [
    {
      kicker: "Step 01",
      title: "Detect recurring bills",
      detail: "Surface subscriptions + recurring payments from internal + external institutions.",
      icon: "lucide:search-check",
      tone: "blue",
    },
    {
      kicker: "Step 02",
      title: "Nudge before due dates",
      detail: "Calendar sync + smart alerts that feel native inside the bank app.",
      icon: "lucide:bell-ring",
      tone: "indigo",
    },
    {
      kicker: "Step 03",
      title: "1‑click update & cancel",
      detail: "Move payment‑on‑file and cancel unwanted merchants without redirects.",
      icon: "lucide:mouse-pointer-click",
      tone: "sky",
    },
  ];

  const modeFor = (i: number): PhoneShowcaseMode => {
    if (i === 1) return "Alerts";
    if (i === 2) return "Actions";
    return "Discover";
  };

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
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">White‑labeled</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">SDK + iFrame</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">Outcome‑priced</span>
            </div>
            <h1 className="mt-5 page-title tracking-tight leading-[1.05]">
              Enterprise-grade bill and subscription management, <span className="elite-em">natively</span> embedded in your app
            </h1>
            <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17.5px] leading-relaxed">
              Integrate quickly with our SDK or iFrame and ship a complete recurring bill experience from day one.
              No redirects, no separate app, and no fragmented customer journey.
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

      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(84,100,255,0.025),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="max-w-3xl text-center mx-auto mb-16 md:mb-20 pt-8 md:pt-12">
            <p className="section-kicker mx-auto inline-block">How it works</p>
            <h2 className="mt-4 section-title tracking-tight text-3xl md:text-4xl">
              A product-led flow that ships inside your app
            </h2>
            <p className="mt-5 text-slate-700 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
              The core experience is simple: detect recurring spend, stay ahead of due dates, and drive one‑click action.
            </p>
          </div>

          <div data-reveal-item className="mt-12 md:mt-16">
            <ShowcaseStepper
              steps={steps}
              renderPreview={(_, idx) => (
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <div className="w-full max-w-[240px] md:max-w-[260px] bg-white rounded-[28px] border border-slate-200/60 shadow-[0_12px_40px_rgba(0,0,0,0.03)] overflow-hidden aspect-[9/18.5] relative ring-1 ring-slate-900/5">
                      {/* Minimal UI snippets for each step (no phone frame, much smaller footprint) */}
                      {idx === 0 && (
                        <div className="p-5 h-full bg-white flex flex-col">
                          <div className="flex items-center justify-between mb-5">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scanning...</div>
                            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon icon="lucide:search" className="text-primary" width={10} />
                            </div>
                          </div>
                          <div className="space-y-2.5">
                            {[
                              { name: "Netflix", price: "$15.99", icon: "simple-icons:netflix", color: "text-red-600" },
                              { name: "Spotify", price: "$9.99", icon: "simple-icons:spotify", color: "text-emerald-600" },
                              { name: "Hulu", price: "$14.99", icon: "simple-icons:hulu", color: "text-emerald-500" },
                            ].map((item) => (
                              <div key={item.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/40 border border-slate-100">
                                <div className="flex items-center gap-2">
                                  <Icon icon={item.icon} className={item.color} width={14} />
                                  <span className="text-[12px] font-bold text-slate-700">{item.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">{item.price}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-auto pb-4">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary" 
                                initial={{ width: "0%" }}
                                animate={{ width: "75%" }}
                                transition={rm ? { duration: 0.2 } : { duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {idx === 1 && (
                        <div className="p-5 h-full bg-white">
                          <div className="flex items-center justify-between mb-5">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upcoming</div>
                            <div className="h-5 w-5 rounded-full bg-indigo-500/10 flex items-center justify-center">
                              <Icon icon="lucide:bell" className="text-indigo-600" width={10} />
                            </div>
                          </div>
                          <div className="space-y-3 mt-12">
                            <motion.div 
                              className="bg-indigo-50/40 rounded-xl p-4 border border-indigo-100 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-6 w-6 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                  <Icon icon="simple-icons:netflix" className="text-red-600" width={12} />
                                </div>
                                <span className="text-[10px] font-bold text-indigo-900">Due in 2 days</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal">
                                Nudge: Avoid surprises.
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      )}
                      {idx === 2 && (
                        <div className="p-5 h-full bg-white flex flex-col items-center justify-center text-center">
                          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 shadow-sm">
                            <Icon icon="lucide:check" className="text-emerald-600" width={24} />
                          </div>
                          <h5 className="text-[14px] font-bold text-slate-800 tracking-tight leading-tight">Action<br/>Complete</h5>
                          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">Bill successfully moved<br/>to your card.</p>
                          
                          <div className="mt-8 w-full space-y-1.5">
                            <div className="h-8 w-full rounded-lg bg-slate-50" />
                            <div className="h-8 w-full rounded-lg bg-slate-50 opacity-50" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/80 border-slate-200/60 shadow-sm">No redirects</span>
                    <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/80 border-slate-200/60 shadow-sm">White-labeled</span>
                    <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/80 border-slate-200/60 shadow-sm">SDK + iFrame</span>
                  </div>
                </div>
              )}
            />
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
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <Card shadow="none" radius="lg" className="elite-card bg-white/50 backdrop-blur-sm border-white/40 shadow-sm">
              <CardBody className="p-8 md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">API surface</div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">Built to ship in bank stacks</h3>
                    <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[66ch]">
                      Tight, predictable surface area: auth, endpoints, errors, and events that work in regulated environments.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white/80 border-slate-200/60 shadow-sm">SDK + iFrame</span>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    ["lucide:search-check", "Recurring bill detection", "Identify recurring spend across cards + accounts"],
                    ["lucide:bell-ring", "Due‑date alerts", "Proactive notifications before charges hit"],
                    ["lucide:arrow-left-right", "Payment updater", "Move payment‑on‑file to reinforce primacy"],
                    ["lucide:ban", "1‑click cancellation", "Cancel unwanted subscriptions in seconds"],
                  ].map(([ic, t, d]) => (
                    <div key={t} className="rounded-2xl border border-slate-200/60 bg-white/85 px-5 py-5 hover:bg-white/95 transition-all duration-300 group hover:shadow-md">
                      <div className="flex flex-col items-start gap-4">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 border border-slate-200/60 text-slate-700 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                          <Icon icon={ic} width={18} height={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[15px] font-bold text-[var(--ink)] leading-tight tracking-tight">{t}</div>
                          <p className="mt-2 text-xs text-slate-600 leading-relaxed">{d}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

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