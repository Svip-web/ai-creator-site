'use client';
/* oxlint-disable next/no-img-element */

import { type Dispatch, type ReactNode, type SetStateAction, type SubmitEvent, useEffect, useId, useRef, useState } from 'react';
import intlTelInput, { type Iso2, type Iti } from 'intl-tel-input';
import 'intl-tel-input/styles';
import { ArrowDownRight, CircleUserRound, GraduationCap, Handshake, Laptop, Settings, UserPlus } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { advancedProgram, faq, legalLinks, program, reviewScreenshots, services, steps, videoReviews, type VideoReviewItem } from '@/lib/content';

const DEADLINE_KEY = 'ai-creator-registration-deadline-v2';
const OFFER_DURATION_MS = ((1 * 60 + 33) * 60 + 2) * 1000;
const professionTags = ['AI-фото', 'AI-видео', 'Reels', 'Реклама', 'Соцсети'] as const;
const professionMarqueeTags = [...professionTags, ...professionTags];
const CAROUSEL_INTERVAL_MS = 3000;
const marketExampleImages = [
  '/assets/images/market-example-1.jpg',
  '/assets/images/market-example-2.jpg',
  '/assets/images/market-example-3.jpg',
  '/assets/images/market-example-4.jpg',
  '/assets/images/market-example-5.jpg',
  '/assets/images/market-example-6.jpg',
] as const;
const processStepImages = [
  '/assets/images/process-video-figma.webp',
  '/assets/images/process-step-2.webp?v=2',
  '/assets/images/process-step-3.webp?v=2',
  '/assets/images/process-step-4.webp?v=2',
] as const;
const INTEGRALEAP_SCRIPT_ID = 'integraleap-sf';
const INTEGRALEAP_SCRIPT_URL = 'https://client.integraleap.com/js/sf.js';
const INTEGRALEAP_CONFIG = {
  url: 'https://mufiksoft.com/shopifyband/amo-panel/forms.php',
  ssLink: 'https://telegram.me/aicreatorjenny_bot?start=ZGw6MzM4NzU2',
  ssDomain: 'aipashamik',
  presets: {
    smartsender: {
      title: 'Реєстрація на веб {{tomorrowDate}} — сайт №2',
      stage: '97482948',
      tag: 'Регистрация',
      product: 'Ai-creator',
      type_lead: 'Реєстрація',
      req: 'reg-web',
    },
  },
} as const;

function BrandText({ text }: { text: string }) {
  return <>{text.split(/(AI|ChatGPT)/gi).map((part, index) => {
    if (/^ai$/i.test(part)) return <span className="ai-uppercase" key={`${part}-${index}`}>AI</span>;
    if (/^chatgpt$/i.test(part)) return <span className="chatgpt-case" key={`${part}-${index}`}>ChatGPT</span>;
    return part;
  })}</>;
}

async function detectCountryByIp(): Promise<Iso2> {
  try {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (!response.ok) throw new Error('GeoJS lookup failed');
    const data = await response.json() as { country_code?: string };
    const countryCode = data.country_code?.trim().toLowerCase();
    if (countryCode && /^[a-z]{2}$/.test(countryCode)) return countryCode as Iso2;
  } catch {
    // Use the fallback service below.
  }

  try {
    const response = await fetch('https://ipapi.co/country_code/');
    if (!response.ok) throw new Error('ipapi lookup failed');
    const countryCode = (await response.text()).trim().toLowerCase();
    if (/^[a-z]{2}$/.test(countryCode)) return countryCode as Iso2;
  } catch {
    // Fall back to Ukraine when neither lookup is available.
  }

  return 'ua';
}

function useIntegraLeap() {
  useEffect(() => {
    const integraLeapWindow = window as Window & { ilfConfig?: typeof INTEGRALEAP_CONFIG };
    integraLeapWindow.ilfConfig = INTEGRALEAP_CONFIG;

    if (document.getElementById(INTEGRALEAP_SCRIPT_ID) || document.querySelector(`script[src="${INTEGRALEAP_SCRIPT_URL}"]`)) return;

    const script = document.createElement('script');
    script.id = INTEGRALEAP_SCRIPT_ID;
    script.src = INTEGRALEAP_SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
  }, []);
}
const REVEAL_SELECTOR = [
  '.hero-copy', '.hero-level', '.hero-description', '.hero-art-window', '.hero-button',
  '.bonus-badge', '.bonus > h2', '.bonus-lessons article', '.bonus > p', '.bonus .primary-button',
  '.profession-intro > h2', '.profession-card', '.profession-chips',
  '.audience-heading', '.audience-cards article',
  '.earnings-heading', '.service-card', '.client-card', '.clients-title', '.platform-row',
  '.client-source-row article', '.course-promo', '.earnings-cta',
  '.expert > h2', '.expert-photo', '.expert-facts article',
  '.program > h2', '.module', '.show-more',
  '.skills-heading', '.skills-body', '.skills-cta',
  '.process-heading', '.process-card', '.process-note',
  '.reviews-heading', '.review-carousel',
  '.certificate-heading', '.certificate-card',
  '.faq-heading', '.faq-list article', '.faq-more',
  '.payment-heading', '.payment-step', '.payment-button',
  '.application-title', '.application-request', '.application-copy', '.application-woman',
  '.application-bonus-badge', '.application-lessons figure', '.application-lead', '.application footer',
].join(', ');

function OfferTimer({ dark = false }: { dark?: boolean }) {
  const [value, setValue] = useState('01:33:02');

  useEffect(() => {
    const now = Date.now();
    const saved = Number(localStorage.getItem(DEADLINE_KEY));
    let deadline = Number.isFinite(saved) && saved > now ? saved : now + OFFER_DURATION_MS;
    localStorage.setItem(DEADLINE_KEY, String(deadline));

    const update = () => {
      const currentTime = Date.now();
      if (deadline <= currentTime) {
        const sharedDeadline = Number(localStorage.getItem(DEADLINE_KEY));
        deadline = Number.isFinite(sharedDeadline) && sharedDeadline > currentTime
          ? sharedDeadline
          : currentTime + OFFER_DURATION_MS;
        localStorage.setItem(DEADLINE_KEY, String(deadline));
      }

      const remaining = deadline - currentTime;
      const hours = Math.floor(remaining / 3_600_000);
      const minutes = Math.floor((remaining % 3_600_000) / 60_000);
      const seconds = Math.floor((remaining % 60_000) / 1000);
      setValue([hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':'));
    };

    const syncDeadline = (event: StorageEvent) => {
      if (event.key !== DEADLINE_KEY) return;
      const nextDeadline = Number(event.newValue);
      if (Number.isFinite(nextDeadline) && nextDeadline > Date.now()) deadline = nextDeadline;
    };

    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener('storage', syncDeadline);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('storage', syncDeadline);
    };
  }, []);

  return <span className={dark ? 'timer timer--dark' : 'timer'}>{value}</span>;
}

