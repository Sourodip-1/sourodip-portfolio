import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "Sourodip Roy <founder@postpipe.in>";
const adminReceiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || "founder@postpipe.in";

export const resend = new Resend(resendApiKey);

interface SendContactThankYouParams {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface SendFeedbackThankYouParams {
  name: string;
  email: string;
  impression: string;
  extras: string;
  message?: string;
}

export function generateContactEmailHtml({
  name,
  email,
  phone,
  message,
}: SendContactThankYouParams): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : null;
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transmission Received — Sourodip Roy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5efe6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1c1917; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5efe6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Heritage Cream Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #fffdf9; border: 1px solid #e7dfcf; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);">
          
          <!-- Top Indian Heritage Saffron & Amber Gradient Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #ea580c 0%, #ff8800 45%, #d97706 100%); height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="display: inline-block; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #ea580c; font-weight: 700; margin-bottom: 6px;">
                      ॥ संवाद सेतु // TRANSMISSION RECEIVED ॥
                    </div>
                    <div style="font-size: 24px; font-weight: 800; color: #1c1917; letter-spacing: 0.02em; line-height: 1.2; font-family: Georgia, 'Times New Roman', serif;">
                      SOURODIP ROY
                    </div>
                    <div style="font-size: 12px; color: #78716c; font-family: 'SFMono-Regular', Consolas, monospace; letter-spacing: 0.06em; margin-top: 4px;">
                      Systems Architecture &bull; Creative Engineering &bull; Kolkata, India
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="display: inline-block; width: 12px; height: 12px; background-color: #ea580c; border-radius: 50%; box-shadow: 0 0 10px rgba(234, 88, 12, 0.4);"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Subtle Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="border-top: 1px solid #e7dfcf; width: 100%;"></div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 36px 24px 36px;">
              <p style="margin: 0 0 16px 0; font-size: 17px; font-weight: 700; color: #1c1917; font-family: Georgia, serif;">
                Namaste ${safeName},
              </p>
              <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.65; color: #44403c;">
                Thank you for reaching out and taking the time to connect. Your message has landed directly into my primary communication stream.
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.65; color: #44403c;">
                I personally review all systems architecture inquiries, motion design challenges, and creative collaborations. I will carefully contemplate your note and respond promptly.
              </p>

              <!-- Recorded Dispatch Plaque -->
              <div style="background-color: #faf7ee; border: 1px solid #e2dac7; border-left: 3px solid #ea580c; border-radius: 10px; padding: 18px 20px; margin-bottom: 26px;">
                <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #854d0e; font-weight: 700; margin-bottom: 10px;">
                  ॥ RECORDED TRANSMISSION PARTICULARS // विवरणम् ॥
                </div>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #78716c; width: 75px; font-family: monospace;">SENDER:</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #1c1917; font-weight: 700;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #78716c; font-family: monospace;">EMAIL:</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #ea580c; font-weight: 600;">${safeEmail}</td>
                  </tr>
                  ${
                    safePhone
                      ? `<tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #78716c; font-family: monospace;">PHONE:</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #1c1917;">${safePhone}</td>
                  </tr>`
                      : ""
                  }
                  <tr>
                    <td style="padding: 8px 0 4px 0; font-size: 12px; color: #78716c; font-family: monospace; vertical-align: top;">MESSAGE:</td>
                    <td style="padding: 8px 0 4px 0; font-size: 13px; line-height: 1.6; color: #292524; font-style: italic;">"${safeMessage}"</td>
                  </tr>
                </table>
              </div>

