import React from "react";
import { Tabs, Tab, Card, CardBody, Badge, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";

function ServePanel({
  title,
  bullets,
  proof,
  metrics,
  openDemoModal,
}: {
  title: string;
  bullets: string[];
  proof: string[];
  metrics: Array<{ label: string; value: string; desc: string; tone?: "blue" | "indigo" | "sky" }>;
  openDemoModal: () => void;
}) {
  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-stretch">
      <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.25),rgba(255,255,255,0.8),rgba(30,162,255,0.15))] shadow-[0_18px_54px_rgba(2,6,23,0.06)] h-full">
        <div className="elite-card rounded-[31px] p-8 md:p-10 bg-white/95 h-full">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">Segment</div>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)]">{title}</h3>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed max-w-[66ch]">
                A product-led recurring bill experience that drives measurable retention, primacy, and conversion.
              </p>
            </div>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Embedded</span>
          </div>

          <div aria-hidden="true" className="mt-8 elite-hairline opacity-[0.9]" />

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 hover:bg-white transition-all duration-300 group hover:shadow-md">
                <div className="text-4xl font-bold tracking-tighter text-primary group-hover:scale-105 transition-transform">{m.value}</div>
                <div className="mt-3 text-[15px] font-bold text-slate-800 leading-tight tracking-tight">{m.label}</div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 hover:bg-white transition-all duration-300">
              <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">What ships</div>
              <ul className="space-y-3 text-slate-700">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Icon icon="lucide:check" className="text-emerald-600 mt-0.5 shrink-0" width={18} height={18} />
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 hover:bg-white transition-all duration-300">
              <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">Proof</div>
              <ul className="space-y-3 text-slate-700">
                {proof.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Icon icon="lucide:medal" className="text-blue-600 mt-0.5 shrink-0" width={18} height={18} />
                    <span className="font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Button color="primary" className="nav-btn-base nav-btn-primary !rounded-xl !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold shadow-md" startContent={<Icon icon="lucide:calendar" width={18} height={18} />} onClick={openDemoModal}>
              Book a demo
            </Button>
          </div>
        </div>
      </div>

      <Card shadow="none" radius="lg" className="elite-card bg-white/50 backdrop-blur-sm border-white/40 shadow-sm">
        <CardBody className="p-8 md:p-10 flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">Example</div>
              <div className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)]">In‑app bill control</div>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                A quick “button-jump” style showcase that feels product-led (not gimmicky).
              </p>
            </div>
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">Quiet UX</span>
          </div>

          <div className="mt-8 flex-1 rounded-2xl border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff,rgba(248,250,252,0.85))] p-6 overflow-hidden relative shadow-sm">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at:18%_18%,rgba(84,100,255,0.08),transparent_62%),radial-gradient(55%_55%_at:86%_28%,rgba(30,162,255,0.06),transparent_64%)] opacity-60" />
            <div className="relative">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                <span className="h-2 w-2 rounded-full bg-blue-600/70" />
                Live surface
              </div>
              <div className="mt-6 grid gap-3">
                {[
                  ["lucide:bell-ring", "Upcoming bill due", "Trigger a smart nudge before the charge hits"],
                  ["lucide:calendar", "Calendar sync", "Keep due dates where users live"],
                  ["lucide:mouse-pointer-click", "1‑click action", "Move payment‑on‑file or cancel instantly"],
                ].map(([ic, t, d]) => (
                  <div key={t} className="rounded-xl border border-slate-200/60 bg-white/95 px-4 py-4 flex items-start gap-4 hover:shadow-md transition-all group">
                    <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 border border-slate-200/60 text-slate-700 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                      <Icon icon={ic} width={18} height={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[var(--ink)] leading-tight tracking-tight">{t}</div>
                      <p className="mt-1 text-xs text-slate-600 leading-snug">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button as={RouteLink as any} to="/solution" variant="flat" className="elite-card !rounded-xl !h-[40px] !px-5 elite-interactive hover:elite-interactive-hover text-[13px] font-bold border border-slate-200/60 bg-white/50">
              See solution flow
            </Button>
            <Button as={RouteLink as any} to="/developer" color="primary" className="!rounded-xl !h-[40px] !px-5 elite-interactive hover:elite-interactive-hover text-[13px] font-bold shadow-md">
              Request API access
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function WhoWeServe() {
  const { openDemoModal } = useDemoModal();
  const tabs = [
    {
      key: "banks",
      title: (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:building-2" />
          <span>Banks</span>
          <Badge size="sm" color="primary" variant="flat">Enterprise</Badge>
        </div>
      ),
      panel: (
        <ServePanel
          title="Banks"
          bullets={[
            "Drive primacy with 1-click migration of bills",
            "Deepen engagement with proactive alerts",
            "Identify external products to power cross-sell",
          ]}
          proof={[
            "Case study: 5%+ retention lift in 3 months",
            "Pilot: 6+ swipes/mo increase among activators",
          ]}
          metrics={[
            { label: "Retention", value: "+5%", desc: "Lift from deeper bill engagement" },
            { label: "Primacy", value: "6+", desc: "Additional monthly card swipes" },
            { label: "Conversion", value: "11%", desc: "Offer conversion after activation" },
          ]}
          openDemoModal={openDemoModal}
        />
      ),
    },
    {
      key: "cus",
      title: (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:landmark" />
          <span>Credit Unions</span>
        </div>
      ),
      panel: (
        <ServePanel
          title="Credit Unions"
          bullets={[
            "Modern member experience with full bill control",
            "Simple integration with leading cores & digital platforms",
            "Build loyalty through transparency",
          ]}
          proof={[
            "Implementation in 30–45 days",
            "Embedded experience with no redirects",
          ]}
          metrics={[
            { label: "Retention", value: "+5%", desc: "Lift from deeper bill engagement" },
            { label: "Primacy", value: "6+", desc: "Additional monthly card swipes" },
            { label: "Conversion", value: "11%", desc: "Offer conversion after activation" },
          ]}
          openDemoModal={openDemoModal}
        />
      ),
    },
    {
      key: "fintechs",
      title: (
        <div className="flex items-center gap-2">
          <Icon icon="lucide:cpu" />
          <span>Fintechs</span>
        </div>
      ),
      panel: (
        <ServePanel
          title="Fintechs"
          bullets={[
            "SDK/iFrame drop-in for rapid shipping",
            "Differentiate with embedded cancellation & updater",
            "Monetize with personalized opportunities",
          ]}
          proof={[
            "11% conversion on personalized offers",
            "Embedded actions (update + cancel) without redirects",
          ]}
          metrics={[
            { label: "Retention", value: "+5%", desc: "Lift from deeper bill engagement" },
            { label: "Primacy", value: "6+", desc: "Additional monthly card swipes" },
            { label: "Conversion", value: "11%", desc: "Offer conversion after activation" },
          ]}
          openDemoModal={openDemoModal}
        />
      ),
    },
  ];

  const location = useLocation();
  const tabParam = new URLSearchParams(location.search).get("tab");
  const tabFromUrl = tabParam === "fintechs" ? "fintechs" : tabParam === "credit-unions" ? "cus" : tabParam === "banks" ? "banks" : null;
  const [selected, setSelected] = React.useState(tabFromUrl ?? tabs[0].key);

  React.useEffect(() => {
    if (tabFromUrl) setSelected(tabFromUrl);
  }, [location.search, tabFromUrl]);

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
        <Tabs
          aria-label="Segments"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(String(key))}
          variant="underlined"
          color="primary"
          size="lg"
        >
          {tabs.map((t) => (
            <Tab key={t.key} title={t.title}>
              <div className="mt-6">{t.panel}</div>
            </Tab>
          ))}
        </Tabs>
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
                    See your segment’s flow <br className="hidden md:block" /> inside the app.
                  </h3>
                  <p className="mt-6 text-slate-700 text-[17px] md:text-[18px] leading-relaxed">
                    We’ll walk through the embedded experience and the deployment path inside your stack.
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