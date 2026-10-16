"use client";

import { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import MusicPlayer, { type Track } from "@/components/ui/music-player-widget";

export const SOUND_TRACKS: Track[] = [
  {
    title: "मस्ती का मेला",
    artist: "Sourodip",
    cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&auto=format&fit=crop&q=80",
    src: "/मस्ती का मेला.wav",
  },
  {
    title: "Endless Sky",
    artist: "Sourodip",
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80",
    src: "/Endless Sky.wav",
  },
  {
    title: "Red Line Climb",
    artist: "Devs",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
    src: "/Red Line Climb (Devs).wav",
  },
  {
    title: "Steady Stream",
    artist: "Backend Devs",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&auto=format&fit=crop&q=80",
    src: "/Steady Stream (Backend Devs).wav",
  },
  {
    title: "System Architecture",
    artist: "Sourodip",
    cover: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&auto=format&fit=crop&q=80",
    src: "/System Architecture.wav",
  },
  {
    title: "The Open Page",
    artist: "General",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80",
    src: "/The Open Page (General).wav",
  },
  {
    title: "光の海へ",
    artist: "Hikari",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80",
    src: "/光の海へ.wav",
  },
  {
    title: "Line By Line",
    artist: "Sourodip & Vocal",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
    src: "/English Vocal Version.wav",
  },
];

export default function SoundControlMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.2); // Default to 20% volume per user request
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.2);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [selectedTrackIdx, setSelectedTrackIdx] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const libraryListRef = useRef<HTMLDivElement>(null);

  // Prevent wheel events inside dropdown panel or track library from scrolling the page
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      const lib = libraryListRef.current;
      if (lib && lib.contains(e.target as Node)) {
        e.preventDefault();
        lib.scrollTop += e.deltaY;
        return;
      }

      if (panel.scrollHeight > panel.clientHeight) {
        const isAtTop = panel.scrollTop <= 0 && e.deltaY < 0;
        const isAtBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1 && e.deltaY > 0;
        if (!isAtTop && !isAtBottom) {
          e.preventDefault();
          panel.scrollTop += e.deltaY;
        } else {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    };

    panel.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      panel.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSfxEnabled(sound.getEnabled());
      const savedVol = localStorage.getItem("bg_music_volume");
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          setMusicVolume(parsed);
        }
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playClick(620);
  };

  const handleVolumeChange = (newVol: number) => {
    setMusicVolume(newVol);
    if (isMusicMuted && newVol > 0) {
      setIsMusicMuted(false);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("bg_music_volume", String(newVol));
    }
  };

  const toggleMusicMute = () => {
    sound.playClick(520);
    if (isMusicMuted) {
      setIsMusicMuted(false);
      setMusicVolume(prevVolume > 0 ? prevVolume : 0.2);
    } else {
      setPrevVolume(musicVolume);
      setIsMusicMuted(true);
    }
  };

  // Keyboard shortcut: Pressing 'M' / 'm' toggles music mute globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleMusicMute();
      }
    };

    const handleExternalToggle = () => {
      toggleMusicMute();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-music-mute", handleExternalToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-music-mute", handleExternalToggle);
    };
  }, [isMusicMuted, musicVolume, prevVolume]);

  const handleSelectTrack = (idx: number) => {
    sound.playClick(600);
    setSelectedTrackIdx(idx);
    setCurrentTrackIdx(idx);
  };

  // Remote audio synchronization for hamburger drawer
  useEffect(() => {
    const handleSetVolume = (e: Event) => {
      const custom = e as CustomEvent<{ volume: number }>;
      if (typeof custom.detail?.volume === "number") {
        handleVolumeChange(custom.detail.volume);
      }
    };
    const handleSelectTrackEvent = (e: Event) => {
      const custom = e as CustomEvent<{ index: number }>;
      if (typeof custom.detail?.index === "number") {
        handleSelectTrack(custom.detail.index);
      }
    };
    const handleRequestState = () => {
      window.dispatchEvent(
        new CustomEvent("music-state-sync", {
          detail: {
            currentTrackIdx,
            volume: isMusicMuted ? 0 : musicVolume,
            isMuted: isMusicMuted,
          },
        })
      );
    };

    window.addEventListener("set-music-volume", handleSetVolume);
    window.addEventListener("select-music-track", handleSelectTrackEvent);
    window.addEventListener("request-music-state", handleRequestState);
    return () => {
      window.removeEventListener("set-music-volume", handleSetVolume);
      window.removeEventListener("select-music-track", handleSelectTrackEvent);
      window.removeEventListener("request-music-state", handleRequestState);
    };
  }, [currentTrackIdx, isMusicMuted, musicVolume]);

  // Broadcast state changes so drawer or any widget stays in sync
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("music-state-sync", {
        detail: {
          currentTrackIdx,
          volume: isMusicMuted ? 0 : musicVolume,
          isMuted: isMusicMuted,
        },
      })
    );
  }, [currentTrackIdx, musicVolume, isMusicMuted]);

  const activeVol = isMusicMuted ? 0 : musicVolume;

  return (
    <div ref={menuRef} className="relative select-none z-50">
      {/* ── TOP NAV TRIGGER BUTTON ────────────────────────────────────────── */}
      <button
        onClick={() => {
          sound.playClick(580);
          setIsOpen((prev) => !prev);
        }}
        className={`group flex items-center gap-2 px-2.5 py-1 rounded-sm border transition-all duration-200 cursor-pointer flex-shrink-0 whitespace-nowrap ${
          isOpen
            ? "border-[#0047FF] bg-[#0047FF]/5 text-[#0047FF]"
            : "border-black/10 hover:border-[#0047FF] bg-white/70 hover:bg-white text-black/80 hover:text-[#0047FF]"
        }`}
        title="Audio & Sound Settings"
      >
        {/* Animated equalizer waves */}
        <div className="flex items-end gap-[2px] h-3.5 w-3.5 py-0.5 pointer-events-none flex-shrink-0">
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isOpen || activeVol > 0 ? "bg-[#0047FF] animate-pulse" : "bg-black/30"
            }`}
            style={{ height: activeVol > 0 ? "70%" : "30%" }}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isOpen || activeVol > 0 ? "bg-[#0047FF] animate-pulse" : "bg-black/30"
            }`}
            style={{
              height: activeVol > 0 ? "100%" : "50%",
              animationDelay: "0.15s",
            }}
          />
          <span
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isOpen || activeVol > 0 ? "bg-[#0047FF] animate-pulse" : "bg-black/30"
            }`}
            style={{
              height: activeVol > 0 ? "45%" : "25%",
              animationDelay: "0.3s",
            }}
          />
        </div>

        <span className="font-mono text-[10.5px] font-semibold tracking-wider whitespace-nowrap">
          AUDIO
        </span>

        <span className="font-mono text-[9px] text-[#0047FF] font-medium hidden sm:inline whitespace-nowrap">
          [{Math.round(activeVol * 100)}%]
        </span>

        <svg
          className={`w-3 h-3 text-black/40 group-hover:text-[#0047FF] transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0047FF]" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* ── DROPDOWN PANEL (PRESERVES MOUNTED STATE TO KEEP MUSIC ALIVE) ───── */}
      <div
        ref={panelRef}
        data-lenis-prevent
        className={`absolute top-full right-0 mt-2.5 w-[350px] sm:w-[380px] max-h-[85vh] overflow-y-auto overscroll-contain bg-white/95 backdrop-blur-xl border border-[#0047FF]/25 shadow-[0_24px_60px_rgba(0,71,255,0.12),0_8px_24px_rgba(0,0,0,0.08)] rounded-xl p-4 transition-all duration-200 origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        }`}
      >
        {/* Blueprint corner crosshairs & hairlines */}
        <div className="absolute top-2.5 left-2.5 text-[#0047FF] font-mono text-xs font-light select-none pointer-events-none leading-none">
          +
        </div>
        <div className="absolute top-2.5 right-2.5 text-[#0047FF] font-mono text-xs font-light select-none pointer-events-none leading-none">
          +
        </div>
        <div className="absolute top-5 left-3 right-3 h-px bg-[#0047FF]/15 pointer-events-none" />

        {/* Dropdown Header */}
        <div className="flex items-center justify-between pb-3 pt-0.5 border-b border-black/[0.06] mb-3.5 gap-2">
          <div className="flex items-center gap-2 whitespace-nowrap flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
            <span className="font-mono text-[10px] text-[#0047FF] font-bold tracking-widest uppercase whitespace-nowrap">
              AUDIO MATRIX // SYS.01
            </span>
          </div>
          <span className="font-mono text-[9px] text-black/40 tracking-wider whitespace-nowrap flex-shrink-0">
            6 TRACKS ACTIVE
          </span>
        </div>

        {/* ── ITEM 1: MUTE SOUND EFFECTS TOGGLE ──────────────────────────────── */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/[0.02] border border-black/[0.05] mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10.5px] font-bold tracking-wider text-black whitespace-nowrap">
                01 // SOUND EFFECTS
              </span>
              <span
                className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-semibold whitespace-nowrap ${
                  sfxEnabled
                    ? "bg-[#0047FF]/10 text-[#0047FF]"
                    : "bg-black/10 text-black/40"
                }`}
              >
                {sfxEnabled ? "ACTIVE" : "MUTED"}
              </span>
            </div>
            <p className="font-mono text-[9px] text-black/45 mt-0.5">
              Ruler scrub ticks &amp; interface chimes
            </p>
          </div>

          <button
            onClick={toggleSfx}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer flex-shrink-0 ${
              sfxEnabled ? "bg-[#0047FF]" : "bg-black/20"
            }`}
            title="Toggle Sound Effects"
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                sfxEnabled ? "translate-x-4.5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* ── ITEM 2: SLIDER TO ADJUST MUSIC ─────────────────────────────────── */}
        <div className="p-2.5 rounded-lg bg-black/[0.02] border border-black/[0.05] mb-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-mono text-[10.5px] font-bold tracking-wider text-black whitespace-nowrap">
                02 // MUSIC VOLUME
              </span>
              <span className="font-mono text-[9px] text-[#0047FF] font-semibold whitespace-nowrap">
                {Math.round(activeVol * 100)}%
              </span>
            </div>

            <button
              onClick={toggleMusicMute}
              className="font-mono text-[9px] text-black/50 hover:text-[#0047FF] transition-colors cursor-pointer uppercase tracking-wider whitespace-nowrap"
              title="Shortcut: Press 'M'"
            >
              {isMusicMuted ? "[UNMUTE] (M)" : "[MUTE] (M)"}
            </button>
          </div>

          {/* Precision custom range slider */}
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={activeVol}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#0047FF]"
            />
          </div>

          <div className="flex items-center justify-between font-mono text-[8.5px] text-black/35 mt-1.5 whitespace-nowrap">
            <span>0%</span>
            <span className="text-[#0047FF] font-medium">DEFAULT: 20%</span>
            <span>100%</span>
          </div>
        </div>

        {/* ── ITEM 3: SMALL MUSIC PLAYER ─────────────────────────────────────── */}
        <div className="mb-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10.5px] font-bold tracking-wider text-black whitespace-nowrap">
              03 // PLAYER WIDGET
            </span>
            <span className="font-mono text-[8.5px] text-black/40 italic whitespace-nowrap">
              Hover to reveal controls
            </span>
          </div>

          {/* Integrated MusicPlayer component */}
          <MusicPlayer
            tracks={SOUND_TRACKS}
            volume={activeVol}
            initialRandom={true}
            autoPlayOnInteraction={true}
            selectedTrackIndex={selectedTrackIdx}
            onTrackChange={(idx) => setCurrentTrackIdx(idx)}
          />
        </div>

        {/* ── ITEM 4: SCROLLABLE TRACK LIBRARY & DOWNLOADS ─────────────────── */}
        <div className="pt-3 border-t border-black/[0.06]">
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className="flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap">
              <span className="font-mono text-[10.5px] font-bold tracking-wider text-black whitespace-nowrap">
                04 // TRACK LIBRARY
              </span>
              <span className="font-mono text-[9px] text-[#0047FF] font-semibold whitespace-nowrap">
                [6 TRACKS]
              </span>
            </div>
            <span className="font-mono text-[8.5px] text-black/40 italic whitespace-nowrap flex-shrink-0">
              Click to play • Download .wav
            </span>
          </div>

          <div
            ref={libraryListRef}
            data-lenis-prevent
            className="space-y-1.5 max-h-40 overflow-y-auto overscroll-contain pr-1 custom-scrollbar"
          >
            {SOUND_TRACKS.map((track, idx) => {
              const isCurrent = currentTrackIdx === idx;
              return (
                <div
                  key={track.src}
                  onClick={() => handleSelectTrack(idx)}
                  className={`group flex items-center justify-between p-2 rounded-lg border transition-all duration-150 cursor-pointer ${
                    isCurrent
                      ? "bg-[#0047FF]/10 border-[#0047FF]/40 text-[#0047FF] shadow-sm"
                      : "bg-black/[0.02] border-black/[0.05] hover:bg-black/[0.05] hover:border-black/15 text-black/80"
                  }`}
                >
                  {/* Track thumbnail + title + artist */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-black/5 shadow-inner">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#0047FF]/40 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono text-[9px] font-bold ${isCurrent ? "text-[#0047FF]" : "text-black/35"}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-mono text-[10.5px] font-semibold truncate ${isCurrent ? "text-[#0047FF]" : "text-black/90"}`}>
                          {track.title}
                        </span>
                      </div>
                      <p className="font-mono text-[8.5px] text-black/40 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Playing badge + Download button */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    {isCurrent && (
                      <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#0047FF] text-white font-bold tracking-wider uppercase">
                        PLAYING
                      </span>
                    )}
                    <a
                      href={track.src}
                      download={`${track.title}.wav`}
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick(650);
                      }}
                      className="p-1.5 rounded border border-transparent hover:border-[#0047FF]/20 text-black/40 hover:text-[#0047FF] hover:bg-[#0047FF]/10 transition-colors"
                      title={`Download ${track.title} (.wav)`}
                    >
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        </div>
      </div>
    </div>
  );
}
