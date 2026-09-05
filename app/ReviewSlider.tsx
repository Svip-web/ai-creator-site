'use client';

/* oxlint-disable next/no-img-element */
import { useRef, useState } from 'react';

const reviews = Array.from(
  { length: 5 },
  (_, index) => `/assets/images/reviews/review-${String(index + 1).padStart(2, '0')}.png`,
);

export default function ReviewSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeReview, setActiveReview] = useState(0);

  const scrollToReview = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.review-card');
    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    const centeredLeft = index * (card.offsetWidth + gap) - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: centeredLeft, behavior: 'smooth' });
    setActiveReview(index);
  };

  const scroll = (direction: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.review-card');
    if (!track || !card) return;

    const next = (activeReview + direction + reviews.length) % reviews.length;

    scrollToReview(next);
  };

  const syncActiveReview = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.review-card');
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    const centeredPosition = track.scrollLeft + track.clientWidth / 2 - card.offsetWidth / 2;
    setActiveReview(Math.min(reviews.length - 1, Math.max(0, Math.round(centeredPosition / (card.offsetWidth + gap)))));
  };

  return <div className="reviews-panel">
    <div className="reviews-head">
      <p>Честные отзывы девушек, которые <b>прошли обучение, освоили нейросети</b> и начали применять новые навыки в работе и собственных проектах.</p>
    </div>
    <div className="review-cards" ref={trackRef} onScroll={syncActiveReview}>
      {reviews.map((src, index) => <figure className="review-card" key={src}>
        <figcaption className="review-card-bar"><span aria-hidden="true"><i /><i /><i /></span><b>Отзыв ученицы</b></figcaption>
        <img src={src} alt={`Отзыв ученицы ${index + 1}`} />
      </figure>)}
    </div>
    <div className="review-slider-controls" aria-label="Навигация по отзывам">
      <button className="review-arrow" type="button" onClick={() => scroll(-1)} aria-label="Предыдущий отзыв"><img src="/assets/images/arrow-left.svg" alt="" /></button>
      <button className="review-arrow" type="button" onClick={() => scroll(1)} aria-label="Следующий отзыв"><img src="/assets/images/arrow-right.svg" alt="" /></button>
    </div>
  </div>;
}
