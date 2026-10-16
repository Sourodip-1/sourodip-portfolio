"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import TargetCursor from "@/components/ui/TargetCursor";
import { sound } from "@/lib/sound";

// ── FINE-ART NOISE GRAIN TEXTURE ─────────────────────────────────────────────
function CardNoiseTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.24] mix-blend-multiply z-[2]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

// ── CUSTOM INDIAN VECTOR MOTIFS WITH VIBRANT COLOR PALETTES ──────────────────

// 01 / SHIPPING: Sarvam-Style Pointed Flame Petal Bloom
function SarvamModel01Motif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="sarvam-filter-01" x="10" y="5" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-6" />
          <feGaussianBlur stdDeviation="4.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.95 0 0 0 0 0.35 0 0 0 0 0.1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="sarvam-grad-01" x1="62.5" y1="12" x2="62.5" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2E8" />
          <stop offset="40%" stopColor="#FF8800" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <g filter="url(#sarvam-filter-01)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M46.1294 25.6096C47.5856 24.1534 49.1867 22.9299 50.8874 21.9426C53.1384 20.6467 56.5067 18.6794 57.6306 17.7803C57.7432 17.6902 57.9251 17.5838 58.1543 17.4496C59.1975 16.8391 61.2197 15.6557 62.1391 12.8353C62.2852 12.388 62.8654 12.3884 63.0095 12.8353C64.0182 15.9665 66.3624 17.178 67.2715 17.6478C67.3739 17.7008 67.4586 17.7445 67.5205 17.7803C67.9262 18.0145 68.9119 18.6515 70.0229 19.3695C71.3741 20.2427 72.9116 21.2363 73.8141 21.7694V21.7749C75.6257 22.7905 77.3297 24.0689 78.8706 25.6096C82.755 29.494 84.9706 34.4155 85.5172 39.4828C90.5845 40.0294 95.506 42.245 99.3904 46.1294C100.847 47.5856 102.07 49.1867 103.057 50.8874C104.353 53.1384 106.321 56.5067 107.22 57.6306C107.31 57.7432 107.416 57.9251 107.55 58.1543C108.161 59.1975 109.344 61.2197 112.165 62.1391C112.612 62.2852 112.612 62.8654 112.165 63.0095C109.033 64.0182 107.822 66.3624 107.352 67.2715C107.299 67.374 107.255 67.4585 107.22 67.5205C106.986 67.9261 106.349 68.9117 105.631 70.0225C104.758 71.3737 103.764 72.9116 103.231 73.8141H103.225C102.21 75.6257 100.931 77.3297 99.3904 78.8706C95.506 82.755 90.5845 84.9706 85.5172 85.5172C84.9706 90.5845 82.755 95.506 78.8706 99.3904C77.4144 100.847 75.8133 102.07 74.1126 103.057C71.8616 104.353 68.4933 106.321 67.3694 107.22C67.2568 107.31 67.0749 107.416 66.8457 107.55C65.8025 108.161 63.7803 109.344 62.8609 112.165C62.7148 112.612 62.1346 112.612 61.9905 112.165C60.9818 109.033 58.6376 107.822 57.7285 107.352C57.626 107.299 57.5415 107.255 57.4795 107.22C57.0736 106.985 56.0871 106.348 54.9756 105.629C53.6244 104.756 52.0884 103.764 51.1859 103.231V103.225C49.3743 102.21 47.6703 100.931 46.1294 99.3904C42.245 95.506 40.0294 90.5845 39.4828 85.5172C34.4155 84.9706 29.494 82.755 25.6096 78.8706C24.1534 77.4144 22.9299 75.8133 21.9426 74.1126C20.6467 71.8616 18.6794 68.4933 17.7803 67.3694C17.6902 67.2568 17.5838 67.0749 17.4496 66.8457C16.8391 65.8025 15.6557 63.7803 12.8353 62.8609C12.388 62.7148 12.3884 62.1346 12.8353 61.9905C15.9665 60.9818 17.178 58.6376 17.6478 57.7285C17.7008 57.6261 17.7445 57.5414 17.7803 57.4795C18.0145 57.0738 18.6515 56.0881 19.3695 54.9771C20.2427 53.6259 21.2363 52.0884 21.7694 51.1859H21.7749C22.7905 49.3743 24.0689 47.6703 25.6096 46.1294C29.494 42.245 34.4155 40.0294 39.4828 39.4828C40.0294 34.4155 42.245 29.494 46.1294 25.6096Z"
          fill="url(#sarvam-grad-01)"
        />
      </g>
    </svg>
  );
}

