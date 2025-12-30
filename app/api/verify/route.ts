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
    const { certificateId } = await request.json();

    if (!certificateId) {
      return NextResponse.json(
        { valid: false, error: "Certificate ID is required." },
        { status: 400 },
      );
    }

    const certificates = loadCertificates();
    const normalizedId = String(certificateId).trim();

    const record = certificates.find(
      (item) => item.certificateId.trim() === normalizedId,
    );

    if (!record) {
      return NextResponse.json(
        { valid: false, error: "Certificate not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ valid: true, certificate: record });
  } catch (error) {
    console.error("Error in /api/verify:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
