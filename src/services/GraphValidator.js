import i18n from 'i18next';

export class GraphValidator {
  static isGraphical(sequence, captureLog) {
    let seq = sequence
      .split(',')
      .map(s => s.trim())
      .map(Number)
      .filter(n => !isNaN(n));

    // ❌ Números negativos no permitidos
    if (seq.some(n => n < 0)) {
      captureLog({ key: 'negativeNumber' });
      return false;
    }

    // 🔢 Verificar si la suma es par
    let sum = seq.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) {
      captureLog({ key: 'oddSum' });
      return false;
    }

    let iterations = 0;
    const MAX_ITERATIONS = 100;

    // 🔁 Algoritmo de Havel-Hakimi
    while (iterations < MAX_ITERATIONS) {
      iterations++;

      captureLog({
        key: 'currentSequence',
        values: { seq: JSON.stringify(seq) }
      });

      if (seq.length === 0) {
        captureLog({ key: 'emptySequence' });
        return true;
      }

      seq.sort((a, b) => b - a);
      captureLog({
        key: 'sortedSequence',
        values: { seq: JSON.stringify(seq) }
      });

      const d = seq.shift();
      captureLog({
        key: 'removedFirst',
        values: { d, seq: JSON.stringify(seq) }
      });

      if (d > seq.length) {
        captureLog({
          key: 'degreeTooLarge',
          values: { d, len: seq.length }
        });
        return false;
      }

      for (let i = 0; i < d; i++) {
        seq[i] -= 1;
        if (seq[i] < 0) {
          captureLog({ key: 'becameNegative' });
          return false;
        }
      }
    }

    // ⚠️ Bucle excedido
    captureLog({ key: 'reachedLimit' });
    return false;
  }
}



