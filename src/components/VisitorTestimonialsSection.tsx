"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { scrollToSection } from "./SmoothScroll";

interface FeedbackItem {
  submissionId: string;
  timestamp: string;
  name: string;
  impression: string;
  extras: string;
  message?: string;
}

export const DUMMY_FEEDBACKS: FeedbackItem[] = [
  {
    submissionId: "feed-seed-01",
    timestamp: "2026-10-15T14:32:00.000Z",
    name: "Aarav Sharma",
    impression: "Mindblowing Motion",
    extras: "Senior Systems Architect",
    message: "The 60FPS fluid physics and temple architectural framing are nothing short of extraordinary. Rarely see web engineering at this calibre.",
  },
  {
    submissionId: "feed-seed-02",
    timestamp: "2026-10-15T11:20:00.000Z",
    name: "Elena Rostova",
    impression: "Peak Experience",
    extras: "Design Technologist",
    message: "The cream palette combined with the Sanskrit epigraphy gives this portfolio a deeply soulful, museum-grade aesthetic.",
  },
  {
    submissionId: "feed-seed-03",
    timestamp: "2026-10-14T18:45:00.000Z",
    name: "Devendra Varma",
    impression: "Architectural & CAD",
    extras: "Founding Engineer @ VectorAI",
    message: "CAD schematics transition into 3D seamlessly. The audio synthesis and keybindings are insane touches.",
  },
  {
    submissionId: "feed-seed-04",
    timestamp: "2026-10-14T09:15:00.000Z",
    name: "Marcus Vance",
    impression: "Systems Engineering",
    extras: "Principal Frontend Engineer",
    message: "Sub-millisecond page responsiveness. The attention to micro-interactions and typography is masterclass work.",
  },
  {
    submissionId: "feed-seed-05",
    timestamp: "2026-10-13T16:50:00.000Z",
    name: "Priyanka Patel",
    impression: "Indic Sound FX",
    extras: "Product Design Lead",
    message: "The soundscapes and tanpura meditative tones give browsing this portfolio an ethereal, immersive feel.",
  },
  {
    submissionId: "feed-seed-06",
    timestamp: "2026-10-13T12:10:00.000Z",
    name: "Karthik Nambiar",
    impression: "Classical Heritage",
    extras: "Robotics & Embedded Dev",
    message: "Bridging timeless Indian craftsmanship with cutting-edge WebGL and physics shaders. Truly inspiring work Sourodip.",
  },
];

export default function VisitorTestimonialsSection() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(DUMMY_FEEDBACKS);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedbacks");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setFeedbacks(json.data);
      }
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();

    // Listen for live new feedback submissions from the contact form below
    const handleNewFeedback = (e: Event) => {
      const customEvent = e as CustomEvent<FeedbackItem>;
      if (customEvent.detail) {
        setFeedbacks((prev) => [customEvent.detail, ...prev]);
      }
    };

    window.addEventListener("portfolio-feedback-submitted", handleNewFeedback);
    return () => window.removeEventListener("portfolio-feedback-submitted", handleNewFeedback);
  }, []);

  // Map feedbacks to TestimonialItem format
  const testimonialItems: TestimonialItem[] = feedbacks.map((f) => ({
    text: f.message || f.extras || f.impression,
    name: f.name || "Anonymous Visitor",
    role: f.impression,
    impression: f.impression,
    extras: f.extras,
    timestamp: f.timestamp,
  }));

  // Distribute items across 3 columns
  const col1 = testimonialItems.filter((_, i) => i % 3 === 0);
  const col2 = testimonialItems.filter((_, i) => i % 3 === 1);
  const col3 = testimonialItems.filter((_, i) => i % 3 === 2);

  const finalCol1 = col1.length > 0 ? col1 : testimonialItems;
  const finalCol2 = col2.length > 0 ? col2 : testimonialItems;
  const finalCol3 = col3.length > 0 ? col3 : testimonialItems;

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#FAF8F5] text-stone-900 pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 overflow-hidden font-mono border-t border-black/[0.08]"
      aria-label="Visitor Testimonials Section - Indian Heritage Style"
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

      {/* ── BACKGROUND: AMBIENT SAFFRON & GOLD GLOW ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none opacity-25 blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.22) 0%, rgba(245, 158, 11, 0.10) 50%, transparent 80%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10 space-y-10">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          {/* Indic Script Ribbon */}
          <div className="flex items-center gap-2.5 font-mono text-[10.5px] sm:text-[11px] text-[#EA580C] uppercase tracking-[0.28em] font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
            <span>॥ विचार मण्डल // VISITOR IMPRESSIONS ॥</span>
          </div>

          <div className="font-mono text-[10px] sm:text-[11px] text-black/50 tracking-[0.26em] uppercase font-medium mb-1">
            <span>॥ सर्वेषां संमतिर्हिता // VALUE IN EVERY PERSPECTIVE ॥</span>
          </div>

          <h2 className="font-cinzel font-bold text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] text-stone-900 uppercase leading-[1.2] flex items-baseline gap-2">
            <span>WHAT VISITORS SAY</span>
            <span className="text-[#EA580C] font-light">॥</span>
          </h2>

          <p className="mt-3 text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans max-w-lg">
            A living kinetic stream of reflections, impressions, and notes inscribed by developers, engineers, and designers.
          </p>
        </div>

        {/* ── CONTENT AREA ── */}
        {loading && feedbacks.length === 0 ? (
          <div className="py-20 text-center text-xs text-stone-500 flex flex-col items-center gap-3 font-mono">
            <span className="w-5 h-5 border-2 border-[#EA580C] border-t-transparent rounded-full animate-spin" />
            <span>FETCHING VISITOR IMPRESSIONS...</span>
          </div>
        ) : feedbacks.length === 0 ? (
          /* ── OOPS NO VISITORS YET (INDIAN HERITAGE STYLE EMPTY STATE) ── */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="py-14 sm:py-16 text-center bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F3] to-[#FFF1E6] border border-dashed border-amber-900/20 rounded-2xl p-6 sm:p-10 space-y-3.5 max-w-xl mx-auto shadow-xs"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/25 text-[10.5px] font-bold text-amber-900 tracking-widest uppercase font-mono">
              ॥ क्षम्यताम् // OOPS! NO VISITORS YET ॥
            </div>

            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Oops! No Visitors Yet
            </h4>

            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-sans">
              The digital visitor parchment is currently quiet. Be the very first person to inscribe your impression and thoughts below!
            </p>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection("contact", -20)}
                className="px-6 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all cursor-pointer shadow-[0_4px_16px_rgba(234,88,12,0.3)] inline-flex items-center gap-2"
              >
                <span>LEAVE AN IMPRESSION</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── KINETIC 3-COLUMN TESTIMONIALS WATERFALL (INDIAN STYLE) ── */
          <div className="relative mt-2 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[560px] overflow-hidden">
            <div className="flex justify-center gap-5 sm:gap-6">
              <TestimonialsColumn
                testimonials={finalCol1}
                duration={16}
                indianStyle={true}
                className="w-full max-w-[340px]"
              />
              <TestimonialsColumn
                testimonials={finalCol2}
                duration={21}
                indianStyle={true}
                className="hidden md:block w-full max-w-[340px]"
              />
              <TestimonialsColumn
                testimonials={finalCol3}
                duration={18}
                indianStyle={true}
                className="hidden lg:block w-full max-w-[340px]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
