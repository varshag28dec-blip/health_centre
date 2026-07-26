import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MedicineList from "./pages/MedicineList";
import MedicineRegister from "./pages/MedicineRegister";
import Prediction from "./pages/Prediction";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={<Dashboard />} 
        />

        <Route 
          path="/medicines" 
          element={<MedicineList />} 
        />

        <Route 
          path="/register" 
          element={<MedicineRegister />} 
        />

        <Route path="/prediction" element={<Prediction />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;