function LeadCaptureForm() {
  const phoneErrorId = useId();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const hiddenPhoneRef = useRef<HTMLInputElement>(null);
  const phoneInstanceRef = useRef<Iti | null>(null);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const input = phoneInputRef.current;
    if (!input) return;

    const instance = intlTelInput(input, {
      initialCountry: 'auto',
      useFullscreenPopup: false,
      countryOrder: ['ua'],
      excludeCountries: ['ru', 'by'],
      separateDialCode: true,
      nationalMode: true,
      autoPlaceholder: 'aggressive',
      formatAsYouType: true,
      geoIpLookup: (success) => {
        void detectCountryByIp().then(success).catch(() => success('ua'));
      },
      loadUtils: () => import('intl-tel-input/utils'),
    });
    phoneInstanceRef.current = instance;

    const resetPhoneForCountry = () => {
      input.value = '';
      if (hiddenPhoneRef.current) hiddenPhoneRef.current.value = '';
      setPhoneError('');
    };
    input.addEventListener('countrychange', resetPhoneForCountry);

    return () => {
      input.removeEventListener('countrychange', resetPhoneForCountry);
      instance.destroy();
      phoneInstanceRef.current = null;
    };
  }, []);

  const preparePhone = (event: SubmitEvent<HTMLFormElement>) => {
    const instance = phoneInstanceRef.current;
    const hiddenPhone = hiddenPhoneRef.current;
    const phone = instance?.getNumber() ?? '';

    if (!instance || !instance.isValidNumber() || !/^\+[1-9]\d{7,14}$/.test(phone)) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      if (hiddenPhone) hiddenPhone.value = '';
      setPhoneError('Введите корректный номер телефона');
      phoneInputRef.current?.focus();
      return;
    }

    if (hiddenPhone) hiddenPhone.value = phone;
    const selectedCountry = instance.getSelectedCountryData();
    const dialPrefix = selectedCountry?.dialCode ? `+${selectedCountry.dialCode}` : '';
    if (phoneInputRef.current && dialPrefix && phone.startsWith(dialPrefix)) {
      phoneInputRef.current.value = phone.slice(dialPrefix.length);
    }
    setPhoneError('');
  };

  return (
    <form data-name="smartsender" onSubmitCapture={preparePhone} noValidate className="lead-form">
      <div className="lead-form-main">
        <div className="lead-inputs">
          <label>
            <span className="phone-field">
              <input ref={phoneInputRef} type="tel" name="phone_intlTelInput" autoComplete="off" inputMode="tel" required aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? phoneErrorId : undefined} aria-label="Номер телефона" onInput={() => setPhoneError('')} />
            </span>
            <input ref={hiddenPhoneRef} type="hidden" name="phone" />
            {phoneError && <small id={phoneErrorId}>{phoneError}</small>}
          </label>
        </div>
        <button type="submit" className="form-submit"><span><CourseLabel /></span><b><img src="/assets/images/application-submit-like.svg" alt="" /></b></button>
      </div>
    </form>
  );
}

function LeadDialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lead-dialog" showCloseButton={false}>
        <DialogTitle className="sr-only">Оставить заявку</DialogTitle>
        <DialogDescription className="sr-only">Регистрация на бесплатный вебинар по профессии AI-креатора.</DialogDescription>
        <img className="lead-dialog-visual" src="/assets/images/lead-dialog-figma.png" alt="Оставь заявку на курс AI-креатора и получи два бонусных урока" />
        <DialogClose className="dialog-close" aria-label="Закрыть окно">×</DialogClose>
        <div className="lead-dialog-body">
          <h2>Зарегистрируйся бесплатно</h2>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function useAutoplayCarousel<T extends HTMLElement>(slideCount: number, staggerIndex: number, isPaused: boolean, setActiveSlide: Dispatch<SetStateAction<number>>, setSlideDirection: Dispatch<SetStateAction<-1 | 1>>) {
  const carouselRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 1] },
    );
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || slideCount < 2) return;

    let intervalId: number | undefined;
    const staggerDelay = (staggerIndex * 137) % 1200;
    const advance = () => {
      setSlideDirection(1);
      setActiveSlide((current) => (current + 1) % slideCount);
    };
    const timeoutId = window.setTimeout(() => {
      advance();
      intervalId = window.setInterval(advance, CAROUSEL_INTERVAL_MS);
    }, CAROUSEL_INTERVAL_MS + staggerDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [isPaused, isVisible, setActiveSlide, setSlideDirection, slideCount, staggerIndex]);

  return carouselRef;
}

function ServiceCard({ item, index }: { item: (typeof services)[number]; index: number }) {
  const slides = item.images?.length ? item.images : item.image ? [item.image] : [];
  const displaySlides = slides.map((image) => `${image}?v=2`);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<-1 | 1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const carouselRef = useAutoplayCarousel<HTMLElement>(slides.length, index, autoplayPaused, setActiveSlide, setSlideDirection);
  const changeSlide = (direction: -1 | 1) => {
    if (slides.length < 2) return;
    setAutoplayPaused(true);
    setSlideDirection(direction);
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <>
      <article
        ref={carouselRef}
        className={`service-card service-card--${index + 1}`}
        aria-roledescription="carousel"
        aria-label={item.title}
        data-cycle={activeSlide}
        onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart !== null) {
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 35) changeSlide(distance > 0 ? -1 : 1);
          }
          setTouchStart(null);
        }}
      >
        <button type="button" className="service-card-media" onClick={() => { setAutoplayPaused(true); setPreviewOpen(true); }} aria-label={`Увеличить изображение: ${item.title}`}>
          {displaySlides.map((image, slideIndex) => <img className={slideIndex === activeSlide ? `service-slide--active service-slide--${slideDirection === 1 ? 'next' : 'prev'}` : undefined} src={image} alt="" loading="lazy" decoding="async" key={image} />)}
        </button>
        <span className="service-card-title">{item.title}</span>
        {item.price && <b className="service-card-price">{item.price}</b>}
        <div className="service-card-arrows">
          <button type="button" className="service-arrow service-arrow--prev" onClick={() => changeSlide(-1)} aria-label="Предыдущий слайд" disabled={slides.length < 2} />
          <button type="button" className="service-arrow service-arrow--next" onClick={() => changeSlide(1)} aria-label="Следующий слайд" disabled={slides.length < 2} />
        </div>
      </article>
      <ImageCarouselDialog open={previewOpen} onOpenChange={(open) => { setPreviewOpen(open); setAutoplayPaused(open); }} images={displaySlides} activeSlide={activeSlide} setActiveSlide={setActiveSlide} label={item.title} />
    </>
  );
}

