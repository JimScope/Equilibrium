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
    """
    if '=' not in equation:
        raise ValueError("La ecuación debe contener un signo '='.")
    left, right = equation.replace(" ", "").split('=')
    left_compounds = left.split('+')
    right_compounds = right.split('+')
    return left_compounds, right_compounds


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
    left, right = parse_equation(equation)
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


def balance_equation(equation: str):
    """
    Balancea una ecuación química y devuelve un diccionario con los coeficientes enteros.

    Ejemplo:
    >>> balance_equation("C3H8 + O2 = CO2 + H2O")
    {'C3H8': 1, 'O2': 5, 'CO2': 3, 'H2O': 4}
    """
    A = build_matrix(equation)
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

    left, right = parse_equation(equation)
    compounds = left + right
    
    # Crea diccionarios separados para reactivos y productos
    left_result = {left[i]: vec[i] for i in range(len(left))}
    right_result = {right[i]: vec[len(left) + i] for i in range(len(right))}
    
    return {"left": left_result, "right": right_result}


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
