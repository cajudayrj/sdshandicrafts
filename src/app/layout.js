import { Fredoka, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  // TODO: set NEXT_PUBLIC_SITE_URL to the production domain before deploying.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "SDS Handicrafts — Handmade with love",
  description:
    "SDS Handicrafts makes small-batch handmade crafts and personalized gifts, each one made to order with a whole lot of care.",
  openGraph: {
    title: "SDS Handicrafts — Handmade with love",
    description:
      "Small-batch handmade crafts and personalized gifts, made to order.",
    images: ["/logo.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-navy">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
