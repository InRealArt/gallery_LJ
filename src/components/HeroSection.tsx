import { CLOUDFLARE_R2_PUBLIC_URL } from '@/constants/cloudflare'
import { prisma } from '@/lib/prisma'
import HeroSectionClient from '@/components/HeroSectionClient'

const DEFAULT_HERO = {
  imageUrl:
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2572&auto=format&fit=crop',
  title: 'La Matière Révélée',
  text: 'Printemps 2026',
  ctaUrl: '#expositions'
}

function resolveImageUrl (image: string | null) {
  if (!image) {
    return DEFAULT_HERO.imageUrl
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  return `${CLOUDFLARE_R2_PUBLIC_URL}${image}`
}

export default async function HeroSection () {
  const hero = await prisma.galleryLjHero.findFirst({
    orderBy: {
      id: 'desc'
    }
  })

  return (
    <HeroSectionClient
      heroData={{
        imageUrl: resolveImageUrl(hero?.image ?? null),
        title: hero?.title ?? DEFAULT_HERO.title,
        text: hero?.text ?? DEFAULT_HERO.text,
        ctaUrl: hero?.ctaUrl ?? DEFAULT_HERO.ctaUrl
      }}
    />
  )
}
