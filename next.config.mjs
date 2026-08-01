/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets getProducts() and friends opt into `use cache` + cacheTag, so a Sanity
  // publish can invalidate just the affected data via revalidateTag instead of
  // waiting out a timer or triggering a rebuild.
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // Scoped to this project's assets. The id is hardcoded rather than read
        // from env because next.config is evaluated before we can be sure the
        // variable is set, and an undefined path would silently reject every
        // image. It's public data — the same id is in the studio's config.
        pathname: "/images/pxzvfqmj/**",
      },
    ],
  },
};

export default nextConfig;
