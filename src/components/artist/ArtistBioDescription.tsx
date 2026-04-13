"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

interface ArtistBioDescriptionProps {
  html: string;
}

export default function ArtistBioDescription({ html }: ArtistBioDescriptionProps) {
  const clean = useMemo(() => {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <div
      className="bio-description artist-html-content mb-20 max-w-3xl"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
