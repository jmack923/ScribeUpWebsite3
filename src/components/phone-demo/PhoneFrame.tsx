import * as React from "react";

export function PhoneFrame({
  children,
  className,
  contentClassName,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={[
        // Responsive: keep the device from dominating layouts (especially on desktop),
        // while still allowing callers to override via `className`.
        "relative mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px]",
        // Prevent flex/grid parents from shrinking the device into “only the notch shows”.
        "shrink-0 select-none",
        className ?? "",
      ].join(" ")}
    >
      {/* ambient device shadow (tight + wide) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 rounded-[56px] shadow-[0_10px_28px_rgba(2,6,23,0.10),0_42px_98px_rgba(40,80,180,0.16)]" />

      {/* device body */}
      <div className="relative rounded-[56px] p-[6.5px] bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(15,20,32,0.92))] shadow-[0_20px_54px_rgba(2,6,23,0.22)]">
        {/* screen */}
        <div
          className="relative rounded-[44px] overflow-hidden bg-[linear-gradient(180deg,#f9fbff,#eef3ff)]"
          style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          {/* glass highlight */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(80%_55%_at_18%_10%,rgba(255,255,255,0.16),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_46%)]" />
          {/* inner edge */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_-24px_56px_rgba(2,6,23,0.09)]" />

          {/* content */}
          {/* Aspect-driven sizing + min-height safety net to prevent “only-notch” collapse in some flex/grid layouts. */}
          <div
            className={[
              "relative z-10 w-full aspect-[9/19.5] min-h-[520px] sm:min-h-[560px] lg:min-h-[600px]",
              contentClassName ?? "",
            ].join(" ")}
          >
            <div className="absolute inset-0">{children}</div>
          </div>
        </div>

        {/* notch */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[10px] -translate-x-1/2 h-[21px] w-[108px] rounded-full bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      </div>
    </div>
  );
}


