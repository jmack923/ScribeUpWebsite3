import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";
import { SEGMENTS, SEGMENT_SLUGS, type SegmentSlug } from "./segment-data";

const SEGMENT_PATHS: Record<SegmentSlug, string> = {
  banks: "/who-we-serve/banks",
  "credit-unions": "/who-we-serve/credit-unions",
  fintechs: "/who-we-serve/fintechs",
};

export default function WhoWeServe() {
  const { openDemoModal } = useDemoModal();

  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.08),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.06),transparent_72%)]" />
          <div className="absolute inset-0 distance-grid opacity-[0.24] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page page-hero-pad relative">
          <p className="section-kicker">Who we serve</p>
          <h1 className="mt-5 page-title max-w-4xl tracking-tight leading-[1.05]">
            Who ScribeUp is for: <span className="elite-em">banks</span>, credit unions, and fintechs
          </h1>
          <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17.5px] leading-relaxed">
            If you serve consumers, recurring bills matter. Choose a segment to see how ScribeUp drives retention,
            engagement, and primacy outcomes with an embedded recurring bill experience.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">PCI & SOC 2 compliant</span>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">
              Pre-integrated: Q2, Alkami, Lumin, Banno, Candescent
            </span>
          </div>
        </div>
      </section>

      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.10] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(84,100,255,0.04),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.03),transparent_70%)]" />
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {SEGMENT_SLUGS.map((slug) => {
              const segment = SEGMENTS[slug];
              const to = SEGMENT_PATHS[slug];
              return (
                <RouteLink
                  key={slug}
                  to={to}
                  className="group relative rounded-[24px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.2),rgba(255,255,255,0.85),rgba(30,162,255,0.12))] shadow-[0_18px_54px_rgba(2,6,23,0.06)] hover:shadow-[0_24px_64px_rgba(2,6,23,0.1)] transition-all duration-300"
                >
                  <div className="elite-card rounded-[23px] p-8 bg-white/95 h-full flex flex-col items-start">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
                      <Icon icon={segment.icon} width={24} height={24} />
                    </div>
                    <h3 className="mt-4 text-xl font-bold tracking-tight text-[var(--ink)]">{segment.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                      See how ScribeUp drives retention, primacy, and conversion for {segment.title.toLowerCase()}.
                    </p>
                    {segment.badge && (
                      <span className="mt-3 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                        {segment.badge}
                      </span>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary group-hover:gap-2 transition-all">
                      View segment
                      <Icon icon="lucide:arrow-right" width={14} height={14} />
                    </span>
                  </div>
                </RouteLink>
              );
            })}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden pb-[140px] md:pb-[180px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(84,100,255,0.04),transparent_70%)]" />
        <div className="container-page relative z-10 pt-12 md:pt-16">
          <div data-reveal-item className="relative rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.25),rgba(255,255,255,0.8),rgba(30,162,255,0.15))] shadow-[0_24px_80px_rgba(2,6,23,0.08)]">
            <div className="rounded-[31px] border border-slate-200/70 p-10 md:p-16 bg-white/95 shadow-sm overflow-hidden relative">
              <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-10">
                <div className="max-w-2xl">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">Next steps</div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
                    See your segment's flow <br className="hidden md:block" /> inside the app.
                  </h3>
                  <p className="mt-6 text-slate-700 text-[17px] md:text-[18px] leading-relaxed">
                    We'll walk through the embedded experience and the deployment path inside your stack.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <Button as={RouteLink as any} to="/solution" variant="flat" color="default" className="nav-btn-base nav-btn-secondary !rounded-xl !h-[48px] !px-8 elite-interactive hover:elite-interactive-hover text-[15px] font-bold border border-slate-200/60 bg-white/50">
                    Learn more
                  </Button>
                  <Button color="primary" className="nav-btn-base nav-btn-primary !rounded-xl !h-[48px] !px-8 elite-interactive hover:elite-interactive-hover text-[15px] font-bold shadow-lg" startContent={<Icon icon="lucide:calendar" width={20} height={20} />} onClick={openDemoModal}>
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
