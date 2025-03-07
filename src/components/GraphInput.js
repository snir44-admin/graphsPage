import React from 'react';

const GraphInput = ({ sequence, setSequence, handleCheck }) => (
  <div className="input-container">
    <input
      type="text"
      value={sequence}
      onChange={(e) => setSequence(e.target.value)}
      placeholder="Ejemplo: 4,3,3,2,2"
    />
    <button onClick={handleCheck} className="check-button">
      Comprobar
    </button>
  </div>
);

export default GraphInput;
