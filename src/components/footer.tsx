import React from "react";
import { Link } from "@heroui/react";
import { Link as RouteLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import logoHorizontal from "../../Logo/MAINLOGO.hoirzontal-black-text-big.svg";

export function SiteFooter() {
  return (
    <footer className="relative section-haze bg-white">
      {/* Atmospheric overlap into footer (no hard cut) */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 -top-20 h-40 bg-[radial-gradient(50%_65%_at_50%_70%,rgba(245,243,255,0.75),transparent_70%)] opacity-90" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 distance-grid opacity-[0.04] [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_72%)]" />
      <div className="container-page pt-20 md:pt-24 pb-14">
        <div className="rounded-[32px] p-[1px] bg-[linear-gradient(135deg,rgba(15,25,45,0.06),rgba(255,255,255,0.3),rgba(15,25,45,0.04))] shadow-[0_20px_72px_rgba(15,25,45,0.04)]">
          <div className="elite-card rounded-[32px] bg-white/90">
            <div className="px-8 py-12 md:px-12 md:py-14 grid grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr_1fr] gap-x-8 gap-y-10 md:gap-12 items-start">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <img
              src={logoHorizontal}
              alt="ScribeUp"
              className="h-[26px] w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="mt-3 text-sm text-slate-600 max-w-xs">
            Embedded recurring bill management infrastructure for modern financial institutions.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link as={RouteLink} to="/solution" className="hover:text-slate-900">Solution</Link></li>
            <li><Link as={RouteLink} to="/who-we-serve" className="hover:text-slate-900">Who We Serve</Link></li>
            <li><Link as={RouteLink} to="/developer" className="hover:text-slate-900">Developer</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">About</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><Link as={RouteLink} to="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors" aria-label="Privacy Policy">Privacy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">Security & Trust</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-500">
            <li><a href="#" className="hover:text-slate-900">Trust Center</a></li>
            <li><a href="#" className="hover:text-slate-900">Security</a></li>
            <li><a href="#" className="hover:text-slate-900">SOC2</a></li>
            <li><a href="#" className="hover:text-slate-900">Status</a></li>
          </ul>
        </div>
            </div>

            <div aria-hidden="true" className="mx-8 md:mx-12 elite-hairline opacity-[0.55]" />

            <div className="px-8 md:px-12 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-[11.5px] font-medium text-slate-500">
                <span>Security-first. Embedded. Built for regulated environments.</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-status-pulse" />
                  All systems operational
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-mono text-[10px] text-slate-400">
                  {/* Build tag removed */}
                </span>
              </div>
              <div className="flex gap-2">
                <a aria-label="LinkedIn" href="#" className="h-8 w-8 inline-flex items-center justify-center rounded-[10px] border border-slate-200/60 bg-white/50 hover:bg-white hover:border-slate-300 text-slate-400 hover:text-slate-700 transition-all">
                  <Icon icon="logos:linkedin-icon" width={14} height={14} />
                </a>
                <a aria-label="Twitter" href="#" className="h-8 w-8 inline-flex items-center justify-center rounded-[10px] border border-slate-200/60 bg-white/50 hover:bg-white hover:border-slate-300 text-slate-400 hover:text-slate-700 transition-all">
                  <Icon icon="logos:twitter" width={14} height={14} />
                </a>
                <a aria-label="Press" href="#" className="h-8 w-8 inline-flex items-center justify-center rounded-[10px] border border-slate-200/60 bg-white/50 hover:bg-white hover:border-slate-300 text-slate-400 hover:text-slate-700 transition-all">
                  <Icon icon="lucide:newspaper" width={14} height={14} style={{ strokeWidth: 1.5 }} />
                </a>
              </div>
              <div className="text-[11px] text-slate-400">
                © {new Date().getFullYear()} ScribeUp, Inc.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}