// src/App.tsx
import { useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import EquationInput from "@/components/EquationInput";
import ResultCard from "@/components/ResultCard";

const mathJaxConfig = {
  loader: { load: ["input/tex", "output/svg"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
};

export default function App() {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API_URL}/balance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equation }),
      });

      const data = await res.json();
      if (res.ok && data.balanced) {
        setResult(data.balanced);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MathJaxContext config={mathJaxConfig} version={3}>
      <div className="max-w-2xl w-full p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">
          ⚗️ Chemical Equation Balancer
        </h1>

        <EquationInput
          value={equation}
          onChange={setEquation}
          onSubmit={handleBalance}
          loading={loading}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}
        {result && <ResultCard balancedResult={result} />}
      </div>
    </MathJaxContext>
  );
}
