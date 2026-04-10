"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ArtistesSectionAnimated({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titre de section
      gsap.from(".artistes-title", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        },
      });

      // Cards en cascade avec décalage vertical (effet masonry animé)
      gsap.from(".artiste-card", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        stagger: {
          each: 0.18,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".artistes-grid",
          start: "top 78%",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
