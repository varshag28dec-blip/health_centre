import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardPlus,
  Table,
  Brain,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 flex-shrink-0 min-h-screen bg-gradient-to-b from-emerald-600 to-blue-600 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        🏥 PHC Medicine
      </h1>

      <nav className="space-y-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/register"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <ClipboardPlus size={20} />
          Medicine Register
        </Link>

        <Link
          to="/medicines"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <Table size={20} />
          Medicine List
        </Link>

        <Link
          to="/prediction"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <Brain size={20} />
          Prediction
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <FileText size={20} />
          Reports
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

      <div className="mt-10">

        <button className="flex items-center gap-3 bg-red-500 px-4 py-3 rounded-xl w-full hover:bg-red-600">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;