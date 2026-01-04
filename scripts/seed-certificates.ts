import dbConnect from "../lib/db";
import Certificate from "../models/Certificate";
import fs from "fs";
import path from "path";

async function seedCertificates() {
  try {
    await dbConnect();

    const dataPath = path.join(process.cwd(), "data/certificates.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const certificates = JSON.parse(fileContent);

    console.log(`Found ${certificates.length} certificates to migrate.`);

    // Optional: Clear existing data
    // await Certificate.deleteMany({});

    let successCount = 0;
    let errorCount = 0;

    for (const cert of certificates) {
      try {
        // Upsert to avoid duplicates
        await Certificate.findOneAndUpdate(
          { certificateId: cert.certificateId },
          cert,
          { upsert: true, new: true, runValidators: true },
        );
        successCount++;
      } catch (error) {
        console.error(`Error migrating ${cert.certificateId}:`, error);
        errorCount++;
      }
    }

    console.log(`Migration completed.`);
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Errors: ${errorCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

seedCertificates();
