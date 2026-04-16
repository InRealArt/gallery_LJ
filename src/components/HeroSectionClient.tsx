'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

interface HeroData {
  imageUrl: string
  title: string
  text: string
  ctaUrl: string
}

interface HeroSectionClientProps {
  heroData: HeroData
}

export default function HeroSectionClient ({ heroData }: HeroSectionClientProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-img', {
        scale: 1.18,
        duration: 2.2,
        ease: 'power2.out'
      })
        .from(
          '.hero-overlay',
          { opacity: 0, duration: 1.4 },
          '<'
        )
        .from(
          '.hero-surtitle',
          { opacity: 0, y: 14, duration: 0.9 },
          '-=0.6'
        )
        .from(
          '.hero-title-word',
          {
            opacity: 0,
            y: 50,
            rotateX: -12,
            stagger: 0.08,
            duration: 1.1,
            ease: 'power4.out'
          },
          '-=0.4'
        )
        .from(
          '.hero-cta',
          { opacity: 0, y: 20, duration: 0.8 },
          '-=0.3'
        )
    }, ref)

    return () => ctx.revert()
  }, [])

  const titleWords = useMemo(() => {
    return heroData.title.split(' ').filter(Boolean)
  }, [heroData.title])

  return (
    <section
      ref={ref}
      className='relative h-[85vh] w-full overflow-hidden bg-gray-100'
    >
      <Image
        src={heroData.imageUrl}
        alt={heroData.title}
        fill
        priority
        sizes='100vw'
        className='hero-img h-full w-full scale-105 object-cover'
      />
      <div className='hero-overlay absolute inset-0 flex flex-col items-center justify-center bg-black/15 text-white'>
        <p className='hero-surtitle mb-4 px-4 text-center text-xs uppercase tracking-[0.6em]'>
          {heroData.text}
        </p>
        <h1 className='mb-10 flex flex-wrap justify-center gap-4 overflow-hidden px-4 text-center font-serif text-5xl italic md:text-8xl'>
          {titleWords.map((word) => (
            <span
              key={`${heroData.title}-${word}`}
              className='hero-title-word inline-block'
              style={{ transformOrigin: 'bottom center' }}
            >
              {word}
            </span>
          ))}
        </h1>
        <a
          href={heroData.ctaUrl}
          className='hero-cta border border-white px-12 py-5 text-[10px] uppercase tracking-[0.4em] transition-all duration-500 hover:bg-white hover:text-black'
        >
          Découvrir l&apos;exposition
        </a>
      </div>
    </section>
  )
}
