import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ENV } from "@shared/config/env";
import type { PartnershipFormData, PartnershipType } from "@features/partnership/types/partnership";
import { PARTNERSHIP_TYPE_LABELS } from "@features/partnership/types/partnership";

const resend = new Resend(ENV.RESEND_API_KEY);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPartnershipType(value: unknown): value is PartnershipType {
  const validTypes: PartnershipType[] = [
    "education",
    "marriage-family",
    "youth-mentorship",
    "community-outreach",
    "volunteering",
    "financial",
    "media-communications",
    "other",
  ];
  return typeof value === "string" && validTypes.includes(value as PartnershipType);
}

function validatePayload(body: unknown): PartnershipFormData {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const data = body as Record<string, unknown>;

  if (!data.name || typeof data.name !== "string") {
    throw new Error("Name is required");
  }
  if (!data.email || typeof data.email !== "string" || !isValidEmail(data.email)) {
    throw new Error("A valid email address is required");
  }
  if (!data.phone || typeof data.phone !== "string") {
    throw new Error("Phone number is required");
  }
  if (!isPartnershipType(data.partnershipType)) {
    throw new Error("A valid partnership type is required");
  }
  if (!data.proposal || typeof data.proposal !== "string" || data.proposal.trim().length < 20) {
    throw new Error("Please provide more detail (at least 20 characters)");
  }

  return {
    name: String(data.name).trim(),
    email: String(data.email).trim().toLowerCase(),
    phone: String(data.phone).trim(),
    partnershipType: data.partnershipType,
    proposal: String(data.proposal).trim(),
  };
}

function buildEmailHtml(data: PartnershipFormData): string {
  return `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1F2C25;">
      <div style="background: #1B3227; padding: 32px; border-radius: 4px 4px 0 0;">
        <h1 style="color: #F7F4EC; font-size: 20px; margin: 0; letter-spacing: -0.015em;">
          New Partnership Application
        </h1>
        <p style="color: #8DA692; font-size: 13px; margin: 8px 0 0; font-family: sans-serif;">
          The GOMAL Foundation · ${new Date().toLocaleDateString("en-NG", { dateStyle: "long" })}
        </p>
      </div>

      <div style="background: #FDFAF4; border: 1px solid rgba(31,44,37,0.14); border-top: 0; padding: 32px; border-radius: 0 0 4px 4px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["Name", data.name],
            ["Email", data.email],
            ["Phone", data.phone],
            ["Partnership type", PARTNERSHIP_TYPE_LABELS[data.partnershipType]],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(31,44,37,0.1); font-size: 12px; font-family: sans-serif; color: #8A9E90; text-transform: uppercase; letter-spacing: 0.1em; width: 140px; vertical-align: top; padding-right: 16px;">
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

        <div style="margin-top: 24px;">
          <p style="font-size: 12px; font-family: sans-serif; color: #8A9E90; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;">
            Message
          </p>
          <p style="font-size: 15px; font-family: sans-serif; color: #1F2C25; line-height: 1.65; background: #EFE9DB; padding: 16px; border-radius: 4px; margin: 0; white-space: pre-line;">
            ${data.proposal.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </p>
        </div>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(31,44,37,0.1);">
          <p style="font-size: 12px; font-family: sans-serif; color: #8A9E90; margin: 0;">
            Reply directly to this email to respond to ${data.name} at ${data.email}
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let data: PartnershipFormData;

  try {
    const body: unknown = await request.json();
    data = validatePayload(body);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Invalid request",
      },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "The GOMAL Foundation <noreply@lasehinde.org>",
      to: ENV.FOUNDATION_EMAIL,
      replyTo: data.email,
      subject: `Partnership Application — ${data.name}`,
      html: buildEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send application. Please try again." },
      { status: 500 }
    );
  }
}
