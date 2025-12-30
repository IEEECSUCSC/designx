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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hash: string }> },
) {
  try {
    const { hash } = await params;

    if (!hash) {
      return NextResponse.json(
        { error: "Certificate ID is required." },
        { status: 400 },
      );
    }

    const certificates = loadCertificates();
    const normalizedId = decodeURIComponent(hash).trim();

    const record = certificates.find(
      (item) => item.certificateId.trim() === normalizedId,
    );

    if (!record) {
      return NextResponse.json(
        { error: "Certificate not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ certificate: record });
  } catch (error) {
    console.error("Error in /api/certificate/[hash]:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
