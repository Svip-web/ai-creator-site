'use client';

/* oxlint-disable next/no-img-element */

import { useRef } from 'react';
import { useDragScroll } from './useDragSlider';

const benefits = [
  { title: 'Полную систему освоения профессии с нуля', text: 'Пошаговую программу от знакомства с нейросетями до портфолио, поиска клиентов и выполнения коммерческих заказов.', emphasis: 'Пошаговую программу', image: 'benefit-01.webp' },
  { title: 'Доступ к обучению от 1 до 6 месяцев', text: 'Срок доступа зависит от тарифа. Все обновления программы появляются в вашем личном кабинете.', emphasis: 'Все обновления программы', image: 'benefit-02.webp' },
  { title: 'Готовые промпты, шаблоны и инструкции', text: 'Схемы создания AI-фото и видео, чек-листы, примеры и материалы, которые можно сразу применять.', emphasis: 'сразу применять', image: 'benefit-03.webp' },
  { title: 'Практику и проверку домашних заданий', text: 'После уроков вы создаёте собственные проекты, а на тарифах с сопровождением получаете обратную связь куратора.', emphasis: 'получаете обратную связь куратора', image: 'benefit-04.webp' },
  { title: 'Базу проверенных нейросетей', text: 'Получите подборку инструментов для генерации изображений, видео, текстов, анимации и обработки контента.', emphasis: 'подборку инструментов', image: 'benefit-05.webp' },
  { title: 'Живые мастер-классы и разборы', text: 'Эксперты показывают рабочие техники, разбирают проекты учениц и отвечают на вопросы в прямом эфире.', emphasis: 'рабочие техники', image: 'benefit-06.webp' },
  { title: '3 формата поддержки', text: 'Самостоятельное обучение, письменное сопровождение куратора или созвоны с командой и экспертом — в зависимости от тарифа.', emphasis: '3 формата поддержки', image: 'benefit-07.webp' },
  { title: 'Дополнительные бонусные материалы', text: 'Мини-курсы, готовые идеи для брендов, примеры работ и дополнительные инструменты для развития в AI.', emphasis: 'готовые идеи для брендов', image: 'benefit-08.webp' },
  { title: 'Закрытое сообщество выпускниц', text: 'Профессиональное окружение, обмен опытом, полезные контакты и возможность находить партнёров для проектов.', emphasis: 'Профессиональное окружение', image: 'benefit-09.webp' },
  { title: 'Обучающую платформу 24/7', text: 'Занимайтесь в удобном темпе с телефона или ноутбука независимо от страны проживания.', emphasis: 'в удобном темпе', image: 'benefit-10.webp' },
];

function Highlight({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function LearningBenefits() {
  const track = useRef<HTMLDivElement>(null);
  useDragScroll(track);

  const move = (direction: -1 | 1) => {
    const slider = track.current;
    const card = slider?.querySelector<HTMLElement>('article');
    if (!slider || !card) return;
    const gap = Number.parseFloat(getComputedStyle(slider).gap) || 0;
    const step = card.offsetWidth + gap;
    const end = slider.scrollWidth - slider.clientWidth;
    if (direction === 1 && slider.scrollLeft >= end - step / 2) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && slider.scrollLeft <= step / 2) {
      slider.scrollTo({ left: end, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
  };

  return <>
    <div className="benefit-grid drag-scroll" ref={track}>
      {benefits.map((item, index) => <article key={item.title}>
        <div className="benefit-image"><img src={`/assets/images/${item.image}`} alt={item.title} loading="lazy" decoding="async" /><span><img src="/assets/images/gift.svg" alt="" />{String(index + 1).padStart(2, '0')}</span></div>
        <h3>{item.title}</h3>
        <p><Highlight text={item.text} emphasis={item.emphasis} /></p>
      </article>)}
    </div>
    <div className="slider-arrows learning-benefits-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Предыдущие преимущества"><img src="/assets/images/arrow-left.svg" alt="" /></button>
      <button type="button" onClick={() => move(1)} aria-label="Следующие преимущества"><img src="/assets/images/arrow-right.svg" alt="" /></button>
    </div>
  </>;
}
