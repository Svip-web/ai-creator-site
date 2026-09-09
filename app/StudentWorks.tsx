'use client';

import { useEffect, useRef } from 'react';

/* oxlint-disable next/no-img-element */

const works = Array.from(
  { length: 14 },
  (_, index) => `/assets/images/student-work-${String(index + 1).padStart(2, '0')}.webp`,
);

export default function StudentWorks() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let previousTime = performance.now();

    const tick = (currentTime: number) => {
      const slider = sliderRef.current;
      const elapsed = Math.min(currentTime - previousTime, 50);
      previousTime = currentTime;

      if (slider && media.matches && !reducedMotion.matches && !document.hidden && !slider.classList.contains('is-dragging')) {
        const card = slider.querySelector<HTMLElement>('.student-work-card');
        const gap = Number.parseFloat(getComputedStyle(slider).gap) || 0;
        const cycle = card ? (card.offsetWidth + gap) * works.length : 0;

        slider.scrollLeft += elapsed * 0.1;
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

      <div className="student-works-marquee" aria-label="Работы учениц">
        <div className="student-works-track">
          <div className="student-works-group">{cards}</div>
          <div className="student-works-group" aria-hidden="true">{works.map((src) => <figure className="student-work-card" key={`${src}-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}</div>
        </div>
      </div>

      <div className="student-works-slider" ref={sliderRef} aria-label="Слайдер работ учениц">
        {cards}
        {works.map((src) => <figure className="student-work-card" aria-hidden="true" key={`${src}-mobile-copy`}><img src={src} alt="" loading="lazy" decoding="async" /></figure>)}
      </div>
    </div>
  );
}
