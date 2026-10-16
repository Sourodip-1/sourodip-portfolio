"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";

interface SplashProps {
  onOriginReady?: (origin: { x: number; y: number }) => void;
  onStartReveal?: (origin: { x: number; y: number }) => void;
  onComplete: () => void;
  onSkip?: () => void;
}

// ── Light-theme celestial clock ring (continuous slow motion, non-abrupt) ──────
function SplashClockRing({
  timeProgress,
  liveTime,
  size,
}: {
  timeProgress: number;
  liveTime: string;
  size: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sw = 1;
  const r = (size - sw * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const round = (val: number) => Math.round(val * 100) / 100;
  const circ = round(2 * Math.PI * r);
  const dashOff = round(circ * (1 - Math.max(0.01, timeProgress / 100)));
  const angle = ((timeProgress / 100) * 360 - 90) * (Math.PI / 180);
  const dotX = round(cx + r * Math.cos(angle));
  const dotY = round(cy + r * Math.sin(angle));

  if (!mounted) {
    return <div className="absolute inset-0 pointer-events-none" style={{ width: size, height: size }} />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
        {/* Soft radial halo */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,71,255,0.06)" strokeWidth={6} />

        {/* Outer continuous rotating tick ring (slow linear infinite) */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "revolveDial 180s linear infinite",
          }}
        >
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={sw} />
          {Array.from({ length: 48 }).map((_, i) => {
            const rad = ((i / 48) * 360 * Math.PI) / 180;
            const isMajor = i % 4 === 0;
            const len = isMajor ? 5 : 2.5;
            const x1 = round(cx + (r - len) * Math.cos(rad));
            const y1 = round(cy + (r - len) * Math.sin(rad));
            const x2 = round(cx + (r + 1) * Math.cos(rad));
            const y2 = round(cy + (r + 1) * Math.sin(rad));
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? "rgba(0,71,255,0.3)" : "rgba(0,0,0,0.1)"}
                strokeWidth={isMajor ? 1 : 0.6}
              />
            );
          })}
        </g>

        {/* Counter-rotating subtle concentric track */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: "revolveDialCounter 140s linear infinite",
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r * 0.78}
            fill="none"
            stroke="rgba(0,71,255,0.06)"
            strokeWidth={0.8}
            strokeDasharray="4 8"
          />
          <circle cx={cx} cy={cy} r={r * 0.52} fill="none" stroke="rgba(0,0,0,0.035)" strokeWidth={0.7} />
        </g>

        {/* Time-progress arc (cobalt, 24h) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(0,71,255,0.65)"
          strokeWidth={sw + 0.8}
          strokeDasharray={circ}
          strokeDashoffset={dashOff}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: `${cx}px ${cy}px`,
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Traveling dot */}
        <circle cx={dotX} cy={dotY} r={3.5} fill="#0047FF" />
        <circle cx={dotX} cy={dotY} r={7} fill="rgba(0,71,255,0.2)" />

        {/* Subtle crosshairs */}
        <line x1={cx - r * 0.45} y1={cy} x2={cx + r * 0.45} y2={cy} stroke="rgba(0,71,255,0.07)" strokeWidth={0.8} />
        <line x1={cx} y1={cy - r * 0.45} x2={cx} y2={cy + r * 0.45} stroke="rgba(0,71,255,0.07)" strokeWidth={0.8} />
      </svg>

      {/* Live time at top of ring in one unified horizontal line */}
      <div
        className="absolute font-mono text-center leading-none pointer-events-none flex items-center gap-1.5"
        style={{ top: "7.5%", left: "50%", transform: "translateX(-50%)" }}
      >
        <span className="text-[12.5px] font-semibold text-black/85 tracking-[0.14em] tabular-nums">
          {liveTime}
        </span>
        <span className="text-[9px] text-[#0047FF] font-semibold tracking-[0.2em]">
          IST
        </span>
      </div>

      {/* Coordinates at bottom of ring */}
      <div
        className="absolute font-mono text-[8.5px] text-black/35 tracking-[0.24em] text-center whitespace-nowrap pointer-events-none"
        style={{ bottom: "7.5%", left: "50%", transform: "translateX(-50%)" }}
      >
        22.5726° N · 88.3639° E
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function SplashEntrance({
  onOriginReady,
  onStartReveal,
  onComplete,
  onSkip,
}: SplashProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [liveTime, setLiveTime] = useState("");
  const [timeProgress, setTimeProgress] = useState(0);
  const portalRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  // Stable references for parent callbacks
  const onOriginReadyRef = useRef(onOriginReady);
  useEffect(() => {
    onOriginReadyRef.current = onOriginReady;
  }, [onOriginReady]);

  const onStartRevealRef = useRef(onStartReveal);
  useEffect(() => {
    onStartRevealRef.current = onStartReveal;
  }, [onStartReveal]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Live IST clock with accurate timezone formatting
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => {
      const now = new Date();
      const parts = formatter.formatToParts(now);
      const h = parts.find((p) => p.type === "hour")?.value ?? "00";
      const m = parts.find((p) => p.type === "minute")?.value ?? "00";
      setLiveTime(`${h}:${m}`);
      const hNum = parseInt(h, 10);
      const mNum = parseInt(m, 10);
      setTimeProgress(((hNum * 60 + mNum) / 1440) * 100);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // Measure portal center
  const getCoords = useCallback(() => {
    if (portalRef.current) {
      const rect = portalRef.current.getBoundingClientRect();
      return {
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      };
    }
    if (typeof window !== "undefined") {
      return {
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
      };
    }
    return { x: 0, y: 0 };
  }, []);

  // Notify parent once on mount and on window resize only
  useEffect(() => {
    const update = () => {
      if (onOriginReadyRef.current) {
        onOriginReadyRef.current(getCoords());
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getCoords]);

  // Trigger reveal transition
  const triggerReveal = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    const coords = getCoords();
    if (onStartRevealRef.current) onStartRevealRef.current(coords);
    sound.playTransition();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("unlock-and-play-audio"));
      window.dispatchEvent(new CustomEvent("play-music"));
    }
    setIsExiting(true);
    setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1100);
  }, [getCoords]);

  // 3-second countdown
  useEffect(() => {
    const start = Date.now();
    const dur = 3200;
    const iv = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / dur) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(iv);
        setTimeout(() => triggerReveal(), 350);
      }
    }, 30);
    return () => clearInterval(iv);
  }, [triggerReveal]);

  // Scroll / key shortcuts
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) triggerReveal();
    };
    const onKey = (e: KeyboardEvent) => {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) triggerReveal();
      if (e.key === "Escape") (onSkip ?? triggerReveal)();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [onSkip, triggerReveal]);

  const ringSize = 500;

  return (
    <motion.div
      id="splash-entrance"
      className="fixed inset-0 z-50 overflow-hidden cursor-pointer select-none bg-transparent"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      onClick={triggerReveal}
    >
      {/* Subtle dot-grid texture with edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,71,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 50%, transparent 95%)",
        }}
      />

      {/* Very light blue ambient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,71,255,0.05) 0%, transparent 75%)",
        }}
      />

      {/* Top telemetry bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 sm:px-12 py-5 font-mono text-[9px] uppercase tracking-[0.22em] text-black/35 pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span>PORTFOLIO · 2026</span>
        <span className="hidden sm:inline text-black/40">CALCUTTA · 22.57° N</span>
        <span>SRD-001</span>
      </motion.div>

      {/* Central clock + text composition */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div
          ref={portalRef}
          className="relative flex items-center justify-center pointer-events-auto"
          style={{ width: ringSize, height: ringSize }}
        >
          {/* Clock ring background layer — blooms outward and dissolves during exit */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={
              isExiting
                ? { scale: 1.35, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              isExiting
                ? { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <SplashClockRing
              timeProgress={timeProgress}
              liveTime={liveTime}
              size={ringSize}
            />
          </motion.div>

          {/* Central typographic composition — perfectly centered on ring crosshairs */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-[420px] pointer-events-auto select-none -translate-y-2">
            {/* Identity badge */}
            <motion.div
              className="flex items-center gap-2 mb-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -8 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                isExiting
                  ? { duration: 0.35, ease: "easeOut" }
                  : { delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF]" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.34em] text-[#0047FF] font-semibold">
                SOURODIP ROY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF]" />
            </motion.div>

            {/* Sub-label */}
            <motion.div
              className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.36em] text-black/50 font-medium mb-1.5"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, y: -6 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                isExiting
                  ? { duration: 0.35, ease: "easeOut" }
                  : { delay: 0.38, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            >
              BUILD WHAT
            </motion.div>

            {/* Structural spacer matching the single continuous MATTERS asset that zooms from Hero */}
            <div
              className="relative my-1 w-[280px] sm:w-[310px] select-none pointer-events-none"
              style={{
                aspectRatio: "2172 / 724",
              }}
              aria-hidden="true"
            />

            {/* Developer role metadata */}
            <motion.div
              className="mt-2 flex items-center gap-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={
                isExiting
                  ? { opacity: 0, y: 8 }
                  : { opacity: 1, y: 0 }
              }
              transition={
                isExiting
                  ? { duration: 0.35, ease: "easeOut" }
                  : { delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <div className="w-4 h-px bg-black/20" />
              <span className="font-mono text-[8.5px] sm:text-[9px] text-black/50 tracking-[0.24em] uppercase font-medium">
                Systems · Creative · Developer
              </span>
              <div className="w-4 h-px bg-black/20" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading bar */}
      <motion.div
        className="absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        style={{ width: 250 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative w-full h-[1.5px] bg-black/10 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-[#0047FF] rounded-full transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full font-mono text-[8.5px] text-black/35 uppercase tracking-[0.2em]">
          <span>Loading Archive</span>
          <span className="tabular-nums font-semibold text-[#0047FF]">
            {Math.min(100, Math.floor(progress))}%
          </span>
        </div>
      </motion.div>

      {/* Skip button — elevated away from Next.js dev badge */}
      <motion.button
        id="skip-intro-btn"
        className="absolute bottom-6 sm:bottom-7 right-16 sm:right-20 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/15 hover:border-[#0047FF] bg-white/80 hover:bg-white backdrop-blur-md font-mono text-[9px] uppercase tracking-widest text-black/60 hover:text-[#0047FF] transition-all cursor-pointer pointer-events-auto shadow-sm group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={(e) => {
          e.stopPropagation();
          triggerReveal();
        }}
      >
        <span>SKIP</span>
        <span className="text-[10px] text-black/30 group-hover:text-[#0047FF] group-hover:translate-x-0.5 transition-transform">↵</span>
        <span className="text-[8px] text-black/30 ml-0.5">[ESC]</span>
      </motion.button>
    </motion.div>
  );
}
