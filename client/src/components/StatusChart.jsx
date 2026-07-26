import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function StatusChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const res = await api.get("/dashboard/status-chart");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Lead Status Overview
        </h2>

        <p className="text-sm text-gray-500">
          Distribution of leads by current status
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="status" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusChart;