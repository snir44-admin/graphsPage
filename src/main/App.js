import React, { useState } from 'react';
import GraphInput from '../components/GraphInput';
import GraphDisplay from '../components/GraphDisplay';
import SadFaceMessage from '../components/SadFaceMessage';
import { GraphValidator } from '../services/GraphValidator';
import { GraphBuilder } from '../services/GraphBuilder';
import '../App.css'; 


function App() {
  const [sequence, setSequence] = useState('');
  const [result, setResult] = useState('');
  const [graphData, setGraphData] = useState(null);

  const handleCheck = () => {
    const isGraph = GraphValidator.isGraphical(sequence);
    setResult(isGraph ? 'La secuencia es graficable.' : 'La secuencia no es graficable.');

    if (isGraph) {
      const data = GraphBuilder.generateGraphData(sequence);
      setGraphData(data);
    } else {
      setGraphData(null);
    }
  };

  return (
    <div className="App">
    <h1>Visualización de Grafos</h1>
    <p>Ingrese una secuencia de grados (separada por comas):</p>
    
    {/* Contenedor de entrada y botón */}
    <div className="input-container">
      <GraphInput sequence={sequence} setSequence={setSequence} handleCheck={handleCheck} />
    </div>

    {/* Contenedor del gráfico con la carita triste */}
    <div className="graph-container">
  {!graphData && result && <SadFaceMessage message={result} />}
  
  {/* 🔹 Siempre renderizar GraphDisplay, incluso si graphData es null */}
  <GraphDisplay graphData={graphData} />
</div>

  </div>
  );
}

export default App;
