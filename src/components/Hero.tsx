"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import SoundControlMenu from "./SoundControlMenu";

interface HeroProps {
  onReplayIntro?: () => void;
  portraitRevealed?: boolean;
  introActive?: boolean;
  isRevealing?: boolean;
}

// ── helpers ──────────────────────────────────────────────────────────────────
function getDayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

function toRomanHour(hour24: number): string {
  const romanMap: Record<number, string> = {
    0: "XXIV", 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V",
    6: "VI", 7: "VII", 8: "VIII", 9: "IX", 10: "X", 11: "XI",
    12: "XII", 13: "XIII", 14: "XIV", 15: "XV", 16: "XVI",
    17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX", 21: "XXI",
    22: "XXII", 23: "XXIII", 24: "XXIV",
  };
  return romanMap[hour24] ?? String(hour24);
}

// ── Day-ruler bar: 364 tiny lines + Days Left counter ────────────────────────
// ── Day-ruler bar: 364 tiny lines + Days Left counter ────────────────────────
function DayRuler() {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastDayTickRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    setToday(getDayOfYear(now));
  }, []);

  const daysLeft = Math.max(0, 365 - today);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const day = Math.min(364, Math.max(1, Math.ceil((x / rect.width) * 364)));
    if (day !== hovered) {
      setHovered(day);
      if (lastDayTickRef.current !== day) {
        lastDayTickRef.current = day;
        const pitch = 600 + (day / 364) * 500;
        sound.playDayTick(pitch);
      }
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
    lastDayTickRef.current = null;
  };

  if (!mounted) {
    return (
      <div className="relative w-full flex items-center justify-between gap-3 sm:gap-6 select-none z-30 pt-1 pb-2 h-7" />
    );
  }

  return (
    <div className="relative w-full flex items-center justify-between gap-3 sm:gap-6 select-none z-30 pt-1 pb-2">
      {/* 364 day ticks container — track mouse on parent to completely eliminate jitter */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex-1 flex items-end justify-between h-7 cursor-crosshair py-1"
      >
        {Array.from({ length: 364 }).map((_, i) => {
          const day = i + 1;
          const isToday = day === today;
          const isHovered = hovered === day;

          return (
            <div
              key={day}
              className="relative flex-shrink-0 flex items-end pointer-events-none"
            >
              {/* The line */}
              <div
                style={{
                  width: isToday || isHovered ? 2 : 1,
                  height: isHovered ? 19 : isToday ? 16 : day % 7 === 0 ? 10 : 5,
                  background: isHovered
                    ? "#0047FF"
                    : isToday
                      ? "#0047FF"
                      : day < today
                        ? "rgba(0,71,255,0.36)"
                        : "rgba(0,0,0,0.13)",
                  borderRadius: 1,
                  transition: "height 0.1s ease, background 0.1s ease, width 0.1s ease",
                }}
              />

              {/* Floating day number indicator above the bar (offset up by 14px so cursor never obstructs it) */}
              {isHovered && (
                <div
                  className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#0047FF] font-semibold whitespace-nowrap pointer-events-none tracking-wider z-40 bg-white/95 px-1 py-0.5 rounded shadow-[0_2px_8px_rgba(0,71,255,0.12)] border border-[#0047FF]/20"
                >
                  DAY {day}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right side: Days left for this year — clean minimal typography */}
      <div className="flex-shrink-0 font-mono text-[9.5px] uppercase tracking-widest text-black/45 pl-3 sm:pl-4 border-l border-black/10 tabular-nums">
        {hovered !== null ? (
          <span>
            DAY <span className="text-[#0047FF] font-semibold">{hovered}</span> / 365
          </span>
        ) : (
          <span>
            <span className="text-[#0047FF] font-semibold">{daysLeft}</span> DAYS LEFT
          </span>
        )}
      </div>
    </div>
  );
}

// ── Revolving Astronomical Celestial Clock ──────────────────────────────────
function TimeClockCircle({ size = 500 }: { size?: number }) {
  const [mounted, setMounted] = useState(false);
  const [timeLabel, setTimeLabel] = useState("");
  const dialRef = useRef<SVGGElement>(null);

  const sw = 1;
  const r = (size - sw * 2) / 2;
  const cx = size / 2;
  const cy = size / 2;

  useEffect(() => {
    setMounted(true);

    // Accurate Indian Standard Time formatter
    const istFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    setTimeLabel(istFormatter.format(new Date()));

    let rafId: number;
    let lastSec = -1;

    const tick = () => {
      const now = new Date();
      // Formatted IST string: HH:MM:SS
      const istStr = istFormatter.format(now);
      const parts = istStr.split(":");
      const secInt = parseInt(parts[2] || "0", 10);
      if (secInt !== lastSec) {
        lastSec = secInt;
        setTimeLabel(istStr);
      }

      // Smooth fractional second calculation for 60 FPS rotation
      const ms = now.getMilliseconds();
      const currentSec = secInt + ms / 1000;

      // Mathematical alignment requested by user:
      // Fixed pointer is at -60° (2 o'clock).
      // Roman numerals go up to 60 (every 5 seconds: V at 5, X at 10, XV at 15, ..., LX at 60).
      // When second is 5, mark V must be exactly at the fixed pointer (-60°).
      // When second is 10, mark X is at the fixed pointer, etc.
      // Dial rotation angle R = -(currentSec - 5) * 6°
      const rotationDeg = -((currentSec - 5) * 6);

      if (dialRef.current) {
        dialRef.current.setAttribute("transform", `rotate(${rotationDeg} ${cx} ${cy})`);
        dialRef.current.style.transform = `rotate(${rotationDeg}deg)`;
        dialRef.current.style.transformOrigin = `${cx}px ${cy}px`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [cx, cy]);

  if (!mounted) {
    return <div style={{ width: size, height: size }} />;
  }

  // 12 Roman numerals around the 60-second dial (every 5 seconds, up to 60)
  const romanSeconds = [
    { sec: 5, label: "V" },
    { sec: 10, label: "X" },
    { sec: 15, label: "XV" },
    { sec: 20, label: "XX" },
    { sec: 25, label: "XXV" },
    { sec: 30, label: "XXX" },
    { sec: 35, label: "XXXV" },
    { sec: 40, label: "XL" },
    { sec: 45, label: "XLV" },
    { sec: 50, label: "L" },
    { sec: 55, label: "LV" },
    { sec: 60, label: "LX" },
  ];

  const round = (val: number) => Math.round(val * 100) / 100;

  // Fixed pointer permanently stationed at 2 o'clock (-60°)
  const pointerAngleDeg = -60;
  const pointerRad = (pointerAngleDeg * Math.PI) / 180;
  const ux = Math.cos(pointerRad); // 0.5
  const uy = Math.sin(pointerRad); // -0.866
  const vx = -uy;
  const vy = ux;

  // Index needle along ray
  const n1x = round(cx + (r - 12) * ux);
  const n1y = round(cy + (r - 12) * uy);
  const n2x = round(cx + (r + 8) * ux);
  const n2y = round(cy + (r + 8) * uy);

  // Dot & halo at rim
  const dotX = round(cx + r * ux);
  const dotY = round(cy + r * uy);

  // Inward pointing arrowhead
  const tipX = round(cx + (r - 10) * ux);
  const tipY = round(cy + (r - 10) * uy);
  const b1X = round(cx + (r - 2) * ux + 3.2 * vx);
  const b1Y = round(cy + (r - 2) * uy + 3.2 * vy);
  const b2X = round(cx + (r - 2) * ux - 3.2 * vx);
  const b2Y = round(cy + (r - 2) * uy - 3.2 * vy);

  // Live time label placed immediately beside the fixed pointer
  const labelR = r + 26;
  const lx = round(cx + labelR * ux);
  const ly = round(cy + labelR * uy);

  return (
    <div
      className="relative pointer-events-none select-none"
      style={{ width: size, height: size, overflow: "visible" }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        {/* ── THE REVOLVING DIAL (Rotates so numeral aligns with fixed pointer) ── */}
        <g
          ref={dialRef}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            willChange: "transform",
          }}
        >
          {/* Outer dial ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,71,255,0.14)" strokeWidth={sw} />

          {/* Progress arc rotating coherently with dial */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(0,71,255,0.48)"
            strokeWidth={sw + 0.8}
            strokeDasharray={2 * Math.PI * r}
            strokeDashoffset={2 * Math.PI * r * 0.38}
            strokeLinecap="round"
          />

          {/* Inner concentric guide circles */}
          <circle cx={cx} cy={cy} r={r * 0.88} fill="none" stroke="rgba(0,71,255,0.06)" strokeWidth={0.8} />
          <circle cx={cx} cy={cy} r={r * 0.72} fill="none" stroke="rgba(0,71,255,0.03)" strokeWidth={0.7} />

          {/* 12 Roman numerals up to 60 (at intervals of 5 seconds) */}
          {romanSeconds.map((rs) => {
            const sAngleDeg = (rs.sec / 60) * 360 - 90;
            const rad = (sAngleDeg * Math.PI) / 180;
            const x1 = cx + (r - 7) * Math.cos(rad);
            const y1 = cy + (r - 7) * Math.sin(rad);
            const x2 = cx + (r + 4) * Math.cos(rad);
            const y2 = cy + (r + 4) * Math.sin(rad);
            const textR = r - 18;
            const tx = cx + textR * Math.cos(rad);
            const ty = cy + textR * Math.sin(rad);

            return (
              <g key={rs.sec}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,71,255,0.28)" strokeWidth={1} />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(0,71,255,0.5)"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="600"
                  letterSpacing="0.06em"
                >
                  {rs.label}
                </text>
              </g>
            );
          })}

          {/* 60 Single-second tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const s = i + 1;
            if (s % 5 === 0) return null; // Rendered by major Roman numerals
            const deg = (s / 60) * 360 - 90;
            const rad = (deg * Math.PI) / 180;
            const x1 = cx + (r - 3.5) * Math.cos(rad);
            const y1 = cy + (r - 3.5) * Math.sin(rad);
            const x2 = cx + (r + 2.5) * Math.cos(rad);
            const y2 = cy + (r + 2.5) * Math.sin(rad);
            return (
              <line
                key={s}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0,71,255,0.18)"
                strokeWidth={0.8}
              />
            );
          })}

          {/* Subtle sub-second track ticks */}
          {Array.from({ length: 120 }).map((_, i) => {
            if (i % 2 === 0) return null;
            const deg = (i / 120) * 360 - 90;
            const rad = (deg * Math.PI) / 180;
            const x1 = cx + (r - 1.5) * Math.cos(rad);
            const y1 = cy + (r - 1.5) * Math.sin(rad);
            const x2 = cx + (r + 1) * Math.cos(rad);
            const y2 = cy + (r + 1) * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0,71,255,0.08)"
                strokeWidth={0.6}
              />
            );
          })}

          {/* Crosshairs inside rotating dial */}
          <line x1={cx - r * 0.45} y1={cy} x2={cx + r * 0.45} y2={cy} stroke="rgba(0,71,255,0.05)" strokeWidth={0.8} />
          <line x1={cx} y1={cy - r * 0.45} x2={cx} y2={cy + r * 0.45} stroke="rgba(0,71,255,0.05)" strokeWidth={0.8} />
        </g>

        {/* ── FIXED POINTER AND TIME (Permanently stationary outside rotating dial) ── */}
        <g id="fixed-clock-pointer-and-time">
          {/* Index needle along ray */}
          <line x1={n1x} y1={n1y} x2={n2x} y2={n2y} stroke="#0047FF" strokeWidth={1.5} />
          {/* Pointer dot & halo at rim */}
          <circle cx={dotX} cy={dotY} r={3} fill="#0047FF" />
          <circle cx={dotX} cy={dotY} r={6.5} fill="rgba(0,71,255,0.18)" />
          {/* Inward-pointing arrowhead indicator */}
          <polygon points={`${tipX},${tipY} ${b1X},${b1Y} ${b2X},${b2Y}`} fill="#0047FF" />

          {/* Fixed Time Label placed directly beside pointer */}
          <text
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#0047FF"
            stroke="rgba(255,255,255,0.92)"
            strokeWidth={3}
            paintOrder="stroke fill"
            strokeLinejoin="round"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            {timeLabel || "00:00:00"} IST
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Hero({
  onReplayIntro,
  portraitRevealed = true,
  introActive = false,
  isRevealing = false,
}: HeroProps = {}) {
  const [time, setTime] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const [headerOffset, setHeaderOffset] = useState(38);
  const [splashScale, setSplashScale] = useState(0.225);

  useEffect(() => {
    const calc = () => {
      if (typeof window === "undefined") return;
      const vw = window.innerWidth;
      const splashW = vw < 640 ? 280 : 310;
      const heroW = Math.min(vw * 0.92, 1380);
      setSplashScale(splashW / heroW);
      if (headerRef.current) {
        setHeaderOffset(headerRef.current.offsetHeight / 2);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const isZoomed = !introActive || isRevealing;

  useEffect(() => {
    const istFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => {
      setTime(istFormatter.format(new Date()));
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const navItems = [
    { num: "01", label: "WORK", href: "#work" },
    { num: "02", label: "ABOUT", href: "#about" },
    { num: "03", label: "EXPERIENCE", href: "#experience" },
    { num: "04", label: "INTERLUDE", href: "#interlude" },
    { num: "05", label: "CONTACT", href: "#contact" },
  ];

  return (
    <section className="relative w-full h-screen h-[100dvh] flex flex-col p-0 bg-white text-black overflow-hidden select-none">

      {/* ── FROSTED GLASS NAV ───────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="relative z-30 w-full flex flex-col transition-opacity duration-700"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(20px) saturate(1.6)",
          WebkitBackdropFilter: "blur(20px) saturate(1.6)",
          borderBottom: "1px solid rgba(0,0,0,0.055)",
          opacity: introActive && !isRevealing ? 0 : 1,
          pointerEvents: introActive && !isRevealing ? "none" : "auto",
        }}
      >
        {/* Main nav row */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
          {/* Identity */}
          <div className="flex items-center gap-2.5 font-mono whitespace-nowrap flex-shrink-0">
            <span className="font-display font-black text-xs sm:text-sm tracking-tight text-black uppercase whitespace-nowrap">
              Sourodip Roy
            </span>
            <span className="text-black/20 hidden 2xl:inline">|</span>
            <span className="text-black/40 uppercase tracking-[0.14em] text-[9.5px] hidden 2xl:inline whitespace-nowrap">
              Systems &amp; Creative Developer
            </span>
          </div>

          {/* Nav links cluster */}
          <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 flex-shrink-0">
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={(e) => {
                    sound.playClick(500);
                    if (item.href === "#work") {
                      e.preventDefault();
                      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  onMouseEnter={() => sound.playHover(450)}
                  className="group flex flex-col items-center cursor-pointer py-0.5"
                >
                  <span className="text-[8.5px] font-mono text-black/35 group-hover:text-[#0047FF] transition-colors leading-none tracking-widest">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-mono text-black/75 font-semibold tracking-wider group-hover:text-[#0047FF] transition-colors mt-0.5 whitespace-nowrap">
                    {item.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Time in one line per user request */}
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-black/80 font-medium tracking-wider tabular-nums whitespace-nowrap flex-shrink-0">
              <span>{time || "00:00:00"}</span>
              <span className="text-[9px] text-black/40 font-semibold">IST</span>
            </div>

            {/* Sound & Music Controls Dropdown */}
            <SoundControlMenu />
          </div>
        </div>

        {/* Day-ruler strip */}
        <div className="px-6 sm:px-10 md:px-12 pb-2 hidden sm:block">
          <DayRuler />
        </div>
      </header>

      {/* ── MAIN CANVAS ─────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex items-end justify-center overflow-hidden">

        {/* Top-left annotation */}
        <div
          className="absolute top-4 left-8 sm:left-12 z-20 hidden md:flex flex-col space-y-2.5 max-w-[180px] pointer-events-none transition-opacity duration-700"
          style={{ opacity: introActive && !isRevealing ? 0 : 1 }}
        >
          <p className="font-mono text-[10px] leading-relaxed text-black/50">
            Turning ideas<br />
            into real systems,<br />
            with code, curiosity<br />
            and creativity.
          </p>
          <div className="w-px h-7 bg-[#0047FF]/55" />
        </div>

        {/* Top-right annotation */}
        <div
          className="absolute top-4 right-8 sm:right-12 z-20 hidden md:flex flex-col items-end space-y-0.5 pointer-events-none font-mono text-[9px] text-black/40 uppercase tracking-widest transition-opacity duration-700"
          style={{ opacity: introActive && !isRevealing ? 0 : 1 }}
        >
          <span>DEVELOP</span>
          <span>LEARN</span>
          <span>BUILD</span>
          <span>IMPROVE</span>
          <span>REPEAT</span>
          <div className="mt-2 flex flex-col items-end text-black/25 normal-case text-[8.5px] tracking-wide">
            <span>23°41' N</span>
            <span>86°59' E</span>
          </div>
        </div>

        {/* Clock ring + ambient glow background layer */}
        <div
          className="absolute inset-0 flex flex-col items-center pointer-events-none transition-opacity duration-700"
          style={{
            maskImage: "linear-gradient(to bottom, black 72%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 92%)",
            opacity: introActive && !isRevealing ? 0 : 1,
          }}
        >
          {/* Ambient blue glow */}
          <div
            className="absolute blur-3xl rounded-full"
            style={{
              width: 580,
              height: 420,
              top: "4%",
              background:
                "radial-gradient(ellipse, rgba(0,71,255,0.09) 0%, rgba(56,189,248,0.06) 55%, transparent 80%)",
            }}
          />

          {/* Live clock ring */}
          <div className="mt-[3%] sm:mt-[4%] md:mt-[4.5%]">
            <TimeClockCircle size={500} />
          </div>
        </div>

        {/* MATTERS visual asset from public/MATTERS.png — single continuous zooming asset from splash to hero */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-10">
          <motion.div
            className="relative flex items-center justify-center -translate-y-2 w-[92vw] max-w-[1380px]"
            style={{
              aspectRatio: "2172 / 724",
              transformOrigin: "center center",
              willChange: "transform",
            }}
            initial={{
              opacity: 0,
              scale: 0.225,
              y: -38,
            }}
            animate={{
              opacity: 1,
              scale: isZoomed ? 1 : splashScale,
              y: isZoomed ? 0 : -headerOffset,
            }}
            transition={{
              scale: {
                duration: isZoomed ? 1.25 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              },
              y: {
                duration: isZoomed ? 1.25 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 0.7,
                delay: 0.35,
                ease: "easeOut",
              },
            }}
          >
            <Image
              src="/MATTERS.png"
              alt="MATTERS"
              fill
              priority
              unoptimized
              className="object-contain pointer-events-none select-none drop-shadow-[0_4px_30px_rgba(0,71,255,0.08)]"
            />
          </motion.div>
        </div>

        {/* Dot matrix — left */}
        <div
          className="absolute pointer-events-none transition-opacity duration-700"
          style={{
            left: "14%",
            bottom: "24%",
            opacity: introActive && !isRevealing ? 0 : 1,
          }}
        >
          <div className="grid gap-[9px]" style={{ gridTemplateColumns: "repeat(7, 4px)" }}>
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#0047FF]"
                style={{ opacity: 0.18 + (i % 5) * 0.05 }} />
            ))}
          </div>
        </div>

        {/* Dot matrix — right */}
        <div
          className="absolute pointer-events-none transition-opacity duration-700"
          style={{
            right: "12%",
            top: "28%",
            opacity: introActive && !isRevealing ? 0 : 1,
          }}
        >
          <div className="grid gap-[9px]" style={{ gridTemplateColumns: "repeat(5, 4px)" }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-[#0047FF]"
                style={{ opacity: 0.12 + (i % 4) * 0.04 }} />
            ))}
          </div>
        </div>

        {/* ── Portrait — full image fits within single frame with clipping-path reveal ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            clipPath: "circle(0px at 50% 85%)",
          }}
          animate={
            portraitRevealed
              ? {
                opacity: 1,
                y: 0,
                clipPath: "circle(150% at 50% 85%)",
              }
              : {
                opacity: 0,
                y: 80,
                clipPath: "circle(0px at 50% 85%)",
              }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex flex-col items-center justify-end w-full h-full pointer-events-none"
        >
          <div
            className="relative pointer-events-auto"
            style={{
              height: "calc(100% - 10px)",
              maxHeight: "clamp(380px, 78vh, 760px)",
              aspectRatio: "1448 / 1086",
              maxWidth: "min(90vw, 860px)",
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 91%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 91%, transparent 100%)",
              }}
            >
              <Image
                src="/Sourodip.png?v=3"
                alt="Sourodip Roy"
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 360px, (max-width: 1024px) 620px, 860px"
                className="object-contain object-bottom"
                style={{ filter: "contrast(1.01) brightness(1.01)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom-left */}
      <div
        className="absolute bottom-7 left-8 sm:left-12 z-20 hidden sm:flex flex-col space-y-2 font-mono text-xs transition-opacity duration-700"
        style={{ opacity: introActive && !isRevealing ? 0 : 1 }}
      >
        <span className="text-[9px] text-black/30 uppercase tracking-[0.25em]">SCROLL</span>
        <div className="flex items-center gap-2 text-black/50 pointer-events-auto">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              sound.playClick(500);
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 hover:text-[#0047FF] transition-colors cursor-pointer group"
          >
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            <span className="font-semibold">01</span>
          </a>
          <div className="w-6 h-px bg-black/20" />
          {onReplayIntro && (
            <button
              id="replay-intro-btn"
              onClick={() => { sound.playClick(650); onReplayIntro(); }}
              className="ml-1 px-2 py-0.5 rounded-full border border-black/10 hover:border-[#0047FF] hover:text-[#0047FF] transition-colors text-[8px] uppercase tracking-wider cursor-pointer"
            >
              REPLAY INTRO
            </button>
          )}
        </div>
      </div>

      {/* Bottom-right */}
      <div
        className="absolute bottom-7 right-8 sm:right-12 z-20 hidden sm:flex flex-col items-end space-y-1.5 pointer-events-none text-right font-mono text-[10px] text-black/40 transition-opacity duration-700"
        style={{ opacity: introActive && !isRevealing ? 0 : 1 }}
      >
        <div className="w-8 h-px bg-black/12 mb-0.5" />
        <p className="leading-relaxed">
          Systems thinking.<br />
          Creative problem solving.<br />
          Impact through technology.
        </p>
      </div>
    </section>
  );
}
