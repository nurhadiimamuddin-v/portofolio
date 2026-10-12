"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import TechMarquee from "@/components/TechMarquee";
import Works from "@/components/Works";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {

  return (
    <SmoothScroll>


      <main
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "var(--color-light)",
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <Hero />

        <TechMarquee />
        <Works />
        <Experience />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
