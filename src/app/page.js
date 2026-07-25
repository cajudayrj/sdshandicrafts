import Hero from "@/components/sections/Hero";
import WhatWeMake from "@/components/sections/WhatWeMake";
import Products from "@/components/sections/products";
import About from "@/components/sections/About";
import HowToOrder from "@/components/sections/HowToOrder";
import CtaBand from "@/components/sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeMake />
      <Products />
      <About />
      <HowToOrder />
      <CtaBand />
    </>
  );
}
