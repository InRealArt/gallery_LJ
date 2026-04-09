import RevealWrapper from "./RevealWrapper";

export default function HistoireSection() {
  return (
    <section
      id="histoire"
      className="py-32 px-10 max-w-4xl mx-auto text-center"
    >
      <RevealWrapper>
        <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-8">
          Notre Vision
        </h2>
        <p className="font-serif text-2xl md:text-3xl leading-relaxed italic">
          &quot;Depuis sa création, LJ Gallery s&apos;efforce de créer un pont
          entre l&apos;art classique et les expressions contemporaines les plus
          audacieuses. Nous croyons en un art qui interroge, émeut et
          dure.&quot;
        </p>
        <div className="w-20 h-[1px] bg-black mx-auto mt-12" />
      </RevealWrapper>
    </section>
  );
}
