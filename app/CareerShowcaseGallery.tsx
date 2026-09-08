'use client';

/* oxlint-disable next/no-img-element */

import { useRef } from 'react';
import { useDragScroll } from './useDragSlider';

type CareerShowcaseGalleryProps = {
  images: string[];
};

export default function CareerShowcaseGallery({ images }: CareerShowcaseGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  useDragScroll(galleryRef);

  return (
    <div className="career-showcase__gallery drag-scroll" ref={galleryRef} aria-label="Примеры AI-контента">
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
