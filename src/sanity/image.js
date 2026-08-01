import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Build a CDN URL for a Sanity image field. Returns a builder, so callers chain
 * transforms and finish with `.url()`:
 *
 *   urlFor(doc.photo).width(1600).auto("format").url()
 */
export function urlFor(source) {
  return builder.image(source);
}
