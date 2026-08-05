/**
 * Decorative craft-desk doodles — yarn, thread, buttons, scissors.
 *
 * Inline SVG rather than files in /public on purpose: at this size the markup
 * costs less than a request each, and inline paths can pick up their section's
 * palette through `currentColor` — which is how the same sticker comes out navy
 * on the sunny band and blush on the cream one.
 *
 * Every doodle
 *   - outlines in `currentColor` (set it with a `text-*` class),
 *   - fills with the `fill` prop (any CSS color, e.g. `var(--sunny)`),
 *   - is sized by the caller (`className="h-12 w-12"`),
 *   - is aria-hidden, because none of them carry meaning.
 */

function Doodle({ className = "", children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function YarnBall({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <circle cx="12" cy="11.5" r="8.5" fill={fill} />
      <path d="M5.2 7.1c4 1.2 8.5 5.7 9.7 9.7" />
      <path d="M7.1 4.6c4 1.2 9.4 6.6 10.6 10.6" />
      <path d="M3.6 13.2c3.5-.7 8-5.2 8.7-8.7" />
      <path d="M10.9 19.8c.7-3.5 5.2-8 8.7-8.7" />
      <path d="M18 17.5c1.3.8 2.3 2 2.8 3.4" />
    </Doodle>
  );
}

export function Spool({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <rect x="6.6" y="4.4" width="10.8" height="15.2" rx="1.4" fill={fill} />
      <path d="M6.6 8.4h10.8M6.6 12h10.8M6.6 15.6h10.8" />
      <rect x="3.6" y="2" width="16.8" height="3" rx="1.5" fill={fill} />
      <rect x="3.6" y="19" width="16.8" height="3" rx="1.5" fill={fill} />
    </Doodle>
  );
}

export function Scissors({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path d="M7.4 3.5 15.9 16.3" />
      <path d="M16.6 3.5 8.1 16.3" />
      <circle cx="6.4" cy="18.6" r="2.7" fill={fill} />
      <circle cx="17.6" cy="18.6" r="2.7" fill={fill} />
      <circle cx="12" cy="12.2" r="1.1" fill={fill} />
    </Doodle>
  );
}

export function Needle({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path d="M4.4 20 15.6 8.6" />
      <ellipse
        cx="17"
        cy="7.1"
        rx="1.5"
        ry="2.1"
        fill={fill}
        transform="rotate(45 17 7.1)"
      />
      <path d="M17.2 6.9c2.7-2.5 5.1.2 3.4 1.9-1.8 1.7-4.6-.3-5.2 2.3-.5 2.3 2.6 3.2 2 5.6" />
    </Doodle>
  );
}

export function SewingButton({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <circle cx="12" cy="12" r="8.6" fill={fill} />
      <circle cx="12" cy="12" r="5.8" />
      <path d="M10.2 10.2 13.8 13.8M13.8 10.2 10.2 13.8" />
      <g fill="currentColor" stroke="none">
        <circle cx="10.2" cy="10.2" r=".85" />
        <circle cx="13.8" cy="10.2" r=".85" />
        <circle cx="10.2" cy="13.8" r=".85" />
        <circle cx="13.8" cy="13.8" r=".85" />
      </g>
    </Doodle>
  );
}

export function Heart({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path
        d="M12 21s-7.5-4.7-9.4-9.1C1.1 8.3 3 4.9 6.3 4.4c2-.3 3.9.7 4.9 2.3l.8 1.3.8-1.3c1-1.6 2.9-2.6 4.9-2.3 3.3.5 5.2 3.9 3.7 7.5C19.5 16.3 12 21 12 21Z"
        fill={fill}
      />
    </Doodle>
  );
}

export function Sparkle({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path d="M12 2q1 9 10 10-9 1-10 10-1-9-10-10 9-1 10-10Z" fill={fill} />
    </Doodle>
  );
}

export function Star({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path
        d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z"
        fill={fill}
      />
    </Doodle>
  );
}

export function Flower({ fill = "none", centerFill = "var(--sunny)", ...props }) {
  return (
    <Doodle {...props}>
      <g fill={fill}>
        <circle cx="12" cy="7.2" r="3.4" />
        <circle cx="16.6" cy="10.5" r="3.4" />
        <circle cx="14.8" cy="15.9" r="3.4" />
        <circle cx="9.2" cy="15.9" r="3.4" />
        <circle cx="7.4" cy="10.5" r="3.4" />
      </g>
      <circle cx="12" cy="12" r="2.7" fill={centerFill} />
    </Doodle>
  );
}

export function Bow({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <path d="M12 12C9 8 6 6 4.2 7.2 2.4 8.4 3 12.6 5 14.2c1.7 1.4 5 .2 7-2.2Z" fill={fill} />
      <path d="M12 12c3-4 6-6 7.8-4.8 1.8 1.2 1.2 5.4-.8 7-1.7 1.4-5 .2-7-2.2Z" fill={fill} />
      <path d="M10.8 13.4 8.6 20.4M13.2 13.4 15.4 20.4" />
      <circle cx="12" cy="12" r="1.6" fill={fill} />
    </Doodle>
  );
}

export function CrochetHook(props) {
  return (
    <Doodle {...props}>
      <path d="M4 20 15.4 8.6" />
      <path d="M15.4 8.6c.7-1.5 2.2-2.6 3.5-2 1.4.6 1.7 2.6.5 3.6-.9.8-2.1.8-2.9.1" />
      <path d="M7.2 16.8 9 18.6M9 15 10.8 16.8" />
    </Doodle>
  );
}

export function Envelope({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <rect x="2.2" y="5.2" width="19.6" height="13.6" rx="2.4" fill={fill} />
      <path d="M3.4 7.4 12 13.3l8.6-5.9" />
    </Doodle>
  );
}

export function Truck({ fill = "none", ...props }) {
  return (
    <Doodle {...props}>
      <rect x="1.4" y="6" width="12.2" height="10" rx="1.6" fill={fill} />
      <path d="M13.6 9.4h4.1l3.3 3.4V16h-7.4z" fill={fill} />
      <circle cx="6.3" cy="17.9" r="2.1" />
      <circle cx="17.3" cy="17.9" r="2.1" />
    </Doodle>
  );
}

/**
 * A scalloped edge, drawn along the bottom of a section and filled with the
 * *next* section's color, so the two meet in a row of bumps instead of a hard
 * line. Generated rather than hand-written so the bump count stays tunable;
 * the viewBox is stretched (`preserveAspectRatio="none"`), which makes these
 * units proportions rather than pixels.
 */
const BUMPS = 24;
const BUMP_WIDTH = 60;
const SCALLOP_WIDTH = BUMPS * BUMP_WIDTH;
const SCALLOP_PATH = `M0 40L0 20${"a30 20 0 0 1 60 0".repeat(BUMPS)}L${SCALLOP_WIDTH} 40Z`;

export function ScallopEdge({ className = "", fill = "var(--cream)", fillOpacity = 1 }) {
  return (
    <svg
      viewBox={`0 0 ${SCALLOP_WIDTH} 40`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-4 w-full sm:h-6 ${className}`}
    >
      <path d={SCALLOP_PATH} fill={fill} fillOpacity={fillOpacity} />
    </svg>
  );
}

/** Hand-drawn wave, sized by the caller and used to underline section headings. */
export function Squiggle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 113 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
    >
      <path d="M4 8q7.5-6 15 0t15 0 15 0 15 0 15 0 15 0" />
    </svg>
  );
}
