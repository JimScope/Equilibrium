import React, { useState } from 'react';
import EquationInputForm from './EquationInputForm';
import FormattedInputDisplay from './FormattedInputDisplay';
import BalancedResultDisplay from './BalancedResultDisplay';

const formatEquation = (result: any) => {
  if (!result) return '';

  const formatSide = (side: any) => {
    return Object.entries(side)
      .map(([compound, data]: [string, any]) => {
        const coef = data.coef;
        let coefStr = '';
        if (typeof coef === 'number') {
          coefStr = coef > 1 ? String(coef) : '';
        } else if (coef && typeof coef === 'object' && 'num' in coef && 'den' in coef) {
          coefStr = coef.den === 1 ? (coef.num > 1 ? String(coef.num) : '') : `\\frac{${coef.num}}{${coef.den}}`;
        }
        return `${coefStr}${compound}${data.state || ''}`;
      })
      .join(' + ');
  };

  const left = formatSide(result.left);
  const right = formatSide(result.right);
  return `${left} = ${right}`;
};


const ChemicalEquationBalancer: React.FC = () => {
  const [equation, setEquation] = useState('');
  const [formattedEquation, setFormattedEquation] = useState<string | null>(null);
  const [balancedResult, setBalancedResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFractional, setShowFractional] = useState(false);

  const handleBalance = async () => {
    try {
      const formattedForApi = equation.replace('->', '=');
      const response = await fetch(import.meta.env.VITE_API_URL + '/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ equation: formattedForApi, fractional: showFractional }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormattedEquation(equation.replace('->', '='));
        setBalancedResult(formatEquation(data.balanced));
        setError(null);
      } else {
        setError(data.error || 'An error occurred');
        setFormattedEquation(null);
        setBalancedResult(null);
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
      setFormattedEquation(null);
      setBalancedResult(null);
    }
  };

  return (
    <div className="layout-content-container flex flex-col w-full max-w-3xl flex-1 gap-8">
      <div>
        <p className="text-4xl font-black leading-tight tracking-[-0.033em] mb-2 text-[#0d121b] dark:text-white">Balance Your Equations</p>
        <p className="text-base font-normal leading-normal text-gray-600 dark:text-gray-400">Enter an unbalanced chemical equation below to see the balanced result, formatted beautifully.</p>
      </div>
      <EquationInputForm
        equation={equation}
        setEquation={setEquation}
        handleBalance={handleBalance}
      />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-col gap-6">
        <FormattedInputDisplay formattedEquation={formattedEquation} />
        <BalancedResultDisplay
          balancedResult={balancedResult}
          showFractional={showFractional}
          setShowFractional={setShowFractional}
        />
      </div>
    </div>
  );
};

export default ChemicalEquationBalancer;
