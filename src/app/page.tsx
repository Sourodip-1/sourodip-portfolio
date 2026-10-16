"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import SplashEntrance from "@/components/SplashEntrance";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import IndianArchitecturalDivider from "@/components/IndianArchitecturalDivider";
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
  // 4 -> Playground
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
          scrollToTarget("playground");
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

          {/* ── 03 EXPERIENCE SECTION ────────────────────────────────────────── */}
          <section id="experience" className="w-full bg-[#FAFAFA] pt-8 pb-20 px-6 sm:px-10 md:px-14 lg:px-20 select-none">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-black/10">
                <div>
                  <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#0047FF] uppercase tracking-[0.28em] font-semibold mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#0047FF] animate-pulse" />
                    <span>03 // CAREER &amp; TRACK RECORD</span>
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black uppercase">
                    Proven Trajectory.
                  </h2>
                </div>

                <div className="max-w-md font-mono text-[11px] sm:text-[12px] text-black/60 leading-relaxed border-l-2 border-[#0047FF] pl-4">
                  <p>
                    From high-throughput distributed systems to bespoke spatial web engineering — a timeline of architected impact.
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-[9.5px] uppercase tracking-wider text-black/40">
                    <span>TIMELINE: 2022 — PRESENT</span>
                    <span>•</span>
                    <span className="text-[#0047FF] font-semibold">STATUS: ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Experience Timeline Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    period: "2024 — PRESENT",
                    role: "Lead Systems Architect & Creative Dev",
                    team: "Distributed Systems & Creative Labs",
                    desc: "Architecting high-throughput media pipelines, edge caching infrastructure, and bespoke GPU shader toolkits.",
                    tags: ["Next.js 16", "Rust / WASM", "WebGL / Shaders", "Edge Pipelines"],
                  },
                  {
                    period: "2023 — 2024",
                    role: "Senior Full-Stack & Creative Engineer",
                    team: "Interactive Platforms Group",
                    desc: "Built scalable web architectures with millisecond latency, custom physics animations, and fluid real-time multi-agent workflows.",
                    tags: ["TypeScript", "Distributed Queues", "GSAP / Framer", "TailwindCSS"],
                  },
                  {
                    period: "2022 — 2023",
                    role: "Systems & Frontend Engineer",
                    team: "Core Infrastructure",
                    desc: "Pioneered real-time telemetry dashboards, microservices integration, and developer tooling frameworks.",
                    tags: ["React", "Node.js", "Docker", "Cloudflare Workers"],
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white border border-black/10 hover:border-[#0047FF]/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,71,255,0.08)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-black/45 tracking-widest uppercase mb-4">
                        <span>{item.period}</span>
                        <span className="text-[#0047FF] font-semibold">0{idx + 1}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-black mb-1 group-hover:text-[#0047FF] transition-colors">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs text-black/50 mb-4">{item.team}</div>
                      <p className="font-mono text-xs text-black/70 leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-black/5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9.5px] px-2 py-1 bg-[#F5F7FA] border border-black/5 text-black/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section id="playground" className="w-full bg-white py-16 px-6 sm:px-12 border-t border-black/5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-black/60">
            <span className="font-semibold text-black uppercase tracking-wider">04 // PLAYGROUND</span>
            <span>INTERACTIVE CANVAS, GLSL SHADERS &amp; REAL-TIME EXPERIMENTS</span>
            <span className="text-[#0047FF]">EXPERIMENTAL / OPEN LAB</span>
          </div>
        </section>

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
