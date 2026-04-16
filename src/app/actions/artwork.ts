"use server";

import { prisma } from "@/lib/prisma";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

export interface ArtworkDetailData {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  dimensions: string | null;
  creationYear: number | null;
  imageUrl: string;
  images: string[];
  artist: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
    bio: string | null;
  };
  relatedArtworks: Array<{
    id: number;
    name: string;
    imageUrl: string;
    creationYear: number | null;
    dimensions: string | null;
    slug: string;
  }>;
}

export async function getArtworkByArtistSlugAndId(
  artistSlug: string,
  artworkId: number
): Promise<ArtworkDetailData | null> {
  try {
    const artwork = await prisma.galleryLjArtwork.findFirst({
      where: {
        id: artworkId,
        visible: true,
        artist: {
          slug: artistSlug,
          permanent: true,
        },
      },
      include: {
        artist: {
          include: {
            artworks: {
              where: {
                visible: true,
                NOT: { id: artworkId },
              },
              orderBy: { order: "asc" },
              take: 6,
            },
          },
        },
      },
    });

    if (!artwork) return null;

    const artistName =
      `${artwork.artist.firstName || ""} ${artwork.artist.lastName || ""}`.trim() ||
      artwork.artist.pseudo;

    return {
      id: artwork.id,
      name: artwork.name,
      description: artwork.description ?? null,
      price: artwork.price ? Number(artwork.price) : null,
      dimensions: artwork.dimensions ?? null,
      creationYear: artwork.creationYear ?? null,
      imageUrl: `${CLOUDFLARE_R2_PUBLIC_URL}${artwork.imageUrl}`,
      images: artwork.images.map((img) => `${CLOUDFLARE_R2_PUBLIC_URL}${img}`),
      artist: {
        id: artwork.artist.id,
        name: artistName,
        slug: artwork.artist.slug,
        imageUrl: artwork.artist.imageUrl
          ? `${CLOUDFLARE_R2_PUBLIC_URL}${artwork.artist.imageUrl}`
          : null,
        bio: artwork.artist.shortDescription ?? null,
      },
      relatedArtworks: artwork.artist.artworks.map((related) => ({
        id: related.id,
        name: related.name,
        imageUrl: `${CLOUDFLARE_R2_PUBLIC_URL}${related.imageUrl}`,
        creationYear: related.creationYear ?? null,
        dimensions: related.dimensions ?? null,
        slug: `${related.id}`,
      })),
    };
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return null;
  }
}
