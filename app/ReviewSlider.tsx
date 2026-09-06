'use client';

/* oxlint-disable next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import { useDragScroll } from './useDragSlider';

const reviews = Array.from(
  { length: 5 },
  (_, index) => `/assets/images/reviews/review-${String(index + 1).padStart(2, '0')}.webp`,
);

export default function ReviewSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  useDragScroll(trackRef);

  useEffect(() => {
    if (expandedReview === null) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedReview(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [expandedReview]);

  const getTrackMetrics = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.review-card');
    if (!track || !card) return null;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    const step = card.offsetWidth + gap;
    const maxIndex = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step));
    return { track, step, maxIndex };
  };

  const scrollToReview = (index: number) => {
    const metrics = getTrackMetrics();
    if (!metrics) return;

    const nextIndex = Math.min(metrics.maxIndex, Math.max(0, index));
    metrics.track.scrollTo({ left: nextIndex * metrics.step, behavior: 'smooth' });
  };

  const scroll = (direction: number) => {
    const metrics = getTrackMetrics();
    if (!metrics) return;

    const currentIndex = Math.min(metrics.maxIndex, Math.max(0, Math.round(metrics.track.scrollLeft / metrics.step)));
    const next = currentIndex + direction > metrics.maxIndex
      ? 0
      : currentIndex + direction < 0
        ? metrics.maxIndex
        : currentIndex + direction;
    scrollToReview(next);
  };

  return <div className="reviews-panel">
    <div className="reviews-head">
      <p>Честные отзывы девушек, которые <b>прошли обучение, освоили нейросети</b> и начали применять новые навыки в работе и собственных проектах.</p>
    </div>
    <div className="review-cards drag-scroll" ref={trackRef}>
      {reviews.map((src, index) => <figure className="review-card" key={src}>
        <figcaption className="review-card-bar"><span aria-hidden="true"><i /><i /><i /></span><b>Отзыв ученицы</b></figcaption>
        <button className="review-card-open" type="button" onClick={() => setExpandedReview(index)} aria-label={`Увеличить отзыв ученицы ${index + 1}`}>
          <img src={src} alt={`Отзыв ученицы ${index + 1}`} loading="lazy" decoding="async" />
        </button>
      </figure>)}
    </div>
    <div className="review-slider-controls" aria-label="Навигация по отзывам">
      <button className="review-arrow" type="button" onClick={() => scroll(-1)} aria-label="Предыдущий отзыв"><img src="/assets/images/arrow-left.svg" alt="" /></button>
      <button className="review-arrow" type="button" onClick={() => scroll(1)} aria-label="Следующий отзыв"><img src="/assets/images/arrow-right.svg" alt="" /></button>
    </div>
    {expandedReview !== null && <div className="review-lightbox" role="dialog" aria-modal="true" aria-label={`Увеличенный отзыв ученицы ${expandedReview + 1}`} onMouseDown={(event) => { if (event.currentTarget === event.target) setExpandedReview(null); }}>
      <div className="review-lightbox__content">
        <button type="button" autoFocus onClick={() => setExpandedReview(null)} aria-label="Закрыть увеличенный отзыв">×</button>
        <img src={reviews[expandedReview]} alt={`Увеличенный отзыв ученицы ${expandedReview + 1}`} decoding="async" />
      </div>
    </div>}
  </div>;
}
