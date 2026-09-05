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

export default function RegistrationToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer = 0;
    let cancelled = false;
    const showNext = () => {
      if (cancelled) return;
      setVisible(true);
      timer = window.setTimeout(() => {
        setVisible(false);
        timer = window.setTimeout(() => {
          setIndex((current) => (current + 1) % registrations.length);
          showNext();
        }, 1500);
      }, 5200);
    };
    timer = window.setTimeout(showNext, 2400);
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
