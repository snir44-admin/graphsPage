export class GraphValidator {
    static isGraphical(sequence) {
      let seq = sequence.split(',').map(Number);

      // Step 1: Check if the sum of the degrees is even
      let sum = 0;
      for (let i = 0; i < seq.length; i++) {
        sum += seq[i];
        if (seq[i] < 0) {
          alert("No debe haber números menores que 0");
          return false;
        }
      }
  
  
      // Step 2: Havel-Hakimi algorithm
      while (true) {
        console.log('Secuencia actual:', seq);
        // If no elements remain, it's graphical
      if (seq.length === 0) {
        console.log("No quedan elementos, es graficable.");
        return true;
      }

      // Sort descending
      seq.sort((a, b) => b - a);
      console.log('Después de ordenar:', seq);

      // Remove the first element (highest degree)
      const d = seq.shift();
      console.log(`Removido el primer elemento (d = ${d}), secuencia restante:`, seq);

      // Check if d is larger than the remaining elements
      if (d > seq.length) {
        console.log(`d = ${d} es mayor que la longitud restante (${seq.length}), no es graficable.`);
        return false;
      }

      // Subtract 1 from the next 'd' degrees
      for (let i = 0; i < d; i++) {
        seq[i] -= 1;
        if (seq[i] < 0) {
          console.log("Un elemento se volvió negativo, no es graficable.");
          return false;
        }
      }
      console.log(JSON.stringify(seq));
    }
  }
};