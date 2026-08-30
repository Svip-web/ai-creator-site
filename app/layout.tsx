import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Creator — профессия будущего',
  description: 'Онлайн-курс по созданию контента с помощью нейросетей.',
  openGraph: {
    title: 'AI Creator — профессия будущего',
    description: 'Научись создавать контент с помощью нейросетей и зарабатывать на этом.',
    type: 'website',
    images: [{ url: '/ai-creator-og.png', width: 1200, height: 630, alt: 'AI Creator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Creator — профессия будущего',
    description: 'Онлайн-курс по созданию контента с помощью нейросетей.',
    images: ['/ai-creator-og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><head><link rel="preload" as="image" href="/assets/images/hero-composite.webp" type="image/webp" /></head><body>{children}</body></html>;
}
