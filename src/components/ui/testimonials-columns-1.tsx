"use client";

import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image?: string;
  name: string;
  role?: string;
  impression?: string;
  extras?: string;
  timestamp?: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
  indianStyle?: boolean;
}) => {
  const { className = "", testimonials, duration = 15, indianStyle = true } = props;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className={`overflow-hidden select-none ${className}`}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role, impression, extras, timestamp }, i) => (
                <div
                  key={`${index}-${i}`}
                  className={
                    indianStyle
                      ? "relative bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F3] to-[#FFF1E6] border border-black/[0.09] p-5 sm:p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow max-w-xs sm:max-w-sm w-full font-mono text-stone-900 overflow-hidden"
                      : "p-8 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-background"
                  }
                >
                  {indianStyle && (
                    <>
                      {/* Architectural Noise Texture */}
                      <div
                        className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.22] mix-blend-multiply z-[1]"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='colNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23colNoise)'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "repeat",
                        }}
                      />
                      {/* Temple Corner Brackets */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#EA580C] z-[2]" />
                      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#EA580C] z-[2]" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#EA580C] opacity-70 z-[2]" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#EA580C] opacity-70 z-[2]" />
                    </>
                  )}

                  <div className="relative z-[3]">
                    {/* Impression tag */}
                    {(impression || role) && (
                      <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/25 text-[10px] font-bold uppercase tracking-wider mb-2.5">
                        {impression || role}
                      </div>
                    )}

                    {/* Testimonial Quote / Message */}
                    <div className="text-xs leading-relaxed text-stone-700 italic font-sans mb-3">
                      &ldquo;{text}&rdquo;
                    </div>

                    {/* Extras / Highlights */}
                    {extras && (
                      <div className="text-[10.5px] text-amber-800 font-mono mb-3 pb-2.5 border-b border-black/[0.06]">
                        • {extras}
                      </div>
                    )}

                    {/* Author profile */}
                    <div className="flex items-center gap-2.5 pt-1">
                      {image ? (
                        <img
                          width={34}
                          height={34}
                          src={image}
                          alt={name}
                          className="h-8.5 w-8.5 rounded-full object-cover border border-amber-900/15"
                        />
                      ) : (
                        <div className="h-8.5 w-8.5 rounded-full bg-[#FAF7EE] border border-amber-900/20 text-amber-900 flex items-center justify-center font-bold text-xs font-cinzel shrink-0">
                          {name ? name.charAt(0).toUpperCase() : "V"}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <div className="font-cinzel font-bold text-xs text-stone-900 leading-tight truncate">
                          {name}
                        </div>
                        <div className="text-[9.5px] text-stone-500 font-mono mt-0.5 truncate">
                          {timestamp
                            ? new Date(timestamp).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : role || "Visitor Inscription"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
