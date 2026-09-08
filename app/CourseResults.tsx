'use client';

/* oxlint-disable jsx-a11y/media-has-caption, next/no-img-element */

import { useState } from 'react';

const results = [
  { title: 'СОЗДАДИТЕ AI-ФОТОСЕССИИ', text: 'Научитесь создавать полноценные AI‑фотосессии для одежды, косметики, экспертов и других коммерческих ниш.', emphasis: 'полноценные AI‑фотосессии', image: '01-ai-photoshoots-v2.webp' },
  { title: 'БУДЕТЕ СОЗДАВАТЬ AI-ВИДЕО', text: 'Освоите рекламные ролики, анимацию и контент для социальных сетей без сложных съёмок и монтажа.', emphasis: 'рекламные ролики, анимацию и контент для социальных сетей', image: '02-ai-video.webp' },
  { title: 'СОБЕРЁТЕ ГОТОВОЕ ПОРТФОЛИО', text: 'Выполните практические задания и соберёте более 10 работ, которые сможете показывать потенциальным клиентам.', emphasis: 'более 10 работ', image: '03-ready-portfolio.webp' },
  { title: 'НАУЧИТЕСЬ РАБОТАТЬ С КЛИЕНТАМИ', text: 'Сможете принимать техническое задание, рассчитывать стоимость, вносить правки и сдавать готовый проект.', emphasis: 'принимать техническое задание, рассчитывать стоимость, вносить правки', image: '04-client-work.webp' },
  { title: 'НАЙДЁТЕ ПЕРВЫХ ЗАКАЗЧИКОВ', text: 'Получите способы поиска клиентов, шаблоны сообщений и понятную систему предложения своих услуг брендам.', emphasis: 'способы поиска клиентов, шаблоны сообщений', image: '05-first-clients.webp' },
  { title: 'СМОЖЕТЕ ЗАРАБАТЫВАТЬ УДАЛЁННО', text: 'Начнёте брать платные проекты и сможете работать с клиентами из Европы и других стран независимо от места проживания.', emphasis: 'брать платные проекты', image: '06-remote-income.webp' },
];

const staticScreenImages: Record<number, string> = {
  2: '03-portfolio-screen@2x.png',
  3: '04-client-work-screen@2x.png',
  4: '05-first-clients-screen@2x.png',
  5: '06-remote-income-screen@2x.png',
};

function AiCourseVideo({ mobile = false }: { mobile?: boolean }) {
  return <video
    className={`result-video${mobile ? ' result-video--mobile' : ''}`}
    src="/assets/videos/roma-ai-showcase.mp4"
    poster="/assets/images/course-results/02-ai-video.webp"
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-label="Пример AI-видео"
  />;
}

function StaticResultScreen({ index, title }: { index: number; title: string }) {
  return <img
    className="result-screen-image"
    src={`/assets/images/course-results/screens/${staticScreenImages[index]}`}
    alt={title}
    loading="lazy"
    decoding="async"
  />;
}

function Highlight({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

export default function CourseResults() {
  const [active, setActive] = useState(0);
  const current = results[active];

  return (
    <div className="results-panel">
      <div className="result-list">
        {results.map((item, index) => (
          <button
            type="button"
            className={`result-card${active === index ? ' is-open' : ''}`}
            key={item.title}
            onClick={() => setActive(index)}
            aria-expanded={active === index}
          >
              <span className="result-summary-row"><span>{item.title}</span><i /></span>
              {active === index && <>
                <span className="result-copy"><Highlight text={item.text} emphasis={item.emphasis} /></span>
                <span className="result-mobile-image">{index === 1 ? <AiCourseVideo mobile /> : staticScreenImages[index] ? <StaticResultScreen index={index} title={item.title} /> : <img src={`/assets/images/course-results/${item.image}`} alt={item.title} loading="lazy" decoding="async" />}</span>
              </>}
          </button>
        ))}
      </div>
      <div className="result-visual">
        {active === 1 ? <AiCourseVideo /> : staticScreenImages[active] ? <StaticResultScreen index={active} title={current.title} /> : <img key={current.image} src={`/assets/images/course-results/${current.image}`} alt={current.title} loading="lazy" decoding="async" />}
      </div>
    </div>
  );
}
