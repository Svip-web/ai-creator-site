'use client';

/* oxlint-disable next/no-img-element */
import { useRef } from 'react';
import { useDragScroll } from './useDragSlider';

type Barrier = { icon: string; title: string; text: string; emphasis: string };

function HighlightedText({ text, emphasis }: Pick<Barrier, 'text' | 'emphasis'>) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function BarrierSlider({ items }: { items: Barrier[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  useDragScroll(trackRef);
  const scroll = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('article');
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const step = (card?.offsetWidth ?? track.clientWidth) + gap;
    const end = track.scrollWidth - track.clientWidth;
    if (direction === 1 && track.scrollLeft >= end - step / 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && track.scrollLeft <= step / 2) {
      track.scrollTo({ left: end, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  };

  return <>
    <div className="barrier-grid drag-scroll" ref={trackRef}>{items.map((item, index) => <article key={`${item.title}-${index}`}><span><img src={`/assets/images/${item.icon}`} alt="" /></span><h3>{item.title}</h3><p><HighlightedText text={item.text} emphasis={item.emphasis} /></p></article>)}</div>
    <div className="slider-arrows barrier-arrows">
      <button type="button" onClick={() => scroll(-1)} aria-label="Предыдущая карточка"><img src="/assets/images/arrow-left.svg" alt="" /></button>
      <button type="button" onClick={() => scroll(1)} aria-label="Следующая карточка"><img src="/assets/images/arrow-right.svg" alt="" /></button>
    </div>
  </>;
}
