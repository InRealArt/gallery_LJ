"use server";

import { prisma } from "@/lib/prisma";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

export interface ArtistData {
  id: number;
  name: string;
  specialty: string | null;
  imageUrl: string;
}

export async function getArtists(): Promise<ArtistData[]> {
  try {
    const artists = await prisma.galleryLjArtist.findMany({
      where: {
        visible: true,
      },
      include: {
        _count: {
          select: {
            artworks: {
              where: {
                visible: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 9,
    });

    return artists
      .filter((artist) => artist.imageUrl) // Only include artists with an image
      .map(
        (artist): ArtistData => ({
          id: artist.id,
          name: `${artist.firstName || ""} ${artist.lastName || ""}`.trim() || artist.pseudo,
          specialty: null, // Will be computed from artworks if needed
          imageUrl: `${CLOUDFLARE_R2_PUBLIC_URL}${artist.imageUrl}`,
        })
      );
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
}
