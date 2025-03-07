import React, { useState } from 'react';
import GraphInput from '../components/GraphInput';
import GraphDisplay from '../components/GraphDisplay';
import { GraphValidator } from '../services/GraphValidator';
import { GraphBuilder } from '../services/GraphBuilder';
import '../App.css';

function App() {
  const [sequence, setSequence] = useState('');
  const [result, setResult] = useState('');
  const [graphData, setGraphData] = useState(null);
  const [logs, setLogs] = useState([]); 

 
  const captureLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]); 
  };

  const handleCheck = () => {
    setLogs([]);  
  
    let newLogs = [];
    newLogs.push(`Verificando secuencia: ${sequence}`);
  
    const isGraph = GraphValidator.isGraphical(sequence, (msg) => {
      newLogs.push(msg);
    });
  
    setResult(isGraph ? 'La secuencia es graficable.' : 'La secuencia no es graficable.');
    newLogs.push(`Resultado: ${isGraph ? 'La secuencia es graficable.' : 'La secuencia no es graficable.'}`);
  
    if (isGraph) {
      const data = GraphBuilder.generateGraphData(sequence);
      setGraphData(data);
      newLogs.push('Generando grafo...');
    } else {
      setGraphData(null);
      newLogs.push('No se generó un grafo.');
    }
  
    setLogs(newLogs); 
  };
  

  return (
    <div className="container">
      {/* Sección principal */}
      <div className="App">
        <h1>Visualización de Grafos</h1>
        <p>Ingrese una secuencia de grados (separada por comas):</p>

        <div className="input-container">
          <GraphInput sequence={sequence} setSequence={setSequence} handleCheck={handleCheck} />
        </div>

        <div className="graph-container">
          {!graphData && result &&   <p className="bad-message-container">No es graficable</p>}
          <GraphDisplay graphData={graphData} />
        </div>
      </div>

      <div className="log-container">
        <h2 className="tittleHavelHakimi">Teorema Havel-Hakimi</h2>
        <div className="log-content">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
