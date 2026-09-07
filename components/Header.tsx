'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/explorador/', label: 'Explorador' },
  { href: '/mapa/', label: 'Mapa' },
  { href: '/perfiles/', label: 'Perfiles' },
  { href: '/rankings/', label: 'Rankings' },
  { href: '/datos-metodologia/', label: 'Datos y Metodología' },
];

export function Logo({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Caja abierta a un solo trazo, sin rellenos */}
      <path d="M4 9 12 4.5 20 9v7l-8 4.5L4 16V9Z" />
      <path d="M4 9l8 4.5L20 9M12 13.5V20.5" />
      <path d="M12 4.5 10 1.5 3 4.5 4 9" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-oep-slate transition-all duration-nav ${
        scrolled ? 'border-b border-slate-200 bg-white/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-content items-center gap-6 px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-7 w-7" />
          <span className="flex items-center gap-3">
            <span className="font-display text-[17px] font-semibold tracking-tight">OEP</span>
            <span className="hidden h-5 w-px bg-slate-300 sm:block" aria-hidden="true" />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 sm:block">
              Observatorio Económico de Permisos
            </span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-[14px] font-medium text-slate-600 transition-colors duration-nav hover:bg-slate-100 hover:text-oep-slate"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <span className="hidden rounded border border-slate-300 px-2 py-1 font-mono text-[11px] text-slate-500 md:inline">
          2026-T2
        </span>
        <span className="rounded border border-slate-300 px-2 py-1 font-mono text-[11px] text-slate-500">ES-CL</span>
      </div>
    </header>
  );
}
