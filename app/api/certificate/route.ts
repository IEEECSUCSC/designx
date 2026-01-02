import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

type CertificateRecord = {
  email: string;
  contactNumber: string;
  name: string;
  event: string;
  role: string;
  certificateId: string;
  issueDate: string;
};

function getDataFilePath() {
  return path.join(process.cwd(), "data", "certificates.json");
}

function loadCertificates(): CertificateRecord[] {
  const filePath = getDataFilePath();
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CertificateRecord[];
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const certificates = loadCertificates();
    const normalizedEmail = String(email).trim().toLowerCase();

    const record = certificates.find(
      (item) => item.email.trim().toLowerCase() === normalizedEmail,
    );

    if (!record) {
      return NextResponse.json(
        { error: "Certificate not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ certificate: record });
  } catch (error) {
    console.error("Error in /api/certificate:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
