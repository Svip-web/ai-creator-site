'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.barriers-stage');
    const track = stage?.querySelector<HTMLElement>('.barrier-grid');
    const panel = stage?.querySelector<HTMLElement>('.barriers');
    const viewport = track?.parentElement;
    if (!stage || !track || !panel || !viewport) return;

    let updateFrame = 0;
    let motionFrame = 0;
    let targetScrollLeft = track.scrollLeft;

    const animateTrack = () => {
      motionFrame = 0;
      if (track.classList.contains('is-dragging')) {
        targetScrollLeft = track.scrollLeft;
        return;
      }

      const distanceToTarget = targetScrollLeft - track.scrollLeft;
      if (Math.abs(distanceToTarget) < 0.35) {
        track.scrollLeft = targetScrollLeft;
        return;
      }

      track.scrollLeft += distanceToTarget * 0.24;
      motionFrame = window.requestAnimationFrame(animateTrack);
    };

    const requestMotion = () => {
      if (!motionFrame) motionFrame = window.requestAnimationFrame(animateTrack);
    };

    const update = (immediate = false) => {
      updateFrame = 0;
      if (window.innerWidth <= 900) {
        stage.style.setProperty('--barrier-progress', '0');
        stage.style.removeProperty('--barrier-distance');
        stage.style.removeProperty('--barrier-shift');
        stage.style.removeProperty('--barrier-panel-height');
        if (motionFrame) window.cancelAnimationFrame(motionFrame);
        motionFrame = 0;
        return;
      }

      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      stage.style.setProperty('--barrier-distance', `${travel}px`);
      stage.style.setProperty('--barrier-shift', `${-travel}px`);
      stage.style.setProperty('--barrier-panel-height', `${panel.offsetHeight}px`);
      const start = stage.offsetTop;
      const distance = Math.max(1, travel);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const card = track.querySelector<HTMLElement>('article');
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
      const cardStep = (card?.offsetWidth ?? track.clientWidth) + gap;
      const rawScrollLeft = progress * travel;
      const alignedScrollLeft = Math.round(rawScrollLeft / cardStep) * cardStep;
      stage.style.setProperty('--barrier-progress', progress.toFixed(4));
      targetScrollLeft = Math.min(travel, Math.max(0, alignedScrollLeft));

      if (immediate && !track.classList.contains('is-dragging')) {
        track.scrollLeft = targetScrollLeft;
      } else {
        requestMotion();
      }
    };

    const requestUpdate = () => {
      if (!updateFrame) updateFrame = window.requestAnimationFrame(() => update());
    };

    update(true);
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (updateFrame) window.cancelAnimationFrame(updateFrame);
      if (motionFrame) window.cancelAnimationFrame(motionFrame);
    };
  }, []);

  return null;
}
