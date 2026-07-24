import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type AttendanceType =
  | "engaged"
  | "newly-married"
  | "established"
  | "seeking-counsel"
  | "other";

const ATTENDANCE_LABELS: Record<AttendanceType, string> = {
  "engaged": "Engaged couple",
  "newly-married": "New couple (married within 3 years)",
  "established": "Established couple",
  "seeking-counsel": "Seeking counsel",
  "other": "Other",
};

interface ConferenceRegistration {
  partnerOneName: string;
  partnerTwoName: string;
  phone: string;
  email: string;
  attendanceType: AttendanceType;
  yearsMarried: string;
  message: string;
}

function isAttendanceType(value: unknown): value is AttendanceType {
  const valid: AttendanceType[] = ["engaged", "newly-married", "established", "seeking-counsel", "other"];
  return typeof value === "string" && valid.includes(value as AttendanceType);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(body: unknown): ConferenceRegistration {
  if (!body || typeof body !== "object") throw new Error("Invalid request body");

  const data = body as Record<string, unknown>;

  if (!data.partnerOneName || typeof data.partnerOneName !== "string") throw new Error("Your name is required");
  if (!data.partnerTwoName || typeof data.partnerTwoName !== "string") throw new Error("Your partner's name is required");
  if (!data.phone || typeof data.phone !== "string") throw new Error("Phone number is required");
  if (!data.email || typeof data.email !== "string" || !isValidEmail(String(data.email))) {
    throw new Error("A valid email address is required");
  }
  if (!isAttendanceType(data.attendanceType)) throw new Error("Please select how you are coming");

  return {
    partnerOneName: String(data.partnerOneName).trim(),
    partnerTwoName: String(data.partnerTwoName).trim(),
    phone: String(data.phone).trim(),
    email: String(data.email).trim().toLowerCase(),
    attendanceType: data.attendanceType,
    yearsMarried: typeof data.yearsMarried === "string" ? data.yearsMarried.trim() : "",
    message: typeof data.message === "string" ? data.message.trim() : "",
  };
}

function buildEmailHtml(data: ConferenceRegistration): string {
  const rows = [
    ["Your name", data.partnerOneName],
    ["Partner's name", data.partnerTwoName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Coming as", ATTENDANCE_LABELS[data.attendanceType]],
    ...(data.yearsMarried ? [["Years married", data.yearsMarried]] : []),
  ];

  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1F2C25;">
      <div style="background: #1B3227; padding: 32px; border-radius: 4px 4px 0 0;">
        <h1 style="color: #F7F4EC; font-size: 20px; margin: 0; letter-spacing: -0.015em;">
          Conference Registration — ${data.partnerOneName} &amp; ${data.partnerTwoName}
        </h1>
        <p style="color: #8DA692; font-size: 13px; margin: 8px 0 0; font-family: sans-serif;">
          Inaugural Couples&rsquo; Conference · December 2026 · The GOMAL Foundation
        </p>
      </div>

      <div style="background: #FDFAF4; border: 1px solid rgba(31,44,37,0.14); border-top: 0; padding: 32px; border-radius: 0 0 4px 4px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${rows
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(31,44,37,0.1); font-size: 12px; font-family: sans-serif; color: #8A9E90; text-transform: uppercase; letter-spacing: 0.1em; width: 160px; vertical-align: top; padding-right: 16px;">
                ${label}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(31,44,37,0.1); font-size: 15px; font-family: sans-serif; color: #1F2C25;">
                ${value}
              </td>
            </tr>
          `
            )
            .join("")}
        </table>

        ${data.message ? `
        <div style="margin-top: 24px;">
          <p style="font-size: 12px; font-family: sans-serif; color: #8A9E90; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">
            Their note
          </p>
          <p style="font-size: 15px; font-family: sans-serif; color: #1F2C25; line-height: 1.65; background: #EFE9DB; padding: 16px; border-radius: 4px; margin: 0; white-space: pre-line;">
            ${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </p>
        </div>
        ` : ""}

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(31,44,37,0.1);">
          <p style="font-size: 12px; font-family: sans-serif; color: #8A9E90; margin: 0;">
            Reply to ${data.partnerOneName} at ${data.email} · ${data.phone}
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let data: ConferenceRegistration;

  try {
    const body: unknown = await request.json();
    data = validatePayload(body);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Invalid request" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const foundationEmail = process.env.FOUNDATION_EMAIL ?? "foundation@lasehinde.org";

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Email service not configured." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "The GOMAL Foundation <noreply@lasehinde.org>",
      to: foundationEmail,
      replyTo: data.email,
      subject: `Conference Registration — ${data.partnerOneName} & ${data.partnerTwoName}`,
      html: buildEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send registration. Please try again." },
      { status: 500 }
    );
  }
}
