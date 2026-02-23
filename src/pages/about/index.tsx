import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDemoModal } from "../../components/demo-modal-context";
import { PlatformPartnersBar } from "../../components/platform-partners-bar";

function withBase(path: string) {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}

const TEAM = [
  { name: "Jordan Mackler", role: "Co-Founder & CEO", initial: "J", image: "assets/team/jordan-mackler.png" },
  { name: "Yohei Oka", role: "Co-Founder & CTO", initial: "Y", image: "assets/team/yohei-oka.png" },
  { name: "Erica Chiang", role: "Founding Team, CCO", initial: "E", image: "assets/team/erica-chiang.png" },
];

function TeamCard({ person }: { person: (typeof TEAM)[number] }) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const src = withBase(person.image);
  const showImage = !imgFailed;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200/60 bg-[linear-gradient(135deg,rgba(84,100,255,0.12),rgba(30,162,255,0.08))] flex items-center justify-center text-2xl font-bold text-slate-700 shrink-0">
        {showImage ? (
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          person.initial
        )}
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight text-[var(--ink)]">{person.name}</h3>
      <p className="mt-1 text-sm text-slate-600">{person.role}</p>
    </div>
  );
}

export default function About() {
  const { openDemoModal } = useDemoModal();

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
          <p className="section-kicker">About</p>
          <h1 className="mt-5 page-title max-w-4xl tracking-tight leading-[1.05]">
            Our story
          </h1>
          <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17px] leading-relaxed">
            ScribeUp was born from a simple frustration: the hassle of managing unwanted subscription charges. As MIT students, we experienced firsthand how easy it was to lose track of recurring payments—streaming, software, memberships. That pain point became a mission to empower people with a smarter way to manage their digital services.
          </p>
          <p className="mt-5 text-slate-700 max-w-2xl text-[16px] md:text-[17px] leading-relaxed">
            Today we give financial institutions an embeddable solution so their customers can track, optimize, and save on subscriptions and bills. Banks and fintechs use ScribeUp to boost engagement, drive loyalty, and unlock new revenue—with a seamless, intuitive experience.
          </p>
          <div className="mt-8">
            <Button
              color="primary"
              className="nav-btn-base nav-btn-primary !rounded-xl !h-[42px] !px-6"
              startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
              onClick={openDemoModal}
            >
              Book a demo
            </Button>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="relative py-[var(--section-padding)] bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.06] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
        <div className="container-page relative z-10">
          <p className="section-kicker">Our team</p>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] max-w-2xl">
            The people behind ScribeUp
          </h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-4xl">
            {TEAM.map((person) => (
              <TeamCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Backed by */}
      <section id="partners" className="relative py-[var(--section-padding)] bg-slate-50/80 overflow-hidden border-t border-slate-200/60">
        <div className="container-page relative z-10">
          <p className="section-kicker text-center">Our partners</p>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)] text-center">
            Backed by
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {["MIT", "Mucker", "MassChallenge"].map((name) => (
              <span key={name} className="text-xl md:text-2xl font-bold tracking-tight text-slate-700">
                {name}
              </span>
            ))}
          </div>
          <p className="mt-12 section-kicker text-center">Platform partners</p>
          <div className="mt-6 max-w-4xl mx-auto">
            <PlatformPartnersBar variant="card" />
          </div>
        </div>
      </section>

      {/* Featured in */}
      <section className="relative py-[var(--section-padding)] bg-white overflow-hidden border-t border-slate-200/60">
        <div className="container-page relative z-10">
          <p className="section-kicker text-center">Featured in</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-14">
            <img src={withBase("assets/press/techcrunch.svg")} alt="TechCrunch" className="h-6 md:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={withBase("assets/press/fox-business.svg")} alt="Fox Business" className="h-6 md:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            <img src={withBase("assets/press/wsj.svg")} alt="Wall Street Journal" className="h-6 md:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-pad bg-white overflow-hidden pb-[100px] md:pb-[120px]">
        <div className="container-page">
          <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(84,100,255,0.2),rgba(255,255,255,0.8),rgba(30,162,255,0.1))] shadow-[0_24px_80px_rgba(2,6,23,0.08)]">
            <div className="rounded-[31px] bg-white/95 p-10 md:p-14 text-center">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--ink)]">
                Ready to see it in action?
              </h3>
              <p className="mt-4 text-slate-600 max-w-md mx-auto">
                We'll walk you through the embedded experience and how ScribeUp fits your stack.
              </p>
              <Button
                color="primary"
                className="mt-8 nav-btn-base nav-btn-primary !rounded-xl !h-[44px] !px-8"
                startContent={<Icon icon="lucide:calendar" width={18} height={18} />}
                onClick={openDemoModal}
              >
                Book a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
