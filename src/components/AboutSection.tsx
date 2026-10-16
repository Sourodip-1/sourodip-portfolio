"use client";

import React from "react";
import Image from "next/image";
import { TechIcons } from "./TechIcons";
import { Button03 } from "@/components/ui/pixel-broke-button";
import LottieLoaderMorph from "./LottieLoaderMorph";
import { IndianJaliFlank, IndianJharokhaFlank, IndianTransitionGuide } from "./IndianSideMotifs";

// The user's exact stepped modular block SVG shape
export function StepBlock({
  className = "",
  size = 40,
  fill = "currentColor",
  stroke,
  strokeWidth = 0.04,
  style = {},
}: {
  className?: string;
  size?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M0.751042 0.5V0.251042H0.5V0H0V0.5H0.251042V0.751042H0.5V1H1V0.5H0.751042Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? strokeWidth : undefined}
        strokeLinejoin="miter"
      />
    </svg>
  );
}

// Wireframe globe SVG component matching the mockup
function WireframeGlobe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      stroke="white"
      strokeWidth="0.8"
      strokeOpacity="0.45"
    >
      <circle cx="50" cy="50" r="46" />
      <ellipse cx="50" cy="50" rx="46" ry="18" />
      <ellipse cx="50" cy="50" rx="46" ry="32" />
      <ellipse cx="50" cy="50" rx="18" ry="46" />
      <ellipse cx="50" cy="50" rx="32" ry="46" />
      <line x1="50" y1="4" x2="50" y2="96" />
      <line x1="4" y1="50" x2="96" y2="50" />
    </svg>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white text-black pt-16 pb-6 px-6 sm:px-10 md:px-14 lg:px-20 select-none overflow-hidden"
    >

      <div className="relative max-w-7xl mx-auto z-10">

        {/* ── TOP HERO ROW: TYPOGRAPHY (LEFT) & ARTISTIC STAGE (RIGHT) ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16">

          {/* LEFT COLUMN: Headings, Subtitle, Bio, CTAs, Signature (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">

            {/* Eyebrow with High-Contrast Name: 02 ── ABOUT ME // SOURODIP ROY */}
            <div className="flex items-center gap-2.5 font-mono text-[11px] sm:text-[12px] tracking-widest text-black/70 uppercase mb-4 font-semibold">
              <span className="font-bold text-black">02</span>
              <span className="w-6 h-px bg-black/40" />
              <span>ABOUT ME</span>
              <span className="w-1.5 h-4.5 bg-[#0047FF]" />
              <span className="text-black font-extrabold tracking-wider">SOURODIP ROY</span>
            </div>

            {/* Massive Heading: MORE THAN JUST CODE. */}
            <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight leading-[0.92] uppercase mb-5">
              <span className="block text-black">MORE THAN</span>
              <span className="block">
                <span className="text-black relative inline-block">
                  JUST
                  <span
                    className="absolute -left-1 -bottom-0.5 text-[#0047FF]/25 -z-10 select-none pointer-events-none blur-[0.5px]"
                    aria-hidden="true"
                  >
                    JUST
                  </span>
                </span>{" "}
                <span className="text-[#0047FF]">CODE.</span>
              </span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-black/80 font-medium mb-6 leading-snug">
              Systems, Creativity and everything in between.
            </p>

            {/* Bio Paragraph with High-Contrast Name & Signature Blue Left Border */}
            <div className="border-l-2 border-[#0047FF] pl-4 sm:pl-5 mb-8">
              <p className="font-mono text-[13px] sm:text-[13.5px] text-black/75 leading-relaxed max-w-lg">
                I am <span className="text-black font-extrabold">Sourodip Roy</span>, a Systems &amp; Creative Developer passionate about building scalable
                systems, interactive web experiences and AI-powered tools. I enjoy turning
                ideas into practical products, mixing engineering with design, and exploring
                how technology can make everyday workflows better.
              </p>
            </div>

            {/* Action Buttons: Pixel-Broke Button03 */}
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <Button03
                text="GET IN TOUCH"
                href="#contact"
                variant="blue"
              />

              <Button03
                text="VIEW RESUME"
                href="#contact"
                variant="dark"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume download / viewing initiated.");
                }}
              />
            </div>

            {/* ── 2. HANDWRITTEN SIGNATURE REPOSITIONED ON CLEAN WHITE SPACE ── */}
            {/* Strictly NO background box/pill per user instructions; deep cobalt blue on white */}
            <div className="pt-6 select-none pointer-events-none inline-flex flex-col items-start">
              <span
                className="font-serif italic text-3xl sm:text-4xl text-[#0038CC] sm:text-[#0047FF] tracking-wide font-normal leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Sourodip Roy
              </span>
              {/* Signature Underline Flourish */}
              <svg width="130" height="12" viewBox="0 0 130 12" fill="none" className="text-[#0047FF] mt-1">
                <path d="M2 9C32 2 92 2 128 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

          </div>

          {/* RIGHT COLUMN: The Iconic Visual Composition (7 Cols) */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end min-h-[460px] sm:min-h-[540px]">

            <div className="relative w-full max-w-[680px] h-[460px] sm:h-[540px]">

              {/* ── ARCHITECTURAL HIGH-CONTRAST NAMEPLATE ON WHITE SPACE ── */}
              {/* Positioned on pure white space to the upper left of the stage, clear of the blue block */}
              <div className="absolute top-2 left-0 z-20 select-none pointer-events-none max-w-[190px]">
                <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] tracking-widest text-[#0047FF] font-bold uppercase mb-1">
                  {/* <span className="w-3.5 h-1.5  bg-[#0047FF] " /> */}
                  <span>IDENTITY // PROFILE</span>
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-black tracking-tight uppercase leading-[0.95]">
                  <div>SOURODIP</div>
                  <div>ROY</div>
                </div>
                <div className="font-mono text-[8.5px] sm:text-[9px] text-black/60 tracking-wider uppercase mt-1.5">
                  Systems &amp; Creative Dev
                </div>
              </div>

              {/* ── GIANT STEPPED MODULAR BLUE BLOCK FORMATION ── */}
              <div className="absolute top-4 right-12 sm:right-16 w-[320px] sm:w-[410px] h-[360px] sm:h-[460px] pointer-events-none z-0">
                <svg
                  viewBox="0 0 1 1"
                  preserveAspectRatio="none"
                  className="w-full h-full drop-shadow-[0_16px_36px_rgba(0,71,255,0.18)]"
                >
                  <defs>
                    <linearGradient id="blueSteppedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0047FF" />
                      <stop offset="60%" stopColor="#003EE0" />
                      <stop offset="100%" stopColor="#002DB3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0.751042 0.5V0.251042H0.5V0H0V0.5H0.251042V0.751042H0.5V1H1V0.5H0.751042Z"
                    fill="url(#blueSteppedGradient)"
                  />
                </svg>

                {/* ── KINETIC MORPHING PETALS LOADER FITTED IN TOP BOX OF BLUE BLOCK ── */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-center pointer-events-none z-10 overflow-hidden">
                  <LottieLoaderMorph speed={0.4} yoyo={true} scale={2.2} className="w-full h-full" />
                </div>

                {/* Duotone Faded Portrait of Sourodip in the top-right notch of the blue block */}
                <div className="absolute top-0 right-0 w-36 h-36 sm:w-48 sm:h-48 overflow-hidden opacity-40 mix-blend-luminosity pointer-events-none">
                  <Image
                    src="/Sourodip.png"
                    alt="Sourodip"
                    fill
                    className="object-cover object-top filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-[#0047FF]/50 mix-blend-color" />
                </div>

                {/* Technical Typography Inside the Blue Block */}
                <div className="absolute bottom-28 right-8 font-mono text-[7.5px] sm:text-[8.5px] text-white/80 leading-tight uppercase tracking-widest hidden sm:block">
                  <div>SYSTEMS</div>
                  <div>CREATIVE TECH</div>
                  <div>DISTRIBUTED ARCHITECTURES</div>
                  <div>HUMAN-CENTRED DESIGN</div>
                </div>

                {/* Wireframe 3D Globe at bottom of the Blue Block */}
                <div className="absolute -bottom-4 right-10 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none opacity-70">
                  <WireframeGlobe className="w-full h-full" />
                </div>
              </div>

              {/* ── SOURODIP SITTING FIGURE IN FOREGROUND ── */}
              <div className="absolute bottom-0 left-0 right-10 sm:right-16 z-10 flex items-end select-none pointer-events-none">
                <div className="relative w-full aspect-[1450/1085]">
                  <Image
                    src="/Sourodip sitting pose.png"
                    alt="Sourodip Roy Sitting"
                    fill
                    priority
                    className="object-contain object-bottom drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
                  />

                  {/* Realistic Grounding Contact Shadows */}
                  <div
                    className="absolute bottom-0 left-[26%] right-[8%] h-5 sm:h-7 bg-black/45 rounded-full blur-[6px] transform translate-y-2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute bottom-0 left-[2%] w-28 sm:w-36 h-5 bg-black/40 rounded-full blur-[4px] transform translate-y-1.5 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* ── RIGHT SIDE FLOATING PIXEL BLOCKS & METRICS ── */}
              <div className="absolute top-2 right-0 hidden sm:block font-mono text-[8px] text-black/50 leading-tight tracking-widest uppercase">
                <div>SYSTEMS</div>
                <div>CREATIVE TECH</div>
                <div>DISTRIBUTED ARCHITECTURES</div>
                <div>HUMAN-CENTRED DESIGN</div>
              </div>

              <div className="absolute top-1/2 -right-4 hidden sm:block font-mono text-[9px] text-black/70 leading-relaxed uppercase">
                <div className="font-bold text-black flex items-center gap-1">
                  <span>BASED IN</span>
                  <span className="text-base leading-none">🌐</span>
                </div>
                <div className="font-bold text-black mb-2">INDIA</div>
                <div className="text-[8px] text-black/50 space-y-0.5">
                  <div>// CODE</div>
                  <div>// DESIGN</div>
                  <div>// DEPLOY</div>
                  <div>// REPEAT</div>
                </div>
              </div>

              {/* Floating Small Blue StepBlocks on the right */}
              <div className="absolute top-1/3 -right-2 text-[#0047FF]">
                <StepBlock size={18} fill="#0047FF" />
              </div>
              <div className="absolute bottom-1/4 right-0 text-[#0047FF]">
                <StepBlock size={24} fill="#0047FF" />
              </div>
              <div className="absolute bottom-16 right-16 text-[#0047FF]">
                <StepBlock size={16} fill="#0047FF" />
              </div>

            </div>

          </div>

        </div>

        {/* ── BOTTOM ROW: 3 TECHNICAL STATS & TOOLS CARDS ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* CARD 1: METRICS / QUICK STATS (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
            <div className="grid grid-cols-4 w-full divide-x divide-black/10">

              {/* Stat 1: Projects */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="text-[#0047FF] mb-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-black leading-none mb-1">
                  +10
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-black tracking-wider uppercase">
                  PROJECTS
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-black/50 mt-0.5">
                  Built &amp; shipped
                </div>
              </div>

              {/* Stat 2: Internships */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="text-[#0047FF] mb-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-black leading-none mb-1">
                  +2
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-black tracking-wider uppercase">
                  INTERNSHIPS
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-black/50 mt-0.5">
                  Real world experience
                </div>
              </div>

              {/* Stat 3: Tech Stacks */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="text-[#0047FF] mb-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-black leading-none mb-1">
                  5+
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-black tracking-wider uppercase">
                  TECH STACKS
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-black/50 mt-0.5">
                  Always learning
                </div>
              </div>

              {/* Stat 4: Ideas */}
              <div className="flex flex-col items-center text-center px-1.5 sm:px-3">
                <div className="text-[#0047FF] mb-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="font-display font-black text-xl sm:text-2xl text-black leading-none mb-1">
                  ∞
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] font-bold text-black tracking-wider uppercase">
                  IDEAS
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] text-black/50 mt-0.5">
                  Still counting...
                </div>
              </div>

            </div>
          </div>

          {/* CARD 2: TECH STACK (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-black/80 font-bold uppercase mb-3">
              <span className="w-2 h-2 bg-[#0047FF]" />
              <span>TECH STACK</span>
            </div>

            {/* 2 Rows of 7 Tech Icons */}
            <div className="space-y-2.5">
              {/* Row 1: Python, C++, JS, Tailwind, Next.js, Node.js, MongoDB */}
              <div className="grid grid-cols-7 gap-2">
                {[
                  { key: "python", title: "Python" },
                  { key: "cpp", title: "C++" },
                  { key: "javascript", title: "JavaScript" },
                  { key: "tailwind", title: "Tailwind CSS" },
                  { key: "nextjs", title: "Next.js" },
                  { key: "nodejs", title: "Node.js" },
                  { key: "mongodb", title: "MongoDB" },
                ].map((item) => {
                  const Icon = TechIcons[item.key];
                  return (
                    <div
                      key={item.key}
                      title={item.title}
                      className="aspect-square rounded-xl bg-[#F8F9FB] border border-black/5 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer p-1.5"
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                  );
                })}
              </div>

              {/* Row 2: PostgreSQL, FastAPI, Git, Docker, Kubernetes, Azure, Cloudflare */}
              <div className="grid grid-cols-7 gap-2">
                {[
                  { key: "postgresql", title: "PostgreSQL" },
                  { key: "fastapi", title: "FastAPI" },
                  { key: "git", title: "Git" },
                  { key: "docker", title: "Docker" },
                  { key: "kubernetes", title: "Kubernetes" },
                  { key: "azure", title: "Microsoft Azure" },
                  { key: "cloudflare", title: "Cloudflare" },
                ].map((item) => {
                  const Icon = TechIcons[item.key];
                  return (
                    <div
                      key={item.key}
                      title={item.title}
                      className="aspect-square rounded-xl bg-[#F8F9FB] border border-black/5 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer p-1.5"
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CARD 3: TOOLS & PLATFORMS (3 Cols) */}
          <div className="lg:col-span-3 bg-white border border-black/10 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-black/80 font-bold uppercase mb-3">
              <span className="w-2 h-2 bg-[#0047FF]" />
              <span>TOOLS &amp; PLATFORMS</span>
            </div>

            {/* 2 Rows of 4 Tool Icons */}
            <div className="space-y-2.5">
              {/* Row 1: GitHub, VS Code, Figma, Notion */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: "github", title: "GitHub" },
                  { key: "vscode", title: "VS Code" },
                  { key: "figma", title: "Figma" },
                  { key: "notion", title: "Notion" },
                ].map((item) => {
                  const Icon = TechIcons[item.key];
                  return (
                    <div
                      key={item.key}
                      title={item.title}
                      className="aspect-square rounded-xl bg-[#F8F9FB] border border-black/5 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer p-1.5"
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Postman, Vercel, Database, Cloudflare */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: "postman", title: "Postman" },
                  { key: "vercel", title: "Vercel" },
                  { key: "database", title: "Database Systems" },
                  { key: "cloudflare", title: "Edge Network" },
                ].map((item) => {
                  const Icon = TechIcons[item.key];
                  return (
                    <div
                      key={item.key}
                      title={item.title}
                      className="aspect-square rounded-xl bg-[#F8F9FB] border border-black/5 flex items-center justify-center hover:scale-110 hover:shadow-md transition-all cursor-pointer p-1.5"
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* ── 3 & 4. JAPANESE SOURO ARTWORK (TRANSPARENT CALLIGRAPHY) WITH INDIAN TRANSITION FLANKS ─────── */}
        {/* Strictly NO black background or dark box; pure transparent asset floating cleanly on white page */}
        <div className="mt-16 sm:mt-24 mb-6 flex flex-col items-center justify-center">

          {/* Style Transition Guide Bar */}
          <IndianTransitionGuide className="max-w-5xl mb-6 px-2" />

          {/* 3-Column Transition Stage: Left Indian Jali, Center Japanese Katakana, Right Indian Jharokha Arch */}
          <div className="w-full max-w-6xl flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-2">
            
            {/* Left Flank: Indian Jali & Sacred Geometry (visible md and up) */}
            <IndianJaliFlank className="hidden md:flex flex-shrink-0" />

            {/* Center: The Japanese Souro Typography Artwork */}
            <div className="flex-1 flex flex-col items-center max-w-2xl lg:max-w-3xl">
              {/* Subtle architectural eyebrow */}
              <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-black/40 uppercase mb-4 font-semibold">
                <span className="w-8 h-px bg-black/15" />
                <span>VISUAL INTERLUDE // ソウロ (SOURO) ✦ सौरदीप</span>
                <span className="w-8 h-px bg-black/15" />
              </div>

              {/* Transparent artwork preserving 3:1 natural aspect ratio (2172x724) */}
              <div className="relative w-full aspect-[2172/724] select-none pointer-events-none">
                <Image
                  src="/souro-japanese-transparent.png"
                  alt="Souro Japanese Typography Artwork"
                  fill
                  priority={false}
                  className="object-contain filter drop-shadow-[0_12px_28px_rgba(0,71,255,0.14)]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 768px"
                />
              </div>

              {/* Understated caption matching design study */}
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] text-black/55 tracking-[0.25em] uppercase font-medium">
                <span>ORIGINAL INDIAN GEOMETRY / PRINT STUDY</span>
              </div>

              {/* Mobile Indic script bridge indicator (visible only on mobile where side flanks are hidden) */}
              <div className="mt-3 md:hidden flex items-center gap-2 font-mono text-[9px] text-[#0047FF] tracking-[0.2em] uppercase font-semibold">
                <span>॥ सौरदीप ॥</span>
                <span className="text-black/30">•</span>
                <span className="text-black/60">INDIAN GEOMETRY</span>
                <span className="text-black/30">•</span>
                <span>॥ स्थापत्य ॥</span>
              </div>
            </div>

            {/* Right Flank: Indian Jharokha Arch & Lotus Mandala (visible md and up) */}
            <IndianJharokhaFlank className="hidden md:flex flex-shrink-0" />

          </div>

        </div>

      </div>
    </section>
  );
}