// 02 / ENGINEERING: Sarvam-Style 16-Pointed Star Rosette Bloom
function SarvamModel02Motif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="sarvam-filter-02" x="10" y="10" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1 0 0 0 0 0.25 0 0 0 0 0.85 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="sarvam-grad-02" x1="62.5" y1="12" x2="62.5" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EBF2FE" />
          <stop offset="45%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#0047FF" />
        </linearGradient>
      </defs>
      <g filter="url(#sarvam-filter-02)">
        <path
          d="M62.2812 12.697C62.3518 12.434 62.6482 12.4341 62.7188 12.697C63.3537 14.7673 65.3145 16.2137 67.4766 16.2253H71.1758C75.1453 16.2253 78.3869 19.3353 78.5996 23.2517C78.6891 23.2883 78.779 23.3239 78.8682 23.3611C81.7879 20.7428 86.2802 20.8368 89.0869 23.6433L91.6768 26.2341C93.1973 27.7545 95.6571 28.1401 97.5615 27.1296C97.7973 26.9935 98.0067 27.2025 97.8711 27.4382C96.8561 29.3511 97.2196 31.7606 98.7402 33.2976L101.356 35.9138C104.153 38.7106 104.255 43.1789 101.665 46.0994C101.707 46.1997 101.747 46.3013 101.788 46.4021C105.686 46.6345 108.775 49.8678 108.775 53.824V57.4871C108.775 59.6373 110.242 61.6488 112.303 62.281C112.566 62.3515 112.566 62.648 112.303 62.7185C110.233 63.3535 108.787 65.3143 108.775 67.4763V71.1755C108.775 75.1221 105.701 78.3491 101.816 78.5955C101.772 78.7041 101.729 78.8134 101.684 78.9216C104.254 81.8425 104.146 86.2966 101.356 89.0867L98.7666 91.6765C97.2461 93.1971 96.8606 95.6568 97.8711 97.5613C98.0071 97.7971 97.7973 98.0069 97.5615 97.8708C95.6487 96.8559 93.2402 97.2195 91.7031 98.74L89.0869 101.356C86.2969 104.146 81.8428 104.254 78.9219 101.683C78.8132 101.729 78.7038 101.772 78.5947 101.817C78.3479 105.701 75.122 108.775 71.1758 108.775H67.5137C65.3634 108.775 63.351 110.241 62.7188 112.302C62.6482 112.566 62.3518 112.566 62.2812 112.302C61.6462 110.233 59.6862 108.787 57.5244 108.775H53.8242C49.868 108.775 46.6347 105.686 46.4023 101.788C46.3016 101.746 46.2 101.707 46.0996 101.665C43.1792 104.255 38.7108 104.153 35.9141 101.356L33.3232 98.7664C31.8027 97.2459 29.3429 96.8604 27.4385 97.8708C27.2027 98.0065 26.9938 97.797 27.1299 97.5613C28.1448 95.6484 27.7803 93.2399 26.2598 91.7029L23.6436 89.0867C20.837 86.28 20.743 81.7877 23.3613 78.8679C23.3242 78.779 23.2885 78.6895 23.252 78.6003C19.3355 78.3876 16.2256 75.1451 16.2256 71.1755V67.5134C16.2255 65.3631 14.7584 63.3506 12.6973 62.7185C12.4343 62.6479 12.4342 62.3515 12.6973 62.281C14.7675 61.6461 16.2138 59.6861 16.2256 57.5242V53.824C16.2256 49.8445 19.351 46.5943 23.2812 46.3962C23.3145 46.3153 23.3461 46.2337 23.3799 46.1531C20.7425 43.234 20.8306 38.7272 23.6436 35.9138L26.2344 33.323C27.7546 31.8024 28.1403 29.3426 27.1299 27.4382C26.994 27.2025 27.2027 26.9937 27.4385 27.1296C29.3514 28.1446 31.7608 27.7801 33.2979 26.2595L35.9141 23.6433C38.7275 20.8304 43.2342 20.7423 46.1533 23.3796C46.234 23.3459 46.3156 23.3143 46.3965 23.281C46.5945 19.3507 49.8447 16.2254 53.8242 16.2253H57.4873C59.6376 16.2252 61.6491 14.7582 62.2812 12.697Z"
          fill="url(#sarvam-grad-02)"
        />
      </g>
    </svg>
  );
}

