/**
 * SAMARA GREEN LAUNDRY — Generator Foto Galeri & Thumbnail Blog
 * --------------------------------------------------------------
 * Membuat foto realistis untuk /galeri/ dan /blog/ via z-ai-web-dev-sdk,
 * lalu dikompres dengan sharp (JPG q80, lebar maks 1200px) agar ringan
 * untuk static export cPanel.
 *
 * Pemakaian:
 *   node scripts/generate-gallery.mjs          → generate semua yang belum ada
 *   node scripts/generate-gallery.mjs nama.jpg → retry satu file saja
 *
 * File yang sudah ada di-lewasi (aman dijalankan ulang).
 */
import ZAI from "z-ai-web-dev-sdk";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "public", "images");

const STYLE =
  "realistic photography, natural lighting, clean and professional look, green and fresh color tone, no text, no watermark, no logo, no typography";

const JOBS = [
  // ---------- GALERI (4:3 landscape) ----------
  {
    dir: "gallery",
    name: "outlet-storefront",
    size: "1152x864",
    prompt:
      "Front view of a small modern laundry shop storefront in an Indonesian neighborhood, bright green and white facade, glass windows, warm daytime sunlight, tidy welcoming entrance, motorcycles parked nearby, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "washing-machines",
    size: "1152x864",
    prompt:
      "Row of clean modern white washing machines inside a bright tidy laundry facility, spotless floor, folded towels on a stainless steel counter, fresh airy atmosphere, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "folding-service",
    size: "1152x864",
    prompt:
      "Close-up of neatly folded stacks of fresh white and colorful clothes on a wooden table, hands of a worker folding a soft t-shirt, warm cozy lighting, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "delivery-courier",
    size: "1152x864",
    prompt:
      "Friendly Indonesian delivery courier wearing a helmet and a green uniform shirt carrying a stack of neatly bagged laundry next to a motorcycle on a calm residential street, golden morning light, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "sneaker-care",
    size: "1152x864",
    prompt:
      "A pair of spotless clean white sneakers being brushed with a small soft brush, foam bubbles on a work table, other cleaning tools arranged neatly, bright studio-like lighting, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "dry-cleaning",
    size: "1152x864",
    prompt:
      "Elegant dark suit jacket and formal dress hanging on wooden hangers inside a premium dry cleaning garment bag, protected and fresh, soft boutique lighting, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "bedcover-fresh",
    size: "1152x864",
    prompt:
      "Freshly washed fluffy bed cover and pillows neatly arranged on a tidy bed in a bright bedroom, sunlight through window, soft white and green tones, cozy hygienic feeling, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "steam-ironing",
    size: "1152x864",
    prompt:
      "Professional steam iron pressing a crisp white shirt on an ironing board, gentle steam visible, clean laundry workspace in the background, sharp detail, " +
      STYLE,
  },
  {
    dir: "gallery",
    name: "eco-detergent",
    size: "1152x864",
    prompt:
      "Natural eco-friendly laundry detergent made from plants with green leaves around, glass jars and soft towels, bright minimalist flat-lay on light wooden surface, " +
      STYLE,
  },
  // ---------- BLOG THUMBNAIL (wide) ----------
  {
    dir: "blog",
    name: "cara-melipat-pakaian",
    size: "1344x768",
    prompt:
      "Neatly folded t-shirts and shirts arranged in tidy rows on a bright table, one pair of hands demonstrating folding a shirt, top-down slightly angled view, instructional cozy feel, " +
      STYLE,
  },
  {
    dir: "blog",
    name: "menghilangkan-noda",
    size: "1344x768",
    prompt:
      "Macro shot of a white cotton shirt with a small sauce stain being pre-treated by dabbing with a soft cloth and a drop of gentle detergent, focused lighting, helpful practical mood, " +
      STYLE,
  },
  {
    dir: "blog",
    name: "deterjen-nabati",
    size: "1344x768",
    prompt:
      "Flat-lay of green plant-based laundry detergent bottles and bars surrounded by fresh leaves, cotton towels and washing machine drum in soft background, eco lifestyle concept, " +
      STYLE,
  },
  {
    dir: "blog",
    name: "pakaian-wangi-tahan-lama",
    size: "1344x768",
    prompt:
      "A woman smiling while smelling a fresh soft towel pulled from a tidy stack of clean laundry, bright airy room with green plants, fresh pleasant morning vibe, " +
      STYLE,
  },
];

async function main() {
  const zai = await ZAI.create();
  const only = process.argv[2]; // opsional: filter nama file untuk retry

  for (const job of JOBS) {
    const outName = `${job.name}.jpg`;
    if (only && !outName.includes(only)) continue;

    const outDir = path.join(ROOT, job.dir);
    fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, outName);

    if (fs.existsSync(outPath)) {
      console.log(`skip (sudah ada): ${job.dir}/${outName}`);
      continue;
    }

    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const response = await zai.images.generations.create({
          prompt: job.prompt,
          size: job.size,
        });
        const base64 = response?.data?.[0]?.base64;
        if (!base64) throw new Error("respons kosong");
        const png = Buffer.from(base64, "base64");
        await sharp(png)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(outPath);
        const kb = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`OK ${job.dir}/${outName} (${kb} KB)`);
        ok = true;
      } catch (err) {
        console.error(`GAGAL ${job.name} percobaan ${attempt}: ${err.message}`);
        if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (!ok) {
      console.error(`GAGAL TOTAL: ${job.name}`);
      process.exitCode = 1;
    }
  }
  console.log("Selesai.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
