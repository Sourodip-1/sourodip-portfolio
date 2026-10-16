"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * LenisBridge: keeps window.__lenis consistently assigned across React re-renders & Strict Mode
 */
function LenisBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      (window as any).__lenis = lenis;
    }
  }, [lenis]);

  // Hook into scroll ticks as backup to ensure the global instance is never missing
  useLenis((activeLenis) => {
    if (activeLenis && (window as any).__lenis !== activeLenis) {
      (window as any).__lenis = activeLenis;
    }
  });

  return null;
}

/**
 * Universal scroll helper that prefers Lenis smooth scrolling with fallback to native window.scrollTo
 */
export function scrollToSection(target: string | number, offset: number = -20) {
  if (typeof window === "undefined") return;

  const lenis = (window as any).__lenis;

  if (typeof target === "number") {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const cleanId = target.replace(/^#/, "");
  if (cleanId === "top" || cleanId === "home") {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  const el = document.getElementById(cleanId);
  if (el) {
    if (lenis) {
      lenis.scrollTo(el, { offset, duration: 1.2 });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + offset, behavior: "smooth" });
    }
  } else {
    console.warn(`[scrollToSection] Element with id "${cleanId}" not found.`);
  }
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.095,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        syncTouch: false,
        autoRaf: true,
      }}
    >
      <LenisBridge />
      {children}
    </ReactLenis>
  );
}

export { useLenis };
