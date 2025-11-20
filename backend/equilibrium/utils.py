"""
utils.py — Librería para balancear ecuaciones químicas con Sympy

Funciones principales:
- parse_equation(equation): separa los compuestos en reactivos y productos.
- parse_formula(formula): convierte una fórmula química en un conteo de átomos.
- build_matrix(equation): construye el sistema lineal a partir de la ecuación.
- balance_equation(equation): retorna los coeficientes enteros balanceados.

Ejemplo:
>>> balance_equation("Fe + O2 = Fe2O3")
{'Fe': 4, 'O2': 3, 'Fe2O3': 2}
"""

import re
from sympy import Matrix, lcm, symbols, Rational

# ==========================
# PARTE 1: PARSING QUÍMICO
# ==========================

def parse_equation(equation: str):
    """
    Divide la ecuación en reactivos y productos.
    Extrae el estado de agregación (g), (l), (s), (aq) si existe.
    Retorna: (left_compounds, right_compounds, left_states, right_states)
    """
    if '=' not in equation:
        raise ValueError("La ecuación debe contener un signo '='.")
    left, right = equation.replace(" ", "").split('=')
    left_compounds_raw = left.split('+')
    right_compounds_raw = right.split('+')
    
    def extract_compound_and_state(compound_str):
        # Busca estado de agregación: (g), (l), (s), (aq)
        match = re.match(r'^(.*?)\(([glsaq]+)\)$', compound_str)
        if match:
            return match.group(1), f"({match.group(2)})"
        return compound_str, ""
    
    left_compounds = []
    left_states = []
    for c in left_compounds_raw:
        compound, state = extract_compound_and_state(c)
        left_compounds.append(compound)
        left_states.append(state)
    
    right_compounds = []
    right_states = []
    for c in right_compounds_raw:
        compound, state = extract_compound_and_state(c)
        right_compounds.append(compound)
        right_states.append(state)
    
    return left_compounds, right_compounds, left_states, right_states


def parse_formula(formula: str):
    """
    Convierte una fórmula química (por ejemplo, 'Fe2(SO4)3')
    en un diccionario con el número de átomos de cada elemento.

    Retorna: {'Fe': 2, 'S': 3, 'O': 12}
    """
    def expand_group(group, multiplier):
        # Busca elementos y subíndices dentro del grupo
        parts = re.findall(r'([A-Z][a-z]?)(\d*)', group)
        comp = {}
        for (elem, count) in parts:
            count = int(count) if count else 1
            comp[elem] = comp.get(elem, 0) + count * multiplier
        return comp

    # Maneja paréntesis
    stack = [{}]
    i = 0
    while i < len(formula):
        if formula[i] == '(':
            stack.append({})
            i += 1
        elif formula[i] == ')':
            i += 1
            num = ''
            while i < len(formula) and formula[i].isdigit():
                num += formula[i]
                i += 1
            num = int(num) if num else 1
            group = stack.pop()
            for k, v in group.items():
                stack[-1][k] = stack[-1].get(k, 0) + v * num
        else:
            m = re.match(r'([A-Z][a-z]?)(\d*)', formula[i:])
            if not m:
                raise ValueError(f"Símbolo químico inválido en '{formula[i:]}'")
            elem, count = m.groups()
            count = int(count) if count else 1
            stack[-1][elem] = stack[-1].get(elem, 0) + count
            i += len(m.group(0))
    if len(stack) != 1:
        raise ValueError("Error en el parseo de paréntesis.")
    return stack[0]


# ===================================
# PARTE 2: CONSTRUCCIÓN Y RESOLUCIÓN
# ===================================

def build_matrix(equation: str):
    """
    Construye la matriz de coeficientes de la ecuación química.
    """
    left, right, _, _ = parse_equation(equation)
    compounds = left + right
    all_elements = set()

    # Recolecta todos los elementos presentes
    compositions = []
    for c in compounds:
        comp_dict = parse_formula(c)
        compositions.append(comp_dict)
        all_elements |= comp_dict.keys()

    all_elements = sorted(all_elements)
    n = len(all_elements)
    m = len(compounds)
    A = []

    for elem in all_elements:
        row = []
        for j, c in enumerate(compounds):
            count = compositions[j].get(elem, 0)
            # Reactivos positivos, productos negativos
            if j >= len(left):
                count *= -1
            row.append(count)
        A.append(row)

    return Matrix(A)


