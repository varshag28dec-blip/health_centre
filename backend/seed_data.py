from app import app
from database import db
from models import Medicine
from datetime import datetime, timedelta


with app.app_context():

    medicines = [
        Medicine(
            medicine_name="Paracetamol",
            batch_number="PCM101",
            quantity_in=500,
            quantity_out=100,
            balance=400,
            expiry_date=datetime.today()+timedelta(days=200),
            manufacturer="Cipla",
            category="Tablet",
            reorder_level=50,
            remarks="Available"
        ),

        Medicine(
            medicine_name="Amoxicillin",
            batch_number="AMX202",
            quantity_in=200,
            quantity_out=170,
            balance=30,
            expiry_date=datetime.today()+timedelta(days=20),
            manufacturer="Sun Pharma",
            category="Capsule",
            reorder_level=50,
            remarks="Expiring Soon"
        ),

        Medicine(
            medicine_name="Insulin",
            batch_number="INS303",
            quantity_in=100,
            quantity_out=20,
            balance=80,
            expiry_date=datetime.today()-timedelta(days=10),
            manufacturer="Abbott",
            category="Injection",
            reorder_level=20,
            remarks="Expired"
        )
    ]


    db.session.add_all(medicines)
    db.session.commit()

    print("Sample medicines added successfully")