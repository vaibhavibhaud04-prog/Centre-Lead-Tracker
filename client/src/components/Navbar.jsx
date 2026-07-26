import { FiBell } from "react-icons/fi";

function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">

      <div className="flex items-center justify-between">

        {/* Left Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Centre Lead Tracker
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage leads and follow-ups efficiently
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <FiBell size={22} className="text-gray-600" />

            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            <div className="text-right">

              <h3 className="text-sm font-semibold text-slate-800">
                Admin
              </h3>

              <p className="text-xs text-gray-500">
                Centre Manager
              </p>

            </div>

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              A
            </div>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;