import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const AUTH_SALT = "sourodip_portfolio_admin_salt_99";
export const COOKIE_NAME = "souro_admin_auth";

export function generateAuthToken(): string {
  return crypto
    .createHmac("sha256", AUTH_SALT)
    .update(ADMIN_PASSWORD)
    .digest("hex");
}

export function verifyAdminPassword(passwordAttempt: string): boolean {
  if (!passwordAttempt) return false;
  return passwordAttempt.trim() === ADMIN_PASSWORD.trim();
}

export function isValidAuthToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const expectedToken = generateAuthToken();
  return token === expectedToken;
}
