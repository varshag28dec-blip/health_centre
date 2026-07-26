from flask import Blueprint, request, jsonify
from ml.predict import predict_medicine

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/predict", methods=["POST"])
def predict():

    data = request.json

    quantity_in = int(data["quantity_in"])
    quantity_out = int(data["quantity_out"])
    balance = int(data["balance"])
    days = int(data["days_to_expiry"])


    result, confidence = predict_medicine(
        quantity_in,
        quantity_out,
        balance,
        days
    )


    return jsonify({

        "status": "success",

        "prediction": "Need Attention" if result == 1 else "Safe",

        "confidence": confidence,

        "message":
            "Medicine stock requires attention" if result == 1 else "Medicine stock level is healthy"
        
    })