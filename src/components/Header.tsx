"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-[1600px] mx-auto px-10 h-28 flex justify-between items-center">
        {/* Left Navigation */}
        <nav className="hidden lg:flex space-x-10">
          <a href="#expositions" className="nav-item">
            Expositions
          </a>
          <a href="#artistes" className="nav-item">
            Artistes
          </a>
          <a href="#histoire" className="nav-item">
            L&apos;Histoire
          </a>
        </nav>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center group">
          <span className="text-[32px] tracking-[-0.02em] font-bold font-serif group-hover:italic transition-all">
            LJ
          </span>
          <span className="text-[10px] tracking-[0.5em] uppercase -mt-2 text-center">
            Gallery
          </span>
        </Link>

        {/* Right Navigation */}
        <nav className="hidden lg:flex space-x-10 items-center">
          <a href="#catalogues" className="nav-item">
            Catalogues
          </a>
          <a href="#contact" className="nav-item">
            Contact
          </a>
          <div className="flex space-x-3 ml-4">
            <span className="text-xs font-bold cursor-pointer">FR</span>
            <span className="text-xs text-gray-300 cursor-pointer hover:text-black transition-colors">
              EN
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="1.5"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-8 px-10">
          <nav className="flex flex-col space-y-6">
            <a href="#expositions" className="nav-item" onClick={() => setMobileOpen(false)}>
              Expositions
            </a>
            <a href="#artistes" className="nav-item" onClick={() => setMobileOpen(false)}>
              Artistes
            </a>
            <a href="#histoire" className="nav-item" onClick={() => setMobileOpen(false)}>
              L&apos;Histoire
            </a>
            <a href="#catalogues" className="nav-item" onClick={() => setMobileOpen(false)}>
              Catalogues
            </a>
            <a href="#contact" className="nav-item" onClick={() => setMobileOpen(false)}>
              Contact
            </a>
            <div className="flex space-x-3 pt-2">
              <span className="text-xs font-bold cursor-pointer">FR</span>
              <span className="text-xs text-gray-300 cursor-pointer hover:text-black transition-colors">
                EN
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
