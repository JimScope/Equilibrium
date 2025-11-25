import { Suspense, lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, HelpCircle } from 'lucide-react';

const ChemicalEquationBalancer = lazy(() => import('./components/chemical-equation-balancer/ChemicalEquationBalancer.js'));
const HelpModal = lazy(() => import('./components/help/HelpModal.js').then(module => ({ default: module.HelpModal })));
const DonateModal = lazy(() => import('./components/donate/DonateModal.js').then(module => ({ default: module.DonateModal })));
import { Toaster } from './components/ui/sonner.js';
import LanguageSelector from './components/LanguageSelector.js';



function App() {
  const { t } = useTranslation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isBackendActive, setIsBackendActive] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        if (response.ok) {
          setIsBackendActive(true);
        }
      } catch (error) {
        console.error("Backend health check failed", error);
        setIsBackendActive(false);
      }
    };

    // Check immediately
    checkHealth();

    // Then check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-3 md:px-10 py-3 md:py-4">
          <div className="flex items-center gap-2 md:gap-4 text-[#0d121b] dark:text-white">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_330)">
                  <path
                    clipRule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_330">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="hidden sm:block text-base md:text-lg font-bold leading-tight tracking-[-0.015em]">
              {t('app.title')}
            </h2>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex items-center gap-3 md:gap-4">
              <LanguageSelector />
              <button
                className="flex items-center gap-2 text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal cursor-pointer transition-colors"
                onClick={() => setIsDonateOpen(true)}
                aria-label={t('app.donate')}
              >
                <Heart className="w-4 h-4" />
                <span className="hidden md:inline">{t('app.donate')}</span>
              </button>
              <button
                className="flex items-center gap-2 text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal cursor-pointer transition-colors"
                onClick={() => setIsHelpOpen(true)}
                aria-label={t('app.help')}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden md:inline">{t('app.help')}</span>
              </button>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-5xl flex flex-col items-center">
                {!isBackendActive && (
                  <div className={`w-full max-w-3xl mb-8 p-4 rounded-lg border transition-colors duration-300 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800`}>
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 text-amber-600 dark:text-amber-400`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium text-amber-800 dark:text-amber-200`}>
                          {t('app.backend_hibernating')}
                        </h3>
                        <p className={`mt-1 text-sm text-amber-700 dark:text-amber-300`}>
                          {t('app.backend_sleeping')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
                  <ChemicalEquationBalancer onBackendResponse={() => setIsBackendActive(true)} />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
        {isHelpOpen && (
          <Suspense fallback={null}>
            <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
          </Suspense>
        )}
        {isDonateOpen && (
          <Suspense fallback={null}>
            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
          </Suspense>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default App;
