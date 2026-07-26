import { FiSearch, FiFilter } from "react-icons/fi";

function LeadFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">

      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <div className="relative flex-1">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by parent, child or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Status Filter */}
        <div className="relative w-full md:w-64">

          <FiFilter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Demo Scheduled">Demo Scheduled</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default LeadFilters;