// 03 / AGENTIC DEVELOPMENT: Sarvam-Style 8-Lobed Wavy Cloud Bloom
function SarvamModel03Motif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="sarvam-filter-03" x="10" y="3" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.55 0 0 0 0 0.15 0 0 0 0 0.85 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="sarvam-grad-03" x1="62.5" y1="12" x2="62.5" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5F3FF" />
          <stop offset="45%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <g filter="url(#sarvam-filter-03)">
        <path
          d="M86.5873 37.9599L88.1263 33.7742C92.0576 22.1148 85.9735 15.5178 78.244 13.6001C72.0344 12.0595 65.6804 14.1319 62.3427 18.3547C58.995 13.9108 52.5425 11.5376 46.274 12.8689C38.562 14.5068 33.3954 23.9645 36.6187 33.9228L38.2053 38.1693L34.0615 36.6148C22.5186 32.6439 15.9876 38.7894 14.0891 46.5969C12.5639 52.8693 14.6156 59.2874 18.7962 62.6589C14.3967 66.0404 12.0472 72.5581 13.3652 78.8899C14.9867 86.6798 24.3499 91.8986 34.2085 88.6427L38.4127 87.0401L36.8737 91.2258C32.9424 102.885 39.0265 109.482 46.756 111.4C52.9656 112.94 59.3196 110.868 62.6573 106.645C66.005 111.089 72.4575 113.462 78.726 112.131C86.438 110.493 91.6046 101.035 88.3813 91.0772L86.7947 86.8306L90.9385 88.3852C102.481 92.3561 109.012 86.2106 110.911 78.4031C112.436 72.1307 110.384 65.7126 106.204 62.3411C110.603 58.9596 112.953 52.4419 111.635 46.1101C110.013 38.3202 100.65 33.1014 90.7915 36.3573L86.5873 37.9599Z"
          fill="url(#sarvam-grad-03)"
        />
      </g>
    </svg>
  );
}

// 04 / CREATIVE THINKING: Sarvam-Style 4-Lobed Smooth Cloud Bloom
function SarvamModel04Motif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="sarvam-filter-04" x="10" y="10" width="105" height="110" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="6" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.9 0 0 0 0 0.1 0 0 0 0 0.3 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="sarvam-grad-04" x1="62.5" y1="12" x2="62.5" y2="113" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="45%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <g filter="url(#sarvam-filter-04)">
        <path
          d="M62.5 113C74.4033 113 84.8933 104.109 91.0617 90.6003C104.311 84.4052 113 74.0191 113 62.2518C113 50.3979 104.183 39.9455 90.7681 33.7671C84.5637 20.6141 74.2165 12 62.5 12C50.7835 12 40.4363 20.6141 34.2319 33.7671C20.8174 39.9456 12 50.3979 12 62.2519C12 74.0191 20.6889 84.4052 33.9383 90.6004C40.1067 104.109 50.5967 113 62.5 113Z"
          fill="url(#sarvam-grad-04)"
        />
      </g>
    </svg>
  );
}

