import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getEventBySlug } from "@/app/actions/events";
import Header from "@/components/Header";
import { EventHero } from "@/components/event/EventHero";
import { EventDescription } from "@/components/event/EventDescription";
import { EventArtistCard } from "@/components/event/EventArtistCard";
import { EventArtworkCard } from "@/components/event/EventArtworkCard";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: "Événement non trouvé | Gallery LJ" };
  }

  return {
    title: `${event.name} | Gallery LJ`,
    description: event.description ?? `Découvrez ${event.name} à la Gallery LJ.`,
    openGraph: {
      title: `${event.name} | Gallery LJ`,
      description: event.description ?? undefined,
      images: event.imageUrl ? [event.imageUrl] : [],
    },
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateRange(startDate: Date | null, endDate: Date | null): string | null {
  if (!startDate) return null;
  if (!endDate) return formatDate(startDate);
  return `${formatDate(startDate)} — ${formatDate(endDate)}`;
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const dateRange = formatDateRange(event.startDate, event.endDate);
  const hasArtists = event.artists.length > 0;
  const hasArtworks = event.artworks.length > 0;

  return (
    <main className="min-h-screen bg-white text-foreground">
      <Header />
      <EventHero
        name={event.name}
        imageUrl={event.imageUrl}
        eventType={event.eventType}
        dateRange={dateRange}
        location={event.location}
      />

      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {event.description && <EventDescription description={event.description} />}

        {!event.description && (dateRange || event.location) && (
          <section className="py-16 border-b border-gray-100">
            <div className="flex flex-wrap gap-12">
              {dateRange && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-2">Dates</p>
                  <p className="font-serif text-lg">{dateRange}</p>
                </div>
              )}
              {event.location && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-2">Lieu</p>
                  <p className="font-serif text-lg">{event.location}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {hasArtists && (
          <section className="py-20 border-b border-gray-100">
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-3">
                Artistes participants
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                {event.artists.length === 1 ? "L'artiste" : "Les artistes"}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {event.artists.map((artist) => (
                <EventArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </section>
        )}

        {hasArtworks && (
          <section className="py-20">
            <div className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-3">
                Œuvres exposées
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                {event.artworks.length === 1 ? "L'œuvre" : `${event.artworks.length} œuvres`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {event.artworks.map((artwork) => (
                <EventArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </section>
        )}

        <div className="py-16 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] hover:opacity-50 transition-opacity duration-300"
            aria-label="Retour à l'accueil"
          >
            <span className="block w-10 h-px bg-current" aria-hidden="true" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
