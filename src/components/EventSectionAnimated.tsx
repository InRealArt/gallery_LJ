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
      // Header de section
      gsap.from(".expo-header-left", {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });

      gsap.from(".expo-header-right", {
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

      // Cards en stagger
      gsap.from(".expo-card-wrapper", {
        opacity: 0,
        y: 50,
        duration: 1.1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".expo-grid",
          start: "top 80%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
