import { useEffect, useState } from "react";
import api from "../services/api";
import {
  FiUsers,
  FiClock,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

function DashboardCards() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    overdueLeads: 0,
    demoScheduled: 0,
    converted: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
  try {
    const res = await api.get("/dashboard");

    console.log("Dashboard Response:", res.data);

    setStats(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

 const cards = [
  {
    title: "👥 Total Leads",
    value: stats.totalLeads,
    icon: <FiUsers size={28} />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "⏰ Pending Follow-ups",
    value: stats.overdueLeads,
    icon: <FiClock size={28} />,
    bg: "bg-red-100",
    color: "text-red-600",
  },
  {
    title: "📅 Demo Scheduled",
    value: stats.demoScheduled,
    icon: <FiCalendar size={28} />,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    title: "✅ Converted",
    value: stats.converted,
    icon: <FiCheckCircle size={28} />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {card.value}
              </h2>
            </div>

            <div className={`${card.bg} ${card.color} p-4 rounded-full`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;