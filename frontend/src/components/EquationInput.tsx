// src/components/EquationInput.tsx
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MathJax } from "better-react-mathjax";

interface EquationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function EquationInput({
  value,
  onChange,
  onSubmit,
  loading,
}: EquationInputProps) {
  const formattedTeX = formatEquationForTeX(value || "");

  return (
    <div className="app-input-group">
      <Input
        placeholder="Ej: H2 + O2 = H2O"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="muted-block">
        <MathJax dynamic>
          <div className="result-latex">{formattedTeX}</div>
        </MathJax>
      </div>

      <Button
        style={{ width: '100%' }}
        onClick={onSubmit}
        disabled={loading || value.trim() === ""}
      >
        {loading ? "Balanceando..." : "Balancear"}
      </Button>
    </div>
  );
}

const formatEquationForTeX = (eq: string): string => {
  const parts = eq.trim().split(/\s*(?:=|->|=>)\s*/);
  const sub = (s: string) => s.replace(/([A-Za-z])(\d+)/g, '$1_{$2}');
  return `\\(${ parts.length === 2
    ? `${sub(parts[0])}\\;\\rightarrow\\;${sub(parts[1])}`
    : sub(eq.trim())
  }\\)`;
};
