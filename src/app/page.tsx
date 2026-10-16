"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import SplashEntrance from "@/components/SplashEntrance";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import IndianArchitecturalDivider from "@/components/IndianArchitecturalDivider";
import ExperienceSection from "@/components/ExperienceSection";
import TraditionalPageDivider from "@/components/TraditionalPageDivider";
import InterludeSection from "@/components/InterludeSection";
import GlobalFloatingMenu from "@/components/GlobalFloatingMenu";

export default function Home() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [clipOrigin, setClipOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setClipOrigin({ x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) });
    }
  }, []);

  // Send user to top on reload and prevent restoring lower scroll positions behind splash screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Prevent background scroll while splash screen is displaying
  useEffect(() => {
    if (showEntrance) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showEntrance]);

  // Global shortcuts:
  // 0 -> Home/top
  // 1 -> Works
  // 2 -> About
  // 3 -> Experience
  // 4 -> Interlude
  // 5 -> Contact
  useEffect(() => {
    const scrollToTarget = (target: string | number) => {
      const lenis = (window as any).__lenis;
      if (typeof target === "number") {
        if (lenis) {
          lenis.scrollTo(target, { duration: 1.2 });
        } else {
          window.scrollTo({ top: target, behavior: "smooth" });
        }
        return;
      }
      const el = document.getElementById(target);
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: 0, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      switch (e.key) {
        case "0":
          e.preventDefault();
          scrollToTarget(0);
          break;
        case "1":
          e.preventDefault();
          scrollToTarget("work");
          break;
        case "2":
          e.preventDefault();
          scrollToTarget("about");
          break;
        case "3":
          e.preventDefault();
          scrollToTarget("experience");
          break;
        case "4":
          e.preventDefault();
          scrollToTarget("interlude");
          break;
        case "5":
          e.preventDefault();
          scrollToTarget("contact");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOriginReady = useCallback((origin: { x: number; y: number }) => {
    setClipOrigin((prev) => {
      const nx = Math.round(origin.x);
      const ny = Math.round(origin.y);
      if (Math.abs(prev.x - nx) < 1 && Math.abs(prev.y - ny) < 1) {
        return prev;
      }
      return { x: nx, y: ny };
    });
  }, []);

  const handleStartReveal = useCallback((origin: { x: number; y: number }) => {
    setClipOrigin({ x: Math.round(origin.x), y: Math.round(origin.y) });
    setIsRevealing(true);
    // Portrait slides up slightly after the clip-path circle starts blooming
    setTimeout(() => setHeroRevealed(true), 200);
  }, []);

  const handleEntranceComplete = useCallback(() => {
    setShowEntrance(false);
    setIsRevealing(false);
    setHeroRevealed(true);
  }, []);

  const handleEntranceSkip = useCallback(() => {
    setShowEntrance(false);
    setIsRevealing(false);
    setHeroRevealed(true);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setIsRevealing(false);
    setHeroRevealed(false);
    setShowEntrance(true);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-white text-black selection:bg-[#0047FF] selection:text-white overflow-x-clip">
      {/* Site-wide Floating Hamburger & Physics Gooey Music Menu */}
      <GlobalFloatingMenu />

      {/* Hero Homepage Layer */}
      <div className="w-full relative" style={{ zIndex: 10 }}>
        <Hero
          onReplayIntro={handleReplayIntro}
          portraitRevealed={heroRevealed}
          introActive={showEntrance}
          isRevealing={isRevealing}
        />
        {/* Work Section with TextLoop Marquee & Seamless Blue Transition */}
        <WorkSection />

        {/* ── 02 ABOUT SECTION (MODULAR BLOCKS & SITTING POSE) ───────────── */}
        <AboutSection />

        {/* ── INDIAN ARCHITECTURAL SECTION DIVIDER (THRESHOLD TO 03 EXPERIENCE) ── */}
        <div className="relative w-full">
          <IndianArchitecturalDivider
            topColor="#FFFFFF"
            bottomColor="#FAFAFA"
          />

          {/* ── 03 EXPERIENCE SECTION (INDIAN STYLE PHILOSOPHY & PILLARS) ─── */}
          <ExperienceSection />
        </div>

        {/* ── SIMPLE TRADITIONAL PAGE DIVIDER (THRESHOLD TO 04 INTERLUDE) ── */}
        <TraditionalPageDivider />

        {/* ── 04 INTERLUDE SECTION (THE STORY OF HOW THIS SITE IS THEMED) ── */}
        <InterludeSection />

        <footer id="contact" className="w-full bg-black text-white py-20 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 font-mono text-xs">
            <div>
              <div className="text-lg font-bold font-display uppercase tracking-tight mb-2">SOURODIP ROY</div>
              <p className="text-white/50 text-[11px]">Systems thinking. Creative problem solving. Impact through technology.</p>
            </div>
            <div className="flex items-center gap-6 text-white/70">
              <a href="mailto:contact@sourodip.dev" className="hover:text-white transition-colors">
                [CONTACT@SOURODIP.DEV]
              </a>
              <a href="#work" className="text-[#0047FF] hover:underline">
                [TOP ↑]
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Splash Entrance Layer */}
      <AnimatePresence>
        {showEntrance && (
          <SplashEntrance
            onOriginReady={handleOriginReady}
            onStartReveal={handleStartReveal}
            onComplete={handleEntranceComplete}
            onSkip={handleEntranceSkip}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
