import { createClient } from "@sanity/client";

// Content lives in the standalone studio repo (studio-sds-handicrafts), which
// deploys separately — this app only ever reads.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  // Pinned so a future API version can't change response shapes under us.
  apiVersion: "2026-08-01",
  // The CDN can serve a stale response for a few seconds after a publish, which
  // would let the revalidate webhook refill the Next cache with old data. Reads
  // are already behind `use cache`, so they're rare enough to go direct.
  useCdn: false,
});
