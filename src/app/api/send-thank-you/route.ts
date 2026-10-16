import { NextResponse } from "next/server";
import { sendContactThankYou, sendFeedbackThankYou } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, message, impression, extras } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required to dispatch confirmation." },
        { status: 400 }
      );
    }

    if (type === "contact") {
      if (!name || !message) {
        return NextResponse.json(
          { error: "Name and message are required." },
          { status: 400 }
        );
      }

      const result = await sendContactThankYou({
        name,
        email,
        phone: phone || undefined,
        message,
      });

      return NextResponse.json({ success: true, result });
    } else if (type === "feedback") {
      if (!name || !impression) {
        return NextResponse.json(
          { error: "Name and impression are required." },
          { status: 400 }
        );
      }

      const result = await sendFeedbackThankYou({
        name,
        email,
        impression,
        extras: extras || "General Impression",
        message: message || undefined,
      });

      return NextResponse.json({ success: true, result });
    }

    return NextResponse.json(
      { error: "Invalid transmission type specified." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in /api/send-thank-you:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to dispatch email." },
      { status: 500 }
    );
  }
}
