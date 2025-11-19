import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog.js';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl border-b border-border pb-4">Theoretical Foundations</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-green-500">Understanding Chemical Equations</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            A chemical equation represents a chemical reaction. It shows the reactants (substances that start a reaction)
                            and products (substances formed by the reaction). For example:
                        </p>
                        <div className="bg-secondary p-4 rounded-md text-center font-mono border border-border">
                            H₂ + O₂ = H₂O
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            However, this equation isn't balanced because the number of atoms for each element is not the same on both sides.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-green-500">Law of Conservation of Mass</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            A balanced equation obeys the <strong>Law of Conservation of Mass</strong>, which states that matter is neither
                            created nor destroyed in a chemical reaction. This means we must have the same number of atoms of each element
                            on both the reactant and product sides.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-green-500">Methods for Balancing Chemical Equations</h3>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-base font-semibold text-green-400">1. Inspection or Trial and Error Method</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    This is the most straightforward method. It involves looking at the equation and adjusting the coefficients
                                    to get the same number of each type of atom on both sides.
                                </p>
                                <p className="text-sm text-muted-foreground"><strong>Best for:</strong> Simple equations with a small number of atoms.</p>
                            </div>

                            <div>
                                <h4 className="text-base font-semibold text-green-400">2. Algebraic Method (Gauss-Jordan) ⭐ Used by This Application</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    This method uses algebraic equations to find the correct coefficients. Each molecule's coefficient is
                                    represented by a variable (like x, y, z), and a series of equations are set up based on the number of
                                    each type of atom.
                                </p>
                                <p className="text-sm text-muted-foreground"><strong>Best for:</strong> Complex equations that are not easily balanced by inspection.</p>

                                <div className="bg-secondary/50 p-4 rounded-md border-l-4 border-green-500 space-y-3 mt-3">
                                    <p className="text-sm font-semibold">Process:</p>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                                        <li>Assign variables (coefficients) to each molecule</li>
                                        <li>Write equations for each element based on atom conservation</li>
                                        <li>Solve the system using matrix operations (Gauss-Jordan elimination)</li>
                                        <li>Find the smallest integer coefficients</li>
                                    </ol>

                                    <p className="text-sm font-semibold mt-3">Example: C₂H₆ + O₂ = CO₂ + H₂O</p>

                                    <p className="text-sm text-muted-foreground">1. Assign variables:</p>
                                    <div className="bg-background p-3 rounded-md text-center font-mono border border-border">
                                        a C₂H₆ + b O₂ = c CO₂ + d H₂O
                                    </div>

                                    <p className="text-sm text-muted-foreground mt-2">2. Write equations for each element:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        <li><strong>Carbon (C):</strong> 2a = c</li>
                                        <li><strong>Hydrogen (H):</strong> 6a = 2d</li>
                                        <li><strong>Oxygen (O):</strong> 2b = 2c + d</li>
                                    </ul>

                                    <p className="text-sm text-muted-foreground mt-2">3. Set a = 1 and solve:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        <li>c = 2a = 2</li>
                                        <li>d = 6a / 2 = 3</li>
                                        <li>b = (2c + d) / 2 = (2×2 + 3) / 2 = 3.5</li>
                                    </ul>

                                    <p className="text-sm text-muted-foreground mt-2">4. Multiply by 2 to get integers:</p>
                                    <div className="bg-background p-3 rounded-md text-center font-mono border border-border">
                                        2 C₂H₆ + 7 O₂ = 4 CO₂ + 6 H₂O
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-base font-semibold text-green-400">3. Oxidation Number Method</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Useful for redox reactions, this method involves balancing the equation based on the change in oxidation numbers.
                                </p>
                                <p className="text-sm text-muted-foreground"><strong>Best for:</strong> Redox reactions where electron transfer occurs.</p>
                                <p className="text-sm text-muted-foreground">
                                    <strong>Process:</strong> Identify oxidation numbers, determine changes in oxidation state, balance atoms
                                    that change their oxidation state, then balance remaining atoms and charges.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-base font-semibold text-green-400">4. Ion-Electron Half-Reaction Method</h4>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    This method separates the reaction into two half-reactions – one for oxidation and one for reduction.
                                    Each half-reaction is balanced separately and then combined.
                                </p>
                                <p className="text-sm text-muted-foreground"><strong>Best for:</strong> Complex redox reactions, especially in acidic or basic solutions.</p>
                                <p className="text-sm text-muted-foreground">
                                    <strong>Process:</strong> Split the reaction into two half-reactions, balance atoms and charges in each,
                                    then combine ensuring electrons are balanced.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-green-500">Why This Application Uses the Algebraic Method</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            The algebraic method (Gauss-Jordan elimination) is implemented in this application because it:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Works reliably for any chemical equation, simple or complex</li>
                            <li>Provides consistent, predictable results</li>
                            <li>Can be automated using matrix operations</li>
                            <li>Always finds the smallest integer coefficients</li>
                        </ul>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            The backend uses SymPy's matrix nullspace solver to find the solution vector, which represents the
                            coefficients needed to balance the equation while satisfying the Law of Conservation of Mass.
                        </p>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
};
