import { getArtists } from "@/app/actions/artists";
import Link from "next/link";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";
import ArtistesSectionAnimated from "./ArtistesSectionAnimated";

const defaultArtistes = [
  {
    name: "Jean-Christophe V.",
    specialty: "Peinture & Texture",
    cta: "Voir le Portfolio",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
    slug: "jean-christophe-v",
  },
  {
    name: "Sophie Miller",
    specialty: "Sculptures Aeriennes",
    cta: "Voir le Portfolio",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop",
    slug: "sophie-miller",
  },
  {
    name: "Marcus Thorne",
    specialty: "Art Digital & Conceptuel",
    cta: "Voir le Portfolio",
    image:
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=2000&auto=format&fit=crop",
    slug: "marcus-thorne",
  },
];

export default async function ArtistesSection() {
  const artists = await getArtists();
  const hasArtists = artists.length > 0;

  const displayItems = hasArtists
    ? artists.map((artist) => ({
        name: artist.name,
        slug: artist.slug,
        specialty: artist.specialty || "Artiste",
        cta: "Voir l'artiste",
        image: `${CLOUDFLARE_R2_PUBLIC_URL}${artist.imageUrl}`,
      }))
    : defaultArtistes;

  return (
    <section id="artistes" className="py-24 px-10 max-w-[1600px] mx-auto">
      <ArtistesSectionAnimated>
        <h2 className="artistes-title section-title font-serif">
          Artistes Résidents
        </h2>

        <div className="artistes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          {displayItems.map((artiste) => (
            <div key={artiste.name} className="artiste-card">
              <Link
                href={`/artistes/${artiste.slug}`}
                className="group cursor-pointer block"
              >
                <div
                  className="img-hover-zoom mb-8 shadow-sm"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={artiste.image}
                    alt={artiste.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white uppercase text-[10px] tracking-widest border border-white p-4 backdrop-blur-sm">
                      {artiste.cta}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif mb-1">{artiste.name}</h3>
                  <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em]">
                    {artiste.specialty}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ArtistesSectionAnimated>
    </section>
  );
}
