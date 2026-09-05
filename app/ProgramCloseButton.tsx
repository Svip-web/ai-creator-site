'use client';

export default function ProgramCloseButton() {
  const closeModule = (event: React.MouseEvent<HTMLButtonElement>) => {
    const details = event.currentTarget.closest('details');
    if (!details) return;
    details.removeAttribute('open');
    details.querySelector('summary')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  return <button className="program-close" type="button" onClick={closeModule}><span>Скрыть</span><i aria-hidden="true" /></button>;
}
