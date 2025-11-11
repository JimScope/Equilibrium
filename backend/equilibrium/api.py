from flask import Flask, request, jsonify
from equilibrium.utils import balance_equation
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite acceso desde el frontend

@app.route("/balance", methods=["POST"])
def balance_endpoint():
    try:
        data = request.get_json()
        if not data or "equation" not in data:
            return jsonify({"error": "Debe incluir la clave 'equation'."}), 400

        eq = data["equation"]
        result = balance_equation(eq)
        return jsonify({"balanced": result}), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Error interno: {e}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
