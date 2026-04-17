"use server";

import { prisma } from "@/lib/prisma";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

export interface EventArtworkData {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  dimensions: string | null;
  creationYear: number | null;
  imageUrl: string;
  artist: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface EventArtistData {
  id: number;
  name: string;
  slug: string;
  imageUrl: string | null;
  shortDescription: string | null;
}

export interface EventDetailData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  location: string | null;
  imageUrl: string | null;
  featured: boolean;
  eventType: "event" | "exhibition";
  artworks: EventArtworkData[];
  artists: EventArtistData[];
}

export async function getEventBySlug(slug: string): Promise<EventDetailData | null> {
  try {
    const event = await prisma.galleryLjEvent.findUnique({
      where: { slug, visible: true },
      include: {
        artworks: {
          include: {
            artwork: {
              include: {
                artist: true,
              },
            },
          },
          orderBy: {
            id: "asc",
          },
        },
        artists: {
          include: {
            artist: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    if (!event) return null;

    return {
      id: event.id,
      name: event.name,
      slug: event.slug,
      description: event.description ?? null,
      startDate: event.startDate ?? null,
      endDate: event.endDate ?? null,
      location: event.location ?? null,
      imageUrl: event.imageUrl
        ? `${CLOUDFLARE_R2_PUBLIC_URL}${event.imageUrl}`
        : null,
      featured: event.featured,
      eventType: event.eventType as "event" | "exhibition",
      artworks: event.artworks
        .filter((ea) => ea.artwork.visible)
        .map((ea) => {
          const artistName =
            `${ea.artwork.artist.firstName ?? ""} ${ea.artwork.artist.lastName ?? ""}`.trim() ||
            ea.artwork.artist.pseudo;
          return {
            id: ea.artwork.id,
            name: ea.artwork.name,
            description: ea.artwork.description ?? null,
            price: ea.artwork.price ? Number(ea.artwork.price) : null,
            dimensions: ea.artwork.dimensions ?? null,
            creationYear: ea.artwork.creationYear ?? null,
            imageUrl: `${CLOUDFLARE_R2_PUBLIC_URL}${ea.artwork.imageUrl}`,
            artist: {
              id: ea.artwork.artist.id,
              name: artistName,
              slug: ea.artwork.artist.slug,
            },
          };
        }),
      artists: event.artists.map((ea) => {
        const artistName =
          `${ea.artist.firstName ?? ""} ${ea.artist.lastName ?? ""}`.trim() ||
          ea.artist.pseudo;
        return {
          id: ea.artist.id,
          name: artistName,
          slug: ea.artist.slug,
          imageUrl: ea.artist.imageUrl
            ? `${CLOUDFLARE_R2_PUBLIC_URL}${ea.artist.imageUrl}`
            : null,
          shortDescription: ea.artist.shortDescription ?? null,
        };
      }),
    };
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
}
