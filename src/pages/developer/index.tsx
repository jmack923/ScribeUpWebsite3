import React from "react";
import { Card, CardBody, Snippet, Button, Alert } from "@heroui/react";
import { Icon } from "@iconify/react";
import { ShowcaseStepper, type ShowcaseStep } from "../../components/showcase-stepper";
import { useDemoModal } from "../../components/demo-modal-context";

const codeSnippet = `// Install SDK
npm i @scribeup/sdk

// Initialize
import { ScribeUp } from "@scribeup/sdk";

const su = new ScribeUp({
  clientId: "YOUR_CLIENT_ID",
  environment: "production",
});

// Mount into your app (iFrame or SDK Widget)
su.mount("#scribeup-bill-control", {
  theme: "light",
  features: ["find", "track", "manage"],
  onEvent: (evt) => { /* ScribeUp event handled */ },
});
`;

export default function Developer() {
  const { openDemoModal } = useDemoModal();
  const steps: ShowcaseStep[] = [
    {
      kicker: "Step 01",
      title: "Install + auth",
      detail: "Drop in the SDK and initialize with your client credentials.",
      icon: "lucide:package",
      tone: "blue",
    },
    {
      kicker: "Step 02",
      title: "Mount the embedded UI",
      detail: "SDK widget or iFrame — ships inside your existing experience.",
      icon: "lucide:layout-template",
      tone: "indigo",
    },
    {
      kicker: "Step 03",
      title: "Subscribe to events",
      detail: "Webhooks + events to drive nudges, actions, and analytics safely.",
      icon: "lucide:webhook",
      tone: "sky",
    },
  ];

  return (
    <div className="w-full page-shell">
      <section className="relative border-b border-slate-200/70">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom" />
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 soft-grid opacity-40" />
        </div>
        <div className="container-page page-hero-pad">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">Built for engineers</span>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">30–45 day integration</span>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">SDK + iFrame</span>
          </div>
          <h1 className="mt-3 page-title">Developer docs & integration</h1>
          <p className="mt-3 text-slate-700 max-w-2xl text-[15px] md:text-[16.5px] leading-relaxed">
            Clear implementation paths, modern tooling, and enterprise-ready controls to ship bill management
            fast while meeting compliance, rollout, and experimentation requirements.
          </p>
        </div>
      </section>

      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.10] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_16%_12%,rgba(84,100,255,0.04),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.03),transparent_70%)]" />

        <div className="container-page pt-12 md:pt-16">
          <div data-reveal-item className="max-w-3xl">
            <p className="section-kicker">Implementation</p>
            <h2 className="mt-3 section-title">
              Ship the embedded experience — without rewriting your stack.
            </h2>
            <p className="mt-4 text-slate-700 text-[15px] md:text-[16.5px] max-w-2xl leading-relaxed">
              A clean surface area: SDK/iFrame UI, endpoints, and events that work in regulated environments.
            </p>
          </div>

          <div data-reveal-item className="mt-9">
            <ShowcaseStepper
              steps={steps}
              renderPreview={(_, idx) => (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200/60 bg-white/78 p-4">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Quick start</div>
                    <div className="mt-2">
                      <Snippet symbol="" variant="bordered" className="text-left">
                        {codeSnippet}
                      </Snippet>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button
                        color="primary"
                        className="elite-interactive hover:elite-interactive-hover"
                        startContent={<Icon icon="lucide:rocket" width={18} height={18} />}
                      >
                        Open docs
                      </Button>
                      <Button
                        variant="flat"
                        className="elite-card elite-interactive hover:elite-interactive-hover"
                        startContent={<Icon icon="lucide:box" width={18} height={18} />}
                      >
                        SDK examples
                      </Button>
                      <Button
                        variant="flat"
                        className="elite-card elite-interactive hover:elite-interactive-hover"
                        startContent={<Icon icon="lucide:shield-check" width={18} height={18} />}
                      >
                        Security notes
                      </Button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200/60 bg-white/78 p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Auth</div>
                      <div className="mt-2 text-sm font-semibold text-[var(--ink)]">Client credentials</div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">Scoped keys, rate limits, and predictable errors.</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/60 bg-white/78 p-4">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Events</div>
                      <div className="mt-2 text-sm font-semibold text-[var(--ink)]">Webhooks + callbacks</div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">Drive nudges/actions safely with auditability.</p>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      <div aria-hidden="true" className="page-break" />
      <section data-reveal="section" className="relative section-haze section-pad bg-[#f8fafc]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.08] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_76%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_16%,rgba(30,162,255,0.03),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(84,100,255,0.04),transparent_70%)]" />
        <div className="container-page">
          <div data-reveal-item className="grid lg:grid-cols-2 gap-6 items-start">
            <Card shadow="none" radius="lg" className="elite-card">
              <CardBody className="p-6">
                <h3 className="text-xl font-semibold">Security & Compliance</h3>
                <ul className="mt-3 space-y-2 text-default-700">
                  <li className="flex items-start gap-2"><Icon icon="lucide:shield-check" className="text-primary mt-1" /> PCI & SOC2 compliant</li>
                  <li className="flex items-start gap-2"><Icon icon="lucide:lock" className="text-primary mt-1" /> Data encryption at rest and in transit</li>
                  <li className="flex items-start gap-2"><Icon icon="lucide:list-checks" className="text-primary mt-1" /> Enterprise DPA & vendor security reviews</li>
                </ul>
                <Alert
                  className="mt-5"
                  title="Pilot-ready"
                  description="We support pilot launches, A/B testing, and phased rollouts."
                  color="success"
                  variant="flat"
                  isVisible
                />
              </CardBody>
            </Card>

            <div className="rounded-2xl p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.25),rgba(53,125,255,0.08),rgba(30,162,255,0.10))] shadow-[0_18px_54px_rgba(2,6,23,0.10)]">
              <div className="elite-card rounded-2xl p-6 bg-white/92">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Launch plan</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">From kickoff to embedded launch</div>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed max-w-[60ch]">
                      30–45 day rollout with pre-integrated paths. Prove value fast with clean activation + outcomes.
                    </p>
                  </div>
                  <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600">Enterprise</span>
                </div>

                <div aria-hidden="true" className="mt-5 elite-hairline opacity-[0.9]" />

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    ["Plan", "Week 1"],
                    ["Integrate", "Weeks 2–4"],
                    ["Launch", "Weeks 5–6"],
                  ].map(([label, sub]) => (
                    <div key={label} className="rounded-2xl border border-slate-200/60 bg-white/70 p-3">
                      <div className="text-xs font-semibold text-slate-700">{label}</div>
                      <p className="mt-1 text-[11px] text-slate-700 leading-relaxed">{sub}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button color="primary" className="elite-interactive hover:elite-interactive-hover" endContent={<Icon icon="lucide:calendar" width={18} height={18} />} onClick={openDemoModal}>
                    Book a demo
                  </Button>
                  <Button variant="flat" className="elite-card elite-interactive hover:elite-interactive-hover" endContent={<Icon icon="lucide:arrow-right" width={18} height={18} />}>
                    View docs surface area
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
