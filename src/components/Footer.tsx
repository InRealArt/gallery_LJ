import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white py-24 px-10 border-t border-gray-100"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="flex flex-col">
            <span className="text-[32px] tracking-[-0.02em] font-bold font-serif mb-1">
              LJ
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase mb-10">
              Gallery
            </span>
            <p className="text-[11px] text-gray-400 leading-loose uppercase tracking-widest">
              L&apos;élégance du trait,
              <br />
              La force de l&apos;idée.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8">
              Navigation
            </h4>
            <ul className="space-y-4 text-[11px] text-gray-500 uppercase tracking-widest font-light">
              <li>
                <a
                  href="#expositions"
                  className="hover:text-black transition-colors"
                >
                  Expositions
                </a>
              </li>
              <li>
                <a
                  href="#artistes"
                  className="hover:text-black transition-colors"
                >
                  Artistes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Catalogues
                </a>
              </li>
              <li>
                <a
                  href="#histoire"
                  className="hover:text-black transition-colors"
                >
                  L&apos;Histoire
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8">
              Relations
            </h4>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-4 font-light italic">
              contact@ljgallery.com
            </p>
            <p className="text-[11px] text-gray-500 uppercase tracking-widest font-light">
              +33 (0)1 42 66 12 34
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-8">
              Réseaux
            </h4>
            <div className="flex flex-col space-y-4 text-[11px] text-gray-500 uppercase tracking-widest font-light">
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-black transition-colors underline-offset-4 hover:underline"
              >
                Artsper
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em]">
            © 2026 LJ Gallery International. Tous droits réservés.
          </p>
          <div className="flex space-x-8 text-[9px] text-gray-400 uppercase tracking-[0.3em]">
            <a href="#" className="hover:text-black transition-colors">
              Mentions Légales
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
