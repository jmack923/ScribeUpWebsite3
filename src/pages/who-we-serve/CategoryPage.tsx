import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink } from "react-router-dom";
import { useDemoModal } from "../../components/demo-modal-context";
import { PlatformPartnersBar } from "../../components/platform-partners-bar";
import { CreditUnionsValueSection } from "./CreditUnionsValueSection";
import { ServePanel } from "./ServePanel";
import { getSegmentBySlug, type SegmentSlug } from "./segment-data";

function CategoryPageShell({ slug }: { slug: SegmentSlug }) {
  const { openDemoModal } = useDemoModal();
  const segment = getSegmentBySlug(slug);
  if (!segment) return null;

  const isFintech = slug === "fintechs";
  const isCreditUnions = slug === "credit-unions";
  const isBanks = slug === "banks";

  return (
    <div className="w-full page-shell">
      {/* Hero */}
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.08]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_35%_at_12%_14%,rgba(71,98,255,0.08),transparent_70%),radial-gradient(40%_30%_at_88%_18%,rgba(44,138,255,0.06),transparent_72%)]" />
          <div className="absolute inset-0 distance-grid opacity-[0.24] [mask-image:radial-gradient(55%_60%_at_50%_18%,black,transparent_72%)]" />
        </div>
        <div className="container-page page-hero-pad relative">
          <p className="section-kicker">{segment.heroKicker}</p>
          <h1 className="mt-5 page-title max-w-4xl tracking-tight leading-[1.05]">
            {segment.heroHeadline}
          </h1>
          <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17.5px] leading-relaxed">
            {segment.heroSubline}
          </p>
          {segment.cusoMention && (
            <p className="mt-4 text-[13px] md:text-[14px] text-slate-600 font-medium">
              ScribeUp is a CUSO—built for credit unions and their members.
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">PCI & SOC 2 compliant</span>
            {!segment.showPlatforms && (
              <>
                <span className="spec-chip normal-case tracking-[0.02em] font-semibold text-slate-600 bg-white shadow-sm border-slate-200/60">
                  SDK • iFrame • API options
                </span>
                <RouteLink to="/solution" className="spec-chip normal-case tracking-[0.02em] font-semibold text-primary bg-primary/5 border-primary/30 shadow-sm hover:bg-primary/10 hover:border-primary/50 transition-colors inline-flex items-center h-9 px-4 rounded-xl border no-underline">
                  Explore our features
                </RouteLink>
              </>
            )}
          </div>
          {!segment.showPlatforms && (
            <div className="mt-5">
              <Button color="primary" className="nav-btn-base nav-btn-primary !rounded-xl !h-[42px] !px-6 elite-interactive hover:elite-interactive-hover text-[14px] font-bold shadow-md" startContent={<Icon icon="lucide:calendar" width={18} height={18} />} onClick={openDemoModal}>
                Book a demo
              </Button>
            </div>
          )}
        </div>

        {/* Pre-integrated platforms (Banks & Credit Unions) */}
        {segment.showPlatforms && (
          <div className="container-page pt-6 pb-10 md:pt-8 md:pb-12">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">
              {segment.audienceTerm === "members" ? "Pre-integrated into leading digital banking solutions" : "Pre-integrated digital banking platforms"}
            </p>
            <div className="max-w-4xl mx-auto">
              <PlatformPartnersBar variant="card" />
            </div>
            <p className="text-center mt-4 text-slate-600 text-[13px] md:text-[14px] italic">
              Typical implementation in just 30 to 45 days
            </p>
          </div>
        )}
      </section>

      {/* Credit Unions: Testimonials (Pinwheel-style) */}
      {isCreditUnions && (
        <section data-reveal="section" className="relative py-[var(--section-padding)] bg-white overflow-hidden border-b border-slate-200/60">
          <div className="container-page">
            <p className="section-kicker">Credit Union Testimonials</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
              Our happy clients say it best:
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                { name: "Service Credit Union", quote: "TBD quote.", attribution: "TBD, Title" },
                { name: "Chartway Credit Union", quote: "TBD quote.", attribution: "TBD, Title" },
                { name: "Advia Credit Union", quote: "TBD quote.", attribution: "TBD, Title" },
              ].map(({ name, quote, attribution }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <p className="text-slate-700 text-[15px] md:text-[16px] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <p className="text-[14px] font-semibold text-[var(--ink)]">{attribution}</p>
                    <p className="text-[13px] text-slate-600 mt-0.5">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fintechs: Testimonials (same layout as Credit Unions) */}
      {isFintech && (
        <section data-reveal="section" className="relative py-[var(--section-padding)] bg-white overflow-hidden border-b border-slate-200/60">
          <div className="container-page">
            <p className="section-kicker">Fintech Testimonials</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
              Our happy clients say it best:
            </h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {[
                { name: "DailyPay", quote: "TBD quote.", attribution: "TBD, Title" },
                { name: "NerdWallet", quote: "TBD quote.", attribution: "TBD, Title" },
                { name: "Kudos", quote: "TBD quote.", attribution: "TBD, Title" },
              ].map(({ name, quote, attribution }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-200/60 bg-slate-50/60 p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <p className="text-slate-700 text-[15px] md:text-[16px] leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <p className="text-[14px] font-semibold text-[var(--ink)]">{attribution}</p>
                    <p className="text-[13px] text-slate-600 mt-0.5">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fintechs: Integration (right after testimonials) */}
      {isFintech && (
        <section data-reveal="section" className="relative py-[var(--section-padding)] bg-white overflow-hidden border-b border-slate-200/60">
          <div className="container-page">
            <p className="section-kicker">Integration</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
              Ship the experience that fits your stack
            </h2>
            <p className="mt-4 text-slate-700 max-w-lg text-[15px] md:text-[16px] leading-relaxed">
              SDK, iFrame, or API. Ready-made UI or build your own.
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: "lucide:code", title: "SDK", desc: "Drop-in for React and native. Fastest path to branded bill UX." },
                { icon: "lucide:layout", title: "iFrame", desc: "Hosted flow, white-label. No front-end ownership." },
                { icon: "lucide:plug", title: "API", desc: "Build your own UI. Full control." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon icon={icon} width={24} height={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-[var(--ink)]">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button as={RouteLink as any} to="/developer" color="primary" className="nav-btn-base nav-btn-primary !rounded-xl !h-[42px] !px-6" startContent={<Icon icon="lucide:book-open" width={18} height={18} />}>
                Developer docs
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Banks & Credit Unions: How it works (same structure; members/credit union vs users/bank) */}
      {segment.showPlatforms && (
        <section data-reveal="section" className="relative py-[var(--section-padding)] bg-slate-50/80 overflow-hidden border-b border-slate-200/60">
          <div className="container-page">
            <p className="section-kicker">{slug === "credit-unions" ? "Member Experience" : slug === "banks" ? "User Experience" : segment.title}</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
              {slug === "credit-unions" || slug === "banks"
                ? "Turn ScribeUp on in your digital banking. We do the rest."
                : "Plug into your transaction feed. We do the rest."}
            </h2>
            <p className="mt-4 text-slate-700 max-w-xl text-[15px] md:text-[16px] leading-relaxed">
              {slug === "credit-unions"
                ? "We connect to your digital platform to populate our experience and connect to members' transactions."
                : slug === "banks"
                  ? "We connect to your digital platform to populate our experience and connect to users' transactions."
                  : `We connect to your core or digital platform and auto-detect your ${segment.audienceTerm}' cards on file. Subscription management off the shelf + 11% refinancing when we detect third-party loans.`}
            </p>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {(slug === "credit-unions"
                ? [
                    { icon: "lucide:layout", title: "Embedded tracking & management", desc: "Subscription Management experience seamlessly added into digital banking, similar to credit score tracking tools. Members can track their bills, 1-click cancel subscriptions & so much more." },
                    { icon: "lucide:search", title: "Auto-detect bills", desc: "We connect via digital banking to your transaction feed to auto-detect and track any recurring bills your member is spending with your credit union. No member set-up or core integration needed." },
                    { icon: "lucide:scan-search", title: "Find bills on external accounts", desc: "Members can scan in external financial relationships to find and migrate bills to your credit union. No additional integration required." },
                    { icon: "lucide:bell", title: "Personalized alerts & nudges", desc: "Members receive bill alerts, connect upcoming bills onto their personal calendars & receive personalized 'ways to save' (including refinancing 3rd party loan bills with your credit union)." },
                  ]
                : slug === "banks"
                  ? [
                      { icon: "lucide:layout", title: "Embedded tracking & management", desc: "Subscription Management experience seamlessly added into digital banking, similar to credit score tracking tools. Users can track their bills, 1-click cancel subscriptions & so much more." },
                      { icon: "lucide:search", title: "Auto-detect bills", desc: "We connect via digital banking to your transaction feed to auto-detect and track any recurring bills your users are spending with your bank. No user set-up or core integration needed." },
                      { icon: "lucide:scan-search", title: "Find bills on external accounts", desc: "Users can scan in external financial relationships to find and migrate bills to your bank. No additional integration required." },
                      { icon: "lucide:bell", title: "Personalized alerts & nudges", desc: "Users receive bill alerts, connect upcoming bills onto their personal calendars & receive personalized 'ways to save' (including refinancing 3rd party loan bills with your bank)." },
                    ]
                  : [
                    { icon: "lucide:activity", title: "Transaction feed", desc: `We plug into your feed; see where your ${segment.audienceTerm} pay bills.` },
                    { icon: "lucide:credit-card", title: "Auto-detect cards", desc: `Detect which of your ${segment.audienceTerm}' cards are on file—no linking.` },
                    { icon: "lucide:trending-up", title: "Cross-sell", desc: "Right offers, right time—bill and payment data." },
                    { icon: "lucide:refresh-cw", title: "11% refinancing", desc: "When we detect third-party loans, refinancing converts at 11%." },
                  ]
              ).map(({ icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon icon={icon} width={24} height={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-[var(--ink)]">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content: Credit Unions = value toggle + live demo; others = ServePanel */}
      <section data-reveal="section" className="relative pt-[calc(var(--section-padding)*2.4)] pb-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.10] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_18%_12%,rgba(84,100,255,0.04),transparent_66%),radial-gradient(55%_55%_at_86%_18%,rgba(30,162,255,0.03),transparent_70%)]" />
        <div className="container-page">
          {isCreditUnions ? (
            <>
              <p className="section-kicker mb-4">Value for Credit Unions</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-3xl">
                Subscription management experiences that drive revenue-generating outcomes for Credit Unions
              </h2>
              <p className="text-slate-600 text-[14.5px] md:text-[16px] max-w-2xl leading-relaxed mt-4">
                Toggle each outcome to see the member experience that drives it—card primacy, member retention, and refinancing leads—inside your digital banking app.
              </p>
              <div className="mt-10">
                <CreditUnionsValueSection metrics={segment.metrics} openDemoModal={openDemoModal} />
              </div>
            </>
          ) : isBanks ? (
            <>
              <p className="section-kicker mb-4">Value for Banks</p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-3xl">
                Subscription management experiences that drive revenue-generating outcomes for Banks
              </h2>
              <p className="text-slate-600 text-[14.5px] md:text-[16px] max-w-2xl leading-relaxed mt-4">
                Toggle each outcome to see the user experience that drives it—card primacy, retention, and refinancing leads—inside your digital banking app.
              </p>
              <div className="mt-10">
                <CreditUnionsValueSection metrics={segment.metrics} openDemoModal={openDemoModal} />
              </div>
            </>
          ) : (
            <>
              <p className="section-kicker mb-10">Why {segment.title} choose ScribeUp</p>
              <div className="mt-6">
                <ServePanel segment={segment} openDemoModal={openDemoModal} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Fintechs: Premium upsell & personalized nudges */}
      {isFintech && (
        <>
          <section data-reveal="section" className="relative py-[var(--section-padding)] bg-slate-50/80 overflow-hidden border-b border-slate-200/60">
            <div className="container-page">
              <p className="section-kicker">Upsell and Cross-Sell</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
                Upsell to your premium plans or cross-sell your core products
              </h2>
              <p className="mt-4 text-slate-700 max-w-xl text-[15px] md:text-[16px] leading-relaxed">
                Bill and payment experience to upgrade users to premium plans and to nudge the right product—personal loans, EWA, insurance, investing and more.
              </p>
              <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: "lucide:crown", title: "Premium upsell", desc: "Nudge upgrades with bill and spending insights." },
                  { icon: "lucide:hand-heart", title: "Personal loans", desc: "Relevant loan and refinancing nudges from debt and payment patterns." },
                  { icon: "lucide:wallet", title: "EWA, savings & more", desc: "Nudge your products when and how users pay bills." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon icon={icon} width={24} height={24} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-[var(--ink)]">{title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA — category-specific, adoption-focused */}
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
                  <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold mb-4">{segment.heroKicker}</div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--ink)] leading-[1.1]">
                    {segment.ctaHeadline}
                  </h3>
                  <p className="mt-6 text-slate-700 text-[17px] md:text-[18px] leading-relaxed">
                    {segment.ctaSubline}
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

export default CategoryPageShell;
