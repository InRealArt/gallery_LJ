"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

const PAGE_SIZE = 3;

export interface ArtistItem {
  name: string;
  slug: string;
  specialty: string;
  cta: string;
  image: string;
}

export default function ArtistesGrid({ items }: { items: ArtistItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const animateNewCards = useCallback(() => {
    if (!gridRef.current) return;
    const unAnimated = gridRef.current.querySelectorAll<HTMLElement>(
      ".artiste-card:not([data-animated])"
    );
    if (unAnimated.length === 0) return;

    gsap.fromTo(
      unAnimated,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: { each: 0.18, from: "start" },
        ease: "power3.out",
        onComplete: () => {
          unAnimated.forEach((el) => el.setAttribute("data-animated", "true"));
        },
      }
    );
  }, []);

  useEffect(() => {
    animateNewCards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (visibleCount > PAGE_SIZE) {
      requestAnimationFrame(() => animateNewCards());
    }
  }, [visibleCount, animateNewCards]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < items.length) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [visibleCount, items.length]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      <div
        ref={gridRef}
        className="artistes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24"
      >
        {visibleItems.map((artiste) => (
          <div key={artiste.name} className="artiste-card">
            <Link
              href={`/artistes/${artiste.slug}`}
              className="group cursor-pointer block"
            >
              <div
                className="img-hover-zoom mb-8 shadow-sm"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={artiste.image}
                  alt={artiste.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white uppercase text-[10px] tracking-widest border border-white p-4 backdrop-blur-sm">
                    {artiste.cta}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-serif mb-1">{artiste.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="h-px mt-16" aria-hidden="true" />
      )}
    </>
  );
}
