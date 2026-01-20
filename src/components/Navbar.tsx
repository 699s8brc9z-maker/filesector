"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-3 sm:px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 text-xl sm:text-2xl font-bold tracking-tighter text-slate-900">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            <Image src="/filesector-logo.png" alt="FileSector Logo" fill className="object-contain" />
          </div>
          <span className="relative">
            File<span className="text-red-600">Sector</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-900 via-red-600 to-red-600"></span>
          </span>
        </Link>

        {/* Space for future ads */}
        <div className="flex items-center gap-3">
          {/* 광고 공간 */}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-red-600 text-sm sm:text-base h-10 sm:h-auto"
            onClick={() => {
              const helpSection = document.getElementById('help');
              if (helpSection) {
                helpSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            도움말
          </Button>
        </div>
      </div>
    </nav>
  );
}