              <!-- Button CTA -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 8px 0 16px 0;">
                    <a href="https://sourodip.me" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 13px 28px; border-radius: 10px; letter-spacing: 0.08em; text-transform: uppercase; box-shadow: 0 4px 18px rgba(234, 88, 12, 0.35);">
                      EXPLORE PORTFOLIO ARCHIVES &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #faf7ee; border-top: 1px solid #e7dfcf; padding: 22px 36px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="https://sourodip.me" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[PORTFOLIO]</a>
                    <a href="https://github.com/sourodip-1" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[GITHUB]</a>
                    <a href="https://www.linkedin.com/in/sourodip-roy-89560934b/" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[LINKEDIN]</a>
                    <a href="https://www.instagram.com/sourodip_1/" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[INSTAGRAM]</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 11px; color: #78716c; line-height: 1.6; font-family: monospace;">
                    ॥ वादे वादे जायते तत्त्वबोधः ॥<br/>
                    DISPATCH FROM SOURODIP ROY &bull; KOLKATA, INDIA<br/>
                    BUILD WHAT MATTERS &bull; &copy; ${year} SOURODIP ROY
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateFeedbackEmailHtml({
  name,
  email,
  impression,
  extras,
  message,
}: SendFeedbackThankYouParams): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeImpression = escapeHtml(impression);
  const safeExtras = escapeHtml(extras);
  const safeMessage = message ? escapeHtml(message).replace(/\n/g, "<br/>") : null;
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Impression is Inscribed — Sourodip Roy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5efe6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1c1917; -webkit-font-smoothing: antialiased;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5efe6; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Heritage Cream Card -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #fffdf9; border: 1px solid #e7dfcf; border-radius: 16px; overflow: hidden; box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);">
          
          <!-- Top Indian Heritage Saffron & Amber Gradient Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #ea580c 0%, #ff8800 50%, #d97706 100%); height: 5px; line-height: 5px; font-size: 5px;">&nbsp;</td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="display: inline-block; font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #ea580c; font-weight: 700; margin-bottom: 6px;">
                      ॥ विचार सङ्ग्रह // IMPRESSION INSCRIBED ॥
                    </div>
                    <div style="font-size: 24px; font-weight: 800; color: #1c1917; letter-spacing: 0.02em; line-height: 1.2; font-family: Georgia, serif;">
                      THANK YOU, ${safeName.toUpperCase()}!
                    </div>
                    <div style="font-size: 12px; color: #78716c; font-family: 'SFMono-Regular', Consolas, monospace; letter-spacing: 0.05em; margin-top: 4px;">
                      Sourodip Roy &bull; Creative Developer &bull; Indian Heritage Portfolio
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="display: inline-block; width: 12px; height: 12px; background-color: #ff8800; border-radius: 50%; box-shadow: 0 0 10px rgba(255, 136, 0, 0.4);"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 36px;">
              <div style="border-top: 1px solid #e7dfcf; width: 100%;"></div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 36px 24px 36px;">
              <p style="margin: 0 0 16px 0; font-size: 17px; font-weight: 700; color: #1c1917; font-family: Georgia, serif;">
                ॥ सधन्यवादम् // Warmest Greetings ॥
              </p>
              <p style="margin: 0 0 18px 0; font-size: 14px; line-height: 1.65; color: #44403c;">
                Thank you so much for exploring my digital portfolio and recording your genuine reflection on the visitor wall!
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.65; color: #44403c;">
                Blending authentic Indic classical architecture with spatial typography and interactive physics is an ongoing exploration for me. Your feedback provides immense inspiration to keep refining this craft.
              </p>

              <!-- Feedback Summary Plaque -->
              <div style="background-color: #faf7ee; border: 1px solid #e2dac7; border-left: 3px solid #ea580c; border-radius: 10px; padding: 18px 20px; margin-bottom: 26px;">
                <div style="font-family: 'SFMono-Regular', Consolas, monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #ea580c; font-weight: 700; margin-bottom: 10px;">
                  ॥ RECORDED VISITOR IMPRESSION DETAILS ॥
                </div>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #78716c; width: 95px; font-family: monospace;">IMPRESSION:</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #ea580c; font-weight: 700;">${safeImpression}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; font-size: 12px; color: #78716c; font-family: monospace;">HIGHLIGHT:</td>
                    <td style="padding: 4px 0; font-size: 13px; color: #1c1917; font-weight: 600;">${safeExtras}</td>
                  </tr>
                  ${
                    safeMessage
                      ? `<tr>
                    <td style="padding: 8px 0 4px 0; font-size: 12px; color: #78716c; font-family: monospace; vertical-align: top;">NOTE:</td>
                    <td style="padding: 8px 0 4px 0; font-size: 13px; line-height: 1.6; color: #292524; font-style: italic;">"${safeMessage}"</td>
                  </tr>`
                      : ""
                  }
                </table>
              </div>