function ReviewMediaCarousel({ images = [], videos = [], label, autoplayIndex }: { images?: readonly string[]; videos?: VideoReviewItem[]; label: string; autoplayIndex: number }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<-1 | 1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideCount = videos.length || images.length;
  const activeVideo = videos[activeSlide];
  const activeImage = images[activeSlide];
  const carouselRef = useAutoplayCarousel<HTMLDivElement>(slideCount, autoplayIndex, autoplayPaused, setActiveSlide, setSlideDirection);
  const changeSlide = (direction: -1 | 1) => {
    if (slideCount < 2) return;
    setAutoplayPaused(true);
    setVideoStarted(false);
    setSlideDirection(direction);
    setActiveSlide((current) => (current + direction + slideCount) % slideCount);
  };

  return (
    <>
      <div
        ref={carouselRef}
        className={images.length ? 'review-carousel review-carousel--image' : 'review-carousel review-carousel--video'}
        aria-roledescription="carousel"
        aria-label={label}
        data-cycle={activeSlide}
        onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart !== null) {
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 35) changeSlide(distance > 0 ? -1 : 1);
          }
          setTouchStart(null);
        }}
      >
        <div className="review-media">
          {activeVideo && (
            // oxlint-disable-next-line jsx-a11y/media-has-caption -- The supplied testimonial videos do not include caption tracks.
            <video
              ref={videoRef}
              key={activeVideo.id}
              className={`review-slide review-slide--${slideDirection === 1 ? 'next' : 'prev'}`}
              src={activeVideo.src}
              poster={activeVideo.poster}
              title={activeVideo.title}
              aria-label={activeVideo.title}
              controls={videoStarted}
              playsInline
              preload="metadata"
              onPlay={() => { setVideoStarted(true); setAutoplayPaused(true); }}
              onEnded={(event) => { event.currentTarget.load(); setVideoStarted(false); }}
            />
          )}
          {activeVideo && !videoStarted && (
            <button type="button" className="review-video-play" onClick={() => { setAutoplayPaused(true); void videoRef.current?.play(); }} aria-label={`Воспроизвести: ${activeVideo.title}`}>
              <span aria-hidden="true" />
            </button>
          )}
          {activeImage && (
            <button key={activeImage} type="button" className={`review-slide review-slide--${slideDirection === 1 ? 'next' : 'prev'}`} onClick={() => { setAutoplayPaused(true); setPreviewOpen(true); }} aria-label={`Увеличить скриншот отзыва ${activeSlide + 1}`}>
              <img src={activeImage} alt={`Скриншот отзыва ${activeSlide + 1}`} loading="lazy" decoding="async" />
            </button>
          )}
        </div>
        <div className="review-navigation">
          <button type="button" className="service-arrow service-arrow--prev service-arrow--outline" onClick={() => changeSlide(-1)} aria-label="Предыдущий отзыв" disabled={slideCount < 2} />
          <button type="button" className="service-arrow service-arrow--next" onClick={() => changeSlide(1)} aria-label="Следующий отзыв" disabled={slideCount < 2} />
        </div>
      </div>
      {images.length > 0 && <ImageCarouselDialog open={previewOpen} onOpenChange={(open) => { setPreviewOpen(open); setAutoplayPaused(open); }} images={images} activeSlide={activeSlide} setActiveSlide={setActiveSlide} label={label} />}
    </>
  );
}

function MarketExamplesCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<-1 | 1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const carouselRef = useAutoplayCarousel<HTMLDivElement>(marketExampleImages.length, services.length + 2, autoplayPaused, setActiveSlide, setSlideDirection);
  const changeSlide = (direction: -1 | 1) => {
    setAutoplayPaused(true);
    setSlideDirection(direction);
    setActiveSlide((current) => (current + direction + marketExampleImages.length) % marketExampleImages.length);
  };

  return (
    <div
      ref={carouselRef}
      className="course-promo"
      aria-roledescription="carousel"
      aria-label="Примеры заказов на AI-видео"
      data-cycle={activeSlide}
      onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart !== null) {
          const distance = event.changedTouches[0].clientX - touchStart;
          if (Math.abs(distance) > 35) changeSlide(distance > 0 ? -1 : 1);
        }
        setTouchStart(null);
      }}
    >
      <div className="course-promo-image">
        <img key={marketExampleImages[activeSlide]} className={`course-promo-slide course-promo-slide--${slideDirection === 1 ? 'next' : 'prev'}`} src={marketExampleImages[activeSlide]} alt={`Пример предложения услуги AI-видеокреатора ${activeSlide + 1}`} loading="lazy" decoding="async" />
      </div>
      <div className="course-promo-arrows">
        <button type="button" className="service-arrow service-arrow--prev service-arrow--outline" onClick={() => changeSlide(-1)} aria-label="Предыдущий пример" />
        <button type="button" className="service-arrow service-arrow--next" onClick={() => changeSlide(1)} aria-label="Следующий пример" />
      </div>
      <p>При регулярной работе доход AI-<b>креатора может достигать 1000–2000€ в месяц и выше.</b></p>
    </div>
  );
}

function PrimaryButton({ children, onClick, className = '' }: { children: ReactNode; onClick: () => void; className?: string }) {
  return <button type="button" className={`primary-button ${className}`} onClick={onClick}><span>{children}</span><b aria-hidden="true">↗</b></button>;
}

