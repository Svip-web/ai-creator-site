'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>('.barriers-stage');
    const track = stage?.querySelector<HTMLElement>('.barrier-grid');
    const panel = stage?.querySelector<HTMLElement>('.barriers');
    const viewport = track?.parentElement;
    if (!stage || !track || !panel || !viewport) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth <= 900) {
        stage.style.setProperty('--barrier-progress', '0');
        stage.style.removeProperty('--barrier-distance');
        stage.style.removeProperty('--barrier-shift');
        stage.style.removeProperty('--barrier-panel-height');
        return;
      }

      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      stage.style.setProperty('--barrier-distance', `${travel}px`);
      stage.style.setProperty('--barrier-shift', `${-travel}px`);
      stage.style.setProperty('--barrier-panel-height', `${panel.offsetHeight}px`);
      const start = stage.offsetTop;
      const distance = Math.max(1, travel);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      stage.style.setProperty('--barrier-progress', progress.toFixed(4));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
