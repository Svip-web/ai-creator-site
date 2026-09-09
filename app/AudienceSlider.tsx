'use client';

import { useRef } from 'react';
import { useDragScroll } from './useDragSlider';

/* oxlint-disable next/no-img-element */

type AudienceSliderProps = {
  items: readonly (readonly [string, string, string])[];
};

function HighlightedCopy({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function AudienceSlider({ items }: AudienceSliderProps) {
  const track = useRef<HTMLDivElement>(null);
  useDragScroll(track);

  const move = (direction: -1 | 1) => {
    const slider = track.current;
    const card = slider?.querySelector<HTMLElement>('.audience-card');
    if (!slider || !card) return;
    const gap = Number.parseFloat(getComputedStyle(slider).gap) || 0;
    const step = card.offsetWidth + gap;
    const end = slider.scrollWidth - slider.clientWidth;
    if (direction === 1 && slider.scrollLeft >= end - step / 2) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && slider.scrollLeft <= step / 2) {
      slider.scrollTo({ left: end, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  };

  return <div className="audience-slider">
    <div className="audience-slider-track drag-scroll" ref={track}>
      {items.map(([title, text, emphasis], index) => <article className="audience-card" key={title}>
        <img src={`/assets/images/audience-sad-${String(index + 1).padStart(2, '0')}.webp`} alt="" loading="lazy" decoding="async" />
        <div><b>/{String(index + 1).padStart(2, '0')}</b><h3>{title}</h3><p><HighlightedCopy text={text} emphasis={emphasis} /></p></div>
      </article>)}
    </div>
    <div className="audience-controls" aria-label="Навигация по аудиториям">
      <button type="button" onClick={() => move(-1)} aria-label="Предыдущие карточки"><img src="/assets/images/arrow-left.svg?v=solid-blue" alt="" /></button>
      <button type="button" onClick={() => move(1)} aria-label="Следующие карточки"><img src="/assets/images/arrow-right.svg?v=solid-blue" alt="" /></button>
    </div>
  </div>;
}
