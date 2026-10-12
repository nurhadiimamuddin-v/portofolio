"use client";

import { ReactLenis } from "lenis/react";

/**
 * SmoothScroll component wraps the application to enable Lenis smooth scrolling.
 * Easing represents a custom cubic bezier inertia damping curve.
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Inertia damping curve
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.05,
        syncTouch: true,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
