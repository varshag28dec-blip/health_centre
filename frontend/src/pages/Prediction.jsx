import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { Home, Brain } from "lucide-react";

function Prediction() {
  const [form, setForm] = useState({
    quantity_in: "",
    quantity_out: "",
    balance: "",
    days_to_expiry: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const predict = async () => {
  if (Object.values(form).some((v) => v === "")) {
    alert("Please fill in all fields");
    return;
  }
  try {
    const response = await API.post("/predict", form);
    setResult({
      prediction: response.data.prediction,
      confidence: response.data.confidence,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert("Prediction Failed");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🤖 Medicine Prediction
        </h1>

        <Link
          to="/dashboard"
          className="bg-emerald-500 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
        >
          <Home size={20}/>
          Home
        </Link>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <Brain size={60} className="text-blue-500 mb-5"/>

        <input
          type="number"
          name="quantity_in"
          placeholder="Quantity In"
          value={form.quantity_in}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="number"
          name="quantity_out"
          placeholder="Quantity Out"
          value={form.quantity_out}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="number"
          name="balance"
          placeholder="Balance"
          value={form.balance}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="number"
          name="days_to_expiry"
          placeholder="Days to Expiry"
          value={form.days_to_expiry}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl mb-5"
        />

        <button
          onClick={predict}
          className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
        >
          Predict
        </button>
        {result && (
        <div className="mt-8 bg-gray-100 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-4">
            AI Prediction Result
        </h2>


        <div className="text-lg">

        <p>
            Status :
            <span 
                className={
                   result.prediction === "Safe"
                   ? "text-green-600 font-bold ml-2"
                   : "text-red-600 font-bold ml-2"
                }
            >
                {result.prediction}
            </span>
        </p>


<p className="mt-3">
    Confidence :
    <span className="font-bold ml-2 text-blue-600">
       {result.confidence}%
    </span>
</p>


</div>


<div className="mt-5">

<div className="w-full bg-gray-300 rounded-full h-4">

<div
className="bg-blue-500 h-4 rounded-full"
style={{
width:`${result.confidence}%`
}}
>
</div>

</div>

</div>


</div>
)}

      </div>
    </div>
  );
}

export default Prediction;