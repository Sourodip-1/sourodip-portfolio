"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { scrollToSection } from "./SmoothScroll";

// ── FINE-ART NOISE GRAIN TEXTURE (MATCHING EXPERIENCE SECTION) ────────────────
function CardNoiseTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.22] mix-blend-multiply z-[2]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// ── TEMPLE ARCHITECTURAL CORNER BRACKETS (MATCHING EXPERIENCE SECTION) ───────
function CornerBrackets({
  accent = "#EA580C",
  opacity = 1,
}: {
  accent?: string;
  opacity?: number;
}) {
  return (
    <>
      <div
        className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors z-[4] pointer-events-none"
        style={{ borderColor: accent, opacity }}
      />
      <div
        className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors z-[4] pointer-events-none"
        style={{ borderColor: accent, opacity }}
      />
      <div
        className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors z-[4] pointer-events-none"
        style={{ borderColor: accent, opacity: opacity * 0.7 }}
      />
      <div
        className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors z-[4] pointer-events-none"
        style={{ borderColor: accent, opacity: opacity * 0.7 }}
      />
    </>
  );
}

// ── 01 / SAFFRON FLAME PETAL MOTIF (INDIAN ARCHITECTURAL HERITAGE) ────────────
function SaffronFlameMotif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="footer-flame-filter" x="10" y="5" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-6" />
          <feGaussianBlur stdDeviation="4.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.95 0 0 0 0 0.35 0 0 0 0 0.1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="footer-flame-grad" x1="62.5" y1="12" x2="62.5" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2E8" />
          <stop offset="40%" stopColor="#FF8800" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <g filter="url(#footer-flame-filter)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46.1294 25.6096C47.5856 24.1534 49.1867 22.9299 50.8874 21.9426C53.1384 20.6467 56.5067 18.6794 57.6306 17.7803C57.7432 17.6902 57.9251 17.5838 58.1543 17.4496C59.1975 16.8391 61.2197 15.6557 62.1391 12.8353C62.2852 12.388 62.8654 12.3884 63.0095 12.8353C64.0182 15.9665 66.3624 17.178 67.2715 17.6478C67.3739 17.7008 67.4586 17.7445 67.5205 17.7803C67.9262 18.0145 68.9119 18.6515 70.0229 19.3695C71.3741 20.2427 72.9116 21.2363 73.8141 21.7694V21.7749C75.6257 22.7905 77.3297 24.0689 78.8706 25.6096C82.755 29.494 84.9706 34.4155 85.5172 39.4828C90.5845 40.0294 95.506 42.245 99.3904 46.1294C100.847 47.5856 102.07 49.1867 103.057 50.8874C104.353 53.1384 106.321 56.5067 107.22 57.6306C107.31 57.7432 107.416 57.9251 107.55 58.1543C108.161 59.1975 109.344 61.2197 112.165 62.1391C112.612 62.2852 112.612 62.8654 112.165 63.0095C109.033 64.0182 107.822 66.3624 107.352 67.2715C107.299 67.374 107.255 67.4585 107.22 67.5205C106.986 67.9261 106.349 68.9117 105.631 70.0225C104.758 71.3737 103.764 72.9116 103.231 73.8141H103.225C102.21 75.6257 100.931 77.3297 99.3904 78.8706C95.506 82.755 90.5845 84.9706 85.5172 85.5172C84.9706 90.5845 82.755 95.506 78.8706 99.3904C77.4144 100.847 75.8133 102.07 74.1126 103.057C71.8616 104.353 68.4933 106.321 67.3694 107.22C67.2568 107.31 67.0749 107.416 66.8457 107.55C65.8025 108.161 63.7803 109.344 62.8609 112.165C62.7148 112.612 62.1346 112.612 61.9905 112.165C60.9818 109.033 58.6376 107.822 57.7285 107.352C57.626 107.299 57.5415 107.255 57.4795 107.22C57.0736 106.985 56.0871 106.348 54.9756 105.629C53.6244 104.756 52.0884 103.764 51.1859 103.231V103.225C49.3743 102.21 47.6703 100.931 46.1294 99.3904C42.245 95.506 40.0294 90.5845 39.4828 85.5172C34.4155 84.9706 29.494 82.755 25.6096 78.8706C24.1534 77.4144 22.9299 75.8133 21.9426 74.1126C20.6467 71.8616 18.6794 68.4933 17.7803 67.3694C17.6902 67.2568 17.5838 67.0749 17.4496 66.8457C16.8391 65.8025 15.6557 63.7803 12.8353 62.8609C12.388 62.7148 12.3884 62.1346 12.8353 61.9905C15.9665 60.9818 17.178 58.6376 17.6478 57.7285C17.7008 57.6261 17.7445 57.5414 17.7803 57.4795C18.0145 57.0738 18.6515 56.0881 19.3695 54.9771C20.2427 53.6259 21.2363 52.0884 21.7694 51.1859H21.7749C22.7905 49.3743 24.0689 47.6703 25.6096 46.1294C29.494 42.245 34.4155 40.0294 39.4828 39.4828C40.0294 34.4155 42.245 29.494 46.1294 25.6096Z"
          fill="url(#footer-flame-grad)"
        />
      </g>
    </svg>
  );
}

