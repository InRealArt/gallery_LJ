"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import DOMPurify from "dompurify";

interface ArtistBioPanelProps {
  label: string;
  html: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtistBioPanel({ label, html, isOpen, onClose }: ArtistBioPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const clean = useMemo(() => {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html);
  }, [html]);

  useEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    if (isOpen) {
      panel.style.pointerEvents = "auto";
      backdrop.style.pointerEvents = "auto";

      gsap.fromTo(
        panel,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      gsap.to(panel, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          panel.style.pointerEvents = "none";
        },
      });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          backdrop.style.pointerEvents = "none";
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
        style={{ pointerEvents: "none", opacity: 0 }}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="fixed right-0 top-0 z-50 h-screen overflow-hidden"
        style={{
          width: "clamp(320px, 42vw, 680px)",
          background: "#0e0e0e",
          transform: "translateX(100%)",
          pointerEvents: "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-[0.45em] font-sans font-medium text-accent">
            {label}
          </span>
          <button
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto px-8 py-8">
          <div
            className="artist-html-content-dark"
            dangerouslySetInnerHTML={{ __html: clean }}
          />
        </div>
      </div>
    </>
  );
}
