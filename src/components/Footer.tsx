import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white py-16 md:py-24 px-8 md:px-10 border-t border-gray-100"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24 text-center sm:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start sm:col-span-2 md:col-span-1">
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
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.instagram.com/lucilejulien.artist/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 text-[11px] text-gray-500 uppercase tracking-widest font-light hover:text-black transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100062960481936&locale=fr_FR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 text-[11px] text-gray-500 uppercase tracking-widest font-light hover:text-black transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/lucile-julien-9352b0194/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 text-[11px] text-gray-500 uppercase tracking-widest font-light hover:text-black transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
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
