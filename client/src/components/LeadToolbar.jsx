import { FiPlus, FiDownload } from "react-icons/fi";

function LeadToolbar({ onAdd, onExport }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-xl shadow-sm mb-6">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Lead Management
        </h1>

        <p className="text-gray-500 text-sm">
          Manage all leads from one place
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <FiDownload size={18} />
          Export CSV
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <FiPlus size={18} />
          Add Lead
        </button>

      </div>
    </div>
  );
}

export default LeadToolbar;