// Single source of truth for every social link on the site.
// TODO: replace the three `href` placeholders below with the real profile URLs.
// Everything else (footer columns, CTA band, mobile menu) reads from this array.

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.4 3v10.7a3.7 3.7 0 1 1-3-3.63"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4 3c.42 2.4 2.16 4.02 4.6 4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.1 7.9h-1.3a2.1 2.1 0 0 0-2.1 2.1v11.25M9.3 13.1h5.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopeeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.6 7.8h14.8l-1.05 11.6a2.1 2.1 0 0 1-2.09 1.9H7.74a2.1 2.1 0 0 1-2.09-1.9L4.6 7.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 7.8V6.1a3.3 3.3 0 0 1 6.6 0v1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.9 12.6a2.4 2.4 0 0 0-3.6.3c-.5.9.2 1.7 1.5 2.1 1.3.4 2 1.2 1.5 2.1a2.4 2.4 0 0 1-3.6.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GmailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="2.75"
        y="4.75"
        width="18.5"
        height="14.5"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.4 7.6 12 13l7.6-5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const SOCIALS = [
  {
    name: "TikTok",
    handle: "@sds.handicrafts",
    href: "https://www.tiktok.com/@sds.handicrafts", // TODO: https://www.tiktok.com/@...
    Icon: TikTokIcon,
  },
  {
    name: "Instagram",
    handle: "@sds_handicrafts",
    href: "https://www.instagram.com/sds_handicrafts", // TODO: https://www.instagram.com/...
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    handle: "S-D-S Handicrafts",
    href: "https://www.facebook.com/sdshandicrafts", // TODO: https://www.facebook.com/...
    Icon: FacebookIcon,
  },
  {
    name: "Gmail",
    handle: "sds.handicrafts2026",
    href: "mailto:sds.handicrafts2026@gmail.com", // TODO: confirm the real inbox address
    Icon: GmailIcon,
  },
  // {
  //   name: "Shopee",
  //   handle: "sdshandicrafts",
  //   href: "#", // TODO: https://shopee.ph/...
  //   Icon: ShopeeIcon,
  // },
];

// The primary "buy" destination, reused by the header pill and the hero CTA.
// Both the link and the button label ("Shop on …") come from here, so pointing
// the main shop CTA elsewhere is a one-word change below.
const PRIMARY_SHOP = "TikTok";

export const SHOP = SOCIALS.find((s) => s.name === PRIMARY_SHOP);
