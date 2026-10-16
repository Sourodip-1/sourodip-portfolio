import React from "react";

// Tech stack and platform SVG icons with accurate brand colors and crisp paths
export const TechIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  python: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M11.914 2C6.974 2 7.28 4.143 7.28 4.143l.006 2.217h4.721v.665H5.328S2 6.643 2 11.602c0 4.96 2.906 4.779 2.906 4.779h1.734v-2.428s-.094-2.906 2.859-2.906h4.908s2.766.046 2.766-2.673V4.816S17.48 2 11.914 2zM9.418 3.518a.86.86 0 1 1 0 1.719.86.86 0 0 1 0-1.72z"
        fill="#3776AB"
      />
      <path
        d="M12.086 22c4.94 0 4.634-2.143 4.634-2.143l-.006-2.217H11.993v-.665h6.679S22 17.357 22 12.398c0-4.96-2.906-4.779-2.906-4.779h-1.734v2.428s.094 2.906-2.859 2.906H9.592s-2.766-.046-2.766 2.673v4.156S6.52 22 12.086 22zm2.496-1.518a.86.86 0 1 1 0-1.719.86.86 0 0 1 0 1.72z"
        fill="#FFD43B"
      />
    </svg>
  ),

  cpp: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L2 7.5v11L12 24l10-5.5v-11L12 2z" fill="#00599C" />
      <path d="M12 4.2l7.8 4.3v7L12 19.8 4.2 15.5v-7L12 4.2z" fill="#004482" />
      <path d="M12 7.5a4.5 4.5 0 1 0 3.2 7.6l-1.4-1.4a2.5 2.5 0 1 1 0-3.4l1.4-1.4A4.47 4.47 0 0 0 12 7.5z" fill="#FFFFFF" />
      <path d="M16 11h1.2v-1.2h.8V11h1.2v.8h-1.2V13H17v-1.2h-1zM20 11h1.2v-1.2h.8V11h1.2v.8h-1.2V13h-.8v-1.2H20z" fill="#FFFFFF" />
    </svg>
  ),

  javascript: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path d="M6 18.5l2.2-1.3c.4.8.9 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.5v-6.9h2.8v7c0 2.4-1.4 3.5-3.8 3.5-2 0-3.3-1-3.9-2.2zM15 18.4l2.2-1.3c.6.9 1.4 1.5 2.5 1.5 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.3-2-1.8l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.6-3.6 4-3.6 1.8 0 3 .7 3.8 2.2l-2.1 1.4c-.4-.8-1-1.2-1.7-1.2-.8 0-1.4.5-1.4 1.2 0 .8.6 1.2 1.8 1.6l.7.3c2.3 1 3.5 2 3.5 4.3 0 2.5-1.9 3.8-4.5 3.8-2.6 0-4-1.2-4.8-2.7z" fill="#000000" />
    </svg>
  ),

  tailwind: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  ),

  nextjs: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="12" fill="#000000" />
      <path
        d="M17.8 19.3L9.6 8.5H8v7.9h1.4v-5.7l7.1 9.4c.5-.2.9-.5 1.3-.8zm-3.2-10.8h1.4v5.4l-1.4-1.8V8.5z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  nodejs: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z"
        fill="#5FA04E"
      />
      <path d="M12 6.5l5 3v5l-5 3-5-3v-5l5-3z" fill="#68A063" />
    </svg>
  ),

  mongodb: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 22c-.3 0-.5-.1-.7-.3-1.6-1.5-5.3-5.2-5.3-10.7C6 5.8 11.2 2.2 11.5 2c.3-.2.7-.2 1 0 .3.2 5.5 3.8 5.5 9 0 5.5-3.7 9.2-5.3 10.7-.2.2-.4.3-.7.3z"
        fill="#13AA52"
      />
      <path d="M12 3v18c.2-.2 4.5-3.9 4.5-10C16.5 6 13 3.6 12 3z" fill="#119245" />
    </svg>
  ),

  postgresql: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c2.5 0 4.5 1.8 5 4.1-1.2-.7-2.6-1.1-4.1-1.1-1.9 0-3.6.6-5 1.7C8.4 7.2 10.1 5 12 5zm-6 7c0-1.8.7-3.4 1.8-4.7 1.2 1 2.6 1.7 4.2 1.7 1.8 0 3.5-.8 4.7-2.1.8 1.4 1.3 3.1 1.3 5.1 0 4.4-3.6 8-8 8s-8-3.6-8-8z"
        fill="#336791"
      />
    </svg>
  ),

  fastapi: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#009688" />
      <path d="M13 5L7 13h5l-1 6 6-8h-5l1-6z" fill="#FFFFFF" />
    </svg>
  ),

  git: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M21.7 10.8L13.2 2.3c-.4-.4-1-.4-1.4 0L9.4 4.7l2.3 2.3c.4-.1.9 0 1.2.3.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0-.3-.3-.4-.8-.3-1.2L9 5.3 2.3 12c-.4.4-.4 1 0 1.4l8.5 8.5c.4.4 1 .4 1.4 0l8.5-8.5c.4-.4.4-1.1 0-1.5z"
        fill="#F05032"
      />
      <circle cx="11.5" cy="17.5" r="1.5" fill="#FFFFFF" />
      <circle cx="11.5" cy="12.5" r="1.5" fill="#FFFFFF" />
    </svg>
  ),

  docker: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M22.5 11.5c-.3 0-1.5-.1-2.5.6-.7-.7-1.8-1-2.8-.7-.2-.7-.7-1.3-1.4-1.6l-.6-.3-.3.6c-.6 1.2-.5 2.5.2 3.5-.8.5-2 .8-3.6.8H2.5c-.3 0-.5.2-.5.5 0 2.2.8 4.2 2.2 5.7 1.8 1.8 4.2 2.4 7.3 2.4 6.8 0 10.5-3.8 11-8.5v-.5h-1zM4 11h2v2H4v-2zm3 0h2v2H7v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm0-3h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5z"
        fill="#2496ED"
      />
    </svg>
  ),

  kubernetes: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.5 3.8v7.6L12 19.5 5.5 15.7V8.1L12 4.3z"
        fill="#326CE5"
      />
      <path d="M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z" fill="#326CE5" />
    </svg>
  ),

  azure: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13.5 2.5L3 18.5h6.5l4-6.5-6 6.5H19l2-3.5L13.5 2.5z" fill="#0078D4" />
      <path d="M13.5 2.5l-5 8.5h4.5l4.5-8.5h-4z" fill="#50E6FF" />
    </svg>
  ),

  cloudflare: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M18.2 10.3c-.4-2.4-2.5-4.3-5-4.3-2.1 0-4 1.3-4.7 3.2-.6-.2-1.3-.3-1.9-.3-3 0-5.5 2.5-5.5 5.5 0 .2 0 .4.1.6h17c1.7 0 3-1.3 3-3 0-1.5-1.1-2.7-2.6-3-.1.4-.2.9-.4 1.3z"
        fill="#F38020"
      />
      <path
        d="M17.6 15h3.8c.9 0 1.6-.7 1.6-1.6 0-.8-.6-1.5-1.4-1.6-.1 1.8-1.7 3.2-4 3.2z"
        fill="#FAAE40"
      />
    </svg>
  ),

  github: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="#181717"
      />
    </svg>
  ),

  vscode: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M17.5 2L6.8 11.2l3.4 3.1L17.5 2z" fill="#0065A9" />
      <path d="M17.5 22L6.8 12.8l3.4-3.1L17.5 22z" fill="#007ACC" />
      <path d="M17.5 2l4.3 2.1c.7.3 1.2 1 1.2 1.8v12.2c0 .8-.5 1.5-1.2 1.8L17.5 22V2z" fill="#1F9CF0" />
      <path d="M2.3 8.3c-.4.4-.4 1 0 1.4L5 12l-2.7 2.3c-.4.4-.4 1 0 1.4l1.6 1.5 6.3-5.2-6.3-5.2L2.3 8.3z" fill="#0065A9" />
    </svg>
  ),

  figma: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E" />
      <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262" />
      <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
      <circle cx="14.5" cy="9.5" r="2.5" fill="#1ABCFE" />
      <path d="M8 12h4v5a2.5 2.5 0 0 1-4 0v-5z" fill="#0ACF83" />
    </svg>
  ),

  notion: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#000000" />
      <path
        d="M6.5 6.2l7.2-.6c1.1-.1 1.8.3 2.1 1.2l2.2 7.7V6.4h2.2v11.4l-7.2.6c-1.1.1-1.8-.3-2.1-1.2l-2.2-7.7v7.9H6.5V6.2z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  postman: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="11" fill="#FF6C37" />
      <path
        d="M17.5 10c-.5-1.2-1.7-2-3-2H7v8h2v-3.5h5.5l2 3.5h2.5l-2.3-4c1-.4 1.7-1.3 1.8-2zM9 11.5v-2h5.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H9z"
        fill="#FFFFFF"
      />
    </svg>
  ),

  vercel: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L22 20H2L12 3z" fill="#000000" />
    </svg>
  ),

  database: ({ size = 22, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="#3B82F6" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#2563EB" strokeWidth="2" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#1D4ED8" strokeWidth="2" />
    </svg>
  ),
};
