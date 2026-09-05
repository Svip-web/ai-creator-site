import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Creator — Женя Коваленко',
  description: 'Освойте профессию AI‑креатора и создавайте AI-контент для брендов.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