// ── 02 / GOLDEN AMBER ROSETTE MOTIF (INDIAN HERITAGE) ───────────────────────
function GoldenRosetteMotif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="footer-gold-rosette-filter" x="10" y="10" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.85 0 0 0 0 0.45 0 0 0 0 0.05 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="footer-gold-rosette-grad" x1="62.5" y1="12" x2="62.5" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <g filter="url(#footer-gold-rosette-filter)">
        <path
          d="M62.2812 12.697C62.3518 12.434 62.6482 12.4341 62.7188 12.697C63.3537 14.7673 65.3145 16.2137 67.4766 16.2253H71.1758C75.1453 16.2253 78.3869 19.3353 78.5996 23.2517C78.6891 23.2883 78.779 23.3239 78.8682 23.3611C81.7879 20.7428 86.2802 20.8368 89.0869 23.6433L91.6768 26.2341C93.1973 27.7545 95.6571 28.1401 97.5615 27.1296C97.7973 26.9935 98.0067 27.2025 97.8711 27.4382C96.8561 29.3511 97.2196 31.7606 98.7402 33.2976L101.356 35.9138C104.153 38.7106 104.255 43.1789 101.665 46.0994C101.707 46.1997 101.747 46.3013 101.788 46.4021C105.686 46.6345 108.775 49.8678 108.775 53.824V57.4871C108.775 59.6373 110.242 61.6488 112.303 62.281C112.566 62.3515 112.566 62.648 112.303 62.7185C110.233 63.3535 108.787 65.3143 108.775 67.4763V71.1755C108.775 75.1221 105.701 78.3491 101.816 78.5955C101.772 78.7041 101.729 78.8134 101.684 78.9216C104.254 81.8425 104.146 86.2966 101.356 89.0867L98.7666 91.6765C97.2461 93.1971 96.8606 95.6568 97.8711 97.5613C98.0071 97.7971 97.7973 98.0069 97.5615 97.8708C95.6487 96.8559 93.2402 97.2195 91.7031 98.74L89.0869 101.356C86.2969 104.146 81.8428 104.254 78.9219 101.683C78.8132 101.729 78.7038 101.772 78.5947 101.817C78.3479 105.701 75.122 108.775 71.1758 108.775H67.5137C65.3634 108.775 63.351 110.241 62.7188 112.302C62.6482 112.566 62.3518 112.566 62.2812 112.302C61.6462 110.233 59.6862 108.787 57.5244 108.775H53.8242C49.868 108.775 46.6347 105.686 46.4023 101.788C46.3016 101.746 46.2 101.707 46.0996 101.665C43.1792 104.255 38.7108 104.153 35.9141 101.356L33.3232 98.7664C31.8027 97.2459 29.3429 96.8604 27.4385 97.8708C27.2027 98.0065 26.9938 97.797 27.1299 97.5613C28.1448 95.6484 27.7803 93.2399 26.2598 91.7029L23.6436 89.0867C20.837 86.28 20.743 81.7877 23.3613 78.8679C23.3242 78.779 23.2885 78.6895 23.252 78.6003C19.3355 78.3876 16.2256 75.1451 16.2256 71.1755V67.5134C16.2255 65.3631 14.7584 63.3506 12.6973 62.7185C12.4343 62.6479 12.4342 62.3515 12.6973 62.281C14.7675 61.6461 16.2138 59.6861 16.2256 57.5242V53.824C16.2256 49.8445 19.351 46.5943 23.2812 46.3962C23.3145 46.3153 23.3461 46.2337 23.3799 46.1531C20.7425 43.234 20.8306 38.7272 23.6436 35.9138L26.2344 33.323C27.7546 31.8024 28.1403 29.3426 27.1299 27.4382C26.994 27.2025 27.2027 26.9937 27.4385 27.1296C29.3514 28.1446 31.7608 27.7801 33.2979 26.2595L35.9141 23.6433C38.7275 20.8304 43.2342 20.7423 46.1533 23.3796C46.234 23.3459 46.3156 23.3143 46.3965 23.281C46.5945 19.3507 49.8447 16.2254 53.8242 16.2253H57.4873C59.6376 16.2252 61.6491 14.7582 62.2812 12.697Z"
          fill="url(#footer-gold-rosette-grad)"
        />
      </g>
    </svg>
  );
}

