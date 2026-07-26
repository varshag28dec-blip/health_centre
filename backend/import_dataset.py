import pandas as pd
from app import app
from database import db
from models import Medicine
from datetime import datetime, timedelta

with app.app_context():

    df = pd.read_csv("ml/dataset.csv")

    # Remove existing medicines (optional)
    Medicine.query.delete()

    for _, row in df.iterrows():

        try:

            days = int(row["Days_To_Expiry"])

            expiry_date = (
                datetime.today() + timedelta(days=days)
            ).date()

            medicine = Medicine(

                medicine_name=str(row["Medicine_Name"]),

                batch_number=str(row["Batch_Number"]),

                quantity_in=int(row["Quantity_In"]),

                quantity_out=int(row["Quantity_Out"]),

                balance=int(row["Balance"]),

                expiry_date=expiry_date,

                manufacturer=str(row["Manufacturer"])
                if pd.notna(row["Manufacturer"]) else "",

                category=str(row["Category"])
                if pd.notna(row["Category"]) else "",

                reorder_level=10,

                remarks="Imported from Dataset"

            )

            db.session.add(medicine)

        except Exception as e:

            print("Skipped:", row["Batch_Number"], e)

    db.session.commit()

    print("===================================")
    print("100 Medicines Imported Successfully")
    print("===================================")