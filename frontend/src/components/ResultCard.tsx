// src/components/ResultCard.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MathJax } from "better-react-mathjax";
import { Button } from "@/components/ui/button";

interface FractionObj { num: number; den: number }

interface ResultCardProps {
  balancedResult: {
    left: Record<string, { coef: number | FractionObj; state: string }>;
    right: Record<string, { coef: number | FractionObj; state: string }>;
  };
}

export default function ResultCard({ balancedResult }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const eqTeX = formatBalancedToTeX(balancedResult.left, balancedResult.right);
  const rawLatex = eqTeX;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(rawLatex);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // silenciar; no crítico
      setCopied(false);
    }
  };

  return (
    <Card className="p-4 shadow-xl rounded-xl">
      <CardContent>
        <div className="card-header">
          <div>
            <h2>Resultado Balanceado</h2>
            <small>Renderizado con MathJax</small>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              aria-label="Copiar LaTeX al portapapeles"
              title="Copiar LaTeX"
            >
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>
        </div>

        <div className="muted-block" aria-live="polite">
          <MathJax dynamic>
            <div className="result-latex">{eqTeX}</div>
          </MathJax>
        </div>
      </CardContent>
    </Card>
  );
}

function formatBalancedToTeX(left: Record<string, { coef: number | FractionObj; state: string }>, right: Record<string, { coef: number | FractionObj; state: string }>): string {
  // Convierte números en compuestos a subíndices LaTeX (H2O → H_{2}O)
  const formatCompound = (compound: string): string => {
    return compound.replace(/(\d+)/g, "_{$1}");
  };

  // Construye una cadena tipo "2H_{2}(g) + O_{2}(g) → 2H_{2}O(l)"
  const leftParts: string[] = Object.entries(left).map(([compound, data]) => {
    const c = data.coef;
    let coefStr = "";
    if (typeof c === "number") {
      coefStr = c === 1 ? "" : c.toString();
    } else if (typeof c === "object" && c !== null) {
      // fracción como {num, den}
      coefStr = `\\frac{${c.num}}{${c.den}}`;
    }
    const formatted = formatCompound(compound);
    const state = data.state ?? "";
    return coefStr + formatted + (state ? `\\;${state}` : "");
  });
  
  const rightParts: string[] = Object.entries(right).map(([compound, data]) => {
    const c = data.coef;
    let coefStr = "";
    if (typeof c === "number") {
      coefStr = c === 1 ? "" : c.toString();
    } else if (typeof c === "object" && c !== null) {
      coefStr = `\\frac{${c.num}}{${c.den}}`;
    }
    const formatted = formatCompound(compound);
    const state = data.state ?? "";
    return coefStr + formatted + (state ? `\\;${state}` : "");
  });

  const eqString = leftParts.join(" + ") + " \\rightarrow " + rightParts.join(" + ");
  return `\\(${eqString}\\)`;
}
