// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "Graph Visualization",
      subtitle: "Enter your sequence here",
      check: "Check",
      notGraphical: "Not graphical",
      visualizer: "Visualizer",
      theorem: "Havel-Hakimi Theorem",
      checkingSequence: "Checking sequence: {{sequence}}",
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
      check: "Comprobar",
      notGraphical: "No es graficable",
      visualizer: "Visualizador",
      theorem: "Teorema Havel-Hakimi",
      checkingSequence: "Verificando secuencia: {{sequence}}",
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
