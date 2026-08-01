import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

/**
 * Called by Sanity whenever a product is published, unpublished or deleted, so
 * the carousel doesn't wait out the cache timer. Configure the webhook in
 * sanity.io/manage with the same secret as SANITY_REVALIDATE_SECRET.
 */
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  if (!signature) {
    return Response.json({ message: "Missing signature" }, { status: 401 });
  }

  // Must be the raw body — re-encoding the parsed JSON can change the bytes and
  // break the hash.
  const body = await request.text();
  if (!(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  // "max" marks the tag stale and revalidates in the background, so a publish
  // never makes a visitor wait on Sanity.
  revalidateTag("products", "max");

  return Response.json({ revalidated: true, now: Date.now() });
}
