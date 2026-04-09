"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
}

export default function RevealWrapper({
  children,
  delay = 0,
  yOffset = 30,
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if already visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is in viewport - show it
          setStyle({
            opacity: 1,
            transform: "translateY(0)",
            transition: `all 0.8s ease-out`,
            transitionDelay: `${delay}ms`,
          });
          observer.unobserve(element);
        } else {
          // Element not yet visible - keep hidden
          setStyle({
            opacity: 0,
            transform: `translateY(${yOffset}px)`,
            transition: `all 0.8s ease-out`,
            transitionDelay: `${delay}ms`,
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, yOffset]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}
