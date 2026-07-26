from flask import Blueprint, jsonify
from models import Medicine
from datetime import date

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard():

    medicines = Medicine.query.all()

    total_medicines = len(medicines)

    total_stock = sum(m.balance for m in medicines)

    low_stock = sum(
        1
        for m in medicines
        if m.balance <= m.reorder_level
    )

    expired = sum(
        1
        for m in medicines
        if m.expiry_date < date.today()
    )

    expiring = sum(
        1
        for m in medicines
        if 0 <= (m.expiry_date - date.today()).days <= 30
    )

    return jsonify({

        "total_medicines": total_medicines,

        "available_stock": total_stock,

        "low_stock": low_stock,

        "expired": expired,

        "expiring_soon": expiring

    })