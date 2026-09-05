'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  hours: string;
  minutes: string;
  seconds: string;
};

const emptyTime: TimeLeft = { hours: '--', minutes: '--', seconds: '--' };

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const deadline = new Date(now);
  deadline.setHours(24, 0, 0, 0);
  const difference = Math.max(0, deadline.getTime() - now.getTime());

  return {
    hours: String(Math.floor(difference / 3_600_000)).padStart(2, '0'),
    minutes: String(Math.floor((difference % 3_600_000) / 60_000)).padStart(2, '0'),
    seconds: String(Math.floor((difference % 60_000) / 1_000)).padStart(2, '0'),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(emptyTime);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const items = [
    ['Часов', timeLeft.hours],
    ['Минут', timeLeft.minutes],
    ['Секунд', timeLeft.seconds],
  ];

  return (
    <section className="countdown wrap" aria-label="До завершения набора">
      <div className="countdown-copy">
        <h2>Успейте занять место в потоке и сохранить текущую <mark>стоимость обучения</mark></h2>
        <p>До завершения набора осталось:</p>
        <div className="countdown-clock" aria-live="polite">
          {items.map(([label, value]) => (
            <div className="countdown-unit" key={label}>
              <strong>{value}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <a className="cta countdown-cta" href="#start">
          <span>Стать AI-креатором</span>
          <i><img src="/assets/images/like.svg" alt="" /></i>
        </a>
      </div>
      <img className="countdown-chair" src="/assets/images/ai-creator-chair.png" alt="Кресло с ноутбуком AI Creator" />
    </section>
  );
}
