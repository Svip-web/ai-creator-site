'use client';

/* oxlint-disable next/no-img-element */

import { useEffect, useRef } from 'react';

type CareerShowcaseGalleryProps = {
  images: string[];
};

export default function CareerShowcaseGallery({ images }: CareerShowcaseGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let previousTime = performance.now();

    const tick = (currentTime: number) => {
      const gallery = galleryRef.current;
      const elapsed = Math.min(currentTime - previousTime, 50);
      previousTime = currentTime;

      if (gallery && mobile.matches && !reducedMotion.matches && !document.hidden && !gallery.classList.contains('is-dragging')) {
        const cycle = gallery.scrollWidth / 2;
        gallery.scrollLeft += elapsed * 0.088;
        if (cycle > 0 && gallery.scrollLeft >= cycle) gallery.scrollLeft -= cycle;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="career-showcase__gallery" ref={galleryRef} aria-label="Примеры AI-контента">
      <div className="career-showcase__track">
        {[0, 1].map((copy) => images.map((src, index) => (
          <img
            src={src}
            alt={copy === 0 ? `Пример AI-контента ${index + 1}` : ''}
            aria-hidden={copy === 1}
            loading="lazy"
            decoding="async"
            draggable="false"
            key={`${copy}-${src}`}
          />
        )))}
      </div>
    </div>
  );
}
