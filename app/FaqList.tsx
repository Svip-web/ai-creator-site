'use client';

import { useState } from 'react';
import { faqs } from './courseContent';

export default function FaqList() {
  const [expanded, setExpanded] = useState(false);
  const visibleFaqs = expanded ? faqs : faqs.slice(0, 6);

  return (
    <div className="faq-list">
      {visibleFaqs.map(([question, answer], index) => (
        <details key={question}>
          <summary>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <span>{question}</span>
            <i aria-hidden="true" />
          </summary>
          <p>{answer}</p>
        </details>
      ))}
      {faqs.length > 6 && (
        <button
          type="button"
          className="faq-more-button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          <span>{expanded ? 'Скрыть' : 'Показать больше'}</span>
          <i aria-hidden="true">↓</i>
        </button>
      )}
    </div>
  );
}