// ── 03 / AUSPICIOUS PADMA LOTUS BLOOM (FOR SACRED THANK-YOU) ──────────────────
function SacredPadmaThankYouBloom() {
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 relative mx-auto select-none">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        <defs>
          <radialGradient id="padma-aura" cx="60" cy="60" r="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="45%" stopColor="#FDE68A" />
            <stop offset="85%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <filter id="padma-inner-glow" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
            <feFlood floodColor="#B45309" floodOpacity="0.4" />
            <feComposite in2="shadowDiff" operator="in" />
            <feComposite in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        {/* Outer Radiant Orbit Lines with Cardinal Indic Ticks */}
        <circle cx="60" cy="60" r="54" stroke="#D97706" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <circle cx="60" cy="60" r="48" stroke="#D97706" strokeWidth="1.2" opacity="0.7" />

        {/* 8 Cardinal Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <path
              d="M60 14C53 26 48 38 60 48C72 38 67 26 60 14Z"
              fill="url(#padma-aura)"
              stroke="#B45309"
              strokeWidth="1"
            />
            <circle cx="60" cy="18" r="2" fill="#D97706" />
          </g>
        ))}

        {/* Central Core Lotus Seed Cup & Sacred Bindu */}
        <circle cx="60" cy="60" r="18" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.6" filter="url(#padma-inner-glow)" />
        <circle cx="60" cy="60" r="11" fill="#FF8800" opacity="0.85" />
        <circle cx="60" cy="60" r="5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

interface FeedbackItem {
  submissionId: string;
  timestamp: string;
  name: string;
  impression: string;
  extras: string;
  message?: string;
}

// Preset impressions without emojis
const PRESET_IMPRESSIONS = [
  "Mindblowing Motion",
  "Architectural & CAD",
  "Indic Sound FX",
  "Classical Heritage",
  "Systems Engineering",
  "Peak Experience",
];

export default function FooterContactSection() {
  const [activeTab, setActiveTab] = useState<"contact" | "feedback">("contact");
  const [currentTime, setCurrentTime] = useState("");

  // Contact form state
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Feedback form state
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<{
    name: string;
    email?: string;
    impression: string;
  } | null>(null);
  const [selectedImpression, setSelectedImpression] = useState("");

  const contactFormRef = useRef<HTMLFormElement>(null);
  const feedbackFormRef = useRef<HTMLFormElement>(null);

  // Update live clock (Kolkata IST)
  useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Contact Form Submit (Non-blocking, gracefully handles Postpipe without throwing error)
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactLoading(true);
    sound.playClick(600);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("Your Name") as string)?.trim() || "";
    const email = (formData.get("Email") as string)?.trim() || "";
    const phone = (formData.get("Phone") as string)?.trim() || "";
    const message = (formData.get("Message") as string)?.trim() || "";

    // 1. Postpipe endpoint submission (intentionally may return 404/not found; never throw error)
    try {
      await fetch(
        "https://www.postpipe.in/api/public/submit/portfolio-contact",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch {
      // Silently handled as requested
    }

    // 2. Dispatch Thank-You Email via Resend if email is provided
    if (email && email.includes("@")) {
      try {
        await fetch("/api/send-thank-you", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "contact",
            name,
            email,
            phone,
            message,
          }),
        });
      } catch (mailErr) {
        console.error("Thank-you dispatch notice (non-fatal):", mailErr);
      }
    }

    // Success response
    setContactSuccess({ name, email });
    sound.playHover(700);
    form.reset();
    setContactLoading(false);
  };

  // Handle Feedback Form Submit (Non-blocking, gracefully handles Postpipe without throwing error)
  const handleFeedbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedbackLoading(true);
    sound.playClick(600);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("Name") as string)?.trim() || "";
    const impression = (formData.get("impression") as string)?.trim() || "";
    const extras = (formData.get("extras") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";

    // 1. Postpipe endpoint submission (intentionally may return 404/not found; never throw error)
    try {
      await fetch(
        "https://www.postpipe.in/api/public/submit/portfolio-feedback",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch {
      // Silently handled as requested
    }

    // 2. If email provided, dispatch thank-you email via Resend
    if (email && email.includes("@")) {
      try {
        await fetch("/api/send-thank-you", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "feedback",
            name,
            email,
            impression,
            extras,
            message,
          }),
        });
      } catch (mailErr) {
        console.error("Feedback thank you notice (non-fatal):", mailErr);
      }
    }

    // Broadcast event for the VisitorTestimonialsSection above to update immediately
    const newFeedbackItem: FeedbackItem = {
      submissionId: `feed-${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: name || "Anonymous Visitor",
      impression: impression || "Peak Experience",
      extras: extras || "Portfolio Impression",
      message: message || undefined,
    };
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio-feedback-submitted", {
          detail: newFeedbackItem,
        })
      );
    }

    // Success response
    setFeedbackSuccess({ name, email, impression });
    sound.playHover(700);
    form.reset();
    setSelectedImpression("");
    setFeedbackLoading(false);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#FAF8F5] text-stone-900 pt-20 sm:pt-28 pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden font-mono selection:bg-[#EA580C] selection:text-white border-t border-black/[0.08]"
      aria-label="05 Direct Transmission and Dialogue - Indian Heritage Cream Style"
    >
      {/* ── BACKGROUND: ARCHITECTURAL WATERMARK GRID ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(234,88,12,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,88,12,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── BACKGROUND: WARM AMBIENT AURA BLOOMS (SAFFRON & GOLD) ─────────── */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[400px] pointer-events-none opacity-35 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.20) 0%, rgba(245, 158, 11, 0.10) 50%, transparent 80%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[350px] pointer-events-none opacity-25 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(251, 191, 36, 0.08) 50%, transparent 80%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-12 sm:space-y-16 z-10">
        {/* ── SECTION HEADER (INDIAN ARCHITECTURAL BLUEPRINT HEADING) ─────── */}
        {/* ── SECTION HEADER ── */}
        <div className="pb-10 border-b border-black/10">
          <div>
            {/* Indic Script Ribbon */}
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#EA580C] uppercase tracking-[0.28em] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
              <span>॥ संवाद सूत्र // SAMVĀDA SŪTRA · 05 ॥</span>
            </div>

            {/* Main Section Heading in Authentic Indian Architectural Epigraphy */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] sm:text-[11.5px] text-black/50 tracking-[0.26em] uppercase font-medium">
                <span>॥ वादे वादे जायते तत्त्वबोधः ॥</span>
              </div>
              <h2 className="font-cinzel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] text-black uppercase leading-[1.15] flex flex-wrap items-baseline gap-x-3.5">
                <span>LET&apos;S BUILD WHAT</span>
                <span className="text-[#EA580C] relative">
                  MATTERS.
                  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#EA580C]/25" />
                </span>
                <span className="text-[#EA580C] font-light">॥</span>
              </h2>
            </div>

            <p className="mt-4 text-xs sm:text-[13px] text-stone-600 max-w-2xl leading-relaxed font-sans">
              Have an ambitious systems architecture project, motion engineering idea, or feedback on this portfolio?
              Every transmission is received directly into my personal communication stream.
            </p>
          </div>
        </div>

        {/* ── MINIMAL TAB SELECTOR ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.08] pb-3">
          <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
            {/* Tab 01: Direct Contact */}
            <button
              type="button"
              onClick={() => {
                sound.playClick(500);
                setActiveTab("contact");
              }}
              className={`relative pb-2 font-medium tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "contact"
                  ? "text-stone-900 font-bold"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              <span className="text-[11px] text-[#EA580C] font-semibold">[ ०१ ]</span>
              <span>DIRECT MESSAGE</span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">// सम्पर्क</span>
              {activeTab === "contact" && (
                <motion.div
                  layoutId="minimalContactTabIndicator"
                  className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#EA580C]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>

            {/* Tab 02: Leave Feedback */}
            <button
              type="button"
              onClick={() => {
                sound.playClick(500);
                setActiveTab("feedback");
              }}
              className={`relative pb-2 font-medium tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === "feedback"
                  ? "text-stone-900 font-bold"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              <span className="text-[11px] text-[#EA580C] font-semibold">[ ०२ ]</span>
              <span>LEAVE FEEDBACK</span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">// प्रतिक्रिया</span>
              {activeTab === "feedback" && (
                <motion.div
                  layoutId="minimalContactTabIndicator"
                  className="absolute -bottom-[13px] left-0 right-0 h-[2px] bg-[#EA580C]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          </div>

          <div className="text-[11px] text-stone-400 font-mono flex items-center gap-2 tracking-wide">
            <span>DISPATCH POWERED BY</span>
            <span className="text-stone-800 font-semibold">POSTPIPE</span>
            <span>&bull;</span>
            <span className="text-[#EA580C] font-semibold">RESEND</span>
          </div>
        </div>

        {/* ── TAB CONTENT CONTAINERS (CREAM THEME & NOISE TEXTURE) ─────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Dynamic Box (8 Columns) */}
          <div className="lg:col-span-8 relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F3] to-[#FFF1E6] border border-black/[0.09] rounded-2xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.05)] overflow-hidden">
            
            {/* Ambient Aura & Noise Grain Texture */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at 92% 12%, rgba(234, 88, 12, 0.16) 0%, rgba(245, 158, 11, 0.08) 40%, transparent 75%)",
              }}
            />
            <CardNoiseTexture />

            {/* Corner Architectural Brackets */}
            <CornerBrackets accent="#EA580C" opacity={0.8} />

            {/* Half-bleeding Indic Motif in Top-Right Corner */}
            <div className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-44 h-44 sm:w-56 sm:h-56 pointer-events-none z-[3] opacity-85 transition-transform duration-500">
              <SaffronFlameMotif />
            </div>

            {/* ── VIEW 1: CONTACT FORM ────────────────────────────────────── */}
            {activeTab === "contact" && (
              <div className="relative z-10">
                <div className="pb-4 border-b border-black/[0.08] mb-6 max-w-[85%]">
                  <h3 className="font-cinzel font-bold text-lg sm:text-xl text-stone-900 uppercase tracking-tight">
                    ॥ प्रत्यक्ष सम्पर्क // DIRECT TRANSMISSION ॥
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Inscribe your message below. A tailored confirmation will be dispatched to your email.
                  </p>
                </div>

                {/* ── REDESIGNED THANK YOU MESSAGE (INDIAN ARCHITECTURAL HERITAGE PLAQUE) ── */}
                {contactSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative my-4 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FFF1E0] border border-amber-900/15 shadow-[0_16px_36px_rgba(217,119,6,0.12)] text-center space-y-6 overflow-hidden"
                  >
                    <CardNoiseTexture />
                    <CornerBrackets accent="#D97706" opacity={1} />

                    {/* Auspicious Sacred Padma Blossom */}
                    <SacredPadmaThankYouBloom />

                    <div className="space-y-2 relative z-10">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-[10.5px] font-bold text-amber-800 tracking-widest uppercase">
                        ॥ कृतज्ञता सूत्र // KRITAJÑATĀ SŪTRA ॥
                      </div>

                      <h4 className="font-cinzel font-bold text-2xl sm:text-3xl text-stone-900 uppercase tracking-tight">
                        TRANSMISSION REVERENTLY RECEIVED
                      </h4>

                      <p className="text-xs sm:text-[13px] text-stone-700 max-w-lg mx-auto leading-relaxed font-sans">
                        Thank you, <strong className="text-stone-900 font-bold">{contactSuccess.name}</strong>.
                        Your message has reached Sourodip&apos;s direct communication stream in Kolkata.
                        {contactSuccess.email && (
                          <span>
                            {" "}A sacred digital confirmation has been dispatched to{" "}
                            <span className="text-[#EA580C] font-bold underline decoration-[#EA580C]/30">{contactSuccess.email}</span>.
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Recorded Transmission Plaque */}
                    <div className="relative z-10 max-w-md mx-auto p-4 rounded-xl bg-[#FAF7EE] border border-amber-900/10 text-left font-mono text-[11px] text-stone-600 space-y-1.5 shadow-inner">
                      <div className="flex justify-between items-center pb-1.5 border-b border-black/[0.06] text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                        <span>RECORDED TRANSMISSION DETAILS</span>
                        <span>[ {currentTime || "IST"} ]</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">SENDER:</span>
                        <span className="text-stone-900 font-bold">{contactSuccess.name}</span>
                      </div>
                      {contactSuccess.email && (
                        <div className="flex justify-between">
                          <span className="text-stone-400">DISPATCH TO:</span>
                          <span className="text-[#EA580C] font-semibold">{contactSuccess.email}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-stone-400">STATUS:</span>
                        <span className="text-emerald-700 font-bold">॥ संचितम् // RECORDED ॥</span>
                      </div>
                    </div>

                    {/* Sanskrit Epilogue Blessing */}
                    <div className="relative z-10 font-mono text-[10.5px] text-stone-500 tracking-widest uppercase">
                      ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
                    </div>

                    <button
                      onClick={() => setContactSuccess(null)}
                      className="relative z-10 mt-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>← DISPATCH ANOTHER NOTE</span>
                      <span className="text-[10px] text-stone-400">// पुनः प्रेषणम्</span>
                    </button>
                  </motion.div>
                ) : (
                  <form
                    ref={contactFormRef}
                    onSubmit={handleContactSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                          Your Name // नाम <span className="text-[#EA580C]">*</span>
                        </label>
                        <input
                          type="text"
                          name="Your Name"
                          required
                          placeholder="e.g. Alex Mercer"
                          className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                          Email // पत्रालय <span className="text-[#EA580C]">*</span>
                        </label>
                        <input
                          type="email"
                          name="Email"
                          required
                          placeholder="name@domain.com"
                          className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Phone // दूरभाष <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        step="1"
                        name="Phone"
                        placeholder="+91 or country code + number"
                        className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Message // सन्देश <span className="text-[#EA580C]">*</span>
                      </label>
                      <textarea
                        name="Message"
                        required
                        rows={4}
                        placeholder="Tell me about your systems project, motion engineering idea, or technical inquiry..."
                        className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner resize-y leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_22px_rgba(234,88,12,0.3)] hover:shadow-[0_4px_28px_rgba(234,88,12,0.45)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {contactLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <span>SUBMIT TRANSMISSION</span>
                          <span className="text-white/70">// प्रेष्यताम्</span>
                          <span>&rarr;</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ── VIEW 2: FEEDBACK FORM ───────────────────────────────────── */}
            {activeTab === "feedback" && (
              <div className="relative z-10">
                <div className="pb-4 border-b border-black/[0.08] mb-6 max-w-[85%]">
                  <h3 className="font-cinzel font-bold text-lg sm:text-xl text-stone-900 uppercase tracking-tight">
                    ॥ प्रतिक्रिया // PORTFOLIO IMPRESSION ॥
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Share what you thought about the Indian heritage aesthetic, spatial typography, and motion design.
                  </p>
                </div>

                {/* ── REDESIGNED THANK YOU MESSAGE (FEEDBACK RECORDED) ──────── */}
                {feedbackSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="relative my-4 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FFF1E0] border border-amber-900/15 shadow-[0_16px_36px_rgba(234,88,12,0.12)] text-center space-y-6 overflow-hidden"
                  >
                    <CardNoiseTexture />
                    <CornerBrackets accent="#EA580C" opacity={1} />

                    {/* Golden Rosette Motif */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 relative mx-auto">
                      <GoldenRosetteMotif />
                    </div>

                    <div className="space-y-2 relative z-10">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-[10.5px] font-bold text-amber-900 tracking-widest uppercase">
                        ॥ विचार सङ्ग्रह // IMPRESSION INSCRIBED ॥
                      </div>

                      <h4 className="font-cinzel font-bold text-2xl sm:text-3xl text-stone-900 uppercase tracking-tight">
                        ETCHED INTO THE LIVING ARCHIVE
                      </h4>

                      <p className="text-xs sm:text-[13px] text-stone-700 max-w-lg mx-auto leading-relaxed font-sans">
                        Thank you, <strong className="text-stone-900 font-bold">{feedbackSuccess.name}</strong>!
                        Your impression &ldquo;<span className="text-[#EA580C] font-semibold">{feedbackSuccess.impression}</span>&rdquo;
                        has been reverently recorded on the Visitor Wall.
                        {feedbackSuccess.email && (
                          <span className="block mt-1 text-stone-600">
                            A personalized appreciation note has been dispatched to{" "}
                            <strong className="text-stone-900">{feedbackSuccess.email}</strong>.
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3 relative z-10">
                      <button
                        onClick={() => setFeedbackSuccess(null)}
                        className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                      >
                        LEAVE ANOTHER NOTE
                      </button>
                      <button
                        onClick={() => {
                          scrollToSection("testimonials", -20);
                        }}
                        className="px-5 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-[0_4px_16px_rgba(234,88,12,0.3)] inline-flex items-center gap-2"
                      >
                        <span>VIEW ON WALL // विचार मण्डल</span>
                        <span>&uarr;</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    ref={feedbackFormRef}
                    onSubmit={handleFeedbackSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                          Your Name // नाम <span className="text-[#EA580C]">*</span>
                        </label>
                        <input
                          type="text"
                          name="Name"
                          required
                          placeholder="e.g. Jordan V."
                          className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                        />
                      </div>

                      {/* Email for thank-you */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                          Email // पत्रालय <span className="text-stone-400 font-normal">(Optional — for thank-you dispatch)</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@domain.com"
                          className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Quick Impression Selector Chips (No Emojis) */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Impression // प्रभाव <span className="text-[#EA580C]">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {PRESET_IMPRESSIONS.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => {
                              sound.playClick(700);
                              setSelectedImpression(preset);
                            }}
                            className={`px-3 py-1.5 rounded-full text-[10.5px] font-bold transition-all cursor-pointer border ${
                              selectedImpression === preset
                                ? "bg-[#EA580C] border-[#EA580C] text-white shadow-[0_2px_10px_rgba(234,88,12,0.3)]"
                                : "bg-[#FAF7EE] text-stone-700 hover:text-black hover:border-black/30 border-black/[0.08]"
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        name="impression"
                        required
                        value={selectedImpression}
                        onChange={(e) => setSelectedImpression(e.target.value)}
                        placeholder="Select above or type custom impression..."
                        className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Extras */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Highlight // वैशिष्ट्य <span className="text-[#EA580C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="extras"
                        required
                        placeholder="e.g. Loved the Indian jali motifs, vinyl player, or CAD architectural card"
                        className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                        Message / Suggestions // परामर्श <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Any additional thoughts, suggestions, or critique..."
                        className="w-full bg-[#FAF8F5] border border-stone-300 focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 rounded-xl p-3 text-xs text-stone-900 placeholder-stone-400 outline-none transition-all shadow-inner resize-y leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={feedbackLoading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_22px_rgba(234,88,12,0.3)] hover:shadow-[0_4px_28px_rgba(234,88,12,0.45)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      {feedbackLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          RECORDING IMPRESSION...
                        </>
                      ) : (
                        <>
                          <span>SEND FEEDBACK</span>
                          <span className="text-white/70">// प्रतिक्रिया प्रेष्यताम्</span>
                          <span>&rarr;</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* Side Info & Direct Coordinates (4 Columns) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Direct Coordinates Card */}
            <div className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F3] to-[#FFF1E6] border border-black/[0.09] rounded-2xl p-6 space-y-4 shadow-sm overflow-hidden">
              <CardNoiseTexture />
              <CornerBrackets accent="#EA580C" opacity={0.6} />

              <div className="relative z-10 text-[10px] text-[#EA580C] uppercase font-bold tracking-widest pb-3 border-b border-black/[0.08] flex items-center justify-between">
                <span>// DIRECT COORDINATES</span>
                <span className="text-stone-400">सम्पर्क सूत्र</span>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] text-stone-400 block mb-1 uppercase font-semibold">PRIMARY EMAIL</span>
                <a
                  href="mailto:founder@postpipe.in"
                  className="text-xs text-stone-900 hover:text-[#EA580C] transition-colors font-bold block"
                >
                  founder@postpipe.in
                </a>
                <a
                  href="mailto:sourox1919@gmail.com"
                  className="text-[11px] text-stone-600 hover:text-stone-900 transition-colors block mt-0.5"
                >
                  sourox1919@gmail.com
                </a>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] text-stone-400 block mb-1 uppercase font-semibold">LOCATION &amp; TIMEZONE</span>
                <span className="text-xs text-stone-900 font-semibold block">Kolkata, India // Asia/Kolkata</span>
                <span className="text-[10px] text-stone-500 font-mono block mt-0.5">22.5726° N, 88.3639° E · VĀSTU ZONE</span>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] text-stone-400 block mb-1.5 uppercase font-semibold">ONLINE NETWORKS</span>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="https://github.com/sourodip-1"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-white border border-black/[0.08] hover:border-[#EA580C]/40 text-stone-800 hover:text-[#EA580C] transition-all shadow-xs"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sourodip-roy-89560934b/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-white border border-black/[0.08] hover:border-[#EA580C]/40 text-stone-800 hover:text-[#EA580C] transition-all shadow-xs"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://www.instagram.com/sourodip_1/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#FAF7EE] hover:bg-white border border-black/[0.08] hover:border-[#EA580C]/40 text-stone-800 hover:text-[#EA580C] transition-all shadow-xs"
                  >
                    Instagram ↗
                  </a>
                </div>
              </div>

            </div>

            {/* Architecture Specification Card */}
            <div className="relative bg-[#FAF7EE]/90 border border-black/[0.07] rounded-2xl p-5 text-[11px] text-stone-600 space-y-2 shadow-xs overflow-hidden">
              <CardNoiseTexture />
              <div className="relative z-10 flex items-center gap-2 text-stone-900 font-bold uppercase tracking-wider text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                <span>DISPATCH INFRASTRUCTURE // तन्त्र व्यवस्था</span>
              </div>
              <p className="relative z-10 leading-relaxed font-sans text-stone-600">
                Forms ingest transmissions securely via PostPipe endpoints. Instantaneous thank-you dispatches are orchestrated through Resend infrastructure with verified DKIM/SPF domain encryption.
              </p>
            </div>
          </div>
        </div>

        {/* ── FOOTER BOTTOM BAR (INDIAN ARCHITECTURAL SIGNATURE) ─────────── */}
        <div className="pt-10 border-t border-black/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sourodip Logo"
              width={44}
              height={44}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
            />
            <div>
              <div className="font-cinzel text-lg font-bold text-stone-900 tracking-wider">
                SOURODIP ROY
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Systems architecture. Creative development. Build what matters.
              </p>
            </div>
          </div>

          {/* Indic Inscription Ribbon */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-mono">
            <span>॥ वसुधैव कुटुम्बकम् // ONE WORLD · 2026 ॥</span>
          </div>

          <div className="flex items-center gap-5 flex-wrap text-[11px] font-mono">
            <button
              onClick={() => scrollToSection(0, 0)}
              className="text-[#EA580C] hover:underline cursor-pointer font-bold"
            >
              [TOP ↑]
            </button>
            <button
              onClick={() => scrollToSection("work", -20)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              [01 WORK]
            </button>
            <button
              onClick={() => scrollToSection("about", -20)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              [02 ABOUT]
            </button>
            <button
              onClick={() => scrollToSection("experience", -20)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              [03 EXP]
            </button>
            <button
              onClick={() => scrollToSection("interlude", -20)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              [04 INTERLUDE]
            </button>
            <button
              onClick={() => scrollToSection("testimonials", -20)}
              className="hover:text-black transition-colors cursor-pointer"
            >
              [05 IMPRESSIONS]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
