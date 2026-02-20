import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
  Button,
  Link as HeroLink,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import logoHorizontal from "../../Logo/MAINLOGO.hoirzontal-black-text-big.svg";
import logoSquare from "../../Logo/LOGOjustlogosquare-color.svg";
import { motion, useScroll, useSpring } from "framer-motion";
import { useDemoModal } from "./demo-modal-context";

export function SiteNavbar() {
  const { openDemoModal } = useDemoModal();
  const [scrolled, setScrolled] = React.useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Our Solution", to: "/solution" },
    { label: "Who We Serve", to: "/who-we-serve" },
    { label: "Company", to: "/company" },
    { label: "Developer", to: "/developer" },
  ];

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bottom-0 w-[3px] bg-blue-600 origin-top z-[60]"
        style={{ scaleY }}
      />
      <Navbar
        maxWidth="xl"
      className={`${
        scrolled ? "top-float-nav mt-4 md:mt-6" : "mt-4 md:mt-6 bg-transparent border border-transparent shadow-none backdrop-blur-none"
      } ${scrolled ? "h-[52px] min-h-[52px]" : "h-[56px] min-h-[56px]"} py-0 rounded-[32px] w-[calc(100%-2rem)] max-w-[1400px] mx-auto px-5 md:px-8 transition-all duration-300`}
    >
      <NavbarContent justify="start" className="flex-1 items-center h-full">
        <NavbarBrand>
          <HeroLink
            as={RouteLink}
            to="/"
            className="flex items-center gap-2 -ml-0.5 h-full"
            aria-label="ScribeUp home"
            onClick={(e) => {
              // If already on home, react-router won't remount; still scroll + re-init effects.
              if (pathname === "/") e.preventDefault();
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
              requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new Event("anm:refresh"))));
              window.setTimeout(() => window.dispatchEvent(new Event("anm:refresh")), 250);
            }}
          >
            <img
              src={logoHorizontal}
              alt="ScribeUp"
              className="h-[18px] w-auto object-contain"
              decoding="async"
            />
          </HeroLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-10 h-full">
        {navItems.map((item) => {
          const active = pathname === item.to;
          return (
            <NavbarItem key={item.to}>
              <HeroLink
                as={RouteLink}
                to={item.to}
                className={`h-[28px] px-3 rounded-lg text-[11.5px] font-medium tracking-[-0.01em] leading-none transition-colors inline-flex items-center ${
                  active
                    ? "text-[var(--ink)] bg-slate-900/[0.04]"
                    : "text-slate-600 hover:text-[var(--ink)] hover:bg-slate-900/[0.04]"
                }`}
              >
                {item.label}
              </HeroLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end" className="flex-1 items-center justify-end gap-2 h-full">
        <NavbarItem>
          <Button
            variant="solid"
            color="primary"
            className="nav-btn-base nav-btn-primary btn-focus btn-sheen !rounded-[12px] !h-[26px] !px-3.5 text-[11.5px] elite-cta"
            onClick={openDemoModal}
          >
            Book a demo
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </>
  );
}