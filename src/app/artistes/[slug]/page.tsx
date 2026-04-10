import { notFound } from "next/navigation";
import { getArtistBySlug } from "@/app/actions/artist";
import ArtistPageClient from "./ArtistPageClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    return {
      title: "Artiste non trouvé | Gallery LJ",
    };
  }

  return {
    title: `${artist.name} | Portfolio - Gallery LJ`,
    description: `Découvrez les œuvres de ${artist.name} exposées à la Gallery LJ.`,
    openGraph: {
      title: `${artist.name} | Gallery LJ`,
      description: `Découvrez les œuvres de ${artist.name} exposées à la Gallery LJ.`,
      images: artist.imageUrl ? [artist.imageUrl] : [],
    },
  };
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  return <ArtistPageClient params={params} artist={artist} />;
}
