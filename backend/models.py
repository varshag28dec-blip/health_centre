from database import db
from datetime import datetime


class Medicine(db.Model):
    __tablename__ = "medicines"

    id = db.Column(db.Integer, primary_key=True)

    medicine_name = db.Column(db.String(120), nullable=False)

    batch_number = db.Column(db.String(80), nullable=False)

    quantity_in = db.Column(db.Integer, nullable=False)

    quantity_out = db.Column(db.Integer, nullable=False)

    balance = db.Column(db.Integer, nullable=False)

    expiry_date = db.Column(db.Date, nullable=False)

    entry_date = db.Column(db.Date, default=datetime.utcnow)

    manufacturer = db.Column(db.String(120))

    category = db.Column(db.String(80))

    reorder_level = db.Column(db.Integer, default=10)

    remarks = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "medicine_name": self.medicine_name,
            "batch_number": self.batch_number,
            "quantity_in": self.quantity_in,
            "quantity_out": self.quantity_out,
            "balance": self.balance,
            "expiry_date": self.expiry_date.strftime("%Y-%m-%d"),
            "entry_date": self.entry_date.strftime("%Y-%m-%d"),
            "manufacturer": self.manufacturer,
            "category": self.category,
            "reorder_level": self.reorder_level,
            "remarks": self.remarks
        }