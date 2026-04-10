"use server";

import { prisma } from "@/lib/prisma";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";

export interface ExhibitionData {
  id: number;
  title: string;
  location: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  imageUrl: string | null;
}

export async function getExhibitions(): Promise<ExhibitionData[]> {
  try {
    const exhibitions = await prisma.galleryLjExhibition.findMany({
      where: {
        visible: true,
      },
      orderBy: {
        startDate: "desc",
      },
      take: 10,
    });

    return exhibitions.map(
      (exhibition): ExhibitionData => ({
        id: exhibition.id,
        title: exhibition.name,
        location: exhibition.location || "Lieu à définir",
        description: exhibition.description,
        startDate: exhibition.startDate,
        endDate: exhibition.endDate,
        imageUrl: exhibition.imageUrl
          ? `${CLOUDFLARE_R2_PUBLIC_URL}${exhibition.imageUrl}`
          : null,
      })
    );
  } catch (error) {
    console.error("Error fetching exhibitions:", error);
    return [];
  }
}
