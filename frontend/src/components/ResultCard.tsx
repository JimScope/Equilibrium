// src/components/ResultCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { MathJax } from "better-react-mathjax";

interface ResultCardProps {
  balancedResult: {
    left: Record<string, number>;
    right: Record<string, number>;
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

function formatBalancedToTeX(left: Record<string, number>, right: Record<string, number>): string {
  // Convierte números en compuestos a subíndices LaTeX (H2O → H_{2}O)
  const formatCompound = (compound: string): string => {
    return compound.replace(/(\d+)/g, "_{$1}");
  };

  // Construye una cadena tipo "2H_{2} + O_{2} → 2H_{2}O"
  const leftParts: string[] = Object.entries(left).map(([compound, coef]) => 
    (coef === 1 ? "" : coef.toString()) + formatCompound(compound)
  );
  
  const rightParts: string[] = Object.entries(right).map(([compound, coef]) => 
    (coef === 1 ? "" : coef.toString()) + formatCompound(compound)
  );

  const eqString = leftParts.join(" + ") + " \\rightarrow " + rightParts.join(" + ");
  return `\\(${eqString}\\)`;
}
