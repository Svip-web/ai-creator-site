'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useDragScroll } from './useDragSlider';

/* oxlint-disable next/no-img-element */

const works = Array.from(
  { length: 11 },
  (_, index) => `/assets/images/hero-${String(index + 1).padStart(2, '0')}.png`,
);

export default function StudentWorks() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  useDragScroll(sliderRef, () => { pauseUntilRef.current = Date.now() + 7000; });

  const move = useCallback((direction: -1 | 1, manual = false) => {
    const slider = sliderRef.current;
    const card = slider?.querySelector<HTMLElement>('.student-work-card');
    if (!slider || !card) return;

    if (manual) pauseUntilRef.current = Date.now() + 7000;

    const gap = Number.parseFloat(getComputedStyle(slider).gap) || 0;
    const step = card.offsetWidth + gap;
    const cycle = step * works.length;

    if (direction === 1 && slider.scrollLeft >= cycle - step / 2) {
      slider.scrollLeft -= cycle;
      requestAnimationFrame(() => slider.scrollBy({ left: step, behavior: 'smooth' }));
    } else if (direction === -1 && slider.scrollLeft <= step / 2) {
      slider.scrollLeft += cycle;
      requestAnimationFrame(() => slider.scrollBy({ left: -step, behavior: 'smooth' }));
    } else {
      slider.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!media.matches || reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      if (Date.now() >= pauseUntilRef.current) move(1);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [move]);

  const cards = works.map((src, index) => (
    <figure className="student-work-card" key={src}>
      <img src={src} alt={`Работа ученицы ${index + 1}`} loading="lazy" decoding="async" />
    </figure>
  ));

  return (
    <div className="student-works">
      <div className="student-works-head">
        <h3>Работы наших учениц</h3>
        <div className="slider-arrows student-works-controls">
          <button type="button" onClick={() => move(-1, true)} aria-label="Предыдущая работа"><img src="/assets/images/arrow-left.svg" alt="" /></button>
          <button type="button" onClick={() => move(1, true)} aria-label="Следующая работа"><img src="/assets/images/arrow-right.svg" alt="" /></button>
        </div>
      </div>

      <div className="student-works-marquee" aria-label="Работы учениц">
        <div className="student-works-track">
          <div className="student-works-group">{cards}</div>
          <div className="student-works-group" aria-hidden="true">{works.map((src) => <figure className="student-work-card" key={`${src}-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}</div>
        </div>
      </div>

      <div className="student-works-slider drag-scroll" ref={sliderRef} aria-label="Слайдер работ учениц">
        {cards}
        {works.map((src, index) => <figure className="student-work-card" aria-hidden="true" key={`${src}-mobile-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}
      </div>
    </div>
  );
}
