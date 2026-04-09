export default function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full bg-gray-100 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2572&auto=format&fit=crop"
        alt="Galerie d'Art"
        className="w-full h-full object-cover scale-105 transition-transform duration-[10s] hover:scale-100"
      />
      <div className="absolute inset-0 bg-black/15 flex flex-col items-center justify-center text-white">
        <h2 className="text-xs uppercase tracking-[0.6em] mb-4">
          Printemps 2026
        </h2>
        <h1 className="text-5xl md:text-8xl font-serif mb-10 text-center px-4 italic">
          La Matière Révélée
        </h1>
        <a
          href="#expositions"
          className="border border-white px-12 py-5 uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500"
        >
          Découvrir l&apos;exposition
        </a>
      </div>
    </section>
  );
}
