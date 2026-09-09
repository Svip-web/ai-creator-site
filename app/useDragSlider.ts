'use client';

import { PointerEvent as ReactPointerEvent, RefObject, useEffect, useRef, useState } from 'react';

type DragScrollOptions = {
  touchMultiplier?: number;
  activationDistance?: number;
  momentum?: boolean;
  momentumFriction?: number;
  loop?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (scrollLeft: number) => void;
};

export function useDragScroll<T extends HTMLElement>(ref: RefObject<T | null>, options: DragScrollOptions = {}) {
  const {
    touchMultiplier = 2.6,
    activationDistance = 3,
    momentum = false,
    momentumFriction = 0.9,
    loop = false,
    onDragStart,
    onDragEnd,
  } = options;
  const startCallbackRef = useRef(onDragStart);
  const endCallbackRef = useRef(onDragEnd);

  useEffect(() => {
    startCallbackRef.current = onDragStart;
    endCallbackRef.current = onDragEnd;
  }, [onDragStart, onDragEnd]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let pointerType = '';
    let momentumFrame = 0;
    let dragMultiplier = 1;
    let dragging = false;
    let suppressClick = false;

    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      cancelAnimationFrame(momentumFrame);
      pointerId = event.pointerId;
      pointerType = event.pointerType;
      startX = event.clientX;
      startY = event.clientY;
      lastX = event.clientX;
      lastTime = performance.now();
      velocity = 0;
      dragMultiplier = event.pointerType === 'touch' ? touchMultiplier : event.pointerType === 'pen' ? 1.35 : 1;
      dragging = false;
      element.setPointerCapture?.(event.pointerId);
    };

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (!dragging) {
        if (Math.abs(deltaX) < activationDistance || Math.abs(deltaX) <= Math.abs(deltaY) * 0.75) return;
        dragging = true;
        suppressClick = true;
        element.classList.add('is-dragging');
        startCallbackRef.current?.();
      }
      event.preventDefault();
      const currentTime = performance.now();
      const movementX = event.clientX - lastX;
      const movement = -movementX * dragMultiplier;
      const elapsed = Math.max(8, currentTime - lastTime);
      element.scrollLeft += movement;
      if (loop) {
        const cycle = element.scrollWidth / 2;
        if (cycle > 0 && element.scrollLeft <= 1) element.scrollLeft += cycle;
        else if (cycle > 0 && element.scrollLeft >= cycle) element.scrollLeft -= cycle;
      }
      velocity = velocity * 0.35 + (movement / elapsed) * 0.65;
      lastX = event.clientX;
      lastTime = currentTime;
    };

    const startMomentum = () => {
      if (!momentum || pointerType !== 'touch' || Math.abs(velocity) < 0.08 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let previousTime = performance.now();
      const glide = (currentTime: number) => {
        const elapsed = Math.min(currentTime - previousTime, 32);
        previousTime = currentTime;
        element.scrollLeft += velocity * elapsed;
        velocity *= Math.pow(momentumFriction, elapsed / 16.67);
        if (Math.abs(velocity) >= 0.025) momentumFrame = requestAnimationFrame(glide);
      };
      momentumFrame = requestAnimationFrame(glide);
    };

    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const didDrag = dragging;
      pointerId = null;
      element.classList.remove('is-dragging');
      if (element.hasPointerCapture?.(event.pointerId)) element.releasePointerCapture(event.pointerId);
      if (didDrag) endCallbackRef.current?.(element.scrollLeft);
      if (didDrag && event.type !== 'pointercancel') startMomentum();
      window.setTimeout(() => { suppressClick = false; }, 180);
    };

    const click = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    };

    element.addEventListener('pointerdown', pointerDown);
    element.addEventListener('pointermove', pointerMove, { passive: false });
    element.addEventListener('pointerup', pointerUp);
    element.addEventListener('pointercancel', pointerUp);
    element.addEventListener('click', click, true);
    return () => {
      cancelAnimationFrame(momentumFrame);
      element.removeEventListener('pointerdown', pointerDown);
      element.removeEventListener('pointermove', pointerMove);
      element.removeEventListener('pointerup', pointerUp);
      element.removeEventListener('pointercancel', pointerUp);
      element.removeEventListener('click', click, true);
    };
  }, [activationDistance, loop, momentum, momentumFriction, ref, touchMultiplier]);
}

export function usePageSwipe(onMove: (direction: -1 | 1) => void) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef({ pointerId: -1, pointerType: '', x: 0, y: 0, horizontal: false });

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    start.current = { pointerId: event.pointerId, pointerType: event.pointerType, x: event.clientX, y: event.clientY, horizontal: false };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerId !== start.current.pointerId) return;
    const deltaX = event.clientX - start.current.x;
    const deltaY = event.clientY - start.current.y;
    if (!start.current.horizontal) {
      if (Math.abs(deltaX) < 6 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      start.current.horizontal = true;
      setDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    event.preventDefault();
    setOffset(deltaX);
  };

  const finish = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerId !== start.current.pointerId) return;
    const didDrag = start.current.horizontal;
    const deltaX = event.clientX - start.current.x;
    start.current.pointerId = -1;
    setDragging(false);
    setOffset(0);
    const moveThreshold = start.current.pointerType === 'touch' ? 22 : 48;
    if (didDrag && Math.abs(deltaX) >= moveThreshold) onMove(deltaX < 0 ? 1 : -1);
  };

  return { offset, dragging, handlers: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish } };
}
