import Link from "next/link";
import { EventTypeBadge } from "./EventTypeBadge";

interface EventHeroProps {
  name: string;
  imageUrl: string | null;
  eventType: "event" | "exhibition";
  dateRange: string | null;
  location: string | null;
}

export function EventHero({ name, imageUrl, eventType, dateRange, location }: EventHeroProps) {
  return (
    <section className="relative w-full px-8 md:px-16 pt-8" style={{ height: "55vh", minHeight: "380px", maxHeight: "560px" }}>
      <div className="relative w-full h-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
          }}
        />

        {/* Back link */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 text-[11px] uppercase tracking-[0.35em]"
            aria-label="Retour à l'accueil"
          >
            <span className="block w-8 h-px bg-current" aria-hidden="true" />
            Retour
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 z-10">
          <EventTypeBadge type={eventType} />
          <h1 className="mt-3 font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-3xl">
            {name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            {dateRange && (
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                {dateRange}
              </p>
            )}
            {location && (
              <>
                <span className="text-white/30" aria-hidden="true">·</span>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                  {location}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
