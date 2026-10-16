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
import FooterContactSection from "@/components/FooterContactSection";
import VisitorTestimonialsSection from "@/components/VisitorTestimonialsSection";
import InterludeSection from "@/components/InterludeSection";
import GlobalFloatingMenu from "@/components/GlobalFloatingMenu";
import { scrollToSection } from "@/components/SmoothScroll";

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
    const navigateToTarget = (target: string | number) => {
      // Dismiss splash entrance if still active so the destination is immediately revealed
      setShowEntrance(false);
      setIsRevealing(false);
      setHeroRevealed(true);
      scrollToSection(target, -20);
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

      // Do not hijack browser/system shortcuts (Cmd+4, Ctrl+4, Alt+4)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key;
      const code = e.code;

      if (key === "0" || code === "Digit0" || code === "Numpad0") {
        e.preventDefault();
        navigateToTarget(0);
      } else if (key === "1" || code === "Digit1" || code === "Numpad1") {
        e.preventDefault();
        navigateToTarget("work");
      } else if (key === "2" || code === "Digit2" || code === "Numpad2") {
        e.preventDefault();
        navigateToTarget("about");
      } else if (key === "3" || code === "Digit3" || code === "Numpad3") {
        e.preventDefault();
        navigateToTarget("experience");
      } else if (key === "4" || code === "Digit4" || code === "Numpad4") {
        e.preventDefault();
        navigateToTarget("interlude");
      } else if (key === "5" || code === "Digit5" || code === "Numpad5") {
        e.preventDefault();
        navigateToTarget("contact");
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

        {/* ── 04 INTERLUDE SECTION (THE STORY OF HOW THIS SITE IS THEMED) ── */}
        <div id="interlude" className="relative w-full scroll-mt-6">
          {/* Simple Traditional Page Divider as entrance threshold */}
          <TraditionalPageDivider />
          <InterludeSection />
        </div>

        {/* ── 05 VISITOR TESTIMONIALS SECTION (ABOVE CONTACT) ── */}
        <VisitorTestimonialsSection />

        {/* ── 06 FOOTER & CONTACT TRANSMISSION SECTION ── */}
        <FooterContactSection />
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
