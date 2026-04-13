"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArtistBio from "@/components/artist/ArtistBio";
import ArtistPageHeader from "@/components/artist/ArtistPageHeader";
import ArtistPortfolio from "@/components/artist/ArtistPortfolio";


interface Artwork {
  id: number;
  name: string;
  price: number | null;
  dimensions: string | null;
  creationYear: number | null;
  imageUrl: string;
}

interface ArtistData {
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
  artworks: Artwork[];
}

export default function ArtistPage({
  artist,
}: {
  params: Promise<{ slug: string }>;
  artist: ArtistData | null;
}) {

  if (!artist) {
    return (
      <>
        <Header />
        <main className="pt-28 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-serif mb-6">Artiste non trouvé</h1>
            <Link
              href="/"
              className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-all"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-28">
        {/* ── Artist Header ── */}
        <ArtistPageHeader
          name={artist.name}
          imageUrl={artist.imageUrl}
          bio={artist.bio}
        />

        {/* Thin separator */}
        <div className="w-full max-w-[1600px] mx-auto px-8 md:px-14">
          <hr className="border-t border-foreground/8" />
        </div>

        {/* ── Biography & CV Section ── */}
        <ArtistBio
          description={artist.description}
          formation={artist.formation}
          personalExhibitions={artist.personalExhibitions}
          collectiveExhibitions={artist.collectiveExhibitions}
          publicCollections={artist.publicCollections}
        />

        {/* ── Portfolio Section ── */}
        <ArtistPortfolio artistName={artist.name} artistSlug={artist.slug} artworks={artist.artworks} />

        {/* ── Back to Artists CTA ── */}
        <section className="py-20 bg-[#0e0e0e]">
          <div className="max-w-[1600px] mx-auto px-8 md:px-14 text-center">
            <Link
              href="/#artistes"
              className="inline-block text-[11px] uppercase tracking-widest border border-white/30 text-white/60 px-10 py-4 hover:border-white hover:text-white transition-all duration-300"
            >
              Découvrir tous les artistes
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
