import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Creator — Женя Коваленко',
  description: 'Освойте профессию AI‑креатора и создавайте AI-контент для брендов.',
  icons: {
    icon: [{ url: '/favicon.svg?v=2', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg?v=2',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
