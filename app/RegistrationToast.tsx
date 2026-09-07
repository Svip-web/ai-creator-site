'use client';

import { useEffect, useState } from 'react';

const registrations = [
  { name: 'Марина', time: '2 минуты назад' },
  { name: 'Анна', time: '4 минуты назад' },
  { name: 'Катерина', time: '7 минут назад' },
  { name: 'Ирина', time: '11 минут назад' },
  { name: 'Наталья', time: '14 минут назад' },
  { name: 'Юлия', time: '18 минут назад' },
  { name: 'Виктория', time: '23 минуты назад' },
  { name: 'София', time: '27 минут назад' },
  { name: 'Алина', time: '32 минуты назад' },
  { name: 'Оксана', time: '38 минут назад' },
  { name: 'Дарья', time: '43 минуты назад' },
  { name: 'Елена', time: '51 минуту назад' },
  { name: 'Кристина', time: '1 час назад' },
  { name: 'Татьяна', time: '1 час 12 минут назад' },
  { name: 'Евгения', time: '1 час 25 минут назад' },
];

function shuffledRegistrationIndexes() {
  const indexes = registrations.map((_, index) => index);

  for (let index = indexes.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [indexes[index], indexes[randomIndex]] = [indexes[randomIndex], indexes[index]];
  }

  return indexes;
}

const TOAST_VISIBLE_MS = 4200;
const MIN_PAUSE_MS = 8000;
const MAX_PAUSE_MS = 16000;

function randomPause() {
  return Math.round(MIN_PAUSE_MS + Math.random() * (MAX_PAUSE_MS - MIN_PAUSE_MS));
}

export default function RegistrationToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = 0;
    let cancelled = false;
    let sequence = shuffledRegistrationIndexes();
    let sequencePosition = 0;
    let initialRegistrationSelected = false;

    const selectNextRegistration = () => {
      const previousIndex = sequence[sequencePosition];
      sequencePosition += 1;

      if (sequencePosition >= sequence.length) {
        sequence = shuffledRegistrationIndexes();
        sequencePosition = 0;

        if (sequence[sequencePosition] === previousIndex) {
          [sequence[0], sequence[1]] = [sequence[1], sequence[0]];
        }
      }

      setIndex(sequence[sequencePosition]);
    };

    const showNext = () => {
      if (cancelled) return;

      if (!initialRegistrationSelected) {
        setIndex(sequence[sequencePosition]);
        initialRegistrationSelected = true;
      }

      setVisible(true);
      timer = window.setTimeout(() => {
        setVisible(false);
        timer = window.setTimeout(() => {
          selectNextRegistration();
          showNext();
        }, randomPause());
      }, TOAST_VISIBLE_MS);
    };
    timer = window.setTimeout(showNext, randomPause());
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, []);

  const registration = registrations[index];
  return (
    <aside className={visible ? 'registration-toast registration-toast--visible' : 'registration-toast'} aria-live="polite" aria-hidden={!visible}>
      <div><strong>{registration.name}</strong><p>зарегистрировалась на обучение</p><small>{registration.time}</small></div>
      <span className="registration-toast__verified" title="Регистрация подтверждена" aria-label="Регистрация подтверждена">✓</span>
    </aside>
  );
}
