import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Certificate from "@/models/Certificate";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    await dbConnect();
    const normalizedEmail = String(email).trim();

    // Case-insensitive search
    const record = await Certificate.findOne({
      email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
    });

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
    console.error("Error in /api/certificate:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
