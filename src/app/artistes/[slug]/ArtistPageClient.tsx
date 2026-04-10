"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

interface ArtistData {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  imageUrl: string;
  artworks: Artwork[];
}

export default function ArtistPage({ params, artist }: { params: Promise<{ slug: string }>; artist: ArtistData | null }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const artworksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!artist) return;

    const ctx = gsap.context(() => {
      // Hero parallax effect
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
          }
        );
      }

      // Artist name reveal animation
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.3,
            ease: "power3.out",
          }
        );
      }

      // Artworks staggered reveal on scroll
      artworksRef.current.forEach((artwork, index) => {
        if (artwork) {
          gsap.fromTo(
            artwork,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: artwork,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: (index % 3) * 0.15,
            }
          );
        }
      });

      // Portfolio section fade in
      if (portfolioRef.current) {
        gsap.fromTo(
          portfolioRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [artist]);

  if (!artist) {
    return (
      <>
        <Header />
        <main className="pt-28 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-serif mb-6">Artiste non trouvé</h1>
            <Link href="/" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-all">
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-28">
        {/* Hero Section with Artist Image */}
        <section className="relative h-[70vh] overflow-hidden">
          <div
            ref={heroRef}
            className="absolute inset-0"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={`${CLOUDFLARE_R2_PUBLIC_URL}${artist.imageUrl}`}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          <div className="relative h-full flex flex-col justify-end pb-20 px-10 max-w-[1600px] mx-auto">
            <h1
              ref={nameRef}
              className="text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-4"
              style={{ willChange: "transform, opacity" }}
            >
              {artist.name}
            </h1>
            <p className="text-white/80 text-sm uppercase tracking-[0.3em]">
              Artiste Résident
            </p>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} className="py-24 px-10 max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4">
              Portfolio
            </h2>
            <h2 className="text-4xl md:text-5xl font-serif">
              Œuvres de {artist.name.split(" ").pop()}
            </h2>
          </div>

          {/* Artworks Grid */}
          {artist.artworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {artist.artworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  ref={(el) => {
                    artworksRef.current[index] = el;
                  }}
                  className="group cursor-pointer"
                  style={{ willChange: "transform, opacity" }}
                >
                  {/* Artwork Image */}
                  <div className="img-hover-zoom mb-6 shadow-sm" style={{ aspectRatio: "4/5" }}>
                    <img
                      src={`${CLOUDFLARE_R2_PUBLIC_URL}${artwork.imageUrl}`}
                      alt={artwork.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Artwork Info */}
                  <div className="text-center">
                    <h3 className="text-2xl font-serif mb-2">{artwork.name}</h3>
                    {artwork.dimensions && (
                      <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] mb-2">
                        {artwork.dimensions}
                      </p>
                    )}
                    {artwork.creationYear && (
                      <p className="text-xs text-gray-500">{artwork.creationYear}</p>
                    )}
                    {artwork.price && (
                      <p className="text-sm font-semibold mt-3 text-gray-700">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(artwork.price)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-serif text-gray-400">
                Aucune œuvre disponible pour le moment
              </p>
            </div>
          )}
        </section>

        {/* Back to Artists CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1600px] mx-auto px-10 text-center">
            <Link
              href="/#artistes"
              className="inline-block text-[11px] uppercase tracking-widest border border-black px-10 py-4 hover:bg-black hover:text-white transition-all duration-300"
            >
              Découvrir tous les artistes
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
