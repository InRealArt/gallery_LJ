import type { EventDetailData } from "@/app/actions/events";

type Artwork = EventDetailData["artworks"][number];

export function EventArtworkCard({ artwork }: { artwork: Artwork }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: "4/5" }}>
        <img
          src={artwork.imageUrl}
          alt={artwork.name}
          className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-4 flex flex-col gap-1">
        <h3 className="font-serif text-base leading-snug">{artwork.name}</h3>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
          {artwork.artist.name}
        </p>
        <div className="mt-1 flex items-center gap-3 flex-wrap">
          {artwork.creationYear && (
            <span className="text-[11px] text-gray-400">{artwork.creationYear}</span>
          )}
          {artwork.dimensions && (
            <span className="text-[11px] text-gray-400">{artwork.dimensions}</span>
          )}
        </div>
        {artwork.price !== null && (
          <p className="mt-2 text-sm tracking-wide">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(artwork.price)}
          </p>
        )}
      </div>
    </article>
  );
}
