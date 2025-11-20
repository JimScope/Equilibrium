import { useTranslation } from 'react-i18next';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion.js"

interface Step {
    titleKey: string;
    contentKey: string;
    data?: Record<string, string>;
}

interface StepByStepProps {
    steps: Step[];
}

export function StepByStep({ steps }: StepByStepProps) {
    const { t } = useTranslation();

    if (!steps || steps.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mt-8">
            <h3 className="text-xl font-semibold mb-4 text-center">{t('steps.heading')}</h3>
            <Accordion type="single" collapsible className="w-full">
                {steps.map((step, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                            {t(step.titleKey)}
                        </AccordionTrigger>
                        <AccordionContent>
                            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm font-mono">
                                {t(step.contentKey, step.data || {})}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