              <!-- Button CTA -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding: 8px 0 16px 0;">
                    <a href="https://sourodip.me" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: 700; padding: 13px 28px; border-radius: 10px; letter-spacing: 0.08em; text-transform: uppercase; box-shadow: 0 4px 18px rgba(234, 88, 12, 0.35);">
                      VISIT THE LIVE SITE AGAIN &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #faf7ee; border-top: 1px solid #e7dfcf; padding: 22px 36px; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="https://sourodip.me" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[PORTFOLIO]</a>
                    <a href="https://github.com/sourodip-1" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[GITHUB]</a>
                    <a href="https://www.linkedin.com/in/sourodip-roy-89560934b/" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[LINKEDIN]</a>
                    <a href="https://www.instagram.com/sourodip_1/" target="_blank" style="color: #57534e; text-decoration: none; font-size: 11px; font-family: monospace; margin: 0 8px;">[INSTAGRAM]</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 11px; color: #78716c; line-height: 1.6; font-family: monospace;">
                    ॥ कृतज्ञता ज्ञाप्यते // WITH RESPECT AND GRATITUDE ॥<br/>
                    APPRECIATION TRANSMISSION &bull; SOURODIP ROY<br/>
                    BUILD WHAT MATTERS &bull; &copy; ${year}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactThankYou(data: SendContactThankYouParams) {
  const html = generateContactEmailHtml(data);
  const emailRes = await resend.emails.send({
    from: resendFromEmail,
    to: [data.email],
    subject: `Thank you for reaching out, ${data.name}! | Sourodip Roy`,
    html,
  });

  // Also notify Sourodip directly
  try {
    if (adminReceiverEmail && adminReceiverEmail !== data.email) {
      await resend.emails.send({
        from: resendFromEmail,
        to: [adminReceiverEmail],
        subject: `[PORTFOLIO CONTACT] New message from ${data.name} (${data.email})`,
        html: `
          <div style="font-family: monospace; padding: 20px; background: #faf7ee; color: #1c1917; border: 1px solid #e2dac7;">
            <h2 style="color: #ea580c;">// NEW CONTACT SUBMISSION</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(data.phone || "N/A")}</p>
            <p><strong>Message:</strong></p>
            <pre style="background: #fff; padding: 12px; border-left: 3px solid #ea580c; border: 1px solid #ddd;">${escapeHtml(data.message)}</pre>
            <p style="color: #78716c; font-size: 11px;">Sent from portfolio contact form</p>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("Admin notification email failed (non-critical):", err);
  }

  return emailRes;
}

export async function sendFeedbackThankYou(data: SendFeedbackThankYouParams) {
  const html = generateFeedbackEmailHtml(data);
  const emailRes = await resend.emails.send({
    from: resendFromEmail,
    to: [data.email],
    subject: `Thank you for your valuable feedback, ${data.name}! | Sourodip Roy`,
    html,
  });

  // Also notify Sourodip directly
  try {
    if (adminReceiverEmail && adminReceiverEmail !== data.email) {
      await resend.emails.send({
        from: resendFromEmail,
        to: [adminReceiverEmail],
        subject: `[PORTFOLIO FEEDBACK] New impression from ${data.name}`,
        html: `
          <div style="font-family: monospace; padding: 20px; background: #faf7ee; color: #1c1917; border: 1px solid #e2dac7;">
            <h2 style="color: #ea580c;">// NEW FEEDBACK SUBMISSION</h2>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            <p><strong>Impression:</strong> ${escapeHtml(data.impression)}</p>
            <p><strong>Extras:</strong> ${escapeHtml(data.extras)}</p>
            <p><strong>Message:</strong> ${escapeHtml(data.message || "N/A")}</p>
            <p style="color: #78716c; font-size: 11px;">Sent from portfolio feedback form</p>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error("Admin feedback notification failed (non-critical):", err);
  }

  return emailRes;
}
