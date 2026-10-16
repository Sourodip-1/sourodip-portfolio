"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { SOUND_TRACKS } from "./SoundControlMenu";
import { useLenis } from "./SmoothScroll";

export default function GlobalFloatingMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicHovered, setIsMusicHovered] = useState(false);
  const [time, setTime] = useState("");
  const [musicState, setMusicState] = useState<{
    currentTrackIdx: number;
    volume: number;
    isMuted: boolean;
  }>({
    currentTrackIdx: 0,
    volume: 0.2,
    isMuted: false,
  });

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const musicListRef = useRef<HTMLDivElement>(null);

  // Check scroll position: hidden on the first frame (Hero section),
  // pops up from the right when leaving the Hero section and entering the Work section.
  const checkVisibility = useCallback(() => {
    const workEl = document.getElementById("work");
    if (workEl) {
      const rect = workEl.getBoundingClientRect();
      // Work section starts approaching/enters viewport
      const enteredWork = rect.top <= window.innerHeight * 0.75;
      setIsVisible((prev) => {
        if (!enteredWork && prev) {
          // Scrolled back up to Hero: close any active popups
          setIsOpen(false);
          setIsMusicHovered(false);
        }
        return enteredWork;
      });
    } else {
      const passedHero = window.scrollY > window.innerHeight * 0.6;
      setIsVisible((prev) => {
        if (!passedHero && prev) {
          setIsOpen(false);
          setIsMusicHovered(false);
        }
        return passedHero;
      });
    }
  }, []);

  // Hook into Lenis scroll updates
  useLenis(() => {
    checkVisibility();
  });

  // Standard scroll & resize listeners for initial mount and non-Lenis fallback
  useEffect(() => {
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [checkVisibility]);

  // Sync music state from singleton audio player
  useEffect(() => {
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{
        currentTrackIdx: number;
        volume: number;
        isMuted: boolean;
      }>;
      if (custom.detail) {
        setMusicState({
          currentTrackIdx: custom.detail.currentTrackIdx ?? 0,
          volume: custom.detail.volume ?? 0.2,
          isMuted: custom.detail.isMuted ?? false,
        });
      }
    };

    const handleOpen = () => {
      setIsVisible(true);
      setIsOpen(true);
    };

    window.addEventListener("music-state-sync", handleSync);
    window.addEventListener("open-floating-menu", handleOpen);
    window.dispatchEvent(new CustomEvent("request-music-state"));

    return () => {
      window.removeEventListener("music-state-sync", handleSync);
      window.removeEventListener("open-floating-menu", handleOpen);
    };
  }, []);

  // Update IST clock in one line
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsMusicHovered(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsMusicHovered(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Isolate wheel scrolling inside the music list so it never scrolls the page
  useEffect(() => {
    const el = musicListRef.current;
    if (!el || !isMusicHovered) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [isMusicHovered]);

  const handleVolumeChange = (newVol: number) => {
    setMusicState((prev) => ({ ...prev, volume: newVol }));
    window.dispatchEvent(
      new CustomEvent("set-music-volume", { detail: { volume: newVol } })
    );
  };

  const handleMuteToggle = () => {
    sound.playClick(520);
    window.dispatchEvent(new CustomEvent("toggle-music-mute"));
  };

  const handleSelectTrack = (idx: number) => {
    sound.playClick(600);
    window.dispatchEvent(
      new CustomEvent("select-music-track", { detail: { index: idx } })
    );
  };

  const navLinks = [
    { num: "00", label: "HOME", href: "#top" },
    { num: "01", label: "WORK", href: "#work" },
    { num: "02", label: "ABOUT", href: "#about" },
    { num: "03", label: "EXPERIENCE", href: "#experience" },
    { num: "04", label: "PLAYGROUND", href: "#playground" },
    { num: "05", label: "CONTACT", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick(550);
    setIsOpen(false);
    setIsMusicHovered(false);
    if (href === "#top" || href === "#home") {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeTrack = SOUND_TRACKS[musicState.currentTrackIdx] || SOUND_TRACKS[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuContainerRef}
          key="global-floating-menu-root"
          initial={{ opacity: 0, x: 60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 26,
            mass: 0.7,
          }}
          className="fixed top-3.5 right-4 sm:top-4 sm:right-6 z-50 select-none font-mono"
        >
          {/* ── FLOATING TRIGGER PILL BUTTON ───────────────────────────────────── */}
          <button
            id="global-floating-menu-btn"
            onClick={() => {
              sound.playClick(580);
              setIsOpen((prev) => !prev);
            }}
            className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-200 cursor-pointer ${
              isOpen
                ? "bg-[#0047FF] text-white border-[#0047FF] shadow-[0_4px_20px_rgba(0,71,255,0.35)]"
                : "bg-white/85 text-black hover:border-[#0047FF] hover:bg-white border-black/10 hover:shadow-[0_4px_20px_rgba(0,71,255,0.12)]"
            }`}
            title="Site Navigation & Audio Matrix"
          >
        <span className="text-[10px] font-bold tracking-widest uppercase">
          {isOpen ? "CLOSE" : "MENU"}
        </span>

        {/* 3-bar hamburger or close cross */}
        <div className="flex flex-col justify-center gap-[2.5px] w-3 h-2.5">
          {isOpen ? (
            <div className="relative w-3 h-3 flex items-center justify-center">
              <span className="absolute w-3 h-[1.5px] bg-white rotate-45" />
              <span className="absolute w-3 h-[1.5px] bg-white -rotate-45" />
            </div>
          ) : (
            <>
              <span className="w-full h-[1.5px] bg-black/75 group-hover:bg-[#0047FF] rounded-full transition-colors" />
              <span className="w-2 h-[1.5px] bg-black/75 group-hover:bg-[#0047FF] rounded-full self-end transition-colors" />
              <span className="w-full h-[1.5px] bg-black/75 group-hover:bg-[#0047FF] rounded-full transition-colors" />
            </>
          )}
        </div>
      </button>

      {/* ── POPUP MENU BOX (OPENS DIRECTLY BELOW THE FLOATING BUTTON) ───────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-full right-0 mt-2 w-60 sm:w-64 bg-white/95 backdrop-blur-2xl border border-[#0047FF]/25 shadow-[0_20px_50px_rgba(0,71,255,0.14),0_6px_20px_rgba(0,0,0,0.08)] rounded-xl p-3 z-50 origin-top-right text-black"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.07] mb-2 text-[9px] text-black/45">
              <span className="font-bold text-[#0047FF] tracking-wider uppercase">
                // NAVIGATION
              </span>
              <span className="tabular-nums tracking-wider">{time} IST</span>
            </div>

            {/* Nav list */}
            <div className="space-y-1">
              {navLinks.map((item) => (
                <button
                  key={item.num}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => sound.playHover(450)}
                  className="w-full group flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-transparent hover:border-[#0047FF]/20 hover:bg-[#0047FF]/5 transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-[#0047FF] font-bold">
                      [{item.num}]
                    </span>
                    <span className="text-[11px] font-bold tracking-wider text-black/85 group-hover:text-[#0047FF] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[10px] text-black/25 group-hover:text-[#0047FF] group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="my-2 border-t border-black/[0.07]" />

            {/* ── MUSIC TRIGGER ROW (HOVER REVEALS LEFT GOOEY PHYSICS PANEL) ── */}
            <div
              onMouseEnter={() => {
                sound.playHover(500);
                setIsMusicHovered(true);
              }}
              onClick={() => {
                sound.playClick(540);
                setIsMusicHovered((prev) => !prev);
              }}
              className={`relative group flex items-center justify-between px-2.5 py-2 rounded-lg border transition-all cursor-pointer ${
                isMusicHovered
                  ? "bg-[#0047FF]/10 border-[#0047FF]/40 text-[#0047FF]"
                  : "bg-black/[0.02] border-black/[0.06] hover:border-[#0047FF]/25 hover:bg-[#0047FF]/5 text-black/85"
              }`}
            >
              <div className="flex items-center gap-2">
                {/* Animated mini equalizer */}
                <div className="flex items-end gap-[1.5px] h-3 w-3">
                  <span className="w-[2px] h-[60%] bg-[#0047FF] animate-pulse rounded-full" />
                  <span className="w-[2px] h-[100%] bg-[#0047FF] animate-pulse rounded-full" style={{ animationDelay: "0.15s" }} />
                  <span className="w-[2px] h-[40%] bg-[#0047FF] animate-pulse rounded-full" style={{ animationDelay: "0.3s" }} />
                </div>
                <span className="text-[10.5px] font-bold tracking-wider">
                  MUSIC MATRIX
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[9px]">
                <span className="font-semibold text-[#0047FF]">
                  {Math.round(musicState.volume * 100)}%
                </span>
                <span className={`text-[11px] transition-transform duration-200 ${isMusicHovered ? "-translate-x-0.5 text-[#0047FF]" : "text-black/35"}`}>
                  ◀
                </span>
              </div>
            </div>

            {/* Footer shortcuts */}
            <div className="mt-2.5 pt-2 border-t border-black/[0.06] flex items-center justify-between text-[8.5px] text-black/40">
              <span>[M] TOGGLE MUTE</span>
              <span className="text-[#0047FF]">HOVER ◀ TO EXPAND</span>
            </div>

            {/* ── EXPANDABLE MUSIC POPUP TO THE LEFT (PHYSICS & GOOEY SIMULATION) ─ */}
            <AnimatePresence>
              {isMusicHovered && (
                <motion.div
                  key="music-physics-popout"
                  data-lenis-prevent
                  initial={{ opacity: 0, x: 24, scale: 0.94 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 16, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 480,
                    damping: 26,
                    mass: 0.65,
                  }}
                  className="absolute top-0 right-full mr-2.5 w-64 bg-white/95 backdrop-blur-2xl border border-[#0047FF]/25 shadow-[0_20px_50px_rgba(0,71,255,0.15),0_6px_20px_rgba(0,0,0,0.08)] rounded-xl p-3 select-none text-black z-50 origin-top-right"
                  onMouseEnter={() => setIsMusicHovered(true)}
                  onMouseLeave={() => setIsMusicHovered(false)}
                >
                  {/* Gooey connector bridge indicator */}
                  <div className="absolute top-4 -right-2 w-2 h-4 bg-transparent border-t-2 border-r-2 border-[#0047FF]/30 rounded-tr-sm pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-black/[0.07] mb-2 text-[9px]">
                    <div className="flex items-center gap-1.5 font-bold text-[#0047FF] tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
                      <span>AUDIO MATRIX</span>
                    </div>
                    <span className="text-black/40 tracking-wider">6 TRACKS</span>
                  </div>

                  {/* Mini Now Playing Card */}
                  <div className="p-2 rounded-lg bg-[#0047FF]/5 border border-[#0047FF]/20 mb-2.5 flex items-center gap-2.5">
                    <div className="relative w-7 h-7 rounded overflow-hidden flex-shrink-0 bg-black/5 shadow-inner">
                      <img
                        src={activeTrack.cover}
                        alt={activeTrack.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#0047FF]/30 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold text-black truncate">
                        {activeTrack.title}
                      </div>
                      <div className="text-[8.5px] text-black/50 truncate">
                        {activeTrack.artist}
                      </div>
                    </div>
                  </div>

                  {/* Quick Volume & Mute */}
                  <div className="p-2 rounded-lg bg-black/[0.02] border border-black/[0.05] mb-2.5">
                    <div className="flex items-center justify-between mb-1.5 text-[9px]">
                      <span className="font-bold text-black tracking-wider uppercase">
                        VOL: {Math.round(musicState.volume * 100)}%
                      </span>
                      <button
                        onClick={handleMuteToggle}
                        className="text-[#0047FF] hover:underline font-semibold cursor-pointer uppercase"
                      >
                        {musicState.isMuted ? "[UNMUTE]" : "[MUTE] (M)"}
                      </button>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={musicState.volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-full h-1 bg-black/10 rounded appearance-none cursor-pointer accent-[#0047FF]"
                    />
                  </div>

                  {/* 6 Track Library (Small Fonts, Click to Play, Download .wav) */}
                  <div className="text-[9px] font-bold text-black/60 uppercase mb-1.5 tracking-wider flex items-center justify-between">
                    <span>LIBRARY</span>
                    <span className="text-[8px] text-black/40 lowercase">click • download</span>
                  </div>

                  <div
                    ref={musicListRef}
                    data-lenis-prevent
                    className="space-y-1 max-h-44 overflow-y-auto overscroll-contain pr-1 custom-scrollbar"
                  >
                    {SOUND_TRACKS.map((track, idx) => {
                      const isCurrent = musicState.currentTrackIdx === idx;
                      return (
                        <div
                          key={track.src}
                          onClick={() => handleSelectTrack(idx)}
                          className={`group flex items-center justify-between p-1.5 rounded-md border transition-all cursor-pointer ${
                            isCurrent
                              ? "bg-[#0047FF]/10 border-[#0047FF]/40 text-[#0047FF]"
                              : "bg-white border-black/[0.05] hover:bg-black/[0.02] hover:border-black/15 text-black/80"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0 flex-1">
                            <span className={`text-[8.5px] font-bold ${isCurrent ? "text-[#0047FF]" : "text-black/35"}`}>
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className={`text-[9.5px] font-semibold truncate ${isCurrent ? "text-[#0047FF]" : "text-black/85"}`}>
                              {track.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 flex-shrink-0 ml-1.5">
                            {isCurrent && (
                              <span className="text-[7.5px] px-1 py-0.2 rounded bg-[#0047FF] text-white font-bold tracking-wider">
                                ON
                              </span>
                            )}
                            <a
                              href={track.src}
                              download={`${track.title}.wav`}
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.playClick(650);
                              }}
                              className="p-1 rounded text-black/35 hover:text-[#0047FF] hover:bg-[#0047FF]/10 transition-colors"
                              title={`Download ${track.title} (.wav)`}
                            >
                              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>
  );
}
