import DashboardCards from "../components/DashboardCards";
import StatusChart from "../components/StatusChart";

function Dashboard() {
  return (
    <div>

      <div className="mb-8">
       <h1 className="text-3xl font-bold text-slate-800">
        Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
        Welcome to Centre Lead Tracker
        </p>
      </div>

      <DashboardCards />

      <StatusChart />

    </div>
  );
}

export default Dashboard;