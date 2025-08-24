import sharp from "sharp";
import fs from "fs";

const inputFile = "./public/icons/icon-512.png";
const outputDir = "./public/icons/";

const sizes = [16, 32];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  for (const size of sizes) {
    const outputFile = `${outputDir}favicon-${size}.png`;
    await sharp(inputFile)
      .resize(size, size)
      .toFile(outputFile);
    console.log(`✅ Gerado: ${outputFile}`);
  }
})();
