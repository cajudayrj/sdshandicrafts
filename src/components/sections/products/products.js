// ---------------------------------------------------------------------------
// TEMPORARY product source.
//
// This file is the single seam between the UI and the data. When WPGraphQL is
// ready, replace the body of `getProducts()` with the fetch and delete the
// static imports + PRODUCTS array below — no component needs to change, as long
// as the returned objects keep this shape:
//
//   { id, name, blurb, price, image: { src, width, height, blurDataURL? } }
//
// Sketch of the eventual implementation:
//
//   export async function getProducts() {
//     const res = await fetch(process.env.WORDPRESS_GRAPHQL_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: PRODUCTS_QUERY }),
//       next: { revalidate: 300 },
//     });
//     const { data } = await res.json();
//     return data.products.nodes.map((node) => ({
//       id: node.id,
//       name: node.name,
//       blurb: node.shortDescription,
//       price: node.price,
//       image: {
//         src: node.image.sourceUrl,
//         width: node.image.mediaDetails.width,
//         height: node.image.mediaDetails.height,
//       },
//     }));
//   }
//
// Remote images will also need their host added to `images.remotePatterns` in
// next.config.mjs before next/image will optimize them.
// ---------------------------------------------------------------------------

// TODO: replace these placeholder files with real product photos. Static
// imports give us intrinsic width/height and a blur placeholder for free.
import product1 from "./images/product-1.jpg";
import product2 from "./images/product-2.jpg";
import product3 from "./images/product-3.jpg";
import product4 from "./images/product-4.jpg";
import product5 from "./images/product-5.jpg";
import product6 from "./images/product-6.jpg";

// TODO: replace with real names, blurbs and prices.
const PRODUCTS = [
  {
    id: "1",
    name: "Webbing Strap Keychains",
    blurb: "A short line about what this is and who it's for.",
    price: "₱350",
    image: product1,
  },
  {
    id: "2",
    name: "Webbing Strap Keychains",
    blurb: "A short line about what this is and who it's for.",
    price: "₱420",
    image: product2,
  },
  {
    id: "3",
    name: "Korean Noodles Shrinky Dinks Keychain",
    blurb: "A short line about what this is and who it's for.",
    price: "₱280",
    image: product3,
  },
  {
    id: "4",
    name: "Webbing Strap Keychains",
    blurb: "A short line about what this is and who it's for.",
    price: "₱500",
    image: product4,
  },
  {
    id: "5",
    name: "Webbing Strap Keychains",
    blurb: "A short line about what this is and who it's for.",
    price: "₱320",
    image: product5,
  },
  {
    id: "6",
    name: "Webbing Strap Keychains",
    blurb: "A short line about what this is and who it's for.",
    price: "₱610",
    image: product6,
  },
];

export async function getProducts() {
  return PRODUCTS;
}
