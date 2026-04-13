import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtworkDetail from "./ArtworkDetail";
import { getArtworkByArtistSlugAndId } from "@/app/actions/artwork";

interface PageParams {
  slug: string;
  slugArtwork: string;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug, slugArtwork } = await params;
  const artworkId = parseInt(slugArtwork, 10);

  if (isNaN(artworkId)) {
    return { title: "Œuvre non trouvée | Gallery LJ" };
  }

  const artwork = await getArtworkByArtistSlugAndId(slug, artworkId);

  if (!artwork) {
    return { title: "Œuvre non trouvée | Gallery LJ" };
  }

  return {
    title: `${artwork.name} — ${artwork.artist.name} | Gallery LJ`,
    description: artwork.description
      ? artwork.description.replace(/<[^>]*>/g, "").slice(0, 160)
      : `Découvrez « ${artwork.name} » de ${artwork.artist.name} à la Gallery LJ.`,
    openGraph: {
      title: `${artwork.name} — ${artwork.artist.name} | Gallery LJ`,
      description: artwork.description
        ? artwork.description.replace(/<[^>]*>/g, "").slice(0, 160)
        : `Découvrez « ${artwork.name} » de ${artwork.artist.name} à la Gallery LJ.`,
      images: [artwork.imageUrl],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug, slugArtwork } = await params;
  const artworkId = parseInt(slugArtwork, 10);

  if (isNaN(artworkId)) {
    notFound();
  }

  const artwork = await getArtworkByArtistSlugAndId(slug, artworkId);

  if (!artwork) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ArtworkDetail artwork={artwork} />
      </main>
      <Footer />
    </>
  );
}
