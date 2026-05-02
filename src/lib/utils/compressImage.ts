// src/lib/utils/compressImage.ts
// Uses the browser Canvas API — no extra packages needed.

const MAX_SIDE = 800;   // px — enough for a product image thumbnail
const QUALITY  = 0.82;  // WebP quality (0–1)
const OUT_TYPE = "image/webp";

/**
 * Compresses an image File using Canvas + WebP encoding.
 * Reduces large photos (3-5 MB) down to ~80-200 KB before upload.
 *
 * @param file  Original File from <input type="file">
 * @returns     A new File (WebP, ≤ MAX_SIDE px, QUALITY) ready to append to FormData
 */
export async function compressImageFile(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Calculate new dimensions
      let { width, height } = img;
      if (width > MAX_SIDE || height > MAX_SIDE) {
        if (width >= height) {
          height = Math.round((height / width) * MAX_SIDE);
          width  = MAX_SIDE;
        } else {
          width  = Math.round((width / height) * MAX_SIDE);
          height = MAX_SIDE;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width  = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        // Canvas not supported — send original
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file); // Fallback to original
            return;
          }
          // Give it a deterministic name with .webp extension
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const compressed = new File([blob], `${baseName}.webp`, {
            type: OUT_TYPE,
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        OUT_TYPE,
        QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // Fallback to original on error
    };

    img.src = objectUrl;
  });
}
