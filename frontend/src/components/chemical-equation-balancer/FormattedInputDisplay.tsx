import React from 'react';
import { MathJax } from 'better-react-mathjax';

interface FormattedInputDisplayProps {
  formattedEquation: string | null;
}

const FormattedInputDisplay: React.FC<FormattedInputDisplayProps> = ({ formattedEquation }) => {
  return (
    <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-lg font-bold text-[#0d121b] dark:text-white mb-4">Formatted Input</h3>
      <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800/60 rounded-lg text-gray-600 dark:text-gray-400 italic">
        {formattedEquation ? (
          <MathJax>{`\\(${formattedEquation}\\)`}</MathJax>
        ) : (
          'Your formatted equation will appear here'
        )}
      </div>
    </div>
  );
};

export default FormattedInputDisplay;
