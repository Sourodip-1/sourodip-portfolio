import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAuthToken, verifyAdminPassword, COOKIE_NAME } from "@/lib/adminAuth";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const authHeader = request.headers.get("x-admin-password");

    const isAuthorized =
      isValidAuthToken(token) || (authHeader && verifyAdminPassword(authHeader));

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access to admin console." },
        { status: 401 }
      );
    }

    const contactUrl =
      process.env.POSTPIPE_CONTACT_GET_URL ||
      "https://www.postpipe.in/api/v1/connectors/conn_a95l9wsyx/databases/postgres-url/forms/portfolio-contact/submissions";
    const contactBearer = process.env.POSTPIPE_CONTACT_BEARER || "";

    const feedbackUrl =
      process.env.POSTPIPE_FEEDBACK_GET_URL ||
      "https://www.postpipe.in/api/v1/connectors/conn_a95l9wsyx/databases/postgres-url/forms/portfolio-feedback/submissions";
    const feedbackBearer = process.env.POSTPIPE_FEEDBACK_BEARER || "";

    const [contactRes, feedbackRes] = await Promise.allSettled([
      fetch(contactUrl, {
        headers: { Authorization: `Bearer ${contactBearer}` },
        cache: "no-store",
      }),
      fetch(feedbackUrl, {
        headers: { Authorization: `Bearer ${feedbackBearer}` },
        cache: "no-store",
      }),
    ]);

    let contacts: any[] = [];
    let feedbacks: any[] = [];

    if (contactRes.status === "fulfilled" && contactRes.value.ok) {
      const contactJson = await contactRes.value.json();
      if (Array.isArray(contactJson?.data)) {
        contacts = contactJson.data
          .filter((item: any) => !item.is_deleted)
          .map((item: any) => ({
            submissionId: item.submissionId,
            timestamp: item.timestamp,
            formId: item.formId,
            name: item.data?.["Your Name"] || item.data?.Name || "Anonymous",
            email: item.data?.Email || item.data?.email || "",
            phone: item.data?.Phone || item.data?.phone || "",
            message: item.data?.Message || item.data?.message || "",
            rawData: item.data,
          }))
          .reverse();
      }
    }

    if (feedbackRes.status === "fulfilled" && feedbackRes.value.ok) {
      const feedbackJson = await feedbackRes.value.json();
      if (Array.isArray(feedbackJson?.data)) {
        feedbacks = feedbackJson.data
          .filter((item: any) => !item.is_deleted)
          .map((item: any) => ({
            submissionId: item.submissionId,
            timestamp: item.timestamp,
            formId: item.formId,
            name: item.data?.Name || item.data?.["Your Name"] || "Anonymous Visitor",
            impression: item.data?.impression || item.data?.Impression || "",
            extras: item.data?.extras || item.data?.Extras || "",
            message: item.data?.message || item.data?.Message || "",
            email: item.data?.Email || item.data?.email || "",
            rawData: item.data,
          }))
          .reverse();
      }
    }

    return NextResponse.json({
      success: true,
      contacts,
      feedbacks,
      stats: {
        totalContacts: contacts.length,
        totalFeedbacks: feedbacks.length,
        totalCombined: contacts.length + feedbacks.length,
        lastContactAt: contacts[0]?.timestamp || null,
        lastFeedbackAt: feedbacks[0]?.timestamp || null,
      },
    });
  } catch (err: any) {
    console.error("Error in /api/admin/submissions:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch admin data." },
      { status: 500 }
    );
  }
}
