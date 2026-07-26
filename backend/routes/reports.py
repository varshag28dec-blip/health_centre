from flask import Blueprint, send_file
from models import Medicine
import pandas as pd
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
import os

reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/export/csv")
def export_csv():

    medicines = Medicine.query.all()

    data = []

    for m in medicines:
        data.append({
            "Medicine": m.medicine_name,
            "Batch": m.batch_number,
            "Balance": m.balance,
            "Expiry": m.expiry_date,
            "Category": m.category
        })

    df = pd.DataFrame(data)

    os.makedirs("exports", exist_ok=True)

    file_path = "exports/medicine_report.csv"

    df.to_csv(file_path, index=False)

    return send_file(file_path, as_attachment=True)


@reports_bp.route("/export/pdf")
def export_pdf():

    medicines = Medicine.query.all()

    os.makedirs("exports", exist_ok=True)

    pdf_path = "exports/medicine_report.pdf"

    doc = SimpleDocTemplate(pdf_path)

    table_data = [["Medicine", "Batch", "Balance", "Expiry"]]

    for m in medicines:

        table_data.append([
            m.medicine_name,
            m.batch_number,
            str(m.balance),
            str(m.expiry_date)
        ])

    table = Table(table_data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.green),
        ("TEXTCOLOR", (0,0), (-1,0), colors.white),
        ("GRID", (0,0), (-1,-1), 1, colors.black),
        ("BOTTOMPADDING", (0,0), (-1,0), 10),
    ]))

    doc.build([table])

    return send_file(pdf_path, as_attachment=True)