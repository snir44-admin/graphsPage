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
      theorem: "Havel-Hakimi Theorem",
      checkingSequence: "Checking sequence: ",
      resultYes: "The sequence is graphical.",
      resultNo: "The sequence is not graphical.",
      generatingGraph: "Generating graph...",
      noGraphGenerated: "No graph was generated."
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
      theorem: "Teorema Havel-Hakimi",
      checkingSequence: "Verificando secuencia. Ejemplo: 4,3,3,3,3  ",
      resultYes: "La secuencia es graficable.",
      resultNo: "La secuencia no es graficable.",
      generatingGraph: "Generando grafo...",
      noGraphGenerated: "No se generó un grafo."
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