// 05 / DEVELOPER ECOSYSTEM: Sarvam-Style Stepped Temple Torana Bloom
function SarvamModel05Motif() {
  return (
    <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <filter id="sarvam-filter-05" x="10" y="2" width="105" height="115" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.05 0 0 0 0 0.5 0 0 0 0 0.45 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="innerShadow" />
        </filter>
        <linearGradient id="sarvam-grad-05" x1="62.5" y1="12" x2="62.5" y2="112.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="45%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <g filter="url(#sarvam-filter-05)">
        <path
          d="M62.3359 12.5C72.8455 12.5 82.0549 18.0644 87.1807 26.4072H98.7598V34.9121C103.267 37.0052 106.393 41.5711 106.394 46.8682V53.3584C106.394 57.1685 108.993 60.7334 112.645 61.8535C113.111 61.9785 113.111 62.504 112.645 62.6289C108.976 63.754 106.414 67.2278 106.394 71.0586V77.6133C106.394 82.9104 103.267 87.4762 98.7598 89.5693V99.2549H86.7607C81.5615 107.228 72.5648 112.5 62.3359 112.5C52.1073 112.5 43.1114 107.228 37.9121 99.2549H25.9121V89.4121C21.5813 87.2533 18.6055 82.7811 18.6055 77.6133V71.0586C18.5849 67.2279 16.0234 63.7541 12.3555 62.6289C11.8893 62.504 11.8893 61.9784 12.3555 61.8535C16.0073 60.7333 18.6054 57.1684 18.6055 53.3584V46.8682C18.6056 41.7004 21.5813 37.2281 25.9121 35.0693V26.4072H37.4922C42.6179 18.0646 51.8265 12.5001 62.3359 12.5Z"
          fill="url(#sarvam-grad-05)"
        />
      </g>
    </svg>
  );
}

// ── DATA INTERFACE & CARD PALETTES ────────────────────────────────────────────
interface ExperiencePillar {
  id: string;
  numLatin: string;
  numDeva: string;
  title: string;
  devaTitle: string;
  transliteration: string;
  headline: string;
  description: string;
  tags: string[];
  indicSubtext: string;
  vastuZone: string;
  motif: React.ReactNode;
  // Card visual theme attributes
  baseBgClass: string;
  ambientAuraStyle: React.CSSProperties;
  cornerAccent: string;
  hoverBorderColor: string;
  hoverShadowClass: string;
  tagHoverClass: string;
}

