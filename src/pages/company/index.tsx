import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";

export default function Company() {
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
          <div className="flex flex-col items-start max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">About ScribeUp</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Bank‑grade posture</span>
              <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Outcome‑led</span>
            </div>
            <h1 className="mt-5 page-title tracking-tight leading-[1.05]">
              Building the future of <span className="elite-em">recurring bill</span> control
            </h1>
            <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17.5px] leading-relaxed">
              We help financial institutions turn recurring bills into a high-impact digital product category:
              better consumer outcomes, stronger engagement, and clear business-case ROI.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button
                color="primary"
                className="nav-btn-base nav-btn-primary !rounded-[14px] !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold shadow-md"
                startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
                onClick={openDemoModal}
              >
                Book a demo
              </Button>
              <Button
                as={RouteLink as any}
                to="/solution"
                variant="flat"
                color="default"
                className="nav-btn-base nav-btn-secondary !rounded-[14px] !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold border border-slate-200/60 bg-white/50"
                startContent={<Icon icon="lucide:arrow-right" width={18} height={18} />}
              >
                See the flow
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(84,100,255,0.025),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.02),transparent_70%)]" />
        <div className="container-page relative z-10 pt-12 md:pt-16">
          <div data-reveal-item className="max-w-3xl mb-12">
            <p className="section-kicker">Team</p>
            <h2 className="mt-4 section-title tracking-tight">
              Built for regulated product shipping
            </h2>
            <p className="mt-5 text-slate-700 text-[16px] md:text-[17px] max-w-2xl leading-relaxed">
              We keep this page free of made-up bios. If you want a team section, drop the official names/titles and we’ll render it.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5" data-reveal-item>
            {[
              ["lucide:shield-check", "Security posture", "SOC 2-ready approach and enterprise controls"],
              ["lucide:layers", "Embedded product craft", "Native-feeling UI inside existing digital banking experiences"],
              ["lucide:rocket", "Ship velocity", "30–45 day rollout model with clear deployment paths"],
            ].map(([ic, t, d]) => (
              <Card key={t} shadow="none" radius="lg" className="elite-card bg-white/50 backdrop-blur-sm border-white/40 shadow-sm hover:shadow-md transition-all duration-300 group">
                <CardBody className="p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 border border-slate-200/60 text-slate-800 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                    <Icon icon={ic} width={24} height={24} />
                  </div>
                  <div className="mt-6 text-[18px] font-bold text-[var(--ink)] tracking-tight">{t}</div>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{d}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-pad bg-white overflow-hidden pb-[140px] md:pb-[180px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(84,100,255,0.04),transparent_70%)]" />
        <div className="container-page relative z-10">
          <div data-reveal-item className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.2),rgba(255,255,255,0.8),rgba(30,162,255,0.1))] shadow-[0_18px_54px_rgba(2,6,23,0.06)] h-full">
              <div className="elite-card rounded-[31px] p-8 md:p-10 bg-white/95 h-full">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">Press</div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">Signals, coverage, and traction</h3>
                    <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[66ch]">
                      We focus on shipping a real embedded category — recurring bills — with measurable activation outcomes.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Fintech</span>
                </div>

                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  {[
                    ["lucide:newspaper", "Press", "Featured across fintech + banking"],
                    ["lucide:trophy", "Awards", "Innovation recognition (embedded)"],
                    ["lucide:link", "Partners", "Pre-integrated deployment paths"],
                  ].map(([ic, t, d]) => (
                    <div key={t} className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 hover:bg-white transition-all duration-300 group hover:shadow-md">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.02))] border border-slate-200/60 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <Icon icon={ic} width={18} height={18} />
                      </div>
                      <div className="mt-4 text-[15px] font-bold text-[var(--ink)] tracking-tight">{t}</div>
                      <p className="mt-2 text-xs text-slate-700 leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card shadow="none" radius="lg" className="elite-card bg-white/50 backdrop-blur-sm border-white/40 shadow-sm">
              <CardBody className="p-8 md:p-10 flex flex-col">
                <div className="flex items-start justify-between gap-5 text-left">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold text-left">Values</div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)] text-left">Trust-first product craft</h3>
                    <p className="mt-3 text-sm text-slate-700 leading-relaxed text-left">
                      Quiet‑luxury UX with enterprise‑grade posture — built to deploy in regulated environments.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Regulated</span>
                </div>

                <div className="mt-8 space-y-3 flex-1 text-left">
                  {[
                    ["lucide:shield-check", "Trust & security", "Encryption posture, auditability, and least-privilege access"],
                    ["lucide:heart-handshake", "Transparency for users", "No dark patterns; clear actions and outcomes"],
                    ["lucide:aim", "Outcome-led design", "Activation metrics tied to ROI and retention lift"],
                  ].map(([ic, t, d]) => (
                    <div key={t} className="rounded-xl border border-slate-200/60 bg-white/95 px-5 py-5 flex items-start gap-4 hover:shadow-md transition-all group">
                      <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900/5 border border-slate-200/60 text-slate-700 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                        <Icon icon={ic} width={18} height={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] font-bold text-[var(--ink)] leading-tight tracking-tight text-left">{t}</div>
                        <p className="mt-2 text-xs text-slate-700 leading-snug text-left">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}