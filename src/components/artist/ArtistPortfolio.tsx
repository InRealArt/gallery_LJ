"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

gsap.registerPlugin(ScrollTrigger);

interface Artwork {
  id: number;
  name: string;
  price: number | null;
  dimensions: string | null;
  creationYear: number | null;
  imageUrl: string;
}

interface ArtistPortfolioProps {
  artistName: string;
  artworks: Artwork[];
}

export default function ArtistPortfolio({ artistName, artworks }: ArtistPortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const artworksRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in on scroll
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Artwork cards staggered scroll reveal
      artworksRef.current.forEach((artwork, index) => {
        if (!artwork) return;
        gsap.fromTo(
          artwork,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: artwork,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            delay: (index % 4) * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lastName = artistName.split(" ").pop() ?? artistName;

  return (
    <section
      ref={sectionRef}
      aria-label={`Portfolio de ${artistName}`}
      className="w-full bg-[#0e0e0e] py-24 px-8 md:px-14"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.5em] text-white/30 mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Œuvres de {lastName}
          </h2>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((artwork, index) => (
              <article
                key={artwork.id}
                ref={(el) => {
                  artworksRef.current[index] = el;
                }}
                className="group cursor-pointer"
                style={{ willChange: "transform, opacity" }}
              >
                <figure className="m-0">
                  {/* Image — compact square-ish format */}
                  <div
                    className="overflow-hidden mb-4"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      src={`${CLOUDFLARE_R2_PUBLIC_URL}${artwork.imageUrl}`}
                      alt={artwork.name}
                      className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Caption */}
                  <figcaption className="px-1">
                    <h3 className="text-sm font-serif text-white/90 mb-1 leading-snug">
                      {artwork.name}
                    </h3>
                    {artwork.dimensions && (
                      <p className="text-[10px] text-white/35 uppercase tracking-[0.18em] mb-1">
                        {artwork.dimensions}
                      </p>
                    )}
                    {artwork.creationYear && (
                      <p className="text-[10px] text-white/30">{artwork.creationYear}</p>
                    )}
                    {artwork.price && (
                      <p className="text-xs font-medium mt-2 text-white/55">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(artwork.price)}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-serif text-white/25">
              Aucune œuvre disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
