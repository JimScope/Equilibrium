import React from 'react';
import { useTranslation } from 'react-i18next';

interface EquationInputFormProps {
  equation: string;
  setEquation: (equation: string) => void;
  handleBalance: () => void;
}

const EquationInputForm: React.FC<EquationInputFormProps> = ({ equation, setEquation, handleBalance }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-end gap-3 w-full">
      <label className="flex flex-col flex-1 w-full">
        <p className="text-base font-medium leading-normal pb-2 dark:text-gray-200">{t('balancer.input_label')}</p>
        <input
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
          placeholder={t('balancer.input_placeholder')}
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
        />
      </label>
      <button
        className="flex min-w-[120px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
        onClick={handleBalance}
      >
        <span className="truncate">{t('balancer.button_balance')}</span>
      </button>
    </div>
  );
};

export default EquationInputForm;
