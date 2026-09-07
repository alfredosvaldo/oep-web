'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CountUp from '@/components/CountUp';
import HeroSearch from '@/components/HeroSearch';
import type { Kpis } from '@/lib/kpis';
import { fmtInt, fmtMM, fmtBN, fmtDeltaPct } from '@/lib/format';

const RISE = 'oep-rise';

// El mapa vivo pesa (~180 kB echarts + dataset): se monta solo en cliente.
const HeroMap = dynamic(() => import('@/components/HeroMap'), { ssr: false });

/**
 * Hero full-screen editorial (estilo informe de instituto): el mapa vivo del SEIA
 * se construye año a año en bucle sobre fondo papel. Titular con acento de subrayado
 * cobre, buscador de expedientes y franja de KPIs en filetes, sin tarjetas ni vidrio.
 */
export default function Hero({ k }: { k: Kpis | null }) {
  const q = k?.ultimo_trimestre;
  const dProy = q ? (q.proyectos - q.proyectos_previo) / q.proyectos_previo : undefined;
  const dMmu = q ? (q.inversion_mmu - q.inversion_mmu_previo) / q.inversion_mmu_previo : undefined;

  const stats = [
    { label: 'Proyectos presentados', value: k?.totales.proyectos ?? 30119, format: fmtInt, note: 'expedientes SEIA · 1993–2026-T2' },
    { label: 'Inversión declarada', value: k?.totales.inversion_mmu ?? 1046130, format: (n: number) => `US$ ${fmtBN(n)}`, note: 'billones (10¹²) en dólares declarados' },
    { label: 'Con RCA favorable', value: k?.aprobados.proyectos ?? 18625, format: fmtInt, note: `tasa de aprobación ${k ? (k.aprobados.tasa_aprobacion * 100).toFixed(1).replace('.', ',') : '93,6'} %` },
    {
      label: 'En calificación hoy',
      value: k?.evaluacion.inversion_mmu ?? 88383,
      format: (n: number) => `US$ ${fmtMM(n)}`,
      note: `${k ? fmtInt(k.evaluacion.proyectos) : '365'} proyectos en evaluación`,
    },
  ];

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-slate-200 bg-slate-50 text-oep-slate">
      {/* Mapa vivo e interactivo sobre papel */}
      <HeroMap />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pb-32 pt-32 lg:px-10">
        <p className={`oep-label text-slate-500 ${RISE}`} style={{ animationDelay: '80ms' }}>
          Observatorio Económico de Permisos · {k ? `${k.totales.anio_ini}–${k.periodo}` : '1993–2026-T2'}
        </p>
        <h1
          className={`oep-headline mt-6 max-w-4xl text-[clamp(42px,7vw,96px)] leading-[1.0] tracking-tight ${RISE}`}
          style={{ animationDelay: '180ms' }}
        >
          Tres décadas de inversión,{' '}
          <span className="underline decoration-oep-copper-dark decoration-[0.08em] underline-offset-[0.14em]">
            permiso a permiso.
          </span>
        </h1>
        <p
          className={`mt-6 max-w-xl text-[17px] leading-7 text-slate-600 lg:text-[19px] lg:leading-8 ${RISE}`}
          style={{ animationDelay: '300ms' }}
        >
          Cada punto del mapa es un expediente real presentado ante el SEIA. Los convertimos en
          inteligencia económica abierta: regiones, sectores, titulares y tiempos de aprobación.
        </p>

        <div className={`${RISE} pointer-events-auto`} style={{ animationDelay: '420ms' }}>
          <HeroSearch />
        </div>

        <div className={`mt-8 flex flex-wrap items-center gap-4 ${RISE} pointer-events-auto`} style={{ animationDelay: '520ms' }}>
          <a
            href="#mapa"
            className="rounded-md bg-oep-slate px-5 py-3 text-[15px] font-semibold text-white transition-colors duration-nav hover:bg-slate-700"
          >
            Explorar el mapa
          </a>
          <a
            href="#pulso"
            className="rounded-md border border-slate-300 px-5 py-3 text-[15px] font-semibold text-oep-slate transition-colors duration-nav hover:border-slate-500 hover:bg-slate-100"
          >
            El pulso del trimestre
          </a>
        </div>

        {/* Franja de KPIs en filetes, estilo tabla de informe */}
        <dl
          className={`mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200 pt-6 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-slate-200 ${RISE} pointer-events-auto`}
          style={{ animationDelay: '640ms' }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className={`${i > 0 ? 'lg:px-6' : ''} ${i === 3 ? 'lg:pr-0' : ''}`}>
              <dt className="oep-label text-slate-500">{s.label}</dt>
              <dd className="mt-1.5 font-display text-[26px] font-semibold leading-8 tracking-tight tabular text-oep-slate lg:text-[30px]">
                <CountUp value={s.value} format={s.format} />
              </dd>
              <dd className="mt-0.5 text-[12px] leading-4 text-slate-500">{s.note}</dd>
            </div>
          ))}
        </dl>
        {q && (dProy !== undefined || dMmu !== undefined) && (
          <p className={`mt-4 font-mono text-[12px] text-slate-500 ${RISE}`} style={{ animationDelay: '760ms' }}>
            {q.periodo}: {fmtInt(q.proyectos)} proyectos ({dProy !== undefined ? fmtDeltaPct(dProy) : '—'} proyectos ·{' '}
            {dMmu !== undefined ? fmtDeltaPct(dMmu) : '—'} inversión vs. período previo)
          </p>
        )}
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">desliza</span>
        <span className="oep-scroll-line block h-8 w-px bg-gradient-to-b from-slate-400 to-transparent" />
      </div>
    </section>
  );
}
