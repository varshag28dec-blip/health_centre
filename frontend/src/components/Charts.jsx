import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


function Charts() {


  const stockData = {

    labels: [
      "Paracetamol",
      "Amoxicillin",
      "Vitamin C",
      "Cetirizine",
      "ORS"
    ],

    datasets: [
      {
        label: "Stock Quantity",

        data: [
          120,
          80,
          150,
          60,
          100
        ],

        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#14B8A6",
          "#22C55E",
          "#60A5FA"
        ],

        borderRadius: 12
      }
    ]
  };



  const expiryData = {

    labels: [
      "Safe",
      "Expiring Soon",
      "Expired"
    ],

    datasets: [
      {
        data: [
          70,
          20,
          10
        ],

        backgroundColor: [
          "#10B981",
          "#FACC15",
          "#EF4444"
        ],

        borderWidth: 2
      }
    ]
  };



  const activityData = {

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May"
    ],

    datasets: [
      {
        label: "Monthly Transactions",

        data: [
          30,
          45,
          60,
          40,
          75
        ],

        borderColor: "#10B981",

        backgroundColor: "#10B981",

        tension: 0.4,

        pointRadius: 5
      }
    ]
  };



  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };


  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">


      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-gray-700 mb-5">
          📊 Medicine Stock
        </h2>

        <Bar 
          data={stockData}
          options={options}
        />

      </div>




      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-gray-700 mb-5">
          🥧 Expiry Status
        </h2>

        <Pie 
          data={expiryData}
          options={options}
        />

      </div>




      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 lg:col-span-2">

        <h2 className="text-xl font-bold text-gray-700 mb-5">
          📈 Monthly Activity
        </h2>

        <Line 
          data={activityData}
          options={options}
        />

      </div>


    </div>

  );

}


export default Charts;