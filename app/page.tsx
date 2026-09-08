import Link from 'next/link';
import VideoStories from './VideoStories';
import LeadPopup from './LeadPopup';
import CourseResults from './CourseResults';
import RegistrationToast from './RegistrationToast';
import LearningBenefits from './LearningBenefits';
import StudySlider from './StudySlider';
import BarrierSlider from './BarrierSlider';
import StudentWorks from './StudentWorks';
import { courseModules } from './courseContent';
import AudienceSlider from './AudienceSlider';
import ProgramCloseButton from './ProgramCloseButton';
import ReviewSlider from './ReviewSlider';
import CountdownTimer from './CountdownTimer';
import SiteHeader from './SiteHeader';
import FaqList from './FaqList';
import CareerShowcaseGallery from './CareerShowcaseGallery';

export const dynamic = 'force-static';

/* oxlint-disable jsx-a11y/media-has-caption, next/no-img-element */
const heroImages = Array.from({ length: 11 }, (_, index) => `/assets/images/hero-${String(index + 1).padStart(2, '0')}.webp`);
const careerCollageImages = Array.from({ length: 6 }, (_, index) => `/assets/images/career-${String(index + 1).padStart(2, '0')}-v2.webp`);
const careerShowcaseImages = [
  'showcase-skincare.webp',
  'showcase-jewelry.webp',
  'showcase-coffee.webp',
  'showcase-interior.webp',
  'showcase-tech.webp',
  'showcase-flowers.webp',
  'showcase-travel.webp',
  'showcase-activewear.webp',
].map((image) => `/assets/images/career-showcase/${image}`);
const avatars = Array.from({ length: 4 }, (_, index) => `/assets/images/avatar-0${index + 1}.webp`);
const marqueeColumns = [
  [...heroImages],
  [...heroImages.slice(4), ...heroImages.slice(0, 4)],
];

type Step = { number: string; title: string; emphasis: string; image?: string; video?: string; featured?: boolean };

const steps: Step[] = [
  { number: '01', title: 'Выбираем востребованную нишу и формат контента', emphasis: 'востребованную нишу', image: '/assets/images/system-01.webp', video: '/assets/videos/roma-ai-showcase.mp4', featured: true },
  { number: '02', title: 'Создаём AI-фото и видео для портфолио', emphasis: 'AI-фото и видео для портфолио' },
  { number: '03', title: 'Находим первых клиентов и предлагаем им свои услуги', emphasis: 'первых клиентов' },
  { number: '04', title: 'Выполняем заказ и получаем оплату', emphasis: 'получаем оплату' },
  { number: '05', title: 'Лучших выпускниц приглашаем работать над реальными проектами в нашей AI-агенции AI Growth Studio', emphasis: 'реальными проектами', image: '/assets/images/system-02-ai-collage-v2.webp', featured: true },
];

function EmphasizedText({ text, emphasis }: { text: string; emphasis: string }) {
  const [before, after] = text.split(emphasis);
  return <>{before}<strong>{emphasis}</strong>{after}</>;
}

const barriers = [
  { icon: 'icon-settings.svg', title: 'Навыки дизайна или монтажа', text: 'Не нужно владеть Photoshop или профессиональными редакторами. Вы научитесь создавать AI-фото и видео с нуля по готовым схемам.', emphasis: 'AI-фото и видео с нуля' },
  { icon: 'icon-document.svg', title: 'Технические знания', text: 'Все инструменты объясняются простым языком и показываются пошагово — от регистрации до готового результата.', emphasis: 'от регистрации до готового результата' },
  { icon: 'icon-clock.svg', title: 'Много свободного времени', text: 'Уроки занимают 10–20 минут. Обучение можно совмещать с работой, семьёй и детьми.', emphasis: 'совмещать с работой, семьёй и детьми' },
  { icon: 'icon-laptop.svg', title: 'Опыт в контенте или маркетинге', text: 'Мы покажем, какой контент нужен брендам, как оформить портфолио и предложить свои услуги.', emphasis: 'оформить портфолио и предложить свои услуги' },
  { icon: 'icon-globe.svg', title: 'Знание английского языка', text: 'Готовые промпты, шаблоны и инструменты перевода помогут работать даже с иностранными клиентами.', emphasis: 'даже с иностранными клиентами' },
  { icon: 'icon-sparkles.svg', title: 'Талант или вдохновение', text: 'Вы получите идеи, референсы и понятные алгоритмы — вам не придётся придумывать всё самостоятельно.', emphasis: 'идеи, референсы и понятные алгоритмы' },
  { icon: 'icon-phone.svg', title: 'Дорогая техника и большие вложения', text: 'Для старта достаточно телефона, планшета или ноутбука. Мы подскажем, какие инструменты действительно нужны, чтобы не переплачивать.', emphasis: 'достаточно телефона, планшета или ноутбука' },
];

