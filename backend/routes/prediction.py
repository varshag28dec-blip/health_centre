import joblib
import numpy as np

from flask import Blueprint
from flask import jsonify
from flask import request

prediction_bp = Blueprint("prediction", __name__)

model = joblib.load("ml/model.pkl")


@prediction_bp.route("/predict", methods=["POST"])
def predict():

    data = request.json

    quantity_in = int(data["quantity_in"])
    quantity_out = int(data["quantity_out"])
    balance = int(data["balance"])
    days = int(data["days_to_expiry"])

    sample = np.array([
        [
            quantity_in,
            quantity_out,
            balance,
            days
        ]
    ])

    prediction = model.predict(sample)[0]

    probability = model.predict_proba(sample)[0]

    confidence = round(max(probability) * 100, 2)

    result = "Yes" if prediction == 1 else "No"

    status = (
        "Prediction Reliable"
        if confidence >= 60
        else "Prediction Uncertain"
    )

    return jsonify({

        "Need_Attention": result,

        "Confidence": confidence,

        "Status": status

    })