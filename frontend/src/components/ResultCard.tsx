// src/components/ResultCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MathJax } from "better-react-mathjax";

interface ResultCardProps {
  balancedResult: {
    left: Record<string, { coef: number; state: string }>;
    right: Record<string, { coef: number; state: string }>;
  };
}

export default function ResultCard({ balancedResult }: ResultCardProps) {
  const eqTeX = formatBalancedToTeX(balancedResult.left, balancedResult.right);

  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Resultado Balanceado:</h2>
        <div className="text-center text-lg">
          <MathJax dynamic>
            {eqTeX}
          </MathJax>
        </div>
      </CardContent>
    </Card>
  );
}

function formatBalancedToTeX(left: Record<string, { coef: number; state: string }>, right: Record<string, { coef: number; state: string }>): string {
  // Convierte números en compuestos a subíndices LaTeX (H2O → H_{2}O)
  const formatCompound = (compound: string): string => {
    return compound.replace(/(\d+)/g, "_{$1}");
  };

  // Construye una cadena tipo "2H_{2}(g) + O_{2}(g) → 2H_{2}O(l)"
  const leftParts: string[] = Object.entries(left).map(([compound, data]) => {
    const coef = data.coef === 1 ? "" : data.coef.toString();
    const formatted = formatCompound(compound);
    const state = data.state;
    return coef + formatted + state;
  });
  
  const rightParts: string[] = Object.entries(right).map(([compound, data]) => {
    const coef = data.coef === 1 ? "" : data.coef.toString();
    const formatted = formatCompound(compound);
    const state = data.state;
    return coef + formatted + state;
  });

  const eqString = leftParts.join(" + ") + " \\rightarrow " + rightParts.join(" + ");
  return `\\(${eqString}\\)`;
}
