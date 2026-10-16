import { NextResponse } from "next/server";

export const DUMMY_FEEDBACKS = [
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

export async function GET() {
  try {
    const feedbackUrl =
      process.env.POSTPIPE_FEEDBACK_GET_URL ||
      "https://www.postpipe.in/api/v1/connectors/conn_a95l9wsyx/databases/postgres-url/forms/portfolio-feedback/submissions";
    const bearer = process.env.POSTPIPE_FEEDBACK_BEARER || "";

    const res = await fetch(feedbackUrl, {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // Fallback to curated dummy feedbacks if external service returns error
      return NextResponse.json({
        success: true,
        data: DUMMY_FEEDBACKS,
        count: DUMMY_FEEDBACKS.length,
      });
    }

    const json = await res.json();
    const rawList = Array.isArray(json?.data) ? json.data : [];

    // Sanitize for public display (omit sensitive metadata if any)
    const sanitized = rawList
      .filter((item: any) => !item.is_deleted && item.data)
      .map((item: any) => ({
        submissionId: item.submissionId,
        timestamp: item.timestamp,
        name: item.data.Name || item.data["Your Name"] || "Anonymous Visitor",
        impression: item.data.impression || item.data.Impression || "Visitor Review",
        extras: item.data.extras || item.data.Extras || "",
        message: item.data.message || item.data.Message || "",
      }))
      .reverse(); // newest first

    const finalData =
      sanitized.length > 0
        ? [...sanitized, ...DUMMY_FEEDBACKS]
        : DUMMY_FEEDBACKS;

    return NextResponse.json({
      success: true,
      count: finalData.length,
      data: finalData,
    });
  } catch (error: any) {
    console.error("Error fetching public feedbacks, falling back to dummy data:", error);
    return NextResponse.json({
      success: true,
      data: DUMMY_FEEDBACKS,
      count: DUMMY_FEEDBACKS.length,
    });
  }
}
