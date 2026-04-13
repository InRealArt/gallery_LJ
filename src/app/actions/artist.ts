"use server";

import { prisma } from "@/lib/prisma";

export interface ArtistPortfolioData {
  id: number;
  name: string;
  slug: string;
  bio: string | null;
  description: string | null;
  formation: string | null;
  personalExhibitions: string | null;
  collectiveExhibitions: string | null;
  publicCollections: string | null;
  imageUrl: string;
  artworks: Array<{
    id: number;
    name: string;
    price: number | null;
    dimensions: string | null;
    creationYear: number | null;
    imageUrl: string;
  }>;
}

export async function getArtistBySlug(slug: string): Promise<ArtistPortfolioData | null> {
  try {
    const artist = await prisma.galleryLjArtist.findUnique({
      where: { slug },
      include: {
        artworks: {
          where: { visible: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!artist || !artist.imageUrl) return null;

    return {
      id: artist.id,
      name: `${artist.firstName || ""} ${artist.lastName || ""}`.trim() || artist.pseudo,
      slug: artist.slug,
      bio: artist.shortDescription ?? null,
      description: artist.description ?? null,
      formation: artist.formation ?? null,
      personalExhibitions: artist.personalExhibitions ?? null,
      collectiveExhibitions: artist.collectiveExhibitions ?? null,
      publicCollections: artist.publicCollections ?? null,
      imageUrl: artist.imageUrl,
      artworks: artist.artworks.map((artwork) => ({
        id: artwork.id,
        name: artwork.name,
        price: artwork.price ? Number(artwork.price) : null,
        dimensions: artwork.dimensions,
        creationYear: artwork.creationYear,
        imageUrl: artwork.imageUrl,
      })),
    };
  } catch (error) {
    console.error("Error fetching artist by slug:", error);
    return null;
  }
}
