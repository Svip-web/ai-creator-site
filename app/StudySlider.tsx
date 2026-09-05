'use client';

/* oxlint-disable next/no-img-element */
import { useEffect, useMemo, useState } from 'react';

const facts = [
  { number: '01', icon: 'study-structure.svg', title: 'Структурированная программа', text: 'Путь от первых генераций до портфолио, клиентов и дохода онлайн.', emphasis: 'портфолио, клиентов и дохода онлайн' },
  { number: '02', icon: 'study-modules.svg', title: '8 модулей + бонусные уроки и эфиры', text: 'Практические видеоуроки, мастер-классы и разборы проектов учениц.', emphasis: 'Практические видеоуроки, мастер-классы и разборы' },
  { number: '03', icon: 'study-access.svg', title: 'Онлайн-кабинет с доступом', text: 'Обучайтесь с любого устройства в удобное время и возвращайтесь к материалам.', emphasis: 'с любого устройства в удобное время' },
  { number: '04', icon: 'study-homework.svg', title: 'Проверка домашних заданий', text: 'Куратор даёт обратную связь и помогает улучшить результат.', emphasis: 'обратную связь' },
  { number: '05', icon: 'study-prompts.svg', title: 'Готовые промпты и инструкции', text: 'Шаблоны, чек-листы и схемы создания AI-фото и видео.', emphasis: 'Шаблоны, чек-листы и схемы' },
  { number: '06', icon: 'study-support-formats.svg', title: '3 формата поддержки', text: 'Самостоятельно, с куратором или с командой и экспертом.', emphasis: 'с куратором или с командой и экспертом' },
  { number: '07', icon: 'study-chatgpt.svg', title: 'Модуль по работе с ChatGPT', text: 'Создание идей, текстов, сценариев и промптов для контента.', emphasis: 'идей, текстов, сценариев и промптов' },
  { number: '08', icon: 'study-neural.svg', title: 'База проверенных нейросетей', text: 'Инструменты для создания изображений, видео и digital-контента.', emphasis: 'изображений, видео и digital-контента' },
  { number: '09', icon: 'study-bonus.svg', title: 'Бонусные модули', text: 'AI-блогеры, цифровые продукты и дополнительные способы заработка.', emphasis: 'дополнительные способы заработка' },
  { number: '10', icon: 'study-support.svg', title: 'Поддержка на всём пути', text: 'Команда помогает проходить обучение и двигаться к первым заказам.', emphasis: 'первым заказам' },
];

function FactText({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function StudySlider() {
  const [pageSize, setPageSize] = useState(4);
  const [page, setPage] = useState(0);
  const pages = useMemo(() => Array.from({ length: Math.ceil(facts.length / pageSize) }, (_, index) => facts.slice(index * pageSize, index * pageSize + pageSize)), [pageSize]);

  useEffect(() => {
    const updatePageSize = () => {
      setPageSize(window.innerWidth <= 520 ? 1 : window.innerWidth <= 900 ? 2 : 4);
      setPage(0);
    };
    updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  const previous = () => setPage((current) => (current - 1 + pages.length) % pages.length);
  const next = () => setPage((current) => (current + 1) % pages.length);

  return <>
    <div className="study-layout">
      <div className="study-media"><img className="study-cover" src="/assets/images/study-bonuses-mockup-v2.png" alt="Материалы, модули и бонусы обучения AI-креаторов" /></div>
      <div className={`study-slider study-slider--${pageSize}`} aria-live="polite">
        <div className="study-pages" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((items, pageIndex) => <div className="study-grid" aria-hidden={pageIndex !== page} key={pageIndex}>
            {items.map((item) => <article key={item.title}>
              <div className="study-card-top"><span><img src={`/assets/images/${item.icon}`} alt="" /></span>{item.number && <small>{item.number}</small>}</div>
              <h3>{item.title}</h3><p><FactText text={item.text} emphasis={item.emphasis} /></p>
            </article>)}
          </div>)}
        </div>
        <div className="slider-arrows study-arrows">
          <button type="button" onClick={previous} aria-label="Предыдущие пункты"><img src="/assets/images/arrow-left.svg" alt="" /></button>
          <button type="button" onClick={next} aria-label="Следующие пункты"><img src="/assets/images/arrow-right.svg" alt="" /></button>
        </div>
      </div>
    </div>
  </>;
}
