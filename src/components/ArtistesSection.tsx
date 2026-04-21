import { getArtists } from "@/app/actions/artists";
import { CLOUDFLARE_R2_PUBLIC_URL } from "@/constants/cloudflare";
import ArtistesSectionAnimated from "./ArtistesSectionAnimated";
import ArtistesGrid from "./ArtistesGrid";
import type { ArtistItem } from "./ArtistesGrid";

const defaultArtistes: ArtistItem[] = [
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

const fakeArtistes: ArtistItem[] = [
  {
    name: "Elena Vasquez",
    specialty: "Aquarelle & Lumière",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2000&auto=format&fit=crop",
    slug: "elena-vasquez",
  },
  {
    name: "Thomas Renard",
    specialty: "Gravure Contemporaine",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop",
    slug: "thomas-renard",
  },
  {
    name: "Amara Diallo",
    specialty: "Photographie Artistique",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=2000&auto=format&fit=crop",
    slug: "amara-diallo",
  },
  {
    name: "Léa Fontaine",
    specialty: "Céramique & Forme",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop",
    slug: "lea-fontaine",
  },
  {
    name: "Hugo Mercier",
    specialty: "Peinture Abstraite",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop",
    slug: "hugo-mercier",
  },
  {
    name: "Yuki Tanaka",
    specialty: "Encre & Calligraphie",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2000&auto=format&fit=crop",
    slug: "yuki-tanaka",
  },
  {
    name: "Camille Durand",
    specialty: "Pastel & Matière",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2000&auto=format&fit=crop",
    slug: "camille-durand",
  },
  {
    name: "Rafael Ortega",
    specialty: "Fresque & Murale",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=2000&auto=format&fit=crop",
    slug: "rafael-ortega",
  },
  {
    name: "Nadia Kowalski",
    specialty: "Collage & Assemblage",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2000&auto=format&fit=crop",
    slug: "nadia-kowalski",
  },
  {
    name: "Pierre-Antoine Morel",
    specialty: "Huile sur Toile",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
    slug: "pierre-antoine-morel",
  },
  {
    name: "Isadora Ferreira",
    specialty: "Art Textile",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    slug: "isadora-ferreira",
  },
  {
    name: "Maxime Leclerc",
    specialty: "Dessin & Illustration",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2000&auto=format&fit=crop",
    slug: "maxime-leclerc",
  },
  {
    name: "Sonia Mbaye",
    specialty: "Sculpture Bronze",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=2000&auto=format&fit=crop",
    slug: "sonia-mbaye",
  },
  {
    name: "Julien Carpentier",
    specialty: "Photogravure",
    cta: "Voir le Portfolio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop",
    slug: "julien-carpentier",
  },
];

export default async function ArtistesSection() {
  const artists = await getArtists();
  const hasArtists = artists.length > 0;
  const useFakeArtists = process.env.FAKE_ARTISTS === "true";

  const realItems: ArtistItem[] = hasArtists
    ? artists.map((artist) => ({
        name: artist.name,
        slug: artist.slug,
        specialty: artist.specialty || "Artiste",
        cta: "Voir l'artiste",
        image: `${CLOUDFLARE_R2_PUBLIC_URL}${artist.imageUrl}`,
      }))
    : defaultArtistes;

  const displayItems = useFakeArtists
    ? [...realItems, ...fakeArtistes]
    : realItems;

  return (
    <section id="artistes" className="py-24 px-10 max-w-[1600px] mx-auto">
      <ArtistesSectionAnimated>
        <h2 className="artistes-title section-title font-serif">
          Artistes Résidents
        </h2>
        <ArtistesGrid items={displayItems} />
      </ArtistesSectionAnimated>
    </section>
  );
}