const PILLARS: ExperiencePillar[] = [
  {
    id: "01",
    numLatin: "01",
    numDeva: "०१",
    title: "SHIPPING",
    devaTitle: "निर्माण",
    transliteration: "NIRMĀṆA",
    headline: "FROM CODE TO THE INTERNET.",
    description:
      "I learned to take ideas beyond my local environment, build complete products, and get them deployed and accessible to real users.",
    tags: ["Product development", "Deployment", "Shipping"],
    indicSubtext: "लोकार्पण // PRATYAKSHA SIDDHI",
    vastuZone: "ĪŚĀNA · ASCENDING HORIZON",
    motif: <SarvamModel01Motif />,
    baseBgClass: "bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF1E6]",
    ambientAuraStyle: {
      background:
        "radial-gradient(circle at 88% 18%, rgba(255, 107, 0, 0.24) 0%, rgba(245, 158, 11, 0.14) 40%, transparent 80%)",
    },
    cornerAccent: "#FF6B00",
    hoverBorderColor: "border-[#FF6B00]/60",
    hoverShadowClass: "hover:shadow-[0_16px_44px_rgba(255,107,0,0.15)]",
    tagHoverClass: "group-hover:bg-[#FF6B00]/[0.08] group-hover:border-[#FF6B00]/30 group-hover:text-[#C2410C]",
  },
  {
    id: "02",
    numLatin: "02",
    numDeva: "०२",
    title: "ENGINEERING",
    devaTitle: "अभियांत्रिकी",
    transliteration: "ABHIYĀNTRIKĪ",
    headline: "CODE IS MORE THAN FILES.",
    description:
      "I learned to manage codebases, organize changes, handle contributions, and think about how individual pieces fit into a maintainable system.",
    tags: ["Codebase management", "Git", "Collaboration"],
    indicSubtext: "संरचना सूत्र // SAMHITA VĀSTU",
    vastuZone: "PRATHAMA · STRUCTURAL CORE",
    motif: <SarvamModel02Motif />,
    baseBgClass: "bg-gradient-to-br from-[#FAFCFF] via-[#F3F7FF] to-[#EBF2FE]",
    ambientAuraStyle: {
      background:
        "radial-gradient(circle at 88% 18%, rgba(0, 71, 255, 0.24) 0%, rgba(96, 165, 250, 0.14) 40%, transparent 80%)",
    },
    cornerAccent: "#0047FF",
    hoverBorderColor: "border-[#0047FF]/60",
    hoverShadowClass: "hover:shadow-[0_16px_44px_rgba(0,71,255,0.15)]",
    tagHoverClass: "group-hover:bg-[#0047FF]/[0.08] group-hover:border-[#0047FF]/30 group-hover:text-[#0038CC]",
  },
  {
    id: "03",
    numLatin: "03",
    numDeva: "०३",
    title: "AGENTIC DEVELOPMENT",
    devaTitle: "प्रज्ञा यंत्र",
    transliteration: "PRAJÑĀ YANTRA",
    headline: "LET AI ASSIST. STAY IN CONTROL.",
    description:
      "I learned to use coding agents as development assistants — delegating suitable tasks, exploring solutions faster, and keeping myself responsible for decisions and code quality.",
    tags: ["AI-assisted coding", "Workflow design", "Review"],
    indicSubtext: "मेधा संचालन // ADHIṢṬHĀNA",
    vastuZone: "VĀYU · INTELLIGENT VELOCITY",
    motif: <SarvamModel03Motif />,
    baseBgClass: "bg-gradient-to-br from-[#FDFBFF] via-[#F8F3FF] to-[#F1E8FE]",
    ambientAuraStyle: {
      background:
        "radial-gradient(circle at 88% 18%, rgba(124, 58, 237, 0.24) 0%, rgba(192, 38, 211, 0.14) 40%, transparent 80%)",
    },
    cornerAccent: "#7C3AED",
    hoverBorderColor: "border-[#7C3AED]/60",
    hoverShadowClass: "hover:shadow-[0_16px_44px_rgba(124,58,237,0.15)]",
    tagHoverClass: "group-hover:bg-[#7C3AED]/[0.08] group-hover:border-[#7C3AED]/30 group-hover:text-[#6D28D9]",
  },
  {
    id: "04",
    numLatin: "04",
    numDeva: "०४",
    title: "CREATIVE THINKING",
    devaTitle: "रचनात्मक दृष्टि",
    transliteration: "RACHANĀTMAKA DRISHTI",
    headline: "THERE'S ALWAYS ANOTHER APPROACH.",
    description:
      "I learned to look beyond the obvious solution, experiment with unconventional ideas, and combine engineering with creative problem-solving.",
    tags: ["Experimentation", "Systems thinking", "Design"],
    indicSubtext: "नवोन्मेष // KALĀ DRISHTI",
    vastuZone: "ĀKĀŚA · DIVERGENT SPACE",
    motif: <SarvamModel04Motif />,
    baseBgClass: "bg-gradient-to-br from-[#FFFBFD] via-[#FFF3F7] to-[#FEE8F0]",
    ambientAuraStyle: {
      background:
        "radial-gradient(circle at 88% 18%, rgba(225, 29, 72, 0.24) 0%, rgba(251, 113, 133, 0.14) 40%, transparent 80%)",
    },
    cornerAccent: "#E11D48",
    hoverBorderColor: "border-[#E11D48]/60",
    hoverShadowClass: "hover:shadow-[0_16px_44px_rgba(225,29,72,0.15)]",
    tagHoverClass: "group-hover:bg-[#E11D48]/[0.08] group-hover:border-[#E11D48]/30 group-hover:text-[#BE123C]",
  },
  {
    id: "05",
    numLatin: "05",
    numDeva: "०५",
    title: "DEVELOPER ECOSYSTEM",
    devaTitle: "तन्त्र परिमण्डल",
    transliteration: "TANTRA PARIMAṆḌALA",
    headline: "DON'T REINVENT EVERY TOOL.",
    description:
      "I learned to use SaaS platforms, APIs, and small developer utilities to automate repetitive work, simplify workflows, and focus my time on solving the actual problem.",
    tags: ["Developer tooling", "SaaS", "Automation"],
    indicSubtext: "उपकरण मण्डल // VYAVASTHĀ",
    vastuZone: "BHŪMI · COMPOSABLE FOUNDATION",
    motif: <SarvamModel05Motif />,
    baseBgClass: "bg-gradient-to-br from-[#FAFFFD] via-[#F0FDF8] to-[#E2F7F0]",
    ambientAuraStyle: {
      background:
        "radial-gradient(circle at 88% 18%, rgba(13, 148, 136, 0.24) 0%, rgba(52, 211, 153, 0.14) 40%, transparent 80%)",
    },
    cornerAccent: "#0D9488",
    hoverBorderColor: "border-[#0D9488]/60",
    hoverShadowClass: "hover:shadow-[0_16px_44px_rgba(13,148,136,0.15)]",
    tagHoverClass: "group-hover:bg-[#0D9488]/[0.08] group-hover:border-[#0D9488]/30 group-hover:text-[#0F766E]",
  },
];

