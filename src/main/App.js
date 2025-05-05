import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import GraphInput from '../components/GraphInput';
import GraphDisplay from '../components/GraphDisplay';
import { GraphValidator } from '../services/GraphValidator';
import { GraphBuilder } from '../services/GraphBuilder';
import '../services/i18n';
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
    const newLogs = [];

    // 🧩 Log inicial: secuencia ingresada
    newLogs.push({ key: 'checkingSequence', values: { sequence } });

    // ✅ Validación con GraphValidator
    const isGraph = GraphValidator.isGraphical(sequence, (logEntry) => {
      newLogs.push(logEntry); // logEntry debe ser { key, values }
    });

    const resultKey = isGraph ? 'resultYes' : 'resultNo';
    newLogs.push({ key: 'result', values: { result: t(resultKey) } });
    setResult(t(resultKey));

    if (isGraph) {
      const data = GraphBuilder.generateGraphData(sequence);
      setGraphData(data);
      newLogs.push({ key: 'generatingGraph' });
    } else {
      setGraphData(null);
      newLogs.push({ key: 'noGraphGenerated' });
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
            <h2 className="tittleHavelHakimi">{t('visualizer')}</h2>
          )}
        </div>

        <div className="boxContainer">
          <h2 className="tittleHavelHakimi">{t('logTitle')}</h2>
          <div className="logContent">
            {logs.map((log, index) => {
              if (typeof log === 'string') {
                return <p key={index}>{log}</p>;
              }
              if (typeof log === 'object' && log.key) {
                return <p key={index}>{t(log.key, log.values || {})}</p>;
              }
              return null; // fallback por si algo se cuela mal
            })}
          </div>
        </div>
      </div>

      <button className="floating-button" onClick={toggleLanguage}>
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </button>
    </div>
  );
}

export default App;

