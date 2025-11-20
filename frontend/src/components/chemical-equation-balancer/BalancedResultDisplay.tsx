import React from 'react';
import { MathJax } from 'better-react-mathjax';

interface BalancedResultDisplayProps {
  balancedResult: any | null;
  showFractional: boolean;
  setShowFractional: (show: boolean) => void;
}

const BalancedResultDisplay: React.FC<BalancedResultDisplayProps> = ({ balancedResult, showFractional, setShowFractional }) => {
  return (
    <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-[#0d121b] dark:text-white">Balanced Result</h3>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer" htmlFor="fractional-toggle">
            Show Fractional Coefficients
          </label>
          <button
            aria-checked={showFractional}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark ${showFractional ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            id="fractional-toggle"
            role="switch"
            onClick={() => setShowFractional(!showFractional)}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-400 shadow ring-0 transition duration-200 ease-in-out ${showFractional ? 'translate-x-5' : 'translate-x-0'
                }`}
            ></span>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800/60 rounded-lg text-gray-600 dark:text-gray-400 italic overflow-x-auto">
        {balancedResult ? (
          <div className="whitespace-nowrap px-4">
            <MathJax>{`\\(${balancedResult}\\)`}</MathJax>
          </div>
        ) : (
          'The balanced result will appear here'
        )}
      </div>
    </div>
  );
};

export default BalancedResultDisplay;
