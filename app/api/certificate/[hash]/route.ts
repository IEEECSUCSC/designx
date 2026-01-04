import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";

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

    await dbConnect();
    const normalizedId = decodeURIComponent(hash).trim();

    const record = await Certificate.findOne({ certificateId: normalizedId });

    if (!record) {
      return NextResponse.json(
        { error: "Certificate not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      certificate: {
        name: record.name,
        certificateId: record.certificateId,
        email: record.email,
      },
    });
  } catch (error) {
    console.error("Error in /api/certificate/[hash]:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
