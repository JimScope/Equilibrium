export const formatSubscripts = (equation: string): string => {
  // This regex finds numbers in chemical formulas and wraps them in _{...} for MathJax subscript rendering.
  // It correctly handles compounds like 'H2O', 'Fe2(SO4)3', etc.
  const formatted = equation.replace(/([A-Za-z\)])(\d+)/g, '$1_$2');
  return formatted;
};
