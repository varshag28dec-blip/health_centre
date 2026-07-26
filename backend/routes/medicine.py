from flask import Blueprint, request, jsonify
from models import Medicine
from database import db
from datetime import datetime

medicine_bp = Blueprint("medicine", __name__)


# Get All Medicines
@medicine_bp.route("/medicines", methods=["GET"])
def get_medicines():
    medicines = Medicine.query.all()
    return jsonify([m.to_dict() for m in medicines])


# Add Medicine
@medicine_bp.route("/medicine", methods=["POST"])
def add_medicine():

    data = request.json

    balance = int(data["quantity_in"]) - int(data["quantity_out"])

    medicine = Medicine(
        medicine_name=data["medicine_name"],
        batch_number=data["batch_number"],
        quantity_in=data["quantity_in"],
        quantity_out=data["quantity_out"],
        balance=balance,
        expiry_date=datetime.strptime(data["expiry_date"], "%Y-%m-%d"),
        manufacturer=data.get("manufacturer", ""),
        category=data.get("category", ""),
        reorder_level=data.get("reorder_level", 10),
        remarks=data.get("remarks", "")
    )

    db.session.add(medicine)
    db.session.commit()

    return jsonify({
        "message": "Medicine Added Successfully"
    })


# Update Medicine
@medicine_bp.route("/medicine/<int:id>", methods=["PUT"])
def update_medicine(id):

    medicine = Medicine.query.get_or_404(id)

    data = request.json

    medicine.medicine_name = data["medicine_name"]
    medicine.batch_number = data["batch_number"]
    medicine.quantity_in = data["quantity_in"]
    medicine.quantity_out = data["quantity_out"]

    medicine.balance = (
        int(data["quantity_in"])
        - int(data["quantity_out"])
    )

    medicine.expiry_date = datetime.strptime(
        data["expiry_date"],
        "%Y-%m-%d"
    )

    medicine.manufacturer = data["manufacturer"]
    medicine.category = data["category"]
    medicine.reorder_level = data["reorder_level"]
    medicine.remarks = data["remarks"]

    db.session.commit()

    return jsonify({
        "message": "Medicine Updated Successfully"
    })


# Delete Medicine
@medicine_bp.route("/medicine/<int:id>", methods=["DELETE"])
def delete_medicine(id):

    medicine = Medicine.query.get_or_404(id)

    db.session.delete(medicine)
    db.session.commit()

    return jsonify({
        "message": "Medicine Deleted Successfully"
    })

from datetime import datetime, timedelta

@medicine_bp.route("/dashboard", methods=["GET"])
def dashboard():

    medicines = Medicine.query.all()

    total_medicines = len(medicines)

    total_stock = sum(m.balance for m in medicines)

    low_stock = len([m for m in medicines if m.balance <= m.reorder_level])

    expired = len([
    m for m in medicines
    if m.expiry_date < datetime.today().date()
    ])
    
    expiring_soon = len([
    m for m in medicines
    if datetime.today().date()
    <= m.expiry_date
    <= (datetime.today() + timedelta(days=30)).date()
   ])

    return jsonify({
        "total_medicines": total_medicines,
        "total_stock": total_stock,
        "low_stock": low_stock,
        "expired": expired,
        "expiring_soon": expiring_soon
    })