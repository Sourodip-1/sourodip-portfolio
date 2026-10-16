"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { SOUND_TRACKS } from "./SoundControlMenu";
import type { Track } from "./ui/music-player-widget";

interface HeroVinylPlayerProps {
  introActive?: boolean;
  isRevealing?: boolean;
}

export default function HeroVinylPlayer({
  introActive = false,
  isRevealing = false,
}: HeroVinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<Track>(SOUND_TRACKS[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Sync state with global audio player
  useEffect(() => {
    const handleSync = (e: Event) => {
      const custom = e as CustomEvent<{
        currentTrackIdx?: number;
        isPlaying?: boolean;
        currentTrack?: Track;
      }>;
      if (custom.detail) {
        if (typeof custom.detail.isPlaying === "boolean") {
          setIsPlaying(custom.detail.isPlaying);
        }
        if (typeof custom.detail.currentTrackIdx === "number") {
          setCurrentTrackIdx(custom.detail.currentTrackIdx);
          const t = custom.detail.currentTrack || SOUND_TRACKS[custom.detail.currentTrackIdx];
          if (t) setCurrentTrack(t);
        }
      }
    };

    window.addEventListener("music-state-sync", handleSync);
    window.dispatchEvent(new CustomEvent("request-music-state"));

    return () => {
      window.removeEventListener("music-state-sync", handleSync);
    };
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(620);
    window.dispatchEvent(new CustomEvent("toggle-music-play"));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick(680);
    window.dispatchEvent(new CustomEvent("next-music-track"));
  };

  const isVisible = !introActive || isRevealing;

  return (
    <div
      className={`absolute top-full right-14 sm:right-22 md:right-28 z-20 select-none transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── MECHANICAL MOUNTING LIP / SLOT DIRECTLY UNDER NAV BORDER ─────── */}
      <div className="relative flex flex-col items-center">
        {/* Slot hairline bracket */}
        <div className="w-24 sm:w-28 h-[2px] bg-black/15 flex items-center justify-between px-1 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
          {/* Active playhead LED */}
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isPlaying
                  ? "bg-[#0047FF] shadow-[0_0_8px_#0047FF] animate-pulse"
                  : "bg-black/25"
              }`}
            />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
        </div>

        {/* ── HALF-EXPOSED ROTATING VINYL DISK CONTAINER ───────────────────── */}
        {/* 
            Height is exactly half (46px - 52px).
            Top half is tucked above and hidden behind the nav!
        */}
        <div
          onClick={handleTogglePlay}
          className="relative w-22 sm:w-26 h-11 sm:h-13 overflow-hidden cursor-pointer group"
          title={isPlaying ? "Click to Pause" : "Click to Play"}
        >
          {/* 
              Full 360 circular vinyl disk shifted up by half its height (-mt-11 sm:-mt-13).
              Only the bottom half emerges beneath the nav!
          */}
          <div
            className={`w-22 h-22 sm:w-26 sm:h-26 -mt-11 sm:-mt-13 rounded-full relative shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:translate-y-0.5 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
            style={{
              animationPlayState: isPlaying ? "running" : "paused",
              background:
                "radial-gradient(circle, #0e1015 0%, #161922 45%, #0a0b0e 70%, #050608 100%)",
            }}
          >
            {/* Concentric micro-groove rings */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-45"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle, rgba(255,255,255,0.08) 0px, transparent 1px, transparent 2.5px)",
              }}
            />

            {/* Subtle vinyl specular reflection sheen */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  "conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.4) 60deg, transparent 120deg, transparent 180deg, rgba(255,255,255,0.4) 240deg, transparent 300deg)",
              }}
            />

            {/* Inner rim guide */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-full border border-white/10 pointer-events-none" />

            {/* Center Label (Album Artwork & Spindle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#0047FF]/70 overflow-hidden shadow-md bg-black">
              {currentTrack?.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#0047FF]/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#0047FF]" />
                </div>
              )}

              {/* Central Spindle Hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0a0b0e] border border-white/30 shadow-inner" />
            </div>
          </div>

          {/* Quick Play/Pause overlay on hover directly on the disk */}
          <div className="absolute inset-x-0 bottom-0 top-1 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/25 backdrop-blur-[1px]">
            <div className="w-6 h-6 rounded-full bg-white/95 text-black flex items-center justify-center shadow-md">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#0047FF]">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#0047FF] ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE HOVER CONTROLS BADGE ─────────────────────────────── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#0047FF]/20 shadow-[0_8px_24px_rgba(0,0,0,0.12)] whitespace-nowrap z-30 font-mono text-[9px]"
            >
              {/* Animated audio bars */}
              <div className="flex items-end gap-0.5 h-3 shrink-0">
                <span
                  className={`w-0.5 rounded-full bg-[#0047FF] ${
                    isPlaying ? "animate-[bounce_0.6s_ease-in-out_infinite]" : "h-1"
                  }`}
                  style={{ height: isPlaying ? undefined : "4px" }}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#0047FF] ${
                    isPlaying ? "animate-[bounce_0.8s_ease-in-out_0.2s_infinite]" : "h-2"
                  }`}
                  style={{ height: isPlaying ? undefined : "8px" }}
                />
                <span
                  className={`w-0.5 rounded-full bg-[#0047FF] ${
                    isPlaying ? "animate-[bounce_0.7s_ease-in-out_0.4s_infinite]" : "h-1"
                  }`}
                  style={{ height: isPlaying ? undefined : "5px" }}
                />
              </div>

              {/* Track Title */}
              <div className="flex flex-col max-w-[130px] overflow-hidden">
                <span className="font-bold text-black truncate tracking-wide">
                  {currentTrack?.title || "Audio Track"}
                </span>
                <span className="text-black/45 text-[8px] truncate">
                  {currentTrack?.artist || "Sourodip"}
                </span>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="p-1 rounded hover:bg-[#0047FF]/10 text-black/60 hover:text-[#0047FF] transition-colors cursor-pointer shrink-0 ml-1"
                title="Next Track"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
