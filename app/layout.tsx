import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-robotomono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OEP · Observatorio Económico de Permisos',
  description:
    '30.119 proyectos y US$ 1,05 BN declarados ante el SEIA desde 1993, convertidos en inteligencia económica abierta.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${grotesk.variable} ${inter.variable} ${robotoMono.variable}`}>
      <body className="bg-white font-body text-oep-slate antialiased">{children}</body>
    </html>
  );
}
