import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidAuthToken, COOKIE_NAME } from "@/lib/adminAuth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const authenticated = isValidAuthToken(token);

    return NextResponse.json({ authenticated });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
