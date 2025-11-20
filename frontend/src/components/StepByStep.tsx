import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.js"

interface Step {
    title: string;
    content: string;
}

interface StepByStepProps {
    steps: Step[];
}

export function StepByStep({ steps }: StepByStepProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Método de Resolución Paso a Paso</h3>
            <Accordion type="single" collapsible className="w-full">
                {steps.map((step, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{step.title}</AccordionTrigger>
                        <AccordionContent>
                            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm font-mono">
                                {step.content}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
