import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminPassword, generateAuthToken, COOKIE_NAME } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: "Incorrect admin password. Access denied." },
        { status: 401 }
      );
    }

    const token = generateAuthToken();
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Login failed." },
      { status: 500 }
    );
  }
}