const audience: ReadonlyArray<readonly [string, string, string]> = [
  ['Женщинам в эмиграции', 'Уроки занимают 10–20 минут. Обучение можно совмещать с работой, семьёй и детьми.', 'совмещать с работой, семьёй и детьми'],
  ['Наёмным сотрудницам', 'Получите современный навык и создайте дополнительный источник дохода без резкой смены привычной жизни.', 'дополнительный источник дохода'],
  ['Мамам в декрете', 'Учитесь в комфортном темпе и развивайтесь профессионально, совмещая обучение с заботой о семье.', 'в комфортном темпе'],
  ['Тем, кто ищет себя и новое дело', 'Попробуйте творческое направление с понятной системой и поддержкой на каждом этапе.', 'понятной системой и поддержкой'],
  ['Блогерам и фрилансерам', 'Создавайте контент быстрее, расширяйте список услуг и предлагайте клиентам новые AI-форматы.', 'Создавайте контент быстрее, расширяйте список услуг'],
  ['Женщинам 35+, которые хотят освоить онлайн-профессию', 'Начните с нуля без технического опыта — все инструменты объясняются спокойно, понятно и пошагово.', 'с нуля без технического опыта'],
];

const guarantees = [
  { icon: 'guarantee-refund.svg', title: 'Гарантия результата или возврата средств', text: 'Если вы выполняете задания и не получаете результат, действует возврат средств по условиям оферты.', emphasis: 'возврат средств' },
  { icon: 'guarantee-support.svg', title: 'Поддержка на каждом этапе', text: 'Кураторы и команда помогут разобраться в заданиях, инструментах и улучшить ваши работы.', emphasis: 'Кураторы и команда' },
  { icon: 'guarantee-portfolio.svg', title: 'Практика и готовое портфолио', text: 'Во время обучения вы создадите реальные проекты и соберёте готовое портфолио для первых клиентов.', emphasis: 'готовое портфолио' },
  { icon: 'guarantee-time.svg', title: 'Экономия времени и понятная система', text: 'Короткие уроки, пошаговые инструкции, готовые промпты и шаблоны помогут осваивать материал без сложных терминов и долгого поиска информации.', emphasis: 'пошаговые инструкции, готовые промпты и шаблоны' },
];

const mentorFacts = [
  { text: 'Более 3 лет активно использую нейросети в работе', emphasis: 'Более 3 лет' },
  { text: 'Более 1,5 лет стабильно зарабатываю на AI‑ и UGC‑контенте', emphasis: 'Более 1,5 лет' },
  { text: 'Моё обучение прошли более 2 000 девушек', emphasis: 'более 2 000 девушек' },
  { text: 'Вместе с командой мы создали более 3 000 единиц коммерческого контента', emphasis: 'более 3 000 единиц коммерческого контента' },
  { text: 'Развиваю собственную AI‑агенцию в Испании', emphasis: 'собственную AI‑агенцию в Испании' },
  { text: 'За моими плечами 14 лет опыта в онлайн-коммерции и работе с международными поставщиками', emphasis: '14 лет опыта' },
  { text: 'Я жена и мама двоих детей, поэтому знаю, как совмещать семью и профессиональную реализацию', emphasis: 'жена и мама двоих детей' },
  { text: 'Покажу, как превратить интерес к нейросетям в востребованный навык и источник дохода', emphasis: 'востребованный навык и источник дохода' },
];

