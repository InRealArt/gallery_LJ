"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface ArtworkEnquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  artistName: string;
}

type EnquiryType = "reservation" | "achat" | "autre";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  enquiryType: EnquiryType | "";
}

const ENQUIRY_OPTIONS: { value: EnquiryType; label: string }[] = [
  { value: "reservation", label: "Une réservation" },
  { value: "achat", label: "Un achat" },
  { value: "autre", label: "Autre" },
];

export default function ArtworkEnquiryPanel({
  isOpen,
  onClose,
  artworkTitle,
  artistName,
}: ArtworkEnquiryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "",
  });

  // Slide panel + backdrop in/out
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

      // Stagger form fields after panel arrives
      if (fieldsRef.current) {
        gsap.fromTo(
          fieldsRef.current.querySelectorAll(".field-reveal"),
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.07,
            delay: 0.35,
          }
        );
      }
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

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("ArtworkEnquiryPanel — submit", {
        artworkTitle,
        artistName,
        ...form,
      });
    },
    [form, artworkTitle, artistName]
  );

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
        aria-label="Se renseigner sur cette œuvre"
        className="fixed right-0 top-0 z-50 h-screen overflow-hidden"
        style={{
          width: "clamp(320px, 42vw, 620px)",
          background: "#0e0e0e",
          transform: "translateX(100%)",
          pointerEvents: "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-7 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-[0.45em] font-sans font-medium text-accent">
            Se renseigner
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
          {/* Artwork context */}
          <div className="mb-10">
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-1">
              {artistName}
            </p>
            <p className="font-serif text-white/80 text-lg leading-snug">
              {artworkTitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div ref={fieldsRef} className="flex flex-col gap-8">

              {/* Nom complet */}
              <div className="field-reveal flex flex-col gap-2">
                <label
                  htmlFor="enquiry-fullName"
                  className="text-[9px] uppercase tracking-[0.45em] font-sans font-medium text-white/40"
                >
                  Nom complet <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  id="enquiry-fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="
                    w-full bg-transparent border-0 border-b border-white/20
                    text-white/80 text-sm font-sans
                    py-2 px-0
                    outline-none
                    transition-colors duration-300
                    focus:border-accent placeholder:text-white/20
                  "
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div className="field-reveal flex flex-col gap-2">
                <label
                  htmlFor="enquiry-email"
                  className="text-[9px] uppercase tracking-[0.45em] font-sans font-medium text-white/40"
                >
                  Email <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full bg-transparent border-0 border-b border-white/20
                    text-white/80 text-sm font-sans
                    py-2 px-0
                    outline-none
                    transition-colors duration-300
                    focus:border-accent placeholder:text-white/20
                  "
                  placeholder="jean@exemple.fr"
                />
              </div>

              {/* Téléphone */}
              <div className="field-reveal flex flex-col gap-2">
                <label
                  htmlFor="enquiry-phone"
                  className="text-[9px] uppercase tracking-[0.45em] font-sans font-medium text-white/40"
                >
                  Téléphone
                </label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="
                    w-full bg-transparent border-0 border-b border-white/20
                    text-white/80 text-sm font-sans
                    py-2 px-0
                    outline-none
                    transition-colors duration-300
                    focus:border-accent placeholder:text-white/20
                  "
                  placeholder="+33 6 00 00 00 00"
                />
              </div>

              {/* Radio cards — type de demande */}
              <fieldset className="field-reveal border-0 p-0 m-0">
                <legend className="text-[9px] uppercase tracking-[0.45em] font-sans font-medium text-white/40 mb-4">
                  Cette demande concerne <span className="text-accent" aria-hidden="true">*</span>
                </legend>
                <div className="flex flex-col gap-3" role="radiogroup">
                  {ENQUIRY_OPTIONS.map(({ value, label }) => {
                    const isSelected = form.enquiryType === value;
                    return (
                      <label
                        key={value}
                        className={`
                          flex items-center gap-4 px-5 py-4 border cursor-pointer
                          transition-all duration-250
                          ${
                            isSelected
                              ? "border-accent bg-accent/8 text-white"
                              : "border-white/12 text-white/50 hover:border-white/30 hover:text-white/70"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="enquiryType"
                          value={value}
                          required
                          checked={isSelected}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {/* Custom radio indicator */}
                        <span
                          className={`
                            flex-shrink-0 w-3.5 h-3.5 rounded-full border
                            transition-all duration-250
                            ${
                              isSelected
                                ? "border-accent bg-accent"
                                : "border-white/30"
                            }
                          `}
                          aria-hidden="true"
                        />
                        <span className="text-[11px] uppercase tracking-[0.3em] font-sans">
                          {label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* Submit */}
              <div className="field-reveal pt-2">
                <button
                  type="submit"
                  className="
                    w-full
                    text-[11px] uppercase tracking-[0.45em] font-sans
                    bg-white text-[#0e0e0e]
                    px-8 py-4
                    border border-white
                    transition-all duration-300 ease-out
                    hover:bg-transparent hover:text-white
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
                  "
                >
                  Envoyer la demande
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}
