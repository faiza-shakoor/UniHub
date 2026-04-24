from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase_client import supabase

app = Flask(__name__)


CORS(app, origins=["http://localhost:5173"])

@app.route("/api/shops", methods=["POST"])
def create_shop():
    try:
        data = request.get_json()

        shop_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "category": data.get("category"),
            "tags": data.get("tags", []),
            "owner_id": data.get("owner_id"),
            "average_rating": 0
        }

        response = supabase.table("shops").insert(shop_data).execute()

        return jsonify(response.data), 201

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)