const mentorCollage = Array.from({ length: 6 }, (_, index) => `/assets/images/mentor-collage/mentor-${String(index + 2).padStart(2, '0')}.webp`);

const plans = [
  { name: 'BASIC', label: 'самостоятельно', tone: 'dark', items: ['Модуль предобучения', '6 модулей', 'Практические домашние задания', 'Доступ к платформе на 1 месяц', 'База знаний — все шаблоны, инструкции и чек-листы'] },
  { name: 'PRO', label: 'поддержка куратора', tone: 'blue', items: ['Всё из тарифа «Basic» +', '8 модулей', 'Модуль по созданию портфолио', 'Обратная связь от куратора', 'Проверка домашних заданий', 'Сертификат', 'Обучение 6 недель', 'Записи мастер-классов', 'Готовое портфолио', 'Доступ к платформе на 3 месяца', 'Доступ к компьюнити выпускниц'] },
  { name: 'VIP', label: 'поддержка команды', tone: 'yellow', featured: true, items: ['Всё из тарифа «Pro» +', 'Модули по работе с брендами и зарубежным рынком', 'Стажировка на реальных проектах', 'Обучение 8 недель', 'Доступ к платформе на 6 месяцев', 'Онлайн мастер-классы с привлеченными экспертами', 'HR — блок для присоединения к компании мечты', 'Личный чат с командой и Женей', 'Доступ к компьюнити выпускниц', 'Возможность попасть к нам в команду', 'Гарантия возврата'] },
];

function Cta({ compact = false }: { compact?: boolean }) {
  return <a className={compact ? 'cta cta--compact' : 'cta'} href="#start" data-lead-popup><span>Начать путь AI‑креатора<br className="desktop-break" /> по нашей системе</span><i><img src="/assets/images/like.svg" alt="" /></i></a>;
}

function LayeredSystemGraphic({ src }: { src: string }) {
  if (src.includes('ai-collage')) {
    return <figure className="system-graphic system-graphic--collage" aria-label="Коллаж коммерческих AI-проектов AI Growth Studio">
      <span className="system-graphic__tiles" aria-hidden="true">
        {careerCollageImages.map((image) => <span className="system-graphic__tile" style={{ backgroundImage: `url(${image})` }} key={image} />)}
      </span>
      <span className="system-graphic__brand" aria-hidden="true"><span className="brand-symbol" /><span className="brand-wordmark" /></span>
    </figure>;
  }

  const variant = src.includes('02') ? '02' : '01';
  const layers = variant === '01'
    ? ['tile-one', 'tile-two', 'tile-three', 'tile-four', 'cursor', 'icons']
    : ['screen-photo', 'screen-list', 'screen-check', 'profile-left', 'profile-top', 'profile-bottom', 'folder'];

  return <figure className={`system-graphic system-graphic--${variant}`} aria-label={variant === '01' ? 'Примеры направлений AI-контента' : 'Работа над коммерческими AI-проектами'}>
    <img className="system-graphic__base" src={`/assets/images/system-${variant}-base-v2.webp`} alt="" loading="lazy" decoding="async" />
    {layers.map((layer) => <span className={`system-graphic__layer system-graphic__layer--${layer}`} aria-hidden="true" key={layer}><img src={src} alt="" loading="lazy" decoding="async" /></span>)}
  </figure>;
}

