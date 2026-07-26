import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/sidebar";
import Charts from "../components/Charts";

import {
  Pill,
  Package,
  AlertTriangle,
  Clock,
  XCircle,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    total_medicines: 0,
    total_stock: 0,
    low_stock: 0,
    expired: 0,
    expiring_soon: 0,
  });

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const response = await API.get("/dashboard");
      setStats(response.data);
    } catch (error) {
      console.log("Dashboard API Error:", error);
    }
  };

  const cards = [
    {
      title: "Total Medicines",
      value: stats.total_medicines,
      icon: <Pill size={35} />,
      color: "text-emerald-600",
    },
    {
      title: "Available Stock",
      value: stats.total_stock,
      icon: <Package size={35} />,
      color: "text-blue-600",
    },
    {
      title: "Low Stock",
      value: stats.low_stock,
      icon: <AlertTriangle size={35} />,
      color: "text-yellow-500",
    },
    {
      title: "Expiring Soon",
      value: stats.expiring_soon,
      icon: <Clock size={35} />,
      color: "text-orange-500",
    },
    {
      title: "Expired Medicines",
      value: stats.expired,
      icon: <XCircle size={35} />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              🏥 PHC Medicine Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-6 hover:scale-105 transition duration-300"
                >
                  <div className={card.color}>{card.icon}</div>
                  <h2 className="text-gray-500 mt-4 font-semibold">{card.title}</h2>
                  <p className="text-4xl font-bold text-gray-800 mt-2">{card.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome to Primary Health Centre Medicine Stock System
              </h2>
              <p className="mt-3 text-gray-600">
                Manage medicine inventory, monitor expiry dates, track stock levels and predict medicine requirements.
              </p>
            </div>

            <Charts />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
