from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

USERNAME = "admin"
PASSWORD = "admin123"


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json
    print("Received data:", data)  # Debugging line

    username = data.get("username")
    password = data.get("password")

    if username == USERNAME and password == PASSWORD:
        return jsonify({
            "success": True,
            "message": "Login Successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid Username or Password"
    }), 401