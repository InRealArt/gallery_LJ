interface EventDescriptionProps {
  description: string;
}

export function EventDescription({ description }: EventDescriptionProps) {
  return (
    <section className="py-20 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400">
            À propos
          </p>
        </div>
        <div className="md:col-span-7">
          <div
            className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 [&_p]:mb-4 [&_strong]:font-semibold [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:mt-4 [&_h3]:mb-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
}
