'use client';

/* oxlint-disable next/no-img-element */
import { useRef } from 'react';

const reviews = Array.from(
  { length: 5 },
  (_, index) => `/assets/images/reviews/review-${String(index + 1).padStart(2, '0')}.png`,
);

export default function ReviewSlider() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.review-card');
    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    const step = card.offsetWidth + gap;
    const end = track.scrollWidth - track.clientWidth;

    if (direction > 0 && track.scrollLeft >= end - step / 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction < 0 && track.scrollLeft <= step / 2) {
      track.scrollTo({ left: end, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  };

  return <div className="reviews-panel">
    <div className="reviews-head">
      <p>Честные отзывы девушек, которые <b>прошли обучение, освоили нейросети</b> и начали применять новые навыки в работе и собственных проектах.</p>
      <div className="slider-arrows review-arrows">
        <button type="button" onClick={() => scroll(-1)} aria-label="Предыдущий отзыв"><img src="/assets/images/arrow-left.svg" alt="" /></button>
        <button type="button" onClick={() => scroll(1)} aria-label="Следующий отзыв"><img src="/assets/images/arrow-right.svg" alt="" /></button>
      </div>
    </div>
    <div className="review-cards" ref={trackRef}>
      {reviews.map((src, index) => <figure className="review-card" key={src}>
        <figcaption className="review-card-bar"><span aria-hidden="true"><i /><i /><i /></span><b>Отзыв ученицы</b></figcaption>
        <img src={src} alt={`Отзыв ученицы ${index + 1}`} />
      </figure>)}
    </div>
  </div>;
}