function ImageCarouselDialog({ open, onOpenChange, images, activeSlide, setActiveSlide, label }: { open: boolean; onOpenChange: (open: boolean) => void; images: readonly string[]; activeSlide: number; setActiveSlide: Dispatch<SetStateAction<number>>; label: string }) {
  const [slideDirection, setSlideDirection] = useState<-1 | 1>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const changeSlide = (direction: -1 | 1) => {
    if (images.length < 2) return;
    setSlideDirection(direction);
    setActiveSlide((current) => (current + direction + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="image-preview-dialog"
        onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart !== null) {
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 35) changeSlide(distance > 0 ? -1 : 1);
          }
          setTouchStart(null);
        }}
      >
        <DialogTitle className="image-preview-title">{label}</DialogTitle>
        <img key={images[activeSlide]} className={`preview-slide preview-slide--${slideDirection === 1 ? 'next' : 'prev'}`} src={images[activeSlide]} alt={`${label}, изображение ${activeSlide + 1}`} />
        <div className="image-preview-navigation">
          <button type="button" className="service-arrow service-arrow--prev service-arrow--outline" onClick={() => changeSlide(-1)} aria-label="Предыдущее изображение" disabled={images.length < 2} />
          <span>{activeSlide + 1} / {images.length}</span>
          <button type="button" className="service-arrow service-arrow--next" onClick={() => changeSlide(1)} aria-label="Следующее изображение" disabled={images.length < 2} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CourseLabel() {
  return <>Хочу на <em className="cta-course">курс</em></>;
}

function EmphasizedText({ text, emphasis }: { text: string; emphasis: string[] }) {
  const parts: ReactNode[] = [];
  let remaining = text;

  emphasis.forEach((phrase, index) => {
    const phraseIndex = remaining.indexOf(phrase);
    if (phraseIndex < 0) return;
    if (phraseIndex > 0) parts.push(remaining.slice(0, phraseIndex));
    parts.push(<b key={`${phrase}-${index}`}>{phrase}</b>);
    remaining = remaining.slice(phraseIndex + phrase.length);
  });

  parts.push(remaining);
  return <>{parts}</>;
}

function LegalLabel({ href, children }: { href: string; children: ReactNode }) {
  return href ? <a href={href}>{children}</a> : <span>{children}</span>;
}

