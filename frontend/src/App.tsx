import { Suspense, lazy } from 'react';

const ChemicalEquationBalancer = lazy(() => import('./components/chemical-equation-balancer/ChemicalEquationBalancer'));
const AdSidebar = lazy(() => import('./components/AdSidebar'));

function App() {
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
            <div className="flex items-center">
              <a className="text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal" href="#">
                Help
              </a>
            </div>
          </div>
        </header>
        <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6">
            <Suspense fallback={<div className="p-4">Loading sidebar...</div>}>
              <AdSidebar />
            </Suspense>
            <div className="flex-1 flex">
              <div className="w-full max-w-5xl">
                <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
                  <ChemicalEquationBalancer />
                </Suspense>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
