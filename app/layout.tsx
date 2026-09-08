import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Creator — Женя Коваленко',
  description: 'Освойте профессию AI‑креатора и создавайте AI-контент для брендов.',
  icons: {
    icon: [{ url: '/favicon.png?v=4', type: 'image/png' }],
    shortcut: '/favicon.ico?v=4',
    apple: '/favicon.png?v=4',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
