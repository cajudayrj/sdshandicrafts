"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Main image plus a thumbnail strip, the usual product-page arrangement.
 * `images` is the main photo followed by otherImages, already in the
 * StaticImageData shape getProducts() returns.
 */
export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Guard the index rather than trusting it: if the product is edited down to
  // fewer images while a page is open, `active` could point past the end.
  const current = images[active] ?? images[0];

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label={`View ${name} full size`}
        className="group relative block aspect-square w-full overflow-hidden rounded-3xl border-2 border-navy bg-blush shadow-[0_0_0_0_var(--navy)]"
      >
        <Image
          src={current}
          alt={name}
          priority
          placeholder={current.blurDataURL ? "blur" : "empty"}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="rounded-full border-2 border-navy bg-cream px-4 py-1.5 font-display text-sm font-semibold text-navy">
            Tap to zoom
          </span>
        </span>
      </button>

      {/* A single image needs no picker — the main image is already all of it. */}
      {images.length > 1 && (
        <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden pr-0.75">
          {images.map((image, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-navy transition-opacity ${
                  i === active
                    ? "shadow-[3px_3px_0_0_var(--navy)]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  sizes="80px"
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        // Keep the thumbnail strip in sync when the lightbox is paged around,
        // so closing it leaves you on the image you were just looking at.
        on={{ view: ({ index }) => setActive(index) }}
        slides={images.map((image) => ({
          src: image.src,
          width: image.width,
          height: image.height,
          alt: name,
        }))}
        plugins={[Counter, Thumbnails, Zoom]}
        styles={{ container: { backgroundColor: "rgba(27, 42, 78, .92)" } }}
      />
    </div>
  );
}