export default function Home() {
  useIntegraLeap();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);
  const [programExpanded, setProgramExpanded] = useState(false);
  const programToggleRef = useRef<HTMLButtonElement>(null);
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleFaq, setVisibleFaq] = useState(3);
  const faqToggleRef = useRef<HTMLButtonElement>(null);
  const [pastBonus, setPastBonus] = useState(false);
  const [applicationReached, setApplicationReached] = useState(false);
  const [ctaBlockerVisible, setCtaBlockerVisible] = useState(false);
  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>('.sticky-cta-sentinel');
    const applicationTimer = document.querySelector<HTMLElement>('.application-timer');
    const updateThreshold = () => {
      setPastBonus(Boolean(sentinel && sentinel.getBoundingClientRect().top <= 46));
      setApplicationReached(Boolean(applicationTimer && applicationTimer.getBoundingClientRect().top <= window.innerHeight));
    };
    updateThreshold();
    window.addEventListener('scroll', updateThreshold, { passive: true });
    window.addEventListener('resize', updateThreshold);

    const visible = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting && entry.intersectionRatio >= .15));
      setCtaBlockerVisible([...visible.values()].some(Boolean));
    }, { threshold: [0, .15, 1] });

    document.querySelectorAll('.hero-button, .primary-button, .earnings-cta, .skills-cta, .payment-button, .form-submit').forEach((button) => {
      visible.set(button, false);
      observer.observe(button);
    });

    return () => {
      window.removeEventListener('scroll', updateThreshold);
      window.removeEventListener('resize', updateThreshold);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    targets.forEach((target, index) => {
      target.classList.add('scroll-reveal');
      target.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('scroll-reveal--visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .1, rootMargin: '0px 0px -8% 0px' });

    const frame = window.requestAnimationFrame(() => targets.forEach((target) => observer.observe(target)));
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const restoreCollapsedButton = (button: HTMLButtonElement | null) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => button?.scrollIntoView({ behavior: 'smooth', block: 'center' })));
  };

  return (
    <main className="site-shell">
      <div className={applicationReached ? 'offer-strip offer-strip--hidden' : 'offer-strip'} aria-label="Бесплатная регистрация закроется через" aria-hidden={applicationReached || undefined}>
        <div className="offer-track">
          <div className="offer-segment">
            <span>Бесплатная регистрация закроется через: <OfferTimer /></span>
            <i aria-hidden="true" />
            <span aria-hidden="true">Бесплатная регистрация закроется через: <OfferTimer /></span>
            <i aria-hidden="true" />
          </div>
          <div className="offer-segment" aria-hidden="true">
            <span>Бесплатная регистрация закроется через: <OfferTimer /></span>
            <i />
            <span>Бесплатная регистрация закроется через: <OfferTimer /></span>
            <i />
          </div>
        </div>
      </div>

      <section className="hero" id="top">
        <header className="brandbar">
          <a className="brand-lockup" href="#top">
            <strong><i>AI </i>CREATOR</strong>
            <small>by ЖЕНЯ КОВАЛЕНКО</small>
          </a>
          <span className="online-status"><i aria-hidden="true" />Онлайн-формат</span>
          <nav className="desktop-nav" aria-label="Навигация по странице">
            <a href="#audience">Для кого</a>
            <a href="#reviews">Отзывы</a>
            <a href="#program">О курсе</a>
            <a href="#expert">Об эксперте</a>
            <a href="#application">Записаться</a>
          </nav>
        </header>
        <div className="desktop-hero-copy desktop-only">
          <p>Освойте профессию AI-креатора</p>
          <h1>Создавайте AI-фото и видео для брендов и зарабатывайте</h1>
          <strong>1000–2000€ онлайн</strong>
          <div className="desktop-social-proof">
            <span className="desktop-proof-avatars" aria-hidden="true">
              <img src="/assets/images/review-screenshot-1.webp?v=2" alt="" />
              <img src="/assets/images/review-screenshot-2.webp?v=2" alt="" />
              <img src="/assets/images/review-screenshot-3.webp?v=2" alt="" />
              <img src="/assets/images/review-screenshot-4.webp?v=2" alt="" />
            </span>
            <small>Более 2 000 девушек уже прошли обучение и начали создавать AI-контент по системе Жени Коваленко.</small>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">ПРОФЕССИЯ</p>
          <h1><i className="plaque-text">AI-креатор</i></h1>
        </div>
        <span className="hero-level">С НУЛЯ ДО PRO</span>
        <div className="hero-description">
          <img src="/assets/images/hero-description-shape.svg" alt="" />
          <span className="hero-corner" aria-hidden="true" />
          <p>Создавай фото и видео для брендов с помощью нейросетей и <b>собери портфолио из 10+ проектов за 6–8 недель.</b></p>
        </div>
        <div className="hero-art-window" aria-hidden="true">
          <div className="hero-collage">
            <img className="hero-person" src="/assets/images/hero-person.webp" alt="" fetchPriority="high" />
            <span className="hero-person-name-cover" aria-hidden="true" />
            <span className="hero-person-name">Женя<br />Коваленко</span>
            <span className="hero-tile hero-tile--sunglasses"><img src="/assets/images/hero-tile-sunglasses.webp" alt="" /></span>
            <span className="hero-tile hero-tile--paris"><img src="/assets/images/hero-tile-paris.webp" alt="" /></span>
            <span className="hero-tile hero-tile--car"><img src="/assets/images/hero-tile-car.webp" alt="" /></span>
            <span className="hero-tile hero-tile--statue"><img src="/assets/images/hero-tile-statue.webp" alt="" /></span>
          </div>
        </div>
        <button type="button" className="hero-button" onClick={() => setDialogOpen(true)}>
          <span><CourseLabel /></span>
          <i><img src="/assets/images/heart.svg" alt="" /></i>
        </button>
      </section>

      <section className="bonus section-pad">
        <div className="bonus-badge">Твой бонус <img className="bonus-badge-icon" src="/assets/images/bonus-badge.svg" alt="" /></div>
        <h2>Два бесплатных видео<br />Как начать зарабатывать<br /><span>на AI-креаторстве</span></h2>
        <div className="bonus-lessons">
          <article><img src="/assets/images/lesson-1.webp" alt="Вводный урок" loading="lazy" decoding="async" /><div><span>Урок 1</span><h3>Кто такие<br />AI-креаторы</h3></div></article>
          <article><img src="/assets/images/lesson-2.webp" alt="Вводный урок" loading="lazy" decoding="async" /><div><span>Урок 2</span><h3>Кто и за что<br />платит<br />AI-креаторам</h3></div></article>
        </div>
        <p>Разберись, как устроена<br />профессия и на чём<br />зарабатывают AI-креаторы.</p>
        <PrimaryButton onClick={() => setDialogOpen(true)}><CourseLabel /></PrimaryButton>
      </section>

      <div className="sticky-cta-sentinel" aria-hidden="true" />

      <div className="spacer spacer--170 profession-intro"><h2>Кто такой<br /><span><i className="plaque-text">AI-креатор</i></span></h2></div>

      <section className="profession section-pad">
        <article className="profession-card profession-card--hero">
          <h3>AI-креатор</h3>
          <p>это специалист, <b>который создаёт изображения, видео, рекламу</b> и контент для брендов с помощью нейросетей.</p>
          <div className="profession-card-media" aria-hidden="true">
            <img className="profession-card-visual profession-card-visual--1" src="/assets/images/profession-visual-1.webp" alt="" loading="lazy" decoding="async" />
            <img className="profession-card-visual profession-card-visual--2" src="/assets/images/profession-visual-2.webp" alt="" loading="lazy" decoding="async" />
            <img className="profession-card-visual profession-card-visual--3" src="/assets/images/profession-visual-3.webp" alt="" loading="lazy" decoding="async" />
          </div>
          <p>От AI-фотосессий и карточек товаров до Reels и рекламных роликов — <b>везде, где бренду нужен визуальный контент,</b> работает AI-креатор.</p>
        </article>
        <div className="profession-chips" aria-hidden="true">
          <div className="profession-chips-track">
            {[0, 1].map((segment) => (
              <div className="profession-chips-segment" key={segment}>
                {professionMarqueeTags.map((tag, index) => <span key={`${segment}-${tag}-${index}`}>{tag}</span>)}
              </div>
            ))}
          </div>
        </div>
        <article className="profession-card profession-card--why">
          <div className="profession-card-heading">
            <h3>Почему профессия востребована</h3>
            <span className="profession-card-icon"><img src="/assets/images/profession-work.svg" alt="" /></span>
          </div>
          <p>Брендам ежедневно нужен новый контент, а <b>AI позволяет создавать его быстрее и доступнее</b> классических съёмок. Поэтому спрос на AI-креаторов <b>продолжает расти.</b></p>
        </article>
        <article className="profession-card profession-card--course">
          <div className="profession-course-visual" aria-hidden="true">
            <img className="profession-course-image" src="/assets/images/creator-layer-woman.png" alt="" loading="lazy" decoding="async" />
            <span className="profession-course-layer profession-course-layer--fairy"><img src="/assets/images/creator-layer-fairy.png" alt="" loading="lazy" decoding="async" /></span>
            <span className="profession-course-layer profession-course-layer--scheme"><img src="/assets/images/creator-layer-scheme.png" alt="" loading="lazy" decoding="async" /></span>
            <span className="profession-course-layer profession-course-layer--bag"><img src="/assets/images/creator-layer-bag.png" alt="" loading="lazy" decoding="async" /></span>
          </div>
          <div className="profession-course-copy">
            <p className="profession-course-highlight"><b>На нашем курсе ты <span>научишься создавать контент,</span> который бренды готовы покупать.</b></p>
            <p>Шаг за шагом ты освоишь ChatGPT, создание AI-фото и видео, монтаж, работу с техническим заданием, портфолио и <b>поиск первых клиентов.</b></p>
          </div>
        </article>
        <article className="profession-card profession-card--result">
          <div className="profession-card-heading">
            <h3>За 6–8 недель</h3>
            <span className="profession-card-icon"><img src="/assets/images/profession-calendar.svg" alt="" /></span>
          </div>
          <p>Ты создашь 10+ проектов и оформишь их в портфолио, освоишь основные AI-инструменты и <b>подготовишься к выполнению первых коммерческих заказов.</b></p>
        </article>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="audience section-pad" id="audience">
        <div className="audience-heading"><h2>Для кого курс<br /><span><i className="plaque-text">MUST-HAVE</i></span></h2><b>В 2026 ГОДУ</b></div>
        <div className="audience-cards">
          <article><div className="audience-card-media"><span /><img src="/assets/images/audience-beginner-struggle.png" alt="Девушка осваивает сложный интерфейс нейросети" loading="lazy" decoding="async" /></div><div className="audience-card-copy"><h3>Новичкам в нейросетях</h3><p>Освой востребованную онлайн-профессию с нуля — <b>без опыта в дизайне и технических знаний.</b></p></div></article>
          <article><div className="audience-card-media"><span /><img src="/assets/images/audience-emigrant-struggle.png" alt="Женщина ищет возможности для удалённой работы после переезда" loading="lazy" decoding="async" /></div><div className="audience-card-copy"><h3>Женщинам в эмиграции</h3><p>Создавай контент для брендов и <b>зарабатывай удалённо</b> без знания местного языка и подтверждения диплома.</p></div></article>
          <article><div className="audience-card-media"><span /><img src="/assets/images/audience-mother-struggle.png" alt="Мама совмещает обучение за ноутбуком с заботой о ребёнке" loading="lazy" decoding="async" /></div><div className="audience-card-copy"><h3>Мамам в декрете</h3><p>Обучайся в удобном темпе и развивай новый источник дохода, <b>совмещая его с семьёй и детьми.</b></p></div></article>
          <article><div className="audience-card-media"><span /><img src="/assets/images/audience-figma-4.webp" alt="" loading="lazy" decoding="async" /></div><div className="audience-card-copy"><h3>Блогерам, фрилансерам и smm-специалистам</h3><p>Усиль свои проекты с помощью AI, <b>создавай контент быстрее</b> и предлагай клиентам новые услуги.</p></div></article>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="earnings">
        <div className="earnings-content">
          <div className="earnings-heading">
            <h2>Сколько может<br />зарабатывать</h2>
            <strong><i className="plaque-text"><span>AI</span><span className="earnings-title-lower">-креатор</span></i></strong>
            <b>примеры стоимости услуг</b>
          </div>
          <div className="earnings-services">
            <div className="services-stack">
              {services.slice(0, servicesExpanded ? services.length : 5).map((item, index) => <ServiceCard item={item} index={index} key={item.title} />)}
            </div>
            <button ref={servicesToggleRef} className={servicesExpanded ? 'show-more show-more--expanded earnings-services-toggle' : 'show-more earnings-services-toggle'} type="button" aria-expanded={servicesExpanded} onClick={() => {
              if (!servicesExpanded) {
                setServicesExpanded(true);
                return;
              }
              setServicesExpanded(false);
              restoreCollapsedButton(servicesToggleRef.current);
            }}><span>{servicesExpanded ? 'Скрыть' : 'Показать больше'}</span><img src="/assets/images/show-more-icon.svg" alt="" /></button>
            <div className="earnings-information">
              <div className="client-card">
                <span><Handshake size={29} strokeWidth={2.4} aria-hidden="true" /></span>
                <p>Брендам постоянно нужны изображения и видео для социальных сетей, сайтов и рекламы. <b>Поэтому AI-креатор может брать разовые проекты</b> или выстраивать постоянное сотрудничество.</p>
              </div>
              <div className="earnings-details">
                <div className="clients-block">
                  <div className="clients-header">
                    <h3 className="clients-title">Клиентов можно<br /><span><i className="plaque-text">находить</i></span></h3>
                    <div className="client-sources">
                      <div className="platform-row">
                        <div><img src="/assets/images/platform-instagram.webp" alt="Instagram" loading="lazy" decoding="async" /></div>
                        <div><img src="/assets/images/platform-upwork.webp" alt="Upwork" loading="lazy" decoding="async" /></div>
                        <div><img src="/assets/images/platform-tiktok.svg" alt="TikTok" loading="lazy" decoding="async" /></div>
                      </div>
                      <div className="client-source-row">
                        <article><span><img src="/assets/images/bulb-icon.svg" alt="" /></span><p>Прямые обращения к брендам</p></article>
                        <article><span><img src="/assets/images/agency-icon.webp" alt="" loading="lazy" decoding="async" /></span><p>Заказы от агентства после прохождения курса</p></article>
                      </div>
                    </div>
                  </div>
                  <MarketExamplesCarousel />
                </div>
                <button type="button" className="earnings-cta" onClick={() => setDialogOpen(true)}><span><CourseLabel /></span><i><img src="/assets/images/like-icon.svg" alt="" /></i></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="expert" id="expert">
        <h2>Эксперт курса</h2>
        <div className="expert-content">
          <div className="expert-photo">
            <span className="expert-name-bg" aria-hidden="true" />
            <img src="/assets/images/expert-figma.webp" alt="Женя Коваленко" loading="lazy" decoding="async" />
            <div className="expert-name"><i aria-hidden="true" /><span>Женя Коваленко</span></div>
          </div>
          <div className="expert-facts">
            <article><span className="expert-check"><img src="/assets/images/expert-check.svg" alt="" /></span><p>AI-креатор, наставник и <b>основатель AI-агенции</b> в Испании</p></article>
            <article><span className="expert-check"><img src="/assets/images/expert-check.svg" alt="" /></span><p><b>Более 3 лет работает с нейросетями</b> и более 1,5 лет стабильно зарабатывает на AI- и UGC-контенте.</p></article>
            <article><span className="expert-check"><img src="/assets/images/expert-check.svg" alt="" /></span><p><b>Обучила более 2 000 девушек.</b> Вместе с командой создала свыше 3 000 единиц коммерческого контента.</p></article>
          </div>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className={programExpanded ? 'program program--expanded' : 'program'} id="program">
        <h2>Программа<br />обучения</h2>
        <div className="program-list">
          {program.slice(0, programExpanded ? program.length : 4).map((module, index) => {
            const expanded = openModule === index;
            return (
              <article key={`${module.number}-${index}`} className={expanded ? 'module module--open' : 'module'}>
                <button type="button" className="module-toggle" aria-label={`${expanded ? 'Скрыть' : 'Показать'} ${module.title}`} aria-expanded={expanded} aria-controls={`module-details-${index}`} onClick={() => setOpenModule(expanded ? null : index)}>
                  <span className="module-meta"><b>модуль {index + 1}</b><img src="/assets/images/module-line.svg" alt="" /></span>
                  <span className="module-title-row"><h3><BrandText text={module.title} /></h3><b className="module-plus" aria-hidden="true"><i /><i /></b></span>
                </button>
                {expanded && <div className="module-details" id={`module-details-${index}`}><p>{module.description}</p></div>}
              </article>
            );
          })}
          {programExpanded && <article className="advanced-program"><h3>{advancedProgram.title}</h3><ul>{advancedProgram.items.map((item) => <li key={item}><i><img src="/assets/images/skills-check.svg" alt="" /></i><span>{item}</span></li>)}</ul></article>}
        </div>
        <button ref={programToggleRef} className={programExpanded ? 'show-more show-more--expanded' : 'show-more'} type="button" aria-expanded={programExpanded} onClick={() => {
          if (!programExpanded) {
            setProgramExpanded(true);
            return;
          }
          setProgramExpanded(false);
          setOpenModule(null);
          restoreCollapsedButton(programToggleRef.current);
        }}><span>{programExpanded ? 'Скрыть' : 'Показать больше'}</span><img src="/assets/images/show-more-icon.svg" alt="" /></button>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="skills">
        <div className="skills-heading"><h2>Какие навыки ты<br />получишь после</h2><strong><i className="plaque-text">обучения</i></strong></div>
        <div className="skills-body">
          <div className="skills-card" />
          <b className="skills-badge">ты после курса</b>
          <div className="skills-content">
            <div className="skills-main">
              <div className="skills-profile">
                <div className="skills-profile-row">
                  <div className="skills-avatar"><span className="skills-avatar-photo"><img src="/assets/images/skills-profile-v2.png" alt="" loading="lazy" decoding="async" /></span><img className="skills-status" src="/assets/images/skills-status.svg" alt="" /></div>
                  <h3>AI-креатор для<br />брендов</h3>
                </div>
                <img className="skills-divider" src="/assets/images/skills-divider.svg" alt="" />
              </div>
              <div className="skills-list">
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Создаю <b>реалистичные AI</b>-фотосессии</p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Делаю <b>товарные визуалы</b> и карточки для брендов</p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Создаю <b>рекламные AI-видео</b></p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Делаю <b>Reels и TikTok-ролики</b> без съёмок</p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Пишу промпты, тексты и сценарии с <b>ChatGPT</b></p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p><b>Разрабатываю контент</b> для социальных сетей</p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Создаю <b>цифровые продукты</b> с помощью AI</p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Работаю с <b>техническим заданием клиента</b></p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p>Собираю и оформляю <b>профессиональное портфолио</b></p></div>
                <div><span><img src="/assets/images/skills-check.svg" alt="" /></span><p><b>Нахожу клиентов</b> и рассчитываю стоимость проектов</p></div>
              </div>
            </div>
            <button type="button" className="skills-cta" onClick={() => setDialogOpen(true)}><span><CourseLabel /></span><i><img src="/assets/images/skills-like.svg" alt="" /></i></button>
          </div>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="process">
        <div className="process-heading"><h2>Как проходит</h2><strong><i className="plaque-text">обучение</i></strong></div>
        <div className="process-card">
          <div className="process-video"><img key={processStepImages[activeStep]} className={`process-step-image process-step-image--${activeStep + 1}`} src={processStepImages[activeStep]} alt={steps[activeStep].title} loading="lazy" decoding="async" /></div>
          <div className="process-steps">
            <div className="step-tabs" role="tablist" aria-label="Этапы обучения">{steps.map((step, index) => <button key={step.number} type="button" role="tab" aria-selected={activeStep === index} aria-controls="process-details" onClick={() => setActiveStep(index)}>Шаг {index + 1}</button>)}</div>
            <div className="process-details" role="tabpanel" id="process-details" tabIndex={0}><h3>{steps[activeStep].title}</h3><p><EmphasizedText text={steps[activeStep].text} emphasis={steps[activeStep].emphasis} /></p></div>
          </div>
        </div>
        <aside className="process-note">
          <span className="process-note-icon" aria-hidden="true">★</span>
          <p><b>Лучшим ученицам</b> мы передаём <b>реальные заказы</b> и предлагаем <b>работу в нашей AI-агенции в Испании.</b></p>
        </aside>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="reviews" id="reviews">
        <div className="reviews-inner">
          <div className="reviews-heading"><h2>Что говорят</h2><strong><i className="plaque-text">выпускницы,</i></strong><p><span>которые уже зарабатывают</span><span>на AI-контенте?</span></p></div>
          <div className="reviews-content">
            <ReviewMediaCarousel videos={videoReviews} label="Видеоотзывы выпускниц" autoplayIndex={services.length} />
            <ReviewMediaCarousel images={reviewScreenshots} label="Скриншоты отзывов выпускниц" autoplayIndex={services.length + 1} />
          </div>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="certificate">
        <div className="certificate-heading">
          <h2>Карьерная</h2>
          <strong><i className="plaque-text">поддержка</i></strong>
        </div>
        <div className="certificate-card">
          <div className="certificate-info">
            <div className="certificate-description">
              <div className="certificate-title">
                <h3>Сертификат<br />AI-креатора</h3>
                <span><img src="/assets/images/certificate-document.svg" alt="" /></span>
              </div>
              <p>После успешного завершения обучения ты <b>получишь сертификат, подтверждающий прохождение курса и полученные навыки.</b><br />Его можно добавить в портфолио, резюме или профиль LinkedIn.</p>
            </div>
            <img className="certificate-image" src="/assets/images/certificate-figma.webp" alt="Сертификат AI Creator" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className={visibleFaq === faq.length || openFaq !== null ? 'faq faq--expanded' : 'faq'}>
        <div className="faq-heading"><h2>Популярные</h2><strong><i className="plaque-text">вопросы</i></strong></div>
        <div className="faq-list">{faq.slice(0, visibleFaq).map((item, index) => { const expanded = openFaq === index; return <article key={item.question}><button type="button" aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(expanded ? null : index)}><span>{item.question}</span><b>{expanded ? '−' : '+'}</b></button>{expanded && <p id={`faq-answer-${index}`}>{item.answer}</p>}</article>; })}</div>
        <button ref={faqToggleRef} type="button" className={visibleFaq === faq.length ? 'faq-more faq-more--expanded' : 'faq-more'} aria-expanded={visibleFaq === faq.length} onClick={() => {
          if (visibleFaq !== faq.length) {
            setVisibleFaq(faq.length);
            return;
          }
          setVisibleFaq(3);
          setOpenFaq(null);
          restoreCollapsedButton(faqToggleRef.current);
        }}><span>{visibleFaq === faq.length ? 'Скрыть' : 'Показать больше'}</span><img src="/assets/images/faq-show-more.svg" alt="" /></button>
      </section>

      <div className="spacer section-gap" aria-hidden="true" />

      <section className="payment">
        <div className="payment-content">
          <div className="payment-heading"><h2>Как попасть на<br />бесплатный</h2><strong><i className="plaque-text">вебинар?</i></strong></div>
          <div className="payment-steps">
            <div className="payment-steps-inner">
              <article className="payment-step payment-step--one"><div><span>Шаг 1</span><img src="/assets/images/payment-document.svg" alt="" /></div><h3>Зарегистрируйся бесплатно</h3><p>Заполни короткую форму ниже, пока регистрация открыта.</p></article>
              <span className="payment-divider"><img src="/assets/images/payment-divider.svg" alt="" /></span>
              <article className="payment-step payment-step--two"><div><span>Шаг 2</span><img src="/assets/images/payment-user.svg" alt="" /></div><h3>Забери 2 бесплатных урока и бонусы</h3><p>Сразу после регистрации ты получишь доступ к полезным материалам по AI-креаторству.</p></article>
              <span className="payment-divider"><img src="/assets/images/payment-divider.svg" alt="" /></span>
              <article className="payment-step payment-step--three"><div><span>Шаг 3</span><img src="/assets/images/payment-like.svg" alt="" /></div><h3>Приходи на живой вебинар</h3><p>В тёплой атмосфере пообщаемся, разберём профессию AI-креатора и поймём, как на ней можно зарабатывать.</p></article>
              <span className="payment-divider"><img src="/assets/images/payment-divider.svg" alt="" /></span>
              <button type="button" className="payment-button" onClick={() => setDialogOpen(true)}><span>Зарегистрироваться бесплатно</span><i><UserPlus size={22} strokeWidth={2.4} aria-hidden="true" /></i></button>
            </div>
          </div>
        </div>
      </section>

      <section className="application" id="application">
        <div className="application-main">
          <div className="application-hero">
            <h2>Как новичку<br />зарабатывать на<br /><mark>AI-контенте для брендов</mark></h2>
            <div className="application-benefits" aria-label="Преимущества обучения">
              <span><GraduationCap aria-hidden="true" />С полного нуля</span>
              <span><Settings aria-hidden="true" />Без технических знаний</span>
              <span><Laptop aria-hidden="true" />Из любой точки мира</span>
              <span><CircleUserRound aria-hidden="true" />В любом возрасте</span>
            </div>
            <div className="application-copy"><ArrowDownRight aria-hidden="true" /><p><b>Освой востребованную профессию AI-креатора</b>, создавай фото и видео для брендов и работай онлайн из любой точки мира.</p></div>
            <div className="application-woman"><img src="/assets/images/application-woman.webp" alt="Женя Коваленко" loading="lazy" decoding="async" /></div>
          </div>
          <div className="application-panel">
            <div className="application-panel-inner">
              <div className="application-bonus">
                <div className="application-bonus-badge"><span>Твой бонус</span><img src="/assets/images/application-gift.svg" alt="" /><i>х2</i></div>
                <h3>Два бесплатных видео<br />Как начать зарабатывать<br /><span>на AI-креаторстве</span></h3>
                <div className="application-lessons">
                  <article>
                    <figure><img className="application-laptop-base" src="/assets/images/application-laptop-base.svg" alt="" /><img className="application-laptop-shadow" src="/assets/images/application-laptop-shadow.webp" alt="" loading="lazy" decoding="async" /><img className="application-laptop" src="/assets/images/application-laptop.webp" alt="" loading="lazy" decoding="async" /><img className="application-lesson-screen" src="/assets/images/application-lesson-2.webp" alt="" loading="lazy" decoding="async" /></figure>
                    <div><span>Урок 1</span><p>Кто такие<br />AI-креаторы</p></div>
                  </article>
                  <article>
                    <figure><img className="application-laptop-base" src="/assets/images/application-laptop-base.svg" alt="" /><img className="application-laptop-shadow" src="/assets/images/application-laptop-shadow.webp" alt="" loading="lazy" decoding="async" /><img className="application-laptop" src="/assets/images/application-laptop.webp" alt="" loading="lazy" decoding="async" /><img className="application-lesson-screen" src="/assets/images/application-lesson-1.webp" alt="" loading="lazy" decoding="async" /></figure>
                    <div><span>Урок 2</span><p>Кто и за что<br />платит AI-<br />креаторам</p></div>
                  </article>
                </div>
              </div>
              <div className="application-timer"><div className="application-timer-track"><p>Бесплатная регистрация закроется через: <OfferTimer /></p><img src="/assets/images/application-ticker-divider.svg" alt="" /><p>Бесплатная регистрация закроется через: <OfferTimer /></p></div></div>
              <div className="application-lead">
                <h3>Регистрируйся<br />прямо сейчас <span>и получи 2 бесплатных</span><i>урока</i></h3>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
        <footer>
          <a className="footer-logo" href="#top"><span><i>AI </i>CREATOR</span><b>by ЖЕНЯ КОВАЛЕНКО</b></a>
          <div className="legal"><LegalLabel href={legalLinks.privacy}>политика конфиденциальности</LegalLabel><span>info@kovalenko-ai.com</span><LegalLabel href={legalLinks.refunds}>Copyright © 2026. AI CREATOR.</LegalLabel></div>
          <div className="application-payment-logos"><img src="/assets/images/application-payment-logos.webp" alt="Visa, Stripe, Mastercard, Revolut и Wise" loading="lazy" decoding="async" /></div>
        </footer>
      </section>
      <button type="button" className={pastBonus && !ctaBlockerVisible && !dialogOpen ? 'sticky-course-button sticky-course-button--visible' : 'sticky-course-button'} onClick={() => setDialogOpen(true)} aria-hidden={pastBonus && !ctaBlockerVisible && !dialogOpen ? undefined : true} tabIndex={pastBonus && !ctaBlockerVisible && !dialogOpen ? 0 : -1}>
        <span><CourseLabel /></span><i><img src="/assets/images/heart.svg" alt="" /></i>
      </button>

      <LeadDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <LeadCaptureForm />
      </LeadDialog>
    </main>
  );
}
