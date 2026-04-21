"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExpositionsSectionAnimated({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headerLeft = ref.current?.querySelector(".expo-header-left");
      const headerRight = ref.current?.querySelector(".expo-header-right");
      const cards = ref.current?.querySelectorAll(".expo-card-wrapper");
      const grid = ref.current?.querySelector(".expo-grid");

      if (headerLeft) {
        gsap.from(headerLeft, {
          opacity: 0,
          x: -30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
          },
        });
      }

      if (headerRight) {
        gsap.from(headerRight, {
          opacity: 0,
          x: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
          },
          delay: 0.15,
        });
      }

      if (cards && cards.length > 0 && grid) {
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
