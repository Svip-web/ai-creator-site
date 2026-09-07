'use client';

/* oxlint-disable next/no-img-element */

import { useState } from 'react';

const results = [
  { title: 'СОЗДАДИТЕ AI-ФОТОСЕССИИ', text: 'Научитесь создавать реалистичные изображения для одежды, косметики, экспертов и других коммерческих ниш.', emphasis: 'реалистичные изображения', image: '01-ai-photoshoots-v2.webp' },
  { title: 'БУДЕТЕ СОЗДАВАТЬ AI-ВИДЕО', text: 'Освоите рекламные ролики, анимацию и контент для социальных сетей без сложных съёмок и монтажа.', emphasis: 'рекламные ролики, анимацию и контент для социальных сетей', image: '02-ai-video.webp' },
  { title: 'СОБЕРЁТЕ ГОТОВОЕ ПОРТФОЛИО', text: 'Выполните практические задания и соберёте более 10 работ, которые сможете показывать потенциальным клиентам.', emphasis: 'более 10 работ', image: '03-ready-portfolio.webp' },
  { title: 'НАУЧИТЕСЬ РАБОТАТЬ С КЛИЕНТАМИ', text: 'Сможете принимать техническое задание, рассчитывать стоимость, вносить правки и сдавать готовый проект.', emphasis: 'принимать техническое задание, рассчитывать стоимость, вносить правки', image: '04-client-work.webp' },
  { title: 'НАЙДЁТЕ ПЕРВЫХ ЗАКАЗЧИКОВ', text: 'Получите способы поиска клиентов, шаблоны сообщений и понятную систему предложения своих услуг брендам.', emphasis: 'способы поиска клиентов, шаблоны сообщений', image: '05-first-clients.webp' },
  { title: 'СМОЖЕТЕ ЗАРАБАТЫВАТЬ УДАЛЁННО', text: 'Начнёте брать платные проекты и сможете работать с клиентами из Европы и других стран независимо от места проживания.', emphasis: 'брать платные проекты', image: '06-remote-income.webp' },
];

const portfolioImages = Array.from({ length: 6 }, (_, index) => `/assets/images/career-${String(index + 1).padStart(2, '0')}-v2.webp`);

function PortfolioGrid({ mobile = false }: { mobile?: boolean }) {
  return <span className={`result-work-grid${mobile ? ' result-work-grid--mobile' : ''}`} aria-label="Примеры AI-работ">
    {portfolioImages.map((image, index) => <span className="result-work-grid__item" style={{ backgroundImage: `url(${image})` }} aria-label={`AI-работа ${index + 1}`} role="img" key={image} />)}
  </span>;
}

function ClientChat({ mobile = false }: { mobile?: boolean }) {
  return <span className={`result-client-chat${mobile ? ' result-client-chat--mobile' : ''}`} aria-label="Переписка с клиентом">
    <span className="result-client-chat__head"><i>М</i><span><strong>Марина · Brand manager</strong><small><i aria-hidden="true" />онлайн</small></span></span>
    <span className="result-client-chat__day">Сегодня</span>
    <span className="result-client-chat__message result-client-chat__message--client">Добрый день! Анна порекомендовала вас как AI‑креатора. Нам нужны визуалы для новой коллекции.</span>
    <span className="result-client-chat__message result-client-chat__message--creator">Здравствуйте! Спасибо за рекомендацию 💛 Пришлите, пожалуйста, референсы и сроки.</span>
    <span className="result-client-chat__file"><i aria-hidden="true">↓</i><span><strong>ТЗ_Collection.pdf</strong><small>2,4 МБ</small></span></span>
    <span className="result-client-chat__message result-client-chat__message--client">Отправила ТЗ. Нужны 6 фото и 2 коротких видео. Сможете начать на этой неделе?</span>
    <span className="result-client-chat__message result-client-chat__message--creator">Да, задача понятна. Подтверждаю старт проекта ✓✓</span>
    <span className="result-client-chat__message result-client-chat__message--client">Отлично! Бюджет согласован. Жду первые варианты в пятницу.</span>
    <span className="result-client-chat__message result-client-chat__message--creator">Договорились — пришлю подборку на согласование до 18:00 💛</span>
    <span className="result-client-chat__status"><i aria-hidden="true">✓</i><span><strong>Проект подтверждён</strong><small>Предоплата получена · работа начата</small></span></span>
  </span>;
}

