import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FiHome size={20} />,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: <FiUsers size={20} />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-slate-700">

        <h2 className="text-2xl font-bold tracking-wide">
          CLT
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Centre Lead Tracker
        </p>

      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">

        <ul className="space-y-2">

          {menus.map((menu) => (
            <li key={menu.path}>

              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {menu.icon}

                <span>{menu.name}</span>

              </NavLink>

            </li>
          ))}

        </ul>

      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 px-6 py-5">

        <p className="text-xs text-slate-400">
          Centre Lead Tracker
        </p>

        <p className="text-xs text-slate-500 mt-1">
          Java Full Stack Assignment
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;