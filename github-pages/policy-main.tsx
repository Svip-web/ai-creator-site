import React from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import PrivacyPolicyPage from '../app/policy-aicreator/page';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrivacyPolicyPage />
  </React.StrictMode>,
);
