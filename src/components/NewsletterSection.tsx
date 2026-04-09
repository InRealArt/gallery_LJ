import RevealWrapper from "./RevealWrapper";

export default function NewsletterSection() {
  return (
    <section className="py-32 bg-[#111] text-white text-center px-10">
      <RevealWrapper>
        <h2 className="text-3xl font-serif mb-6 italic">
          Recevoir nos Invitations Privées
        </h2>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-12 italic">
          Accès exclusif aux vernissages mondiaux
        </p>
        <form className="max-w-xl mx-auto flex flex-col md:flex-row gap-6">
          <input
            type="email"
            placeholder="VOTRE E-MAIL"
            className="bg-transparent border-b border-gray-700 w-full py-4 text-[10px] outline-none focus:border-white transition-all uppercase tracking-[0.2em] font-light"
          />
          <button
            type="submit"
            className="bg-white text-black px-12 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
          >
            S&apos;inscrire
          </button>
        </form>
      </RevealWrapper>
    </section>
  );
}
