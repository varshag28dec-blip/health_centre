import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, Trash2 } from "lucide-react";
import API from "../services/api";


function MedicineList() {


  const [medicines, setMedicines] = useState([]);

  const [search, setSearch] = useState("");



  useEffect(() => {

    getMedicines();

  }, []);




  const getMedicines = async () => {

    try {

      const response = await API.get("/medicines");

      setMedicines(response.data);


    } catch(error){

      console.log(error);

    }

  };





  const deleteMedicine = async(id)=>{


    try{

      await API.delete(`/medicine/${id}`);

      alert("Medicine Deleted");

      getMedicines();


    }catch(error){

      console.log(error);

    }

  };






  const filteredMedicines = medicines.filter((medicine)=>

    medicine.medicine_name
    .toLowerCase()
    .includes(search.toLowerCase())

  );







  const statusCheck = (expiry,balance)=>{


    const today = new Date();

    const expiryDate = new Date(expiry);


    const days =
    (expiryDate-today)/(1000*60*60*24);



    if(days < 0){

      return "Expired";

    }


    if(days <=30){

      return "Expiring Soon";

    }


    if(balance <=10){

      return "Low Stock";

    }


    return "Safe";


  };







return(


<div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-8">



{/* Header */}


<div className="flex justify-between items-center mb-8">


<h1 className="text-3xl font-bold text-gray-800">

📋 Medicine List

</h1>



<Link

to="/dashboard"

className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-xl hover:bg-emerald-600"

>

<Home size={20}/>

Home

</Link>


</div>






{/* Search */}


<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-5 mb-8">


<div className="flex items-center border rounded-xl px-3">


<Search className="text-gray-400"/>


<input

type="text"

placeholder="Search medicine..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="w-full p-3 outline-none"

/>


</div>


</div>








{/* Table */}


<div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 overflow-x-auto">


<table className="w-full">


<thead>


<tr className="border-b">


<th className="p-3 text-left">
Medicine
</th>


<th className="p-3">
Batch
</th>


<th className="p-3">
Quantity
</th>


<th className="p-3">
Balance
</th>


<th className="p-3">
Expiry
</th>


<th className="p-3">
Status
</th>


<th className="p-3">
Action
</th>


</tr>


</thead>





<tbody>


{

filteredMedicines.map((medicine)=>(


<tr key={medicine.id} className="border-b hover:bg-gray-50">


<td className="p-3 font-semibold">

{medicine.medicine_name}

</td>



<td className="p-3">

{medicine.batch_number}

</td>




<td className="p-3 text-center">

{medicine.quantity_in}

</td>



<td className="p-3 text-center">

{medicine.balance}

</td>




<td className="p-3 text-center">

{medicine.expiry_date}

</td>





<td className="p-3 text-center">


<span

className={`px-3 py-1 rounded-full text-white text-sm

${
statusCheck(
medicine.expiry_date,
medicine.balance
)==="Safe"

?"bg-green-500"

:

statusCheck(
medicine.expiry_date,
medicine.balance
)==="Expired"

?"bg-red-500"

:

"bg-yellow-500"

}

`}

>

{

statusCheck(
medicine.expiry_date,
medicine.balance
)

}


</span>


</td>





<td className="p-3 text-center">


<button

onClick={()=>deleteMedicine(medicine.id)}

className="bg-red-500 text-white p-2 rounded-lg"

>


<Trash2 size={18}/>


</button>


</td>




</tr>


))


}


</tbody>


</table>



</div>



</div>


);


}


export default MedicineList;