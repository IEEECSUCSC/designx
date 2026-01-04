import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";

export async function POST(request: Request) {
  try {
    const { certificateId } = await request.json();

    if (!certificateId) {
      return NextResponse.json(
        { valid: false, error: "Certificate ID is required." },
        { status: 400 },
      );
    }

    await dbConnect();
    const normalizedId = String(certificateId).trim();

    const record = await Certificate.findOne({ certificateId: normalizedId });

    if (!record) {
      return NextResponse.json(
        { valid: false, error: "Certificate not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      valid: true,
      certificate: {
        name: record.name,
        certificateId: record.certificateId,
        email: record.email,
      },
    });
  } catch (error) {
    console.error("Error in /api/verify:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
