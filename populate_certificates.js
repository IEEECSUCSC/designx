const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "data", "certificate.csv");
const jsonPath = path.join(__dirname, "data", "certificates.json");

/**
 * Formats a name according to the rules:
 * - If name has > 3 words, convert words before the last 3 to initials.
 * - Keeps the last 3 words as is.
 * - If a word is already an initial (single letter or single letter + dot), leave it as is.
 */
function formatName(name) {
  const words = name.trim().split(/\s+/);

  if (words.length <= 3) {
    return name;
  }

  const numToInitialize = words.length - 3;

  const formattedWords = words.map((word, index) => {
    // Only format the first (length - 3) words
    if (index < numToInitialize) {
      // Check if it's already an initial (e.g. "M", "M.", "m", "m.")
      if (/^[a-zA-Z]\.?$/.test(word)) {
        return word;
      }
      // Convert to initial (e.g. "Mege" -> "M.")
      return word.charAt(0).toUpperCase() + ".";
    }
    return word;
  });

  return formattedWords.join(" ");
}

try {
  const csvData = fs.readFileSync(csvPath, "utf8");

  const lines = csvData.split("\n").filter((line) => line.trim() !== "");

  const certificates = lines
    .map((line, index) => {
      const firstCommaIndex = line.indexOf(",");

      if (firstCommaIndex === -1) {
        console.warn(`Skipping invalid line: ${line}`);
        return null;
      }

      const email = line.substring(0, firstCommaIndex).trim();
      const rawName = line.substring(firstCommaIndex + 1).trim();

      const formattedName = formatName(rawName);

      // Generate sequential ID: DXH250001, DXH250002...
      const idNumber = (index + 1).toString().padStart(4, "0");
      const certificateId = `DXH25${idNumber}`;

      return {
        email,
        name: formattedName,
        certificateId,
      };
    })
    .filter((item) => item !== null);

  fs.writeFileSync(jsonPath, JSON.stringify(certificates, null, 2));
  console.log(
    `Successfully generated ${certificates.length} certificates in ${jsonPath}`,
  );

  // Log a few examples of formatted names for verification
  const longNames = certificates.filter(
    (c) => c.name.split(" ").length > 3 || c.name.includes("."),
  );
  if (longNames.length > 0) {
    console.log("Examples of formatted names:");
    longNames.slice(0, 5).forEach((c) => console.log(`  ${c.name}`));
  }
} catch (error) {
  console.error("Error generating certificates:", error);
  process.exit(1);
}
