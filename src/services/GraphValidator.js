export class GraphValidator {
  static isGraphical(sequence, captureLog) {
    let seq = sequence
      .split(',')
      .map(s => s.trim()) 
      .map(Number)
      .filter(n => !isNaN(n)); 

    if (seq.some(n => n < 0)) {
      captureLog("No debe haber números menores que 0");
      return false;
    }

 
    let sum = seq.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) {
      captureLog("La suma de los grados no es par, no es graficable.");
      return false;
    }

    let iterations = 0;
    const MAX_ITERATIONS = 100;

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      captureLog(`Secuencia actual: ${JSON.stringify(seq)}`);

      if (seq.length === 0) {
        captureLog("No quedan elementos, es graficable.");
        return true;
      }

      seq.sort((a, b) => b - a);
      captureLog(`Después de ordenar: ${JSON.stringify(seq)}`);

      const d = seq.shift();
      captureLog(`Removido el primer elemento (d = ${d}), secuencia restante: ${JSON.stringify(seq)}`);

      if (d > seq.length) {
        captureLog(`d = ${d} es mayor que la longitud restante (${seq.length}), no es graficable.`);
        return false;
      }

      for (let i = 0; i < d; i++) {
        seq[i] -= 1;
        if (seq[i] < 0) {
          captureLog("Un elemento se volvió negativo, no es graficable.");
          return false;
        }
      }
    }

    captureLog("Se alcanzó el límite de iteraciones, posible error en el cálculo.");
    return false;
  }
};
