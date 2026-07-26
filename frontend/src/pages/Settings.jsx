import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, Bell, Moon, Save } from "lucide-react";

function Settings() {

  const [settings, setSettings] = useState({
    username: "Admin",
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          ⚙️ Settings
        </h1>

        <Link
          to="/dashboard"
          className="bg-green-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Home size={20}/>
          Home
        </Link>

      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="mb-6">

          <label className="font-semibold flex items-center gap-2">
            <User size={18}/>
            Username
          </label>

          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mt-2"
          />

        </div>

        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-2">

            <Bell size={20}/>
            Enable Notifications

          </div>

          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />

        </div>

        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-2">

            <Moon size={20}/>
            Dark Mode

          </div>

          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />

        </div>

        <button
          onClick={saveSettings}
          className="w-full bg-green-500 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-green-600"
        >
          <Save size={20}/>
          Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;