"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";

interface ContactSubmission {
  submissionId: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  rawData?: any;
}

interface FeedbackSubmission {
  submissionId: string;
  timestamp: string;
  name: string;
  impression: string;
  extras: string;
  message?: string;
  email?: string;
  rawData?: any;
}

interface SubmissionsData {
  contacts: ContactSubmission[];
  feedbacks: FeedbackSubmission[];
  stats: {
    totalContacts: number;
    totalFeedbacks: number;
    totalCombined: number;
    lastContactAt: string | null;
    lastFeedbackAt: string | null;
  };
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Data states
  const [data, setData] = useState<SubmissionsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "feedbacks">("contacts");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  // Update IST clock
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

  // Check existing session on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check-session");
        const json = await res.json();
        if (json.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setDataError("");
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        setDataError(json.error || "Failed to load submissions.");
      }
    } catch (err: any) {
      setDataError(err.message || "Network error fetching submissions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, fetchSubmissions]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    sound.playClick(600);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        sound.playHover(650);
      } else {
        setLoginError(json.error || "Invalid password");
        sound.playHover(200);
      }
    } catch {
      setLoginError("Network communication failure");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    sound.playClick(400);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsAuthenticated(false);
      setData(null);
      setPasswordInput("");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    sound.playClick(700);
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    if (!data?.contacts) return [];
    if (!searchQuery.trim()) return data.contacts;
    const q = searchQuery.toLowerCase();
    return data.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.toLowerCase().includes(q)) ||
        c.message.toLowerCase().includes(q)
    );
  }, [data?.contacts, searchQuery]);

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    if (!data?.feedbacks) return [];
    if (!searchQuery.trim()) return data.feedbacks;
    const q = searchQuery.toLowerCase();
    return data.feedbacks.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.impression.toLowerCase().includes(q) ||
        f.extras.toLowerCase().includes(q) ||
        (f.message && f.message.toLowerCase().includes(q)) ||
        (f.email && f.email.toLowerCase().includes(q))
    );
  }, [data?.feedbacks, searchQuery]);

  const exportJSON = () => {
    sound.playClick(600);
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sourodip-portfolio-submissions-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render initial checking state
  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-[#07090e] text-white flex items-center justify-center font-mono">
        <div className="flex items-center gap-3 text-sm text-[#0047FF]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0047FF] animate-ping" />
          INITIALIZING SECURITY HANDSHAKE...
        </div>
      </main>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#06080d] text-white flex items-center justify-center px-4 relative overflow-hidden font-mono selection:bg-[#0047FF] selection:text-white">
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0047FF]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#0d111a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,71,255,0.15)]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0047FF] shadow-[0_0_8px_#0047FF]" />
              <span className="text-[11px] font-bold tracking-widest text-[#0047FF] uppercase">
                SECURITY TERMINAL
              </span>
            </div>
            <span className="text-[11px] text-white/40 tracking-wider">
              {currentTime} IST
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mb-1">
              Sourodip Portfolio Admin
            </h1>
            <p className="text-xs text-white/50 leading-relaxed">
              Enter your master fixed administrative passphrase to access contact transmissions and visitor feedbacks.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold tracking-wider text-white/70 uppercase mb-2">
                ADMIN ACCESS PASSCODE
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter passcode..."
                  required
                  autoFocus
                  className="w-full bg-[#06080d] border border-white/15 focus:border-[#0047FF] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all shadow-inner tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/40 hover:text-white uppercase tracking-wider px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#0047FF] hover:bg-[#0037cc] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg text-xs tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(0,71,255,0.4)] hover:shadow-[0_4px_25px_rgba(0,71,255,0.6)] cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                "UNLOCK DASHBOARD →"
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
            <Link
              href="/"
              className="hover:text-[#0047FF] transition-colors flex items-center gap-1"
            >
              ← RETURN TO PORTFOLIO
            </Link>
            <span className="text-white/25">FIXED PASSWORD PROTECTION</span>
          </div>
        </div>
      </main>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <main className="min-h-screen bg-[#07090e] text-white font-mono selection:bg-[#0047FF] selection:text-white">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#090c13]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0047FF]/20 border border-[#0047FF]/40 flex items-center justify-center text-[#0047FF] font-bold text-sm shadow-[0_0_15px_rgba(0,71,255,0.3)]">
              SR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight font-sans">
                  Sourodip Roy // Admin Console
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 tracking-widest font-bold">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-white/40 tracking-wider">
                Postpipe Submissions &amp; Dispatch Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="hidden md:inline-block text-[11px] text-white/50 px-2.5 py-1 bg-white/5 rounded border border-white/10">
              {currentTime} IST
            </span>

            <button
              onClick={fetchSubmissions}
              disabled={isLoading}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh submissions from Postpipe"
            >
              <span className={`text-sm ${isLoading ? "animate-spin" : ""}`}>↻</span>
              <span>{isLoading ? "SYNCING..." : "REFRESH"}</span>
            </button>

            <button
              onClick={exportJSON}
              disabled={!data}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Export all submissions to JSON"
            >
              <span>↓</span>
              <span>EXPORT</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-[#0047FF]/15 hover:bg-[#0047FF]/25 border border-[#0047FF]/30 text-[#0047FF] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>PORTFOLIO ↗</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-500/30 text-red-300 hover:text-red-200 rounded-lg text-xs transition-all cursor-pointer"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Contact Requests */}
          <div className="bg-[#0e121b] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-[#0047FF]/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0047FF]/5 rounded-bl-full pointer-events-none" />
            <div className="text-[10px] tracking-widest text-[#0047FF] uppercase font-bold mb-1">
              // CONTACT INQUIRIES
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight my-2">
              {data?.stats?.totalContacts ?? (isLoading ? "..." : 0)}
            </div>
            <div className="text-[11px] text-white/40 flex items-center justify-between">
              <span>Form: portfolio-contact</span>
              <span className="text-emerald-400">Postpipe Live</span>
            </div>
          </div>

          {/* Card 2: Feedback Submissions */}
          <div className="bg-[#0e121b] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-sky-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none" />
            <div className="text-[10px] tracking-widest text-sky-400 uppercase font-bold mb-1">
              // VISITOR FEEDBACKS
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight my-2">
              {data?.stats?.totalFeedbacks ?? (isLoading ? "..." : 0)}
            </div>
            <div className="text-[11px] text-white/40 flex items-center justify-between">
              <span>Form: portfolio-feedback</span>
              <span className="text-sky-400">Public Archive</span>
            </div>
          </div>

          {/* Card 3: Total Submissions */}
          <div className="bg-[#0e121b] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
            <div className="text-[10px] tracking-widest text-purple-400 uppercase font-bold mb-1">
              // COMBINED ACTIVITY
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight my-2">
              {data?.stats?.totalCombined ?? (isLoading ? "..." : 0)}
            </div>
            <div className="text-[11px] text-white/40 flex items-center justify-between">
              <span>Postgres Database</span>
              <span>All time</span>
            </div>
          </div>

          {/* Card 4: Resend Mail System */}
          <div className="bg-[#0e121b] border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="text-[10px] tracking-widest text-emerald-400 uppercase font-bold mb-1">
              // RESEND DISPATCHER
            </div>
            <div className="text-xl sm:text-2xl font-bold font-sans text-white tracking-tight my-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              sourodip.me
            </div>
            <div className="text-[11px] text-white/40 flex items-center justify-between">
              <span>Status: Verified</span>
              <span className="text-emerald-400">Auto-Thank-You ON</span>
            </div>
          </div>
        </div>

        {dataError && (
          <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{dataError}</span>
            </div>
            <button
              onClick={fetchSubmissions}
              className="underline text-red-200 hover:text-white cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Navigation Tabs and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 bg-[#0a0d14] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                sound.playClick(500);
                setActiveTab("contacts");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "contacts"
                  ? "bg-[#0047FF] text-white shadow-[0_2px_12px_rgba(0,71,255,0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>CONTACT INQUIRIES</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/20">
                {data?.contacts?.length ?? 0}
              </span>
            </button>

            <button
              onClick={() => {
                sound.playClick(500);
                setActiveTab("feedbacks");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "feedbacks"
                  ? "bg-[#0047FF] text-white shadow-[0_2px_12px_rgba(0,71,255,0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>VISITOR FEEDBACKS</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/20">
                {data?.feedbacks?.length ?? 0}
              </span>
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, keyword..."
              className="w-full bg-[#0e121b] border border-white/15 focus:border-[#0047FF] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: CONTACT INQUIRIES */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {isLoading && !data ? (
              <div className="py-20 text-center text-white/40 text-xs flex flex-col items-center gap-3">
                <span className="w-6 h-6 border-2 border-[#0047FF] border-t-transparent rounded-full animate-spin" />
                FETCHING CONTACT REQUESTS FROM POSTPIPE...
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-20 text-center bg-[#0d111a] border border-dashed border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-3">📬</div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {searchQuery ? "No matching contacts found" : "No contact submissions yet"}
                </h3>
                <p className="text-xs text-white/40 max-w-md mx-auto">
                  {searchQuery
                    ? "Try clearing your search query to see all records."
                    : "When users send a message through the portfolio contact form, their inquiries and auto-thank-you status will appear here."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredContacts.map((contact, idx) => {
                  const dateStr = contact.timestamp
                    ? new Date(contact.timestamp).toLocaleString("en-GB", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Unknown date";

                  return (
                    <div
                      key={contact.submissionId || idx}
                      className="bg-[#0d111b] border border-white/10 hover:border-[#0047FF]/50 rounded-xl p-5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 mb-4 text-xs">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-[#0047FF]/15 text-[#0047FF] font-bold text-[10px] border border-[#0047FF]/30">
                            #{contact.submissionId.slice(-8)}
                          </span>
                          <span className="font-sans font-bold text-base text-white">
                            {contact.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-white/40 flex items-center gap-3">
                          <span>{dateStr} IST</span>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                JSON.stringify(contact, null, 2),
                                contact.submissionId
                              )
                            }
                            className="hover:text-[#0047FF] transition-colors cursor-pointer"
                            title="Copy JSON"
                          >
                            {copiedId === contact.submissionId ? "✓ COPIED" : "[COPY]"}
                          </button>
                        </div>
                      </div>

                      {/* Contact Channels */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                        <div className="bg-[#07090e] p-3 rounded-lg border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-white/40 block mb-0.5">
                              EMAIL
                            </span>
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-[#38bdf8] hover:underline font-bold"
                            >
                              {contact.email || "Not provided"}
                            </a>
                          </div>
                          {contact.email && (
                            <button
                              onClick={() =>
                                copyToClipboard(contact.email, `email-${contact.submissionId}`)
                              }
                              className="text-[10px] text-white/40 hover:text-white px-2 py-1 rounded bg-white/5 cursor-pointer"
                            >
                              {copiedId === `email-${contact.submissionId}` ? "✓" : "COPY"}
                            </button>
                          )}
                        </div>

                        <div className="bg-[#07090e] p-3 rounded-lg border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-white/40 block mb-0.5">
                              PHONE
                            </span>
                            {contact.phone ? (
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-white hover:text-[#0047FF]"
                              >
                                {contact.phone}
                              </a>
                            ) : (
                              <span className="text-white/30 italic">None provided</span>
                            )}
                          </div>
                          {contact.phone && (
                            <button
                              onClick={() =>
                                copyToClipboard(contact.phone!, `phone-${contact.submissionId}`)
                              }
                              className="text-[10px] text-white/40 hover:text-white px-2 py-1 rounded bg-white/5 cursor-pointer"
                            >
                              {copiedId === `phone-${contact.submissionId}` ? "✓" : "COPY"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="bg-[#07090e] p-4 rounded-lg border border-white/5 text-xs">
                        <span className="text-[10px] text-[#0047FF] font-bold block mb-2 uppercase tracking-wider">
                          // TRANSMISSION MESSAGE BODY
                        </span>
                        <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                          {contact.message}
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="mt-4 flex items-center justify-end gap-3 text-xs">
                        <a
                          href={`mailto:${contact.email}?subject=Re:%20Transmission%20via%20sourodip.me&body=Hello%20${encodeURIComponent(
                            contact.name
                          )},%0A%0AThank%20you%20for%20reaching%20out.%0A%0A`}
                          className="px-3 py-1.5 bg-[#0047FF] hover:bg-[#0037cc] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <span>REPLY VIA EMAIL</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: VISITOR FEEDBACKS */}
        {activeTab === "feedbacks" && (
          <div className="space-y-4">
            {isLoading && !data ? (
              <div className="py-20 text-center text-white/40 text-xs flex flex-col items-center gap-3">
                <span className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                FETCHING FEEDBACKS FROM POSTPIPE...
              </div>
            ) : filteredFeedbacks.length === 0 ? (
              <div className="py-20 text-center bg-[#0d111a] border border-dashed border-white/10 rounded-2xl p-8">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {searchQuery ? "No matching feedbacks found" : "No feedback submissions yet"}
                </h3>
                <p className="text-xs text-white/40 max-w-md mx-auto">
                  {searchQuery
                    ? "Try clearing your search query to see all records."
                    : "Feedback submitted via the portfolio footer will populate here in real-time."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFeedbacks.map((fb, idx) => {
                  const dateStr = fb.timestamp
                    ? new Date(fb.timestamp).toLocaleString("en-GB", {
                        timeZone: "Asia/Kolkata",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Unknown date";

                  return (
                    <div
                      key={fb.submissionId || idx}
                      className="bg-[#0d111b] border border-white/10 hover:border-sky-500/50 rounded-xl p-5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs">
                          <span className="font-sans font-bold text-base text-white">
                            {fb.name}
                          </span>
                          <span className="text-[10px] text-white/40">{dateStr}</span>
                        </div>

                        {/* Impression & Extras pills */}
                        <div className="flex items-center gap-2 flex-wrap mb-3">
                          <span className="px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
                            IMPRESSION: {fb.impression}
                          </span>
                          {fb.extras && (
                            <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                              {fb.extras}
                            </span>
                          )}
                        </div>

                        {/* Note text */}
                        {fb.message ? (
                          <div className="bg-[#07090e] p-3 rounded-lg border border-white/5 text-xs text-white/80 italic leading-relaxed mb-3">
                            "{fb.message}"
                          </div>
                        ) : (
                          <div className="text-xs text-white/30 italic mb-3">
                            No additional comment written.
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                        <span>
                          {fb.email ? (
                            <a
                              href={`mailto:${fb.email}`}
                              className="text-white/60 hover:text-white underline"
                            >
                              {fb.email}
                            </a>
                          ) : (
                            "No email provided"
                          )}
                        </span>
                        <span className="text-[10px] text-white/20">
                          ID: {fb.submissionId.slice(-8)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
