"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

interface ArtistBioSectionProps {
  label: string;
  html: string;
}

export default function ArtistBioSection({ label, html }: ArtistBioSectionProps) {
  const clean = useMemo(() => {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <div className="bio-section-block">
      {/* Gold rule + label */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="block h-[1px] w-8 shrink-0"
          style={{ background: "var(--color-accent, #c8a96e)" }}
          aria-hidden="true"
        />
        <h3 className="text-[11px] uppercase tracking-[0.35em] text-foreground/50 font-sans font-medium">
          {label}
        </h3>
      </div>

      {/* HTML content */}
      <div
        className="artist-html-content"
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: clean }}
      />
    </div>
  );
}