// ── MAIN EXPERIENCE SECTION COMPONENT ─────────────────────────────────────────
export default function ExperienceSection() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-[#FAFAFA] pt-8 sm:pt-12 pb-24 sm:pb-32 px-5 sm:px-8 md:px-12 lg:px-20 select-none overflow-hidden"
      aria-label="03 Experience Section - Indian Style Architectural Pillars with Rich Color & Noise Texture"
    >
      {/* ── TARGET CURSOR RETICLE (SCOPED SPECIFICALLY TO EXPERIENCE SECTION) ── */}
      <TargetCursor
        container={sectionRef}
        targetSelector=".cursor-target"
        cursorColor="#0047FF"
        cursorColorOnTarget="#0047FF"
        spinDuration={2.2}
        hoverDuration={0.2}
        parallaxOn={true}
        hideDefaultCursor={true}
        size={36}
        cornerSize={12}
        thickness={2.5}
        padding={8}
        matchRadius={true}
        dotSize={4}
        blendMode="normal"
        showLabel={true}
        clickEffect={true}
      />

      {/* Background Architectural Watermark Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,71,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── SECTION HEADER (INDIAN ARCHITECTURAL BLUEPRINT HEADING) ─────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-black/10">
          <div>
            {/* Indic Script Ribbon */}
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-[#0047FF] uppercase tracking-[0.28em] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0047FF] animate-pulse" />
              <span>॥ अनुभव सूत्र // ANUBHAVA SŪTRA · 03 ॥</span>
            </div>

            {/* Main Section Heading in Authentic Indian Architectural Epigraphy */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] sm:text-[11.5px] text-black/50 tracking-[0.26em] uppercase font-medium">
                <span>॥ अभ्यास योग // SĀDHANĀ ॥</span>
              </div>
              <h2 className="font-cinzel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[50px] tracking-[0.06em] sm:tracking-[0.08em] text-black uppercase leading-[1.2] flex flex-wrap items-baseline gap-x-3.5">
                <span>Crafted Through</span>
                <span className="text-[#0047FF] relative">
                  Practice
                  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#0047FF]/25" />
                </span>
                <span className="text-[#0047FF] font-light">॥</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-3 font-mono text-[9px] sm:text-[10px] text-black/45 tracking-[0.25em] uppercase font-medium">
              <span>विद्या ददाति विनयं</span>
              <span>•</span>
              <span>FIVE DISCIPLINES OF ARCHITECTURAL EXECUTION</span>
            </div>
          </div>

          {/* Editorial Context & Vastu Coordinates */}
          <div className="max-w-md font-mono text-xs text-black/65 leading-relaxed border-l-2 border-[#0047FF] pl-4 sm:pl-5">
            <p>
              From code to the open internet, systems engineering, agentic AI leverage, and ecosystem tooling — five core tenets forged through continuous creation.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[9.5px] uppercase tracking-wider text-black/45">
              <span className="text-[#0047FF] font-semibold">METHOD: PRAXIS &amp; PRINCIPLES</span>
              <span>•</span>
              <span>VĀSTU GEOMETRY</span>
              <span>•</span>
              <span className="text-black/70 font-semibold">5 PILLARS</span>
            </div>
          </div>
        </div>

        {/* ── 2 + 3 ARCHITECTURAL PLINTH GRID ─────────────────────────────── */}
        <div className="space-y-6">
          {/* ROW 1: TWO PRIMARY FOUNDATIONAL PILLARS (01 SHIPPING & 02 ENGINEERING) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILLARS.slice(0, 2).map((item, idx) => (
              <PillarCard
                key={item.id}
                item={item}
                isHovered={activePillar === item.id}
                onMouseEnter={() => {
                  setActivePillar(item.id);
                  sound.playCardHover(idx);
                }}
                onMouseLeave={() => setActivePillar(null)}
                isFeatured
              />
            ))}
          </div>

          {/* ROW 2: THREE MODERN MULTIPLIER PILLARS (03 AGENTIC, 04 CREATIVE, 05 ECOSYSTEM) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.slice(2, 5).map((item, idx) => (
              <PillarCard
                key={item.id}
                item={item}
                isHovered={activePillar === item.id}
                onMouseEnter={() => {
                  setActivePillar(item.id);
                  sound.playCardHover(idx + 2);
                }}
                onMouseLeave={() => setActivePillar(null)}
              />
            ))}
          </div>
        </div>

        {/* ── BOTTOM ARCHITECTURAL EPILOGUE (SANSKRIT SUBHASHITA) ─────────── */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-black/60">
          <div className="flex items-center gap-3">
            <span className="text-[#0047FF] font-bold text-sm">॥</span>
            <span className="tracking-wider text-[11px] sm:text-xs text-black/80 font-medium">
              कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
            </span>
            <span className="text-black/30 hidden md:inline">|</span>
            <span className="text-[10px] sm:text-[11px] text-black/50 uppercase tracking-widest hidden md:inline">
              FOCUS ON THE CRAFT · EXCELLENCE IN THE OUTCOME
            </span>
            <span className="text-[#0047FF] font-bold text-sm">॥</span>
          </div>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-black/45">
            <span>INDIAN GEOMETRY</span>
            <span>•</span>
            <span className="text-[#0047FF] font-semibold">PRINT STUDY 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── INDIVIDUAL ARCHITECTURAL PILLAR CARD WITH COLOR & NOISE ───────────────────
function PillarCard({
  item,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  isFeatured = false,
}: {
  item: ExperiencePillar;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isFeatured?: boolean;
}) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-label={`${item.numLatin} // ${item.title}`}
      className={`cursor-target group relative ${item.baseBgClass} border rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isHovered
          ? `${item.hoverBorderColor} -translate-y-1`
          : "border-black/[0.09]"
      } ${item.hoverShadowClass} ${
        isFeatured ? "p-7 sm:p-9 min-h-[360px]" : "p-6 sm:p-7 min-h-[340px]"
      }`}
    >
      {/* ── CARD BACKGROUND: RICH AMBIENT COLOR AURA ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={item.ambientAuraStyle}
      />

      {/* ── CARD BACKGROUND: TACTILE NOISE GRAIN TEXTURE ── */}
      <CardNoiseTexture />

      {/* ── CARD BACKGROUND: SCULPTURAL ORGANIC MOTIF (TOP-RIGHT CORNER, HALF BLEEDING) ── */}
      <div
        className={`absolute -top-12 -right-12 sm:-top-16 sm:-right-16 md:-top-20 md:-right-20 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 pointer-events-none z-[3] transition-all duration-500 ease-out ${
          isHovered
            ? "opacity-100 scale-105 rotate-6"
            : "opacity-85 sm:opacity-90 scale-100 rotate-0"
        }`}
      >
        {item.motif}
      </div>

      {/* ── INDIAN TEMPLE ARCHITECTURAL CORNER BRACKETS (COLOR ACCENTED) ── */}
      <div
        className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors z-[4]"
        style={{ borderColor: item.cornerAccent }}
      />
      <div
        className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors z-[4]"
        style={{ borderColor: item.cornerAccent }}
      />
      <div
        className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors z-[4]"
        style={{ borderColor: item.cornerAccent, opacity: isHovered ? 1 : 0.4 }}
      />
      <div
        className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors z-[4]"
        style={{ borderColor: item.cornerAccent, opacity: isHovered ? 1 : 0.4 }}
      />

      {/* ── CARD TOP: DUAL NOTATION & DEVANAGARI INSCRIPTION ── */}
      <div className="relative z-10">
        <div className="flex items-center justify-between font-mono text-[10px] text-black/60 tracking-widest uppercase mb-3.5 pb-3 border-b border-black/[0.08] max-w-[68%] sm:max-w-[72%]">
          {/* Left: Devanagari & Latin ID */}
          <div className="flex items-center gap-2">
            <span
              className="font-bold tracking-wider"
              style={{ color: item.cornerAccent }}
            >
              [ {item.numDeva} / {item.numLatin} ]
            </span>
            <span className="text-black/30">|</span>
            <span className="text-black/80 font-bold">{item.title}</span>
            <span className="text-black/30">|</span>
            <span className="tracking-wider text-[11px] text-black font-extrabold">
              ॥ {item.devaTitle} ॥
            </span>
          </div>
        </div>

        {/* ── HEADLINE (EXACT PROMPT DIRECTION) ── */}
        <h3
          className={`font-cinzel font-bold text-black tracking-[0.04em] uppercase mb-3 transition-colors max-w-[76%] sm:max-w-[80%] ${
            isFeatured
              ? "text-lg sm:text-xl lg:text-[22px] leading-snug"
              : "text-base sm:text-lg leading-snug"
          } group-hover:text-black`}
        >
          {item.headline}
        </h3>

        {/* ── DESCRIPTION (EXACT PROMPT DIRECTION) ── */}
        <p className="font-mono text-xs sm:text-[12.5px] text-black/75 leading-relaxed mb-6 font-normal max-w-[85%] sm:max-w-none">
          {item.description}
        </p>
      </div>

      {/* ── CARD BOTTOM: DISCIPLINES & VASTU TAGS ── */}
      <div className="relative z-10 pt-4 border-t border-black/[0.08]">
        {/* Indic Subtext & Concept */}
        <div className="flex items-center justify-between font-mono text-[8.5px] text-black/55 tracking-[0.2em] uppercase mb-3">
          <span className="font-medium">{item.indicSubtext}</span>
          <span
            className="font-semibold hidden sm:inline"
            style={{ color: item.cornerAccent }}
          >
            {item.vastuZone}
          </span>
        </div>

        {/* Discipline Tag Pills (Exact prompt tags) */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              data-cursor-label={tag}
              className={`cursor-target font-mono text-[10px] px-2.5 py-1 rounded-md border transition-all bg-white/80 backdrop-blur-sm border-black/10 text-black/80 ${item.tagHoverClass}`}
            >
              <span style={{ color: item.cornerAccent }} className="mr-1.5 font-bold">
                ✦
              </span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
