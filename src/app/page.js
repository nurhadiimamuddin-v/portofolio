"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import TechMarquee from "@/components/TechMarquee";
import Works from "@/components/Works";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Simple, clean parallax effect: footer starts 200px higher and moves to 0
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  return (
    <SmoothScroll>


      <main
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "var(--color-light)",
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
