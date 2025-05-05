// src/components/LanguageSwitcher.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button onClick={toggleLanguage} className="lang-button">
      {i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    </button>
  );
};

export default LanguageSwitcher;
