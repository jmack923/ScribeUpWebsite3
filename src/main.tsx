import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { VisibilityProvider } from "./components/performance/VisibilityManager";
import { DemoModalProvider } from "./components/demo-modal-context";

// Safari paint performance guardrails (keeps first paint crisp on older devices).
try {
  const ua = navigator.userAgent || "";
  const isSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|Edg|OPR|Brave)/i.test(ua);
  if (isSafari) document.documentElement.classList.add("is-safari");
} catch {}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider disableRipple reducedMotion="user" spinnerVariant="simple">
      <ToastProvider />
      <VisibilityProvider>
        <DemoModalProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
          </BrowserRouter>
        </DemoModalProvider>
      </VisibilityProvider>
    </HeroUIProvider>
  </React.StrictMode>
);// force update Wed Feb 18 12:09:58 EST 2026
