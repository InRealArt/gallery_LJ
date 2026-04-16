"use server";

import { prisma } from "@/lib/prisma";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

export interface ArtworkData {
  id: number;
  name: string;
  artistName: string;
  specialty: string | null;
  imageUrl: string;
}

export async function getArtworks(): Promise<ArtworkData[]> {
  try {
    const artworks = await prisma.galleryLjArtwork.findMany({
      where: {
        visible: true,
        artist: {
          permanent: true,
        },
      },
      include: {
        artist: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
    });

    return artworks.map(
      (artwork): ArtworkData => ({
        id: artwork.id,
        name: artwork.name,
        artistName: `${artwork.artist.firstName || ""} ${artwork.artist.lastName || ""}`.trim() || artwork.artist.pseudo,
        specialty: artwork.dimensions || null,
        imageUrl: `${CLOUDFLARE_R2_PUBLIC_URL}${artwork.imageUrl}`,
      })
    );
  } catch (error) {
    console.error("Error fetching artworks:", error);
    return [];
  }
}
