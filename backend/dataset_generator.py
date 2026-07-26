import pandas as pd
import random
from datetime import datetime, timedelta

medicine_names = [
    "Paracetamol",
    "Amoxicillin",
    "Ibuprofen",
    "Cetirizine",
    "Metformin",
    "Azithromycin",
    "Vitamin C",
    "ORS",
    "Insulin",
    "Pantoprazole"
]

manufacturers = [
    "Sun Pharma",
    "Cipla",
    "Dr Reddy",
    "Mankind",
    "Abbott"
]

categories = [
    "Tablet",
    "Capsule",
    "Syrup",
    "Injection"
]

rows = []

today = datetime.today()

for i in range(100):

    medicine = random.choice(medicine_names)

    qty_in = random.randint(50, 500)

    qty_out = random.randint(0, qty_in)

    balance = qty_in - qty_out

    days = random.randint(-90, 365)

    expiry = today + timedelta(days=days)

    attention = "Yes" if balance <= 20 or days <= 30 else "No"

    rows.append({

        "Medicine_Name": medicine,

        "Batch_Number": f"BT{i+1:03}",

        "Quantity_In": qty_in,

        "Quantity_Out": qty_out,

        "Balance": balance,

        "Days_To_Expiry": days,

        "Manufacturer": random.choice(manufacturers),

        "Category": random.choice(categories),

        "Need_Attention": attention

    })

df = pd.DataFrame(rows)

# Add missing values intentionally
df.loc[5, "Manufacturer"] = None
df.loc[20, "Category"] = None

# Invalid record
df.loc[50, "Quantity_Out"] = 9999

df.to_csv("ml/dataset.csv", index=False)

print("Dataset Created Successfully")