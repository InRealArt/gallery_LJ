"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArtistBioDescription from "./ArtistBioDescription";
import ArtistBioPanel from "./ArtistBioPanel";

gsap.registerPlugin(ScrollTrigger);

interface ArtistBioProps {
  description: string | null;
  formation: string | null;
  personalExhibitions: string | null;
  collectiveExhibitions: string | null;
  publicCollections: string | null;
}

interface BioSectionData {
  label: string;
  content: string;
}

interface ActiveSection {
  label: string;
  content: string;
}

export default function ArtistBio({
  description,
  formation,
  personalExhibitions,
  collectiveExhibitions,
  publicCollections,
}: ArtistBioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<ActiveSection | null>(null);

  // Build the clickable rows — "EN SAVOIR PLUS" first if description exists
  const rows: BioSectionData[] = (
    [
      description ? { label: "EN SAVOIR PLUS SUR L'ARTISTE", content: description } : null,
      formation ? { label: "FORMATION", content: formation } : null,
      personalExhibitions ? { label: "EXPOSITIONS PERSONNELLES", content: personalExhibitions } : null,
      collectiveExhibitions ? { label: "EXPOSITIONS COLLECTIVES", content: collectiveExhibitions } : null,
      publicCollections ? { label: "COLLECTIONS PUBLIQUES", content: publicCollections } : null,
    ] as (BioSectionData | null)[]
  ).filter((s): s is BioSectionData => s !== null);

  const hasContent = Boolean(description) || rows.length > 0;

  const handleOpen = useCallback((row: BioSectionData) => {
    setActiveSection({ label: row.label, content: row.content });
  }, []);

  const handleClose = useCallback(() => {
    setActiveSection(null);
  }, []);

  useEffect(() => {
    if (!hasContent) return;
    const ctx = gsap.context(() => {
      gsap.from(".bio-prose", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bio-prose",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(".bio-row", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".bio-rows-list",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [hasContent]);

  if (!hasContent) return null;

  const isPanelOpen = activeSection !== null;

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Biographie de l'artiste"
        className="w-full max-w-[1600px] mx-auto px-8 md:px-14 py-24 md:py-32"
      >
        <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/40 mb-10">
          Biographie
        </p>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left column — prose description */}
          {description && (
            <div className="bio-prose md:w-[55%] shrink-0">
              <ArtistBioDescription html={description} />
            </div>
          )}

          {/* Right column — clickable section list */}
          {rows.length > 0 && (
            <nav
              aria-label="Sections biographiques"
              className="bio-rows-list md:flex-1 self-start"
            >
              <ul role="list" className="divide-y divide-foreground/10 border-t border-foreground/10">
                {rows.map((row) => (
                  <li key={row.label} className="bio-row">
                    <button
                      onClick={() => handleOpen(row)}
                      aria-haspopup="dialog"
                      aria-expanded={isPanelOpen && activeSection?.label === row.label}
                      className="group w-full flex items-center justify-between py-5 text-left
                                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.35em] font-sans font-medium
                                   text-foreground/60 group-hover:text-foreground
                                   transition-all duration-300 group-hover:translate-x-1"
                      >
                        {row.label}
                      </span>
                      <span
                        className="text-foreground/30 group-hover:text-accent text-sm leading-none
                                   transition-all duration-300 group-hover:translate-x-1 ml-4 shrink-0"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>

      {/* Slide-in panel — kept in DOM, animated in/out */}
      <ArtistBioPanel
        label={activeSection?.label ?? ""}
        html={activeSection?.content ?? ""}
        isOpen={isPanelOpen}
        onClose={handleClose}
      />
    </>
  );
}
