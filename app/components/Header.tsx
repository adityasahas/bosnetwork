"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

interface HeaderProps {
  founderCount: number;
}

export default function Header({ founderCount }: HeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Stagger in each line of the header
      gsap.from(".header-item", {
        autoAlpha: 0,
        y: 12,
        stagger: 0.09,
        duration: 0.5,
        ease: "power2.out",
      });

      // Counter tick-up (runs concurrently with stagger)
      if (!counterRef.current) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: founderCount,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.25,
        snap: { value: 1 },
        onUpdate() {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(obj.value));
          }
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <h1 className="header-item text-4xl font-semibold tracking-tight text-foreground">
        bos.network
      </h1>
      <p className="header-item mt-3 text-secondary text-sm leading-relaxed max-w-sm">
        the official directory for startup founders from boston &amp; cambridge —
        mit, harvard, northeastern, bu, tufts, and bc.
      </p>
      <p className="header-item mt-3 text-secondary text-sm">
        want to join?{" "}
        <a
          href="/form"
          className="underline underline-offset-2 text-foreground hover:text-secondary transition-colors"
        >
          request access
        </a>
      </p>
      <p className="header-item mt-5 text-muted text-sm">
        <span ref={counterRef} className="text-foreground font-medium tabular-nums">
          0
        </span>{" "}
        founders
      </p>
    </div>
  );
}
