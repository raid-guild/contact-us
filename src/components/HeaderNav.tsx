"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-moloch-500 border-b border-neutral-800">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-neutral-800 font-header text-3xl uppercase tracking-wide hover:text-neutral-700 transition-colors"
          >
            Raid Guild
          </Link>
        </div>

        {/* Desktop Right side buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/hire-us"
            className="bg-neutral-800 text-moloch-500 font-header text-lg uppercase tracking-wide px-6 py-2 border-2 border-neutral-800 rounded-lg hover:bg-moloch-500 transition-colors"
          >
            Hire Us
          </Link>
          <Link
            href="/join-us"
            className="bg-neutral-800 text-moloch-500 font-header text-lg uppercase tracking-wide px-6 py-2 border-2 border-neutral-800 rounded-lg hover:bg-moloch-500 transition-colors"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden w-full flex justify-center">
          <button
            onClick={toggleMobileMenu}
            className="text-neutral-800 font-header text-sm uppercase tracking-wide hover:text-neutral-600 transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-700 border-t border-neutral-600 z-50">
          {/* Navigation Links */}
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex flex-row gap-1 w-full justify-center items-center bg-neutral-800 text-moloch-500 font-header text-sm uppercase tracking-wide py-4 px-6 text-center border-b border-neutral-600 hover:bg-moloch-400 transition-colors"
            >
              Raid Guild <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Action Buttons */}
            <Link
              href="/hire-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-moloch-500 text-moloch-200 font-header text-sm uppercase tracking-wide py-4 px-6 text-center border-b border-neutral-600 hover:bg-moloch-400 transition-colors"
            >
              HIRE US
            </Link>
            <Link
              href="/join-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-moloch-500 text-moloch-200 font-header text-sm uppercase tracking-wide py-4 px-6 text-center border-b border-neutral-600 hover:bg-moloch-400 transition-colors"
            >
              JOIN US
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
