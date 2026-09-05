'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  ['#audience', 'Для кого'],
  ['#stories', 'Отзывы'],
  ['#course', 'О курсе'],
  ['#expert', 'Об эксперте'],
  ['#prices', 'Тарифы'],
  ['#guarantees', 'Гарантии'],
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let stopTimer = 0;

    const onScroll = () => {
      if (window.innerWidth > 900 || menuOpenRef.current) return;
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (currentY < 16 || delta < -5) setHidden(false);
      if (currentY > 72 && delta > 5) setHidden(true);
      lastY = currentY;

      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setHidden(false), 220);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menuOpenRef.current = false;
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(stopTimer);
    };
  }, []);

  const closeMenu = () => {
    menuOpenRef.current = false;
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => {
      const next = !current;
      menuOpenRef.current = next;
      return next;
    });
    setHidden(false);
  };

  return (
    <header className={`header wrap${hidden ? ' header--hidden' : ''}${menuOpen ? ' header--menu-open' : ''}`}>
      <a className="brand" href="#top" aria-label="AI Growth Studio — начало страницы" onClick={closeMenu}><span className="brand-symbol" /><span className="brand-wordmark" /></a>
      <nav className="header-nav" aria-label="Навигация по странице">
        {links.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <div className="header-actions header-actions--desktop"><a href="#start">Получить консультацию</a><a href="#start">Оставить заявку</a></div>
      <button className="header-burger" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={toggleMenu}>
        <span /><span /><span />
      </button>
      <div className="mobile-menu" id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">
          {links.map(([href, label]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
        </nav>
        <div className="header-actions header-actions--mobile"><a href="#start" onClick={closeMenu}>Оставить заявку</a></div>
      </div>
    </header>
  );
}
