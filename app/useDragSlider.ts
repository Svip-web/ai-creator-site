'use client';

import { PointerEvent as ReactPointerEvent, RefObject, useEffect, useRef, useState } from 'react';

export function useDragScroll<T extends HTMLElement>(ref: RefObject<T | null>, onDragStart?: () => void) {
  const callbackRef = useRef(onDragStart);
  callbackRef.current = onDragStart;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let dragging = false;
    let suppressClick = false;

    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startScroll = element.scrollLeft;
      dragging = false;
    };

    const pointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (!dragging) {
        if (Math.abs(deltaX) < 6 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        dragging = true;
        suppressClick = true;
        element.classList.add('is-dragging');
        element.setPointerCapture?.(event.pointerId);
        callbackRef.current?.();
      }
      event.preventDefault();
      element.scrollLeft = startScroll - deltaX;
    };

    const pointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      element.classList.remove('is-dragging');
      if (element.hasPointerCapture?.(event.pointerId)) element.releasePointerCapture(event.pointerId);
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
      element.removeEventListener('pointerdown', pointerDown);
      element.removeEventListener('pointermove', pointerMove);
      element.removeEventListener('pointerup', pointerUp);
      element.removeEventListener('pointercancel', pointerUp);
      element.removeEventListener('click', click, true);
    };
  }, [ref]);
}

export function usePageSwipe(onMove: (direction: -1 | 1) => void) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef({ pointerId: -1, x: 0, y: 0, horizontal: false });

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    start.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
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
    if (didDrag && Math.abs(deltaX) >= 48) onMove(deltaX < 0 ? 1 : -1);
  };

  return { offset, dragging, handlers: { onPointerDown, onPointerMove, onPointerUp: finish, onPointerCancel: finish } };
}