function FirstClientsChat({ mobile = false }: { mobile?: boolean }) {
  return <span className={`result-leads${mobile ? ' result-leads--mobile' : ''}`} aria-label="Поиск первых клиентов">
    <span className="result-leads__sidebar">
      <strong>Новые ответы <i>3</i></strong>
      <span className="is-active"><i>LB</i><span><b>Lumi Beauty</b><small>Нам актуально…</small></span></span>
      <span><i>NH</i><span><b>Noma Home</b><small>Пришлите портфолио</small></span></span>
      <span><i>VA</i><span><b>Vela Active</b><small>Давайте обсудим</small></span></span>
    </span>
    <span className="result-leads__dialog">
      <span className="result-leads__head"><strong>Lumi Beauty</strong><small><i aria-hidden="true" />бренд косметики · онлайн</small></span>
      <span className="result-leads__message result-leads__message--creator">Здравствуйте! Я создаю AI‑визуалы для beauty‑брендов. Подготовила идею для вашей новой линейки.</span>
      <span className="result-leads__portfolio"><i /><i /><i /><span>Моё портфолио · 6 работ</span></span>
      <span className="result-leads__message result-leads__message--brand">Добрый день! Нам как раз актуальны новые визуалы. Ваше портфолио нам подходит 💛</span>
      <span className="result-leads__message result-leads__message--brand">Давайте обсудим первый проект.</span>
      <span className="result-leads__status">Клиент заинтересован <b>✓</b></span>
    </span>
  </span>;
}

function RemoteIncome({ mobile = false }: { mobile?: boolean }) {
  return <span className={`result-income${mobile ? ' result-income--mobile' : ''}`} aria-label="Оплаты от клиентов">
    <span className="result-income__card">
      <span className="result-income__card-top"><span>AI Growth Studio</span><i>VISA</i></span>
      <small>Доступный баланс</small>
      <strong>4 860,00 €</strong>
      <span className="result-income__number">••••&nbsp; 2847</span>
    </span>
    <span className="result-income__caption"><i aria-hidden="true" />Новые поступления</span>
    <span className="result-income__payments">
      <span><i className="is-stripe">stripe</i><span><b>Beauty campaign</b><small>Сегодня, 14:32</small></span><strong>+420 €</strong></span>
      <span><i className="is-mastercard"><b /><b /></i><span><b>AI‑фотосессия</b><small>Сегодня, 11:08</small></span><strong>+650 €</strong></span>
      <span><i className="is-visa">VISA</i><span><b>Product visuals</b><small>Вчера, 18:45</small></span><strong>+280 €</strong></span>
      <span><i className="is-stripe">stripe</i><span><b>Контент для бренда</b><small>Вчера, 12:20</small></span><strong>+390 €</strong></span>
      <span><i className="is-visa">VISA</i><span><b>AI‑видео для запуска</b><small>5 сентября, 16:10</small></span><strong>+540 €</strong></span>
      <span><i className="is-mastercard"><b /><b /></i><span><b>Пакет визуалов</b><small>4 сентября, 10:05</small></span><strong>+780 €</strong></span>
    </span>
    <span className="result-income__notice"><i>✓</i><span><strong>Оплата зачислена</strong><small>Средства уже на вашей карте</small></span></span>
  </span>;
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
                <span className="result-mobile-image">{index === 2 ? <PortfolioGrid mobile /> : index === 3 ? <ClientChat mobile /> : index === 4 ? <FirstClientsChat mobile /> : index === 5 ? <RemoteIncome mobile /> : <img src={`/assets/images/course-results/${item.image}`} alt={item.title} loading="lazy" decoding="async" />}</span>
              </>}
          </button>
        ))}
      </div>
      <div className="result-visual">
        {active === 2 ? <PortfolioGrid /> : active === 3 ? <ClientChat /> : active === 4 ? <FirstClientsChat /> : active === 5 ? <RemoteIncome /> : <img key={current.image} src={`/assets/images/course-results/${current.image}`} alt={current.title} loading="lazy" decoding="async" />}
      </div>
    </div>
  );
}
