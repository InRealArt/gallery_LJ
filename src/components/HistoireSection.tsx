"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HistoireSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".histoire-surtitle", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });

      gsap.from(".histoire-quote", {
        opacity: 0,
        y: 36,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
        delay: 0.2,
      });

      // Le trait horizontal se déploie depuis le centre
      gsap.from(".histoire-rule", {
        scaleX: 0,
        duration: 1.1,
        ease: "power2.inOut",
        transformOrigin: "center",
        scrollTrigger: {
          trigger: ".histoire-rule",
          start: "top 85%",
        },
        delay: 0.4,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="histoire"
      className="py-32 px-10 max-w-4xl mx-auto text-center"
    >
      <h2 className="histoire-surtitle text-xs uppercase tracking-[0.5em] text-gray-400 mb-8">
        Notre Vision
      </h2>
      <p className="histoire-quote font-serif text-2xl md:text-3xl leading-relaxed italic">
        &quot;Depuis sa création, LJ Gallery s&apos;efforce de créer un pont
        entre l&apos;art classique et les expressions contemporaines les plus
        audacieuses. Nous croyons en un art qui interroge, émeut et
        dure.&quot;
      </p>
      <div className="histoire-rule w-20 h-[1px] bg-black mx-auto mt-12" />
    </section>
  );
}
