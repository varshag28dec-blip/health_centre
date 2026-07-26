import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Pill, Hash, PackagePlus, CalendarDays } from "lucide-react";
import API from "../services/api";


function MedicineRegister() {


  const [form, setForm] = useState({

    medicine_name: "",
    batch_number: "",
    quantity_in: "",
    quantity_out: "",
    expiry_date: ""

  });



  const handleChange = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      await API.post("/medicine", form);


      alert("Medicine Added Successfully ✅");



      setForm({

        medicine_name: "",
        batch_number: "",
        quantity_in: "",
        quantity_out: "",
        expiry_date: ""

      });



    } catch (error) {


      console.log(error);

      alert("Error adding medicine ❌");


    }


  };



  return (


    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-8">


      {/* Header */}

      <div className="flex justify-between items-center mb-8">


        <h1 className="text-3xl font-bold text-gray-800">

          💊 Medicine Register

        </h1>



        <Link

          to="/dashboard"

          className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600 transition"

        >

          <Home size={20}/>

          Home

        </Link>


      </div>




      {/* Form Card */}


      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8">


        <h2 className="text-2xl font-bold text-emerald-600 mb-6">

          Add New Medicine

        </h2>



        <form onSubmit={handleSubmit} className="space-y-5">



          {/* Medicine Name */}


          <div>

            <label className="font-semibold text-gray-700">
              Medicine Name
            </label>


            <div className="flex items-center border rounded-xl mt-2 px-3">

              <Pill className="text-emerald-500"/>


              <input

                type="text"

                name="medicine_name"

                value={form.medicine_name}

                onChange={handleChange}

                placeholder="Enter medicine name"

                className="w-full p-3 outline-none"

                required

              />


            </div>


          </div>




          {/* Batch Number */}


          <div>

            <label className="font-semibold text-gray-700">
              Batch Number
            </label>


            <div className="flex items-center border rounded-xl mt-2 px-3">


              <Hash className="text-blue-500"/>


              <input

                type="text"

                name="batch_number"

                value={form.batch_number}

                onChange={handleChange}

                placeholder="Enter batch number"

                className="w-full p-3 outline-none"

                required

              />


            </div>


          </div>





          {/* Quantity */}


          <div className="grid md:grid-cols-2 gap-5">


            <div>

              <label className="font-semibold text-gray-700">
                Quantity In
              </label>


              <div className="flex items-center border rounded-xl mt-2 px-3">


                <PackagePlus className="text-green-500"/>


                <input

                  type="number"

                  name="quantity_in"

                  value={form.quantity_in}

                  onChange={handleChange}

                  placeholder="Quantity received"

                  className="w-full p-3 outline-none"

                  required

                />


              </div>


            </div>





            <div>


              <label className="font-semibold text-gray-700">
                Quantity Out
              </label>


              <div className="flex items-center border rounded-xl mt-2 px-3">


                <PackagePlus className="text-red-500"/>


                <input

                  type="number"

                  name="quantity_out"

                  value={form.quantity_out}

                  onChange={handleChange}

                  placeholder="Quantity issued"

                  className="w-full p-3 outline-none"

                  required

                />


              </div>


            </div>


          </div>





          {/* Expiry Date */}


          <div>


            <label className="font-semibold text-gray-700">
              Expiry Date
            </label>


            <div className="flex items-center border rounded-xl mt-2 px-3">


              <CalendarDays className="text-orange-500"/>


              <input

                type="date"

                name="expiry_date"

                value={form.expiry_date}

                onChange={handleChange}

                className="w-full p-3 outline-none"

                required

              />


            </div>


          </div>





          {/* Button */}


          <button

            type="submit"

            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition"

          >

            Save Medicine 💊

          </button>



        </form>


      </div>


    </div>


  );

}



export default MedicineRegister;