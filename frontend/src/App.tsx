import { Suspense, lazy, useEffect, useState } from 'react';

const ChemicalEquationBalancer = lazy(() => import('./components/chemical-equation-balancer/ChemicalEquationBalancer.js'));
import { HelpModal } from './components/help/HelpModal.js';
import { DonateModal } from './components/donate/DonateModal.js';
import { Toaster } from './components/ui/sonner.js';


function App() {
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
    checkHealth();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-6 md:px-10 py-4">
          <div className="flex items-center gap-4 text-[#0d121b] dark:text-white">
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
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Chemical Equation Balancer</h2>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="flex items-center gap-4">
              <a
                className="text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal cursor-pointer"
                onClick={() => setIsDonateOpen(true)}
              >
                Donate
              </a>
              <a
                className="text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal cursor-pointer"
                onClick={() => setIsHelpOpen(true)}
              >
                Help
              </a>
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-5xl flex flex-col items-center">
                <div className={`w-full max-w-3xl mb-8 p-4 rounded-lg border transition-colors duration-300 ${isBackendActive ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${isBackendActive ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {isBackendActive ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isBackendActive ? 'text-green-800 dark:text-green-200' : 'text-amber-800 dark:text-amber-200'}`}>
                        {isBackendActive ? 'System Operational' : 'Backend Hibernating'}
                      </h3>
                      <p className={`mt-1 text-sm ${isBackendActive ? 'text-green-700 dark:text-green-300' : 'text-amber-700 dark:text-amber-300'}`}>
                        {isBackendActive
                          ? 'The balancing engine is ready to process your equations.'
                          : 'The free instance spins down due to inactivity. Your first request may take up to 30 seconds to wake it up.'}
                      </p>
                    </div>
                  </div>
                </div>
                <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
                  <ChemicalEquationBalancer />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
        <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