export default function Home() {
  return <main>
    <LeadPopup />
    <RegistrationToast />
    <SiteHeader />

    <section className="hero wrap" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><img src="/assets/images/work.svg" alt="" />Освойте профессию AI‑креатора</p>
        <h1>Создавайте AI-фото<br />и видео для брендов<br />и зарабатывайте</h1>
        <strong className="income">1000–2000<span className="euro">€</span>&nbsp;онлайн</strong>
        <div className="hero-action-card">
          <p className="hero-subline">Пошаговая система <strong>от первого AI-визуала до портфолио и первых заказов</strong> — без опыта, знания языка и навыков дизайна.</p>
          <Cta />
          <div className="proof"><span>{avatars.map((src) => <img src={src} alt="" loading="lazy" decoding="async" key={src} />)}</span><small>*Более 2 000 девушек уже прошли обучение и начали создавать AI-контент по системе Жени Коваленко.</small></div>
        </div>
      </div>
      <img className="hero-person" src="/assets/images/hero-person.webp" alt="Женя Коваленко" fetchPriority="high" decoding="async" />
      <div className="hero-gallery" aria-label="Примеры AI-контента">
        {marqueeColumns.map((images, columnIndex) => <div className={`marquee-column marquee-column--${columnIndex + 1}`} key={columnIndex}><div className="marquee-track">{[...images, ...images].map((src, index) => <img src={src} alt={index < images.length ? `Пример AI-контента ${columnIndex * images.length + index + 1}` : ''} aria-hidden={index >= images.length} loading="lazy" decoding="async" fetchPriority="low" key={`${src}-${index}`} />)}</div></div>)}
      </div>
      <span className="hero-signature">Женя Коваленко</span>
    </section>

    <section className="section system wrap" id="system">
      <div className="section-title"><h2>Как работает профессия</h2><strong>AI‑креатора?</strong></div>
      <div className="steps">{steps.map((step) => <article className={step.featured ? 'step step--featured' : 'step'} key={step.number}><b>{`{${step.number}}`}</b><h3><EmphasizedText text={step.title} emphasis={step.emphasis} /></h3>{step.video ? <video className="system-graphic system-inline-video" src={step.video} poster={step.image} autoPlay muted loop playsInline preload="metadata" aria-label="Пример AI-видео" /> : step.image && <LayeredSystemGraphic src={step.image} />}</article>)}</div>
      <p className="system-note">Следуя нашей системе, <b>вы шаг за шагом освоите нейросети,</b> соберёте портфолио и сможете превратить новый навык в удалённый доход.</p><Cta />
    </section>

    <div className="barriers-stage" id="barriers"><section className="section barriers"><div className="wrap">
      <div className="section-title"><h2>Что вам точно <em className="negative-accent">не</em> понадобится, чтобы стать</h2><strong>AI‑креатором?</strong></div>
      <BarrierSlider items={barriers} />
    </div></section></div>

    <section className="section audience wrap" id="audience">
      <div className="section-title"><h2>Кому подходит профессия</h2><strong>AI‑креатора?</strong></div>
      <AudienceSlider items={audience} />
    </section>

    <section className="stories" id="stories">
      <div className="stories-inner wrap">
        <div className="section-title"><h2>Захватывающие истории</h2><strong>учеников</strong></div>
        <VideoStories />
        <ReviewSlider />
        <StudentWorks />
      </div>
    </section>

    <section className="section guarantees wrap" id="guarantees">
      <div className="section-title guarantee-title"><h2>А какие у нас <span>гарантии?</span></h2><p>4 причины чувствовать себя уверенно во время обучения</p></div>
      <div className="guarantee-layout"><div className="guarantee-grid">{guarantees.map((item) => <article key={item.title}><span><img src={`/assets/images/${item.icon}`} alt="" loading="lazy" decoding="async" /></span><h3>{item.title}</h3><p><EmphasizedText text={item.text} emphasis={item.emphasis} /></p></article>)}</div><div className="guarantee-person guarantee-person--composite"><img src="/assets/images/guarantee-person.webp" alt="Женя Коваленко" loading="lazy" decoding="async" /></div></div>
      <a className="cta cta--wide" href="#prices" data-lead-popup><span>Выбрать обучение и начать создавать AI-контент</span><i><img src="/assets/images/like.svg" alt="" /></i></a>
    </section>

    <section className="course-results" id="course"><div className="wrap">
      <div className="section-title"><h2>После прохождения</h2><strong>курса вы:</strong></div>
      <CourseResults />
    </div></section>

    <section className="section learning wrap">
      <div className="section-title"><h2>На обучении у Жени Коваленко</h2><strong>вы получите</strong></div>
      <LearningBenefits />
    </section>

    <section className="mentor" id="expert">
      <div className="mentor-collage mentor-collage--desktop" aria-hidden="true">
        {mentorCollage.map((src) => <img src={src} alt="" loading="lazy" decoding="async" key={src} />)}
      </div>
      <img className="mentor-person" src="/assets/images/expert-person.webp" alt="Женя Коваленко" loading="lazy" decoding="async" />
      <div className="mentor-desktop-stats" aria-label="Факты о Жене Коваленко">
        <p><b>3 000+</b><span>коммерческих работ</span></p>
        <p><b>2 000+</b><span>учениц прошли обучение</span></p>
        <p><b>3+ года</b><span>в AI‑креаторстве</span></p>
      </div>
      <span className="mentor-signature">Женя Коваленко</span>
      <div className="mentor-content">
        <div className="mentor-title"><h2>Ваш наставник</h2><strong>Женя Коваленко</strong></div>
        <div className="mentor-mobile-visual">
          <div className="mentor-collage mentor-collage--mobile" aria-hidden="true">
            {mentorCollage.map((src) => <img src={src} alt="" loading="lazy" decoding="async" key={src} />)}
          </div>
          <img src="/assets/images/expert-person.webp" alt="Женя Коваленко" loading="lazy" decoding="async" />
          <div className="mentor-portrait-badges" aria-label="Факты о Жене Коваленко">
            <p><b>3 000+</b><span>коммерческих работ</span></p>
            <p><b>2 000+</b><span>учениц прошли обучение</span></p>
            <p><b>3+ года</b><span>в AI‑креаторстве</span></p>
          </div>
          <span>Женя Коваленко</span>
        </div>
        <div className="mentor-mobile-details">
          <div className="mentor-facts">{mentorFacts.map((fact) => <p key={fact.text}><img src="/assets/images/check.svg" alt="" loading="lazy" decoding="async" /><span><EmphasizedText text={fact.text} emphasis={fact.emphasis} /></span></p>)}</div>
          <div className="mentor-action-row">
            <a className="cta cta--mentor" href="#prices" data-lead-popup><span>Записаться на курс с<br /> индивидуальным подходом</span><i><img src="/assets/images/like.svg" alt="" /></i></a>
            <p className="mentor-action-note"><b>Готовы учиться у Жени Коваленко?</b><span>Выберите тариф и начните путь в AI‑креаторстве</span></p>
          </div>
        </div>
      </div>
    </section>

    <section className="section study wrap">
      <div className="section-title"><h2>Об обучении</h2></div>
      <StudySlider />
    </section>

    <section className="section program-section" id="program">
      <div className="section-title"><h2>Программа</h2><strong>обучения</strong></div>
      <div className="program wrap" aria-label="Программа обучения">{courseModules.map((module) => <details className={[module.advanced && 'is-advanced', 'has-lessons'].filter(Boolean).join(' ')} key={module.number}><summary><b>{module.number}</b><span>{module.title}</span><em>Показать больше</em></summary><div className="program-content">{module.lessons.length > 0 && <ul>{module.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>}<div className="program-result"><span>Результат</span><p>{module.result}</p></div><ProgramCloseButton /></div></details>)}</div>
    </section>

    <section className="prices" id="prices"><div className="wrap" id="start"><div className="section-title"><h2>Тарифы</h2><strong>участия</strong></div><div className="price-grid">{plans.map((plan) => <article className={plan.featured ? 'is-featured' : undefined} key={plan.name}><header className={`price-head price-head--${plan.tone}`}><h3>{plan.name}</h3><span>{plan.label}</span></header><ul>{plan.items.map((item) => <li key={item}><i className="price-check"><img src="/assets/images/price-check.svg" alt="" loading="lazy" decoding="async" /></i><span>{item}</span></li>)}</ul><a className="cta price-cta" href="#start" data-lead-popup><span>Выбрать этот тариф</span><i><img src="/assets/images/like.svg" alt="" /></i></a></article>)}</div></div></section>

    <section className="career-showcase wrap" aria-label="Профессия AI‑креатора">
      <h2>Освойте профессию AI‑креатора<br /><mark>и начните зарабатывать</mark></h2>
      <p>Создавая фото и видео для брендов<br /><strong>С нуля до готового портфолио за 6–8 недель</strong></p>
      <CareerShowcaseGallery images={careerShowcaseImages} />
    </section>

    <CountdownTimer />

    <section className="section faq wrap" id="faq">
      <div className="faq-layout">
        <div className="faq-sidebar">
          <div className="section-title faq-side-title"><h2>Часто задаваемые</h2><strong>вопросы</strong></div>
          <aside className="countdown-consultant faq-consultant" aria-label="Консультация по обучению">
            <div className="countdown-consultant__person">
              <span className="countdown-consultant__avatar"><img src="/assets/images/faq-consultant-avatar.webp" alt="Консультант AI Creator" loading="lazy" decoding="async" /></span>
              <span><strong>Команда AI Creator</strong><small><i aria-hidden="true" />Сейчас онлайн</small></span>
            </div>
            <h3>Остались<br />вопросы?</h3>
          <p>Заполните форму — мы <strong>ответим на вопросы о программе, обучении и поддержке</strong>, а также <strong>поможем выбрать подходящий формат</strong>.</p>
            <a href="#start" data-lead-popup>Получить консультацию</a>
          </aside>
        </div>
        <div className="faq-content">
          <FaqList />
        </div>
      </div>
    </section>

    <footer className="site-footer">
      <div className="site-footer__inner wrap">
        <div className="site-footer__top">
          <div className="site-footer__brand-column">
            <a className="brand site-footer__brand" href="#top" aria-label="AI Growth Studio — на главную"><span className="brand-symbol" /><span className="brand-wordmark" /></a>
            <p>Онлайн-обучение профессии AI‑креатора для работы с брендами и бизнесом.</p>
          </div>
          <div className="site-footer__column">
            <h3>Контакты</h3>
            <a href="mailto:info@kovalenko-ai.com">info@kovalenko-ai.com</a>
            <a className="cta site-footer__callback" href="#start" data-lead-popup>Заказать звонок</a>
          </div>
          <div className="site-footer__column">
            <h3>Документы</h3>
            <Link href="/offer-aicreator">Публичная оферта</Link>
            <span>Stony LLC</span>
            <address>300 Kings Point Dr, office 1507,<br />Sunny Isles Beach, FL 33160, USA</address>
          </div>
          <div className="site-footer__column site-footer__facts">
            <h3>AI Creator</h3>
            <ul><li>Более 2 000 учениц</li><li>Более 3 000 работ</li><li>Обучение за 6–8 недель</li><li>Компания сертифицирована по европейскому стандарту</li></ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <div className="payment-marks" aria-label="Поддерживаемые платёжные системы">
            <span className="payment-mark payment-mark--visa">VISA</span>
            <span className="payment-mark payment-mark--stripe">stripe</span>
            <span className="payment-mark payment-mark--mastercard" aria-label="Mastercard"><i /><i /></span>
            <span className="payment-mark payment-mark--revolut" aria-label="Revolut">REVOLUT</span>
            <span className="payment-mark payment-mark--wise" aria-label="Wise"><i>↗</i>WISE</span>
            <span className="payment-mark payment-mark--mono" aria-label="monobank">mono</span>
            <span className="payment-mark payment-mark--paypal" aria-label="PayPal"><i>P</i><span>PayPal</span></span>
          </div>
          <p>Copyright © 2026. AI GROWTH STUDIO</p>
        </div>
      </div>
    </footer>

  </main>;
}
