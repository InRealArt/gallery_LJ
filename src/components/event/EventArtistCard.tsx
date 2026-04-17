import Link from "next/link";
import type { EventDetailData } from "@/app/actions/events";

type Artist = EventDetailData["artists"][number];

export function EventArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artistes/${artist.slug}`}
      className="group block"
      aria-label={`Voir le portfolio de ${artist.name}`}
    >
      <article className="flex flex-col">
        <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "3/4" }}>
          {artist.imageUrl ? (
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-[10px] uppercase tracking-widest text-gray-300">Portrait</span>
            </div>
          )}
        </div>
        <div className="pt-4">
          <h3 className="font-serif text-lg leading-snug group-hover:opacity-60 transition-opacity duration-300">
            {artist.name}
          </h3>
          {artist.shortDescription && (
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gray-400 line-clamp-2">
              {artist.shortDescription}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
