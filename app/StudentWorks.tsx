'use client';

import { useEffect, useRef } from 'react';
import { useDragScroll } from './useDragSlider';

/* oxlint-disable next/no-img-element */

const works = [
  ...Array.from(
    { length: 11 },
    (_, index) => `/assets/images/hero-${String(index + 1).padStart(2, '0')}.webp`,
  ),
  '/assets/images/career-showcase/showcase-skincare.webp',
  '/assets/images/career-showcase/showcase-jewelry.webp',
  '/assets/images/career-showcase/showcase-coffee.webp',
];

export default function StudentWorks() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  const pauseTicker = () => { pauseUntilRef.current = Date.now() + 3000; };
  useDragScroll(marqueeRef);
  useDragScroll(sliderRef, pauseTicker, pauseTicker);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let previousTime = performance.now();

    const tick = (currentTime: number) => {
      const slider = sliderRef.current;
      const elapsed = Math.min(currentTime - previousTime, 50);
      previousTime = currentTime;

      if (slider && media.matches && !reducedMotion.matches && !document.hidden && Date.now() >= pauseUntilRef.current) {
        const card = slider.querySelector<HTMLElement>('.student-work-card');
        const gap = Number.parseFloat(getComputedStyle(slider).gap) || 0;
        const cycle = card ? (card.offsetWidth + gap) * works.length : 0;

        slider.scrollLeft += elapsed * 0.098;
        if (cycle > 0 && slider.scrollLeft >= cycle) slider.scrollLeft -= cycle;
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const cards = works.map((src, index) => (
    <figure className="student-work-card" key={src}>
      <img src={src} alt={`Работа ученицы ${index + 1}`} loading="lazy" decoding="async" />
    </figure>
  ));

  return (
    <div className="student-works">
      <div className="student-works-head">
        <h3>Работы наших учениц</h3>
      </div>

      <div className="student-works-marquee drag-scroll" ref={marqueeRef} aria-label="Работы учениц">
        <div className="student-works-track">
          <div className="student-works-group">{cards}</div>
          <div className="student-works-group" aria-hidden="true">{works.map((src) => <figure className="student-work-card" key={`${src}-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}</div>
        </div>
      </div>

      <div className="student-works-slider drag-scroll" ref={sliderRef} aria-label="Слайдер работ учениц">
        {cards}
        {works.map((src) => <figure className="student-work-card" aria-hidden="true" key={`${src}-mobile-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}
      </div>
    </div>
  );
}
