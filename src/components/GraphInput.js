import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../services/i18n';

const GraphInput = ({ sequence, setSequence, handleCheck }) => {
  const { t } = useTranslation();
  const [inputError, setInputError] = useState(null); // Puede ser null o { key, values }

  const handleChange = (e) => {
    const value = e.target.value;
    const isValid = /^[\d,\s]*$/.test(value); // Solo números, comas y espacios

    if (isValid) {
      setInputError(null);
      setSequence(value);
    } 
  };

  return (
    <div className="inputContainer">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9,]*"
        value={sequence}
        onChange={handleChange}
        placeholder={t('example')}
        aria-label={t('example')}
        className={inputError ? 'inputWithError' : ''}
      />
      <button onClick={handleCheck} className="check-button">
        {t('check')}
      </button>
      {inputError && (
        <p className="inputErrorText">
          {t(inputError.key, inputError.values || {})}
        </p>
      )}
    </div>
  );
};

export default GraphInput;

