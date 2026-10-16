"use client";

import React from "react";

interface TraditionalPageDividerProps {
  className?: string;
  theme?: "light" | "dark";
}

export default function TraditionalPageDivider({
  className = "",
  theme = "light",
}: TraditionalPageDividerProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full py-8 sm:py-12 flex flex-col items-center justify-center select-none ${className}`}
      aria-label="Traditional Section Divider"
    >
      <div className="w-full max-w-4xl px-6 flex items-center justify-center gap-3 sm:gap-6">
        {/* Left Tapered Line */}
        <div
          className={`flex-1 h-px ${
            isDark
              ? "bg-gradient-to-r from-transparent via-white/20 to-white/40"
              : "bg-gradient-to-r from-transparent via-black/15 to-black/35"
          }`}
        />

        {/* Center Traditional Indian Ornament */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <span className="font-mono text-xs sm:text-sm text-[#0047FF] font-semibold">॥</span>

          <svg
            width="68"
            height="26"
            viewBox="0 0 68 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#0047FF]"
          >
            {/* Outer Traditional Indian Paisley Lotus Petal Form */}
            <path
              d="M34 2C34 2 29.5 8.5 23 9.5C16.5 10.5 12 7.5 8 13C12 18.5 16.5 15.5 23 16.5C29.5 17.5 34 24 34 24C34 24 38.5 17.5 45 16.5C51.5 15.5 56 18.5 60 13C56 7.5 51.5 10.5 45 9.5C38.5 8.5 34 2 34 2Z"
              stroke="#0047FF"
              strokeWidth="1.2"
              strokeLinejoin="round"
              fill="rgba(0, 71, 255, 0.05)"
            />
            {/* Center Sacred Bindu Dot */}
            <circle cx="34" cy="13" r="2.2" fill="#0047FF" />
            {/* Flanking Secondary Dots */}
            <circle cx="21" cy="13" r="1.3" fill="#0047FF" opacity="0.8" />
            <circle cx="47" cy="13" r="1.3" fill="#0047FF" opacity="0.8" />
            {/* Flanking Whisker Taper Lines */}
            <path
              d="M2 13H7M61 13H66"
              stroke="#0047FF"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          <span className="font-mono text-xs sm:text-sm text-[#0047FF] font-semibold">॥</span>
        </div>

        {/* Right Tapered Line */}
        <div
          className={`flex-1 h-px ${
            isDark
              ? "bg-gradient-to-l from-transparent via-white/20 to-white/40"
              : "bg-gradient-to-l from-transparent via-black/15 to-black/35"
          }`}
        />
      </div>

      {/* Subtle Indic Inscription */}
      <div className="mt-2.5 flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-black/45">
        <span>॥ अन्तराल // INTERLUDE · SITE ARCHITECTURE ॥</span>
      </div>
    </div>
  );
}
