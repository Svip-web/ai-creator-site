'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePageSwipe } from './useDragSlider';

/* oxlint-disable next/no-img-element */

type AudienceSliderProps = {
  items: readonly (readonly [string, string, string])[];
};

function HighlightedCopy({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function AudienceSlider({ items }: AudienceSliderProps) {
  const [pageSize, setPageSize] = useState(2);
  const [page, setPage] = useState(0);
  const [trackHeight, setTrackHeight] = useState<number>();
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const indexedItems = useMemo(() => items.map((item, index) => ({ item, index })), [items]);
  const pages = useMemo(() => Array.from({ length: Math.ceil(indexedItems.length / pageSize) }, (_, index) => indexedItems.slice(index * pageSize, index * pageSize + pageSize)), [indexedItems, pageSize]);

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(window.innerWidth <= 700 ? 1 : 2);
      setPage(0);
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  useLayoutEffect(() => {
    const slide = slideRefs.current[page];
    if (!slide) return;

    const updateHeight = () => setTrackHeight(slide.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [page, pageSize]);

  const move = (direction: number) => setPage((current) => (current + direction + pages.length) % pages.length);
  const swipe = usePageSwipe((direction) => move(direction));

  return <div className="audience-slider">
    <div className={`audience-slider-track drag-pages${swipe.dragging ? ' is-dragging' : ''}`} {...swipe.handlers} style={{ transform: `translateX(calc(-${page * 100}% + ${swipe.offset}px))`, height: trackHeight }}>
      {pages.map((slide, slideIndex) => <div className="audience-slide" ref={(element) => { slideRefs.current[slideIndex] = element; }} aria-hidden={slideIndex !== page} key={slideIndex}>
        {slide.map(({ item: [title, text, emphasis], index }) => {
          return <article className="audience-card" key={title}>
            <img src={`/assets/images/audience-sad-${String(index + 1).padStart(2, '0')}.webp`} alt="" loading="lazy" decoding="async" />
            <div><b>/{String(index + 1).padStart(2, '0')}</b><h3>{title}</h3><p><HighlightedCopy text={text} emphasis={emphasis} /></p></div>
          </article>;
        })}
      </div>)}
    </div>
    <div className="audience-controls" aria-label="Навигация по аудиториям">
      <button type="button" onClick={() => move(-1)} aria-label="Предыдущие карточки"><img src="/assets/images/arrow-left.svg" alt="" /></button>
      <span>{String(page + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</span>
      <button type="button" onClick={() => move(1)} aria-label="Следующие карточки"><img src="/assets/images/arrow-right.svg" alt="" /></button>
    </div>
  </div>;
}
