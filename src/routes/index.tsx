import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

const Home = React.lazy(() => import("../pages/home"));
const Solution = React.lazy(() => import("../pages/solution"));
const WhoWeServe = React.lazy(() => import("../pages/who-we-serve"));
const Developer = React.lazy(() => import("../pages/developer"));
const Company = React.lazy(() => import("../pages/company"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    // Smooth scrolling here fights pinned/sticky sections + ScrollTrigger in some browsers.
    // Keep route transitions deterministic.
    if (!hash || hash.length <= 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    // Support hash anchors for section deep-links (robust across lazy routes + AnimatePresence).
    const id = hash.slice(1);
    let raf = 0;
    let tries = 0;
    const maxTries = 40; // ~40 frames (~650ms) is enough for lazy mounts in this app

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start", inline: "nearest", behavior: "auto" });
        return;
      }
      tries += 1;
      if (tries >= maxTries) return;
      raf = window.requestAnimationFrame(tryScroll);
    };

    // Kick off after a tick so location has settled.
    window.setTimeout(() => {
      raf = window.requestAnimationFrame(tryScroll);
    }, 0);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pathname, hash]);
  return null;
}

export function Routes() {
  return (
    <>
      <ScrollToTop />
      <React.Suspense fallback={<div className="container-page py-16 text-default-500">Loading…</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/solution" component={Solution} />
          <Route exact path="/who-we-serve" component={WhoWeServe} />
          <Route exact path="/developer" component={Developer} />
          <Route exact path="/company" component={Company} />
          <Redirect to="/" />
        </Switch>
      </React.Suspense>
    </>
  );
}