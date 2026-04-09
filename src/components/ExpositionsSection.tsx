import RevealWrapper from "./RevealWrapper";

const expositions = [
  {
    title: "L'Éveil des Sens",
    location: "En ce moment — Paris",
    cta: "Explorer",
    image:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Formes & Silences",
    location: "À venir — Monaco",
    cta: "En savoir plus",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function ExpositionsSection() {
  return (
    <section id="expositions" className="py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4">
              Agenda Culturel
            </h2>
            <h2 className="text-4xl md:text-5xl font-serif">
              Nos Expositions
            </h2>
          </div>
          <a
            href="#"
            className="text-[11px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-all"
          >
            Voir tout l&apos;agenda
          </a>
        </div>

        {/* Expo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {expositions.map((expo, index) => (
            <RevealWrapper key={expo.title} delay={index * 200}>
              <div className="expo-card group cursor-pointer relative" style={{ aspectRatio: '16/10' }}>
                <img
                  src={expo.image}
                  alt={expo.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="expo-overlay absolute inset-0 flex flex-col justify-end p-10 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">
                    {expo.location}
                  </p>
                  <h3 className="text-3xl font-serif mb-4">{expo.title}</h3>
                  <p className="text-[11px] uppercase tracking-widest border border-white/30 self-start px-6 py-3 group-hover:bg-white group-hover:text-black transition-all">
                    {expo.cta}
                  </p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
