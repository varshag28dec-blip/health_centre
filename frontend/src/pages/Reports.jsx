import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Home, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const res = await API.get("/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("PHC Medicine Stock Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [[
        "Medicine",
        "Batch",
        "Balance",
        "Expiry"
      ]],
      body: medicines.map((m) => [
        m.medicine_name,
        m.batch_number,
        m.balance,
        m.expiry_date,
      ]),
    });

    doc.save("Medicine_Report.pdf");
  };

  const exportCSV = () => {
    const headers = [
      "Medicine",
      "Batch",
      "Quantity In",
      "Quantity Out",
      "Balance",
      "Expiry"
    ];

    const rows = medicines.map((m) => [
      m.medicine_name,
      m.batch_number,
      m.quantity_in,
      m.quantity_out,
      m.balance,
      m.expiry_date,
    ]);

    const csv =
      [headers, ...rows]
        .map((e) => e.join(","))
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "Medicine_Report.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          📄 Reports
        </h1>

        <Link
          to="/dashboard"
          className="bg-green-500 text-white px-5 py-3 rounded-xl"
        >
          <Home size={20} />
        </Link>

      </div>

      <div className="flex gap-4 mb-6">

        <button
          onClick={exportPDF}
          className="bg-red-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Download size={18} />
          Export PDF
        </button>

        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Download size={18} />
          Export CSV
        </button>

      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-auto">

        <table className="w-full">

          <thead className="bg-green-500 text-white">

            <tr>
              <th className="p-3">Medicine</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Quantity In</th>
              <th className="p-3">Quantity Out</th>
              <th className="p-3">Balance</th>
              <th className="p-3">Expiry</th>
            </tr>

          </thead>

          <tbody>

            {medicines.map((m) => (

              <tr key={m.id} className="border-b hover:bg-gray-100">

                <td className="p-3">{m.medicine_name}</td>
                <td className="p-3">{m.batch_number}</td>
                <td className="p-3">{m.quantity_in}</td>
                <td className="p-3">{m.quantity_out}</td>
                <td className="p-3">{m.balance}</td>
                <td className="p-3">{m.expiry_date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;