"use server";

import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";

export interface ArtistData {
  id: number;
  name: string;
  slug: string;
  specialty: string | null;
  imageUrl: string;
}

export async function getArtists(): Promise<ArtistData[]> {
  try {
    const artists = await prisma.galleryLjArtist.findMany({
      where: {
        permanent: true,
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
          slug: artist.slug ?? generateSlug(
            `${artist.firstName || ""} ${artist.lastName || ""}`.trim() || artist.pseudo
          ),
          specialty: null,
          imageUrl: artist.imageUrl ?? "",
        })
      );
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
}
