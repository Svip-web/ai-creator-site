'use client';

export default function BackButton() {
  return (
    <button className="policy-back" type="button" onClick={() => window.history.back()}>
      ← Вернуться на сайт
    </button>
  );
}
