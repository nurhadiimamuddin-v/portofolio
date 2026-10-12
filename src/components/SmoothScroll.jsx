"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

/**
 * SmoothScroll component wraps the application to enable Lenis smooth scrolling on desktop.
 * On touch devices (phones/tablets), native scrolling is used to guarantee lag-free 120Hz momentum.
 */
export default function SmoothScroll({ children }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
    }
  }, []);

  if (isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Inertia damping curve
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.05,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
