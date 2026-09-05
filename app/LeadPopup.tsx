'use client';

/* oxlint-disable next/no-img-element */

import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import intlTelInput, { type Iso2, type Iti } from 'intl-tel-input';
import 'intl-tel-input/styles';

const formConfig = {
  url: 'https://mufiksoft.com/shopifyband/amo-panel/forms.php',
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
};

const telegramEndpoint = process.env.NEXT_PUBLIC_TELEGRAM_ENDPOINT || '/api/telegram-lead';

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
    if (!response.ok) throw new Error('IP API lookup failed');
    const countryCode = (await response.text()).trim().toLowerCase();
    if (/^[a-z]{2}$/.test(countryCode)) return countryCode as Iso2;
  } catch {
    // Fall back to Ukraine when neither lookup is available.
  }

  return 'ua';
}

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const hiddenPhoneRef = useRef<HTMLInputElement>(null);
  const phoneInstanceRef = useRef<Iti | null>(null);
  const isConsultation = /консультац/i.test(source);

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

  useEffect(() => {
    const appWindow = window as Window & {
      ilfConfig?: typeof formConfig;
      IlPrepareForm?: (data: Record<string, unknown>) => Promise<Record<string, unknown>>;
      IlAfterForm?: (data: Record<string, unknown>) => Promise<Record<string, unknown> | false>;
    };
    appWindow.ilfConfig = formConfig;
    appWindow.IlPrepareForm = async (data) => {
      setSubmitting(true);
      setSubmitError('');
      return data;
    };
    appWindow.IlAfterForm = async (data) => {
      setSubmitting(false);

      if (typeof data.error === 'string' && data.error) {
        setSubmitError('Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.');
        return false;
      }

      try {
        const telegramResponse = await fetch(telegramEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!telegramResponse.ok) console.error('Telegram notification failed');
      } catch {
        console.error('Telegram notification failed');
      }

      setSubmitted(true);
      return data;
    };

    if (!document.getElementById('integraleap-sf')) {
      const script = document.createElement('script');
      script.id = 'integraleap-sf';
      script.src = 'https://client.integraleap.com/js/sf.js';
      script.async = true;
      document.head.appendChild(script);
    }

    const openFromButton = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trigger = target?.closest<HTMLElement>('.cta, .header-actions a');
      if (!trigger) return;
      event.preventDefault();
      setSource(trigger.innerText.replace(/\s+/g, ' ').trim());
      setEmailError('');
      setPhoneError('');
      setSubmitError('');
      setSubmitted(false);
      setSubmitting(false);
      setOpen(true);
      window.setTimeout(() => emailRef.current?.focus(), 100);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('click', openFromButton);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('click', openFromButton);
      document.removeEventListener('keydown', closeOnEscape);
      delete appWindow.IlPrepareForm;
      delete appWindow.IlAfterForm;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const validate = (event: SyntheticEvent<HTMLFormElement>) => {
    const email = emailRef.current?.value.trim() ?? '';
    const phoneInstance = phoneInstanceRef.current;
    const phone = phoneInstance?.getNumber() ?? '';
    let firstInvalid: HTMLInputElement | null = null;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Введите корректный email, например name@example.com');
      firstInvalid = emailRef.current;
    } else {
      setEmailError('');
    }

    if (!phoneInstance || !phoneInstance.isValidNumber() || !/^\+[1-9]\d{7,14}$/.test(phone)) {
      setPhoneError('Введите корректный номер телефона');
      if (!firstInvalid) firstInvalid = phoneInputRef.current;
      if (hiddenPhoneRef.current) hiddenPhoneRef.current.value = '';
    } else {
      setPhoneError('');
      if (hiddenPhoneRef.current) hiddenPhoneRef.current.value = phone;
      const selectedCountry = phoneInstance.getSelectedCountryData();
      const dialPrefix = selectedCountry?.dialCode ? `+${selectedCountry.dialCode}` : '';
      if (phoneInputRef.current && dialPrefix && phone.startsWith(dialPrefix)) {
        phoneInputRef.current.value = phone.slice(dialPrefix.length);
      }
    }

    if (firstInvalid) {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      firstInvalid.focus();
    }
  };

  return (
    <div className={open ? 'lead-popup lead-popup--open' : 'lead-popup'} role="presentation" aria-hidden={!open} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <dialog className="lead-popup__dialog" open={open} aria-labelledby="lead-popup-title">
        <button className="lead-popup__close" type="button" onClick={() => setOpen(false)} aria-label="Закрыть окно">×</button>
        <div className="lead-popup__body">
          <span className="lead-popup__eyebrow">AI CREATOR</span>
          {submitted ? <>
            <h2 id="lead-popup-title">Спасибо за заявку!</h2>
            <p>Мы получили ваши данные и скоро свяжемся с вами.</p>
            <button className="lead-popup__success-close" type="button" onClick={() => setOpen(false)}>Закрыть</button>
          </> : <>
            <h2 id="lead-popup-title">{isConsultation ? 'Получите консультацию' : 'Оставьте заявку'}</h2>
            <p>{isConsultation
              ? 'Введите email и номер телефона — мы ответим на вопросы и поможем выбрать подходящий формат обучения.'
              : 'Введите email и номер телефона — мы свяжемся с вами и расскажем о дальнейших шагах.'}</p>
            <form data-name="smartsender" className="lead-popup__form" onSubmitCapture={validate} noValidate>
            <label htmlFor="lead-email">Email</label>
            <input ref={emailRef} id="lead-email" type="email" name="email" autoComplete="email" inputMode="email" placeholder="name@example.com" aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'lead-email-error' : undefined} onInput={() => setEmailError('')} required />
            {emailError && <small id="lead-email-error">{emailError}</small>}
            <label htmlFor="lead-phone">Номер телефона</label>
            <span className="lead-popup__phone">
              <input ref={phoneInputRef} id="lead-phone" type="tel" name="phone_intlTelInput" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(phoneError)} aria-describedby={phoneError ? 'lead-phone-error' : undefined} onInput={() => setPhoneError('')} required />
            </span>
            <input ref={hiddenPhoneRef} type="hidden" name="phone" />
            <input type="hidden" name="source" value={source} readOnly />
            {phoneError && <small id="lead-phone-error">{phoneError}</small>}
              {submitError && <small role="alert">{submitError}</small>}
              <button type="submit" disabled={submitting}><span>{submitting ? 'Отправляем…' : isConsultation ? 'Получить консультацию' : 'Отправить заявку'}</span><i><img src="/assets/images/like.svg" alt="" /></i></button>
            </form>
          </>}
        </div>
      </dialog>
    </div>
  );
}
