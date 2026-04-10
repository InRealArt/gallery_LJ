"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image : zoom lent depuis scale(1.12) vers scale(1.05)
      tl.from(".hero-img", {
        scale: 1.18,
        duration: 2.2,
        ease: "power2.out",
      })
        // Overlay : fondu
        .from(
          ".hero-overlay",
          { opacity: 0, duration: 1.4 },
          "<"
        )
        // Surtitle
        .from(
          ".hero-surtitle",
          { opacity: 0, y: 14, duration: 0.9 },
          "-=0.6"
        )
        // Title : chaque mot monte séparément
        .from(
          ".hero-title-word",
          {
            opacity: 0,
            y: 50,
            rotateX: -12,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.4"
        )
        // CTA
        .from(
          ".hero-cta",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.3"
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  const titleWords = ["La", "Matière", "Révélée"];

  return (
    <section
      ref={ref}
      className="relative h-[85vh] w-full bg-gray-100 overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2572&auto=format&fit=crop"
        alt="Galerie d'Art"
        className="hero-img w-full h-full object-cover scale-105"
      />
      <div className="hero-overlay absolute inset-0 bg-black/15 flex flex-col items-center justify-center text-white">
        <h2 className="hero-surtitle text-xs uppercase tracking-[0.6em] mb-4">
          Printemps 2026
        </h2>
        <h1 className="text-5xl md:text-8xl font-serif mb-10 text-center px-4 italic flex gap-4 flex-wrap justify-center overflow-hidden">
          {titleWords.map((word) => (
            <span
              key={word}
              className="hero-title-word inline-block"
              style={{ transformOrigin: "bottom center" }}
            >
              {word}
            </span>
          ))}
        </h1>
        <a
          href="#expositions"
          className="hero-cta border border-white px-12 py-5 uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
        >
          Découvrir l&apos;exposition
        </a>
      </div>
    </section>
  );
}
