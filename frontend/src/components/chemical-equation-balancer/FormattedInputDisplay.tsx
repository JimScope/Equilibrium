import React from 'react';
import { MathJax } from 'better-react-mathjax';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface FormattedInputDisplayProps {
  formattedEquation: string | null;
}

const FormattedInputDisplay: React.FC<FormattedInputDisplayProps> = ({ formattedEquation }) => {
  return (
    <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <h3 className="text-lg font-bold text-[#0d121b] dark:text-white mb-4">Formatted Input</h3>
      <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800/60 rounded-lg text-gray-600 dark:text-gray-400 italic overflow-x-auto relative group">
        {formattedEquation ? (
          <>
            <div className="whitespace-nowrap px-4">
              <MathJax>{`\\(${formattedEquation}\\)`}</MathJax>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(formattedEquation);
                toast.success("Equation copied to clipboard!");
              }}
              className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              title="Copy Equation"
            >
              <Copy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </>
        ) : (
          'Your formatted equation will appear here'
        )}
      </div>
    </div>
  );
};

export default FormattedInputDisplay;
