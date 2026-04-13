"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ArtworkDetailData } from "@/app/actions/artwork";
import ArtworkEnquiryPanel from "@/components/artwork/ArtworkEnquiryPanel";

gsap.registerPlugin(ScrollTrigger);

interface ArtworkDetailProps {
  artwork: ArtworkDetailData;
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLElement>(null);
  const relatedRef = useRef<HTMLElement>(null);
  const [activeImage, setActiveImage] = useState<string>(artwork.imageUrl);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const allImages = [artwork.imageUrl, ...artwork.images].filter(Boolean);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breadcrumb fade in
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
        );
      }

      // Main image — cinematic fade in + subtle scale from slightly large
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );
      }

      // Info panel — slide up staggered children
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll(".info-reveal"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.4,
          }
        );
      }

      // Related artworks — scroll-triggered staggered reveal
      if (relatedRef.current) {
        gsap.fromTo(
          relatedRef.current.querySelectorAll(".related-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const formattedPrice = artwork.price
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(artwork.price)
    : null;

  const artistLastName =
    artwork.artist.name.split(" ").length > 1
      ? artwork.artist.name.split(" ").slice(1).join(" ")
      : artwork.artist.name;

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* ── Breadcrumb ── */}
      <nav
        ref={breadcrumbRef}
        aria-label="Fil d'Ariane"
        className="max-w-[1600px] mx-auto px-8 md:px-14 pt-36 pb-8"
        style={{ willChange: "transform, opacity" }}
      >
        <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/35">
          <li>
            <Link href="/" className="hover:text-foreground/70 transition-colors duration-200">
              Galerie
            </Link>
          </li>
          <li aria-hidden="true" className="text-foreground/20">
            /
          </li>
          <li>
            <Link href="/#artistes" className="hover:text-foreground/70 transition-colors duration-200">
              Artistes
            </Link>
          </li>
          <li aria-hidden="true" className="text-foreground/20">
            /
          </li>
          <li>
            <Link
              href={`/artistes/${artwork.artist.slug}`}
              className="hover:text-foreground/70 transition-colors duration-200"
            >
              {artwork.artist.name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-foreground/20">
            /
          </li>
          <li className="text-foreground/60 truncate max-w-[180px]" aria-current="page">
            {artwork.name}
          </li>
        </ol>
      </nav>

      {/* ── Main split layout ── */}
      <div className="max-w-[1600px] mx-auto px-8 md:px-14 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20 items-start">

          {/* LEFT — Image viewer */}
          <div className="lg:sticky lg:top-32">
            {/* Primary image */}
            <figure
              ref={imageRef}
              className="m-0 overflow-hidden"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={activeImage}
                  alt={artwork.name}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="w-full h-auto transition-opacity duration-500 ease-out"
                  priority
                />
              </div>
              <figcaption className="sr-only">
                {artwork.name}
                {artwork.creationYear ? `, ${artwork.creationYear}` : ""}
              </figcaption>
            </figure>

            {/* Thumbnail strip — secondary images */}
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Vues de l'œuvre">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    role="listitem"
                    onClick={() => setActiveImage(img)}
                    aria-label={`Vue ${i + 1}`}
                    aria-current={activeImage === img ? "true" : undefined}
                    className={`relative flex-shrink-0 overflow-hidden transition-all duration-300 ${
                      activeImage === img
                        ? "ring-1 ring-accent ring-offset-1 opacity-100"
                        : "opacity-40 hover:opacity-70"
                    }`}
                    style={{ width: 60, height: 72 }}
                  >
                    <Image
                      src={img}
                      alt={`Vue ${i + 1} de ${artwork.name}`}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Information panel */}
          <div
            ref={infoRef}
            className="flex flex-col pt-0 lg:pt-2"
          >
            {/* Artist name — small label above */}
            <p
              className="info-reveal text-[10px] uppercase tracking-[0.4em] text-foreground/40 mb-5"
              style={{ willChange: "transform, opacity" }}
            >
              <Link
                href={`/artistes/${artwork.artist.slug}`}
                className="hover:text-accent transition-colors duration-300"
              >
                {artwork.artist.name}
              </Link>
            </p>

            {/* Artwork title */}
            <h1
              className="info-reveal font-serif text-foreground leading-tight mb-2"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                willChange: "transform, opacity",
              }}
            >
              {artwork.name}
            </h1>

            {/* Year */}
            {artwork.creationYear && (
              <p
                className="info-reveal font-sans text-foreground/40 mb-8"
                style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)", willChange: "transform, opacity" }}
              >
                {artwork.creationYear}
              </p>
            )}

            {/* Gold separator */}
            <div
              className="info-reveal w-8 h-px mb-8"
              style={{ background: "var(--color-accent)", willChange: "transform, opacity" }}
              aria-hidden="true"
            />

            {/* Metadata table */}
            <dl
              className="info-reveal space-y-4 mb-10"
              style={{ willChange: "transform, opacity" }}
            >
              {artwork.dimensions && (
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[9px] uppercase tracking-[0.35em] text-foreground/30">
                    Dimensions
                  </dt>
                  <dd className="text-sm font-sans text-foreground/75">
                    {artwork.dimensions}
                  </dd>
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                <dt className="text-[9px] uppercase tracking-[0.35em] text-foreground/30">
                  Artiste
                </dt>
                <dd className="text-sm font-sans text-foreground/75">
                  <Link
                    href={`/artistes/${artwork.artist.slug}`}
                    className="hover:text-accent transition-colors duration-300 underline-offset-2 hover:underline"
                  >
                    {artwork.artist.name}
                  </Link>
                </dd>
              </div>
            </dl>

            {/* Price */}
            {formattedPrice && (
              <p
                className="info-reveal text-lg font-sans font-medium tracking-wide text-foreground mb-8"
                style={{ willChange: "transform, opacity" }}
              >
                {formattedPrice}
              </p>
            )}

            {/* CTA — Enquire button */}
            <div className="info-reveal" style={{ willChange: "transform, opacity" }}>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="
                  w-full text-center
                  text-[11px] uppercase tracking-[0.35em] font-sans
                  border border-foreground text-foreground
                  px-8 py-4
                  transition-all duration-400 ease-out
                  hover:bg-foreground hover:text-background
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                "
              >
                Se renseigner
              </button>
            </div>

            {/* Description — content is admin-authored (CMS), not user-generated */}
            {artwork.description && (
              <div
                className="info-reveal mt-14 pt-10 border-t border-foreground/8"
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/30 mb-5">
                  À propos de l&apos;œuvre
                </p>
                {/* Admin-authored rich text from DB — same pattern as ArtistBio */}
                <div
                  className="artist-html-content"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                />
              </div>
            )}

            {/* Artist bio snippet */}
            {artwork.artist.bio && (
              <div
                className="info-reveal mt-10 pt-10 border-t border-foreground/8"
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/30 mb-5">
                  L&apos;artiste
                </p>
                <p className="text-sm font-sans text-foreground/60 leading-relaxed mb-4">
                  {artwork.artist.bio}
                </p>
                <Link
                  href={`/artistes/${artwork.artist.slug}`}
                  className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 border-b border-foreground/20 pb-0.5 hover:text-accent hover:border-accent transition-all duration-300"
                >
                  Voir le portfolio de {artistLastName}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Related artworks ── */}
      {artwork.relatedArtworks.length > 0 && (
        <section
          ref={relatedRef}
          aria-label={`Autres œuvres de ${artwork.artist.name}`}
          className="w-full bg-[#f7f6f4] py-24 px-8 md:px-14"
        >
          <div className="max-w-[1600px] mx-auto">
            {/* Section header */}
            <div className="mb-14 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-foreground/30 mb-3">
                  Du même artiste
                </p>
                <h2 className="font-serif text-foreground" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                  Autres œuvres de {artistLastName}
                </h2>
              </div>
              <Link
                href={`/artistes/${artwork.artist.slug}`}
                className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-foreground/35 border-b border-foreground/20 pb-0.5 hover:text-accent hover:border-accent transition-all duration-300"
              >
                Voir tout le portfolio
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
              {artwork.relatedArtworks.map((related) => (
                <article
                  key={related.id}
                  className="related-card group"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link href={`/artistes/${artwork.artist.slug}/artworks/${related.id}`}>
                    <figure className="m-0">
                      <div
                        className="overflow-hidden mb-3 bg-white"
                        style={{ aspectRatio: "3/4" }}
                      >
                        <img
                          src={related.imageUrl}
                          alt={related.name}
                          className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <figcaption>
                        <h3 className="text-xs font-serif text-foreground/80 leading-snug mb-1 group-hover:text-foreground transition-colors duration-300">
                          {related.name}
                        </h3>
                        {related.creationYear && (
                          <p className="text-[10px] font-sans text-foreground/35 tracking-wide">
                            {related.creationYear}
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  </Link>
                </article>
              ))}
            </div>

            {/* Mobile link */}
            <div className="mt-12 md:hidden text-center">
              <Link
                href={`/artistes/${artwork.artist.slug}`}
                className="text-[10px] uppercase tracking-[0.3em] text-foreground/35 border-b border-foreground/20 pb-0.5"
              >
                Voir tout le portfolio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Enquiry panel ── */}
      <ArtworkEnquiryPanel
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        artworkTitle={artwork.name}
        artistName={artwork.artist.name}
      />
    </div>
  );
}
