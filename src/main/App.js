import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GraphInput from '../components/GraphInput';
import GraphDisplay from '../components/GraphDisplay';
import { GraphValidator } from '../services/GraphValidator';
import { GraphBuilder } from '../services/GraphBuilder';
import '../services/i18n'; // asegúrate de que este archivo exista
import '../App.css';

function App() {
  const { t, i18n } = useTranslation();

  const [sequence, setSequence] = useState('');
  const [result, setResult] = useState('');
  const [graphData, setGraphData] = useState(null);
  const [logs, setLogs] = useState([]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const handleCheck = () => {
    setLogs([]);

    let newLogs = [];
    newLogs.push(`${t('checkingSequence')}: ${sequence}`);

    const isGraph = GraphValidator.isGraphical(sequence, (msg) => {
      newLogs.push(msg); // mensajes vienen ya traducidos
    });

    const resultMessage = isGraph ? t('resultYes') : t('resultNo');
    newLogs.push(`${t('result')}: ${resultMessage}`);
    setResult(resultMessage);

    if (isGraph) {
      const data = GraphBuilder.generateGraphData(sequence);
      setGraphData(data);
      newLogs.push(t('generatingGraph'));
    } else {
      setGraphData(null);
      newLogs.push(t('noGraphGenerated'));
    }

    setLogs(newLogs);
  };

  return (
    <div className="container">
      <h1 className="mainTitle">{t('title')}</h1>
      <p className="subTittle">{t('subtitle')}</p>

      <div className="inputContainer">
        <GraphInput
          sequence={sequence}
          setSequence={setSequence}
          handleCheck={handleCheck}
        />
      </div>

      <div className="contentRow">
        <div className="graphBox">
          {graphData ? (
            <GraphDisplay graphData={graphData} />
          ) : result ? (
            <p className="badMessage">{t('notGraphical')}</p>
          ) : (
            <h2 className="tittleHavelHakimi">{t('theorem')}</h2>
          )}
        </div>
        <div className="boxContainer">
          <h2 className="tittleHavelHakimi">{t('title')}</h2>
          <div className="logContent">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 🌐 Floating language switcher */}
      <button className="floating-button" onClick={toggleLanguage}>
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </button>
    </div>
  );
}

export default App;
