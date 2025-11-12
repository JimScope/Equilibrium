import ChemicalEquationBalancer from './components/chemical-equation-balancer/ChemicalEquationBalancer';

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 px-6 md:px-10 py-4">
          <div className="flex items-center gap-4 text-[#0d121b] dark:text-white">
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_330)">
                  <path
                    clip-rule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clippath id="clip0_6_330">
                    <rect fill="white" height="48" width="48"></rect>
                  </clippath>
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
          <ChemicalEquationBalancer />
        </main>
      </div>
    </div>
  );
}

export default App;
