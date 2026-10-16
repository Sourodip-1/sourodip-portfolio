import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/adminAuth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Logged out." });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Logout failed." },
      { status: 500 }
    );
  }
}
