import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Cormorant_Garamond, Cinzel } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Sourodip Roy — Creative Developer & Systems Engineer",
  description:
    "Developer portfolio of Sourodip Roy. Clean minimalism, spatial typography, and extraordinary motion engineering. Build what matters.",
  keywords: [
    "Sourodip Roy",
    "Creative Developer",
    "Full Stack Engineer",
    "Systems Architecture",
    "Motion Design",
    "WebGL",
    "Next.js",
  ],
  authors: [{ name: "Sourodip Roy" }],
  openGraph: {
    title: "Sourodip Roy — Creative Developer & Systems Engineer",
    description: "Build what matters. Minimalist, motion-driven portfolio.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${cinzel.variable} ${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-[#0047FF] selection:text-white`}
    >
      <body className="min-h-screen bg-white text-black font-sans overflow-x-clip">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
