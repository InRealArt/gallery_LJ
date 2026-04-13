"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

interface ArtistPageHeaderProps {
  name: string;
  imageUrl: string;
  bio: string | null;
}

export default function ArtistPageHeader({ name, imageUrl, bio }: ArtistPageHeaderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? "";
  const displayLastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
  const shortDescription = bio ?? "Artiste Résident\nGallery LJ";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (firstNameRef.current) {
        tl.fromTo(
          firstNameRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1 },
          0
        );
      }
      if (lastNameRef.current) {
        tl.fromTo(
          lastNameRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1 },
          0.15
        );
      }
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { y: 40, opacity: 0, scale: 1.04 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          0.1
        );
      }
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0 },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={`Portrait de ${name}`}
      className="
        w-full max-w-[1600px] mx-auto px-8 md:px-14
        min-h-[420px] max-h-[580px]
        grid grid-cols-[1fr_auto_1fr] items-center
        gap-x-10 md:gap-x-16
        py-14 md:py-18
      "
    >
      {/* LEFT — Stacked name */}
      <div className="flex flex-col justify-center self-stretch pt-4">
        <h1 className="flex flex-col leading-none select-none" aria-label={name}>
          <span
            ref={firstNameRef}
            className="font-sans font-black uppercase tracking-tight text-foreground"
            style={{
              fontSize: "clamp(1.8rem, 3.8vw, 3.8rem)",
              willChange: "transform, opacity",
            }}
          >
            {firstName}
          </span>
          {displayLastName && (
            <span
              ref={lastNameRef}
              className="font-sans font-black uppercase tracking-tight"
              style={{
                fontSize: "clamp(1.8rem, 3.8vw, 3.8rem)",
                color: "var(--color-accent, #c8a96e)",
                willChange: "transform, opacity",
              }}
            >
              {displayLastName}
            </span>
          )}
          <span
            className="block mt-4 h-[2px] w-10"
            style={{ background: "var(--color-accent, #c8a96e)" }}
            aria-hidden="true"
          />
        </h1>
      </div>

      {/* CENTER — Portrait photo */}
      <figure className="flex flex-col items-center m-0">
        <div
          ref={photoRef}
          className="relative overflow-hidden aspect-[3/4] shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
          style={{
            width: "clamp(180px, 20vw, 300px)",
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={`${CLOUDFLARE_R2_PUBLIC_URL}${imageUrl}`}
            alt={`Portrait de ${name}`}
            fill
            sizes="(max-width: 768px) 180px, (max-width: 1200px) 240px, 300px"
            className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105"
            priority
          />
        </div>
        <figcaption className="sr-only">{name}</figcaption>
      </figure>

      {/* RIGHT — Short description */}
      <div
        ref={descRef}
        className="flex flex-col justify-center items-end text-right self-stretch pt-4"
        style={{ willChange: "transform, opacity" }}
      >
        {shortDescription.split("\n").map((line, i) => (
          <p
            key={i}
            className="font-sans text-[11px] uppercase tracking-[0.25em] text-foreground/50 mb-2 last:mb-0"
          >
            {line}
          </p>
        ))}
        <span
          className="block mt-6 h-[1px] w-8 ml-auto"
          style={{ background: "var(--color-accent, #c8a96e)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
