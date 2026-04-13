"use client";

import { useMemo } from "react";
import DOMPurify from "dompurify";

interface ArtistBioDescriptionProps {
  html: string;
}

function stripEmptyParagraphs(input: string): string {
  return input
    .replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "")
    .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, "");
}

export default function ArtistBioDescription({ html }: ArtistBioDescriptionProps) {
  const clean = useMemo(() => {
    // stripEmptyParagraphs runs on both server and client — no window dependency
    const stripped = stripEmptyParagraphs(html);
    // DOMPurify is browser-only; skip on server (HTML is already stripped above)
    if (typeof window === "undefined") return stripped;
    return stripEmptyParagraphs(DOMPurify.sanitize(stripped));
  }, [html]);

  return (
    <div
      className="bio-description artist-html-content mb-20 max-w-3xl [&_p]:mb-0 [&_p]:leading-snug"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
