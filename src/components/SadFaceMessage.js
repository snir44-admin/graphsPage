import React from 'react';
import sadFace from '../assets/sad-face.png';

const SadFaceMessage = ({ message }) => (
  <div className="sad-face-container">
    <p className="itIsNotGraphical">{message}</p>
  </div>
);

export default SadFaceMessage;
