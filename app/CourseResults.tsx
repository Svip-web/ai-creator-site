'use client';

/* oxlint-disable next/no-img-element */

import { useState } from 'react';

const results = [
  { title: 'СОЗДАДИТЕ AI-ФОТОСЕССИИ', text: 'Научитесь создавать реалистичные изображения для одежды, косметики, экспертов и других коммерческих ниш.', emphasis: 'реалистичные изображения', image: '01-ai-photoshoots.png' },
  { title: 'БУДЕТЕ СОЗДАВАТЬ AI-ВИДЕО', text: 'Освоите рекламные ролики, анимацию и контент для социальных сетей без сложных съёмок и монтажа.', emphasis: 'рекламные ролики, анимацию и контент для социальных сетей', image: '02-ai-video.png' },
  { title: 'СОБЕРЁТЕ ГОТОВОЕ ПОРТФОЛИО', text: 'Выполните практические задания и соберёте более 10 работ, которые сможете показывать потенциальным клиентам.', emphasis: 'более 10 работ', image: '03-ready-portfolio.png' },
  { title: 'НАУЧИТЕСЬ РАБОТАТЬ С КЛИЕНТАМИ', text: 'Сможете принимать техническое задание, рассчитывать стоимость, вносить правки и сдавать готовый проект.', emphasis: 'принимать техническое задание, рассчитывать стоимость, вносить правки', image: '04-client-work.png' },
  { title: 'НАЙДЁТЕ ПЕРВЫХ ЗАКАЗЧИКОВ', text: 'Получите способы поиска клиентов, шаблоны сообщений и понятную систему предложения своих услуг брендам.', emphasis: 'способы поиска клиентов, шаблоны сообщений', image: '05-first-clients.png' },
  { title: 'СМОЖЕТЕ ЗАРАБАТЫВАТЬ УДАЛЁННО', text: 'Начнёте брать платные проекты и сможете работать с клиентами из Европы и других стран независимо от места проживания.', emphasis: 'брать платные проекты', image: '06-remote-income.png' },
];

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
                <span className="result-mobile-image"><img src={`/assets/images/course-results/${item.image}`} alt={item.title} /></span>
              </>}
          </button>
        ))}
      </div>
      <div className="result-visual">
        <img key={current.image} src={`/assets/images/course-results/${current.image}`} alt={current.title} />
      </div>
    </div>
  );
}
