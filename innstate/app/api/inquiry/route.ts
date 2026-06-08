import { NextResponse } from "next/server";
import { contactEmail } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const { fullName, email, phone, destination, dates, guests, message } = body ?? {};

  if (!fullName || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const lines = [
    `New inquiry from Innstate website`,
    ``,
    `Full Name: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone ?? "-"}`,
    `Destination / Hotel: ${destination ?? "-"}`,
    `Travel Dates: ${dates ?? "-"}`,
    `Guests: ${guests ?? "-"}`,
    ``,
    `Message:`,
    `${message}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.INQUIRY_FROM_EMAIL ?? "Innstate <onboarding@resend.dev>",
          to: contactEmail,
          reply_to: email,
          subject: `Inquiry: ${destination ?? "Hotel deal"} — ${fullName}`,
          text: lines,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Resend error:", errText);
        return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 502 });
      }
    } catch (err) {
      console.error("Email send error:", err);
      return NextResponse.json({ ok: false, error: "Failed to send inquiry." }, { status: 502 });
    }
  } else {
    console.log("Inquiry received (no email provider configured):\n", lines);
  }

  return NextResponse.json({ ok: true });
}
