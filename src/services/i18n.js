// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "Graph Visualization",
      subtitle: "Enter your sequence here.",
      example: "4,3,3,3,3",
      check: "Check",
      notGraphical: "Not graphical",
      visualizer: "Visualizer",
      logTitle: "Havel-Hakimi Theorem",
      checkingSequence: "Checking sequence ",
      resultYes: "The sequence is graphical.",
      resultNo: "The sequence is not graphical.",
      generatingGraph: "Generating graph...",
      noGraphGenerated: "No graph was generated.",
      currentSequence: 'Current sequence: {{seq}}',
      sortedSequence: 'After sorting: {{seq}}',
      removedFirst: 'Removed first element (d = {{d}}), remaining sequence: {{seq}}',
      degreeTooLarge: 'd = {{d}} is greater than remaining length ({{len}}), not graphical.',
      negativeNumber: 'No negative numbers allowed',
      oddSum: 'The sum of degrees is not even, not graphical.',
      becameNegative: 'An element became negative, not graphical.',
      reachedLimit: 'Max iteration limit reached, possible calculation error.',
      emptySequence: 'No elements left, it is graphical.',
      inputError: "Input error"
    }
  },
  es: {
    translation: {
      title: "Visualización de Grafos",
      subtitle: "Ingresa tu secuencia aquí",
      example: "4,3,3,3,3",
      check: "Comprobar",
      notGraphical: "No es graficable",
      visualizer: "Visualizador",
      logTitle: "Teorema Havel-Hakimi",
      checkingSequence: "Verificando secuencia.",
      resultYes: "La secuencia es graficable.",
      resultNo: "La secuencia no es graficable.",
      generatingGraph: "Generando grafo...",
      noGraphGenerated: "No se generó un grafo.",
      currentSequence: 'Secuencia actual: {{seq}}',
      sortedSequence: 'Después de ordenar: {{seq}}',
      removedFirst: 'Removido el primer elemento (d = {{d}}), secuencia restante: {{seq}}',
      degreeTooLarge: 'd = {{d}} es mayor que la longitud restante ({{len}}), no es graficable.',
      negativeNumber: 'No debe haber números menores que 0',
      oddSum: 'La suma de los grados no es par, no es graficable.',
      becameNegative: 'Un elemento se volvió negativo, no es graficable.',
      reachedLimit: 'Se alcanzó el límite de iteraciones, posible error en el cálculo.',
      emptySequence: 'No quedan elementos, es graficable.',
      inputError: "Error en entrada de texto"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;