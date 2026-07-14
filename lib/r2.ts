import "server-only";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

/**
 * Cloudflare R2 (S3-compatible) helper.
 * Uploads go through the admin-guarded /api/admin/upload route.
 */

let cached: S3Client | null = null;

export function r2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET &&
    process.env.R2_PUBLIC_URL,
  );
}

function client(): S3Client {
  if (cached) return cached;
  const accountId = process.env.R2_ACCOUNT_ID;
  cached = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
  return cached;
}

const publicBase = () => (process.env.R2_PUBLIC_URL ?? "").replace(/\/+$/, "");

export function publicUrlFor(key: string): string {
  return `${publicBase()}/${key}`;
}

/** Best-effort: derive the object key from a stored public URL. */
export function keyFromUrl(url: string): string | null {
  const base = publicBase();
  if (base && url.startsWith(base + "/")) return url.slice(base.length + 1);
  return null;
}

export async function uploadToR2(
  key: string,
  body: Uint8Array | Buffer,
  contentType: string,
): Promise<string> {
  await client().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return publicUrlFor(key);
}

export async function deleteFromR2(url: string): Promise<void> {
  if (!r2Configured()) return;
  const key = keyFromUrl(url);
  if (!key) return;
  await client().send(
    new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET!, Key: key }),
  );
}
