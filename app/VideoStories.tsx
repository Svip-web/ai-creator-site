'use client';

import { useRef, useState } from 'react';
import { useDragScroll } from './useDragSlider';

/* oxlint-disable jsx-a11y/media-has-caption, next/no-img-element */

const videos = ['QNkdHQvzwi8', '8Pl7gMs3Io8', '-lwIwkqzOPQ', 'mH9OYCNrzuo'];

export default function VideoStories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const [playing, setPlaying] = useState<number | null>(null);
  useDragScroll(trackRef);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('article');
    if (!track || !card) return;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const step = card.offsetWidth + gap;
    const end = track.scrollWidth - track.clientWidth;
    if (direction === 1 && track.scrollLeft >= end - step / 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && track.scrollLeft <= step / 2) {
      track.scrollTo({ left: end, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  };

  return (
    <div className="story-slider">
      <div className="story-videos drag-scroll" ref={trackRef}>
        {videos.map((name, index) => (
          <article key={name}>
            <video ref={(element) => { videoRefs.current[index] = element; }} controls playsInline preload="none" poster={`/assets/videos/posters/${name}.webp`} aria-label={`Видеоистория ученицы ${index + 1}`} onPlay={() => { videoRefs.current.forEach((video, videoIndex) => { if (videoIndex !== index) video?.pause(); }); setPlaying(index); }} onPause={() => setPlaying((current) => current === index ? null : current)} onEnded={() => setPlaying(null)}>
              <source src={`/assets/videos/${name}.webm`} type="video/webm" />
              <source src={`/assets/videos/${name}.mp4`} type="video/mp4" />
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
            {playing !== index && <button className="story-play" type="button" onClick={() => videoRefs.current[index]?.play()} aria-label={`Воспроизвести видеоисторию ${index + 1}`}><img src="/assets/images/play.svg" alt="" /></button>}
          </article>
        ))}
      </div>
      <div className="slider-arrows">
        <button type="button" onClick={() => move(-1)} aria-label="Предыдущее видео"><img src="/assets/images/arrow-left.svg" alt="" /></button>
        <button type="button" onClick={() => move(1)} aria-label="Следующее видео"><img src="/assets/images/arrow-right.svg" alt="" /></button>
      </div>
    </div>
  );
}
