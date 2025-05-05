import React from 'react';
import { useTranslation } from 'react-i18next';
import '../services/i18n';

const GraphInput = ({ sequence, setSequence, handleCheck }) => {
  const { t } = useTranslation();

  return (
    <div className="inputContainer">
      <input
        type="text"
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
        placeholder={t('example')}
      />
      <button onClick={handleCheck} className="check-button">
        {t('check')}
      </button>
    </div>
  );
};

export default GraphInput;