def balance_equation(equation: str, fractional: bool = False, return_steps: bool = False):
    """
    Balancea una ecuación química y devuelve un diccionario con los coeficientes enteros.

    Ejemplo:
    >>> balance_equation("C3H8 + O2 = CO2 + H2O")
    {'C3H8': 1, 'O2': 5, 'CO2': 3, 'H2O': 4}
    """
    A = build_matrix(equation)
    A_original = A.copy() # Save for steps
    
    # Re-parse to get elements and compositions for steps
    left, right, left_states, right_states = parse_equation(equation)
    compounds = left + right
    all_elements = set()
    compositions = []
    for c in compounds:
        comp_dict = parse_formula(c)
        compositions.append(comp_dict)
        all_elements |= comp_dict.keys()
    all_elements = sorted(all_elements)

    A = A.transpose()
    symbols_list = symbols(f"x1:{A.shape[0]+1}")
    M = Matrix(A).T.col_insert(A.T.shape[1], Matrix([0]*A.T.shape[0]))
    sol = M.nullspace()

    if not sol:
        raise ValueError("No se encontró solución para esta ecuación.")

    vec = sol[0]
    lcm_den = lcm([term.q for term in vec])  # racionales → denominadores
    vec = vec * lcm_den
    vec = [abs(int(v)) for v in vec]

    left, right, left_states, right_states = parse_equation(equation)
    compounds = left + right

    # Si se solicita formato fraccional, normalizamos dividiendo por el mínimo
    # coeficiente entero para obtener fracciones como 5/2, etc.
    if fractional:
        min_val = min([v for v in vec if v > 0])
        # Construye coeficientes como Rational y luego como string si es fracción
        left_result = {}
        right_result = {}
        for i in range(len(left)):
            r = Rational(vec[i], min_val)
            if r.q != 1:
                coef = {"num": int(r.p), "den": int(r.q)}
            else:
                coef = int(r.p)
            left_result[left[i]] = {"coef": coef, "state": left_states[i]}
        for i in range(len(right)):
            r = Rational(vec[len(left) + i], min_val)
            if r.q != 1:
                coef = {"num": int(r.p), "den": int(r.q)}
            else:
                coef = int(r.p)
            right_result[right[i]] = {"coef": coef, "state": right_states[i]}
    else:
        # Enteros (comportamiento previo)
        left_result = {left[i]: {"coef": vec[i], "state": left_states[i]} for i in range(len(left))}
        right_result = {right[i]: {"coef": vec[len(left) + i], "state": right_states[i]} for i in range(len(right))}

    result = {"left": left_result, "right": right_result}

    if return_steps:
        steps = []
        # Step 1: Parsing
        steps.append({
            "title": "Paso 1: Identificar reactivos y productos",
            "content": f"Reactivos: {', '.join(left)}\nProductos: {', '.join(right)}\nElementos: {', '.join(all_elements)}"
        })

        # Step 2: Equations
        eq_list = []
        for i, elem in enumerate(all_elements):
            terms = []
            for j, c in enumerate(compounds):
                coeff = A_original[i, j] # Use A_original as A was transposed
                if coeff != 0:
                    var = f"x_{j+1}"
                    # Reactants are positive in our matrix logic for build_matrix, but products are negative.
                    # Let's represent it as conservation: Reactants = Products
                    # Actually build_matrix does: Reactants - Products = 0
                    # Let's show the conservation equation:
                    # e.g. Fe: 1*x1 = 2*x3
                    pass
            
            # Re-building the equation string for display
            lhs_parts = []
            rhs_parts = []
            for j, c in enumerate(compounds):
                count = compositions[j].get(elem, 0)
                if count > 0:
                    if j < len(left):
                        lhs_parts.append(f"{count}*{symbols_list[j]}")
                    else:
                        rhs_parts.append(f"{count}*{symbols_list[j]}")
            eq_str = f"{elem}: {' + '.join(lhs_parts)} = {' + '.join(rhs_parts)}"
            eq_list.append(eq_str)
        
        steps.append({
            "title": "Paso 2: Plantear ecuaciones de conservación de masa",
            "content": "Para cada elemento, la cantidad de átomos en los reactivos debe ser igual a la de los productos:\n" + "\n".join(eq_list)
        })

        # Step 3: Matrix
        steps.append({
            "title": "Paso 3: Sistema de ecuaciones lineal (Matriz)",
            "content": f"Matriz A (filas=elementos, col=compuestos):\n{str(A_original.tolist())}\n\nBuscamos el espacio nulo de A."
        })

        # Step 4: Solution
        steps.append({
            "title": "Paso 4: Resolver el sistema",
            "content": f"Solución base del espacio nulo:\n{str([str(v) for v in sol[0]])}"
        })

        # Step 5: Integer coefficients
        steps.append({
            "title": "Paso 5: Coeficientes enteros",
            "content": f"Multiplicamos por el MCM ({lcm_den}) para eliminar fracciones:\nCoeficientes finales: {vec}"
        })
        
        result["steps"] = steps

    return result


# =====================
# PARTE 3: EJECUCIÓN
# =====================

if __name__ == "__main__":
    examples = [
        "Fe + O2 = Fe2O3",
        "C3H8 + O2 = CO2 + H2O",
        "Al + HCl = AlCl3 + H2",
    ]
    for eq in examples:
        print(eq, "→", balance_equation(eq))
