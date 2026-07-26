function LeadTable({ leads, onEdit, onArchive }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "Demo Scheduled":
        return "bg-purple-100 text-purple-700";

      case "Converted":
        return "bg-green-100 text-green-700";

      case "Lost":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">Parent</th>

            <th className="p-4 text-left">Child</th>

            <th className="p-4 text-left">Phone</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Owner</th>

            <th className="p-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                No Leads Found
              </td>

            </tr>

          ) : (

            leads.map((lead) => (

              <tr
                key={lead.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-4">{lead.parentName}</td>

                <td className="p-4">{lead.childName}</td>

                <td className="p-4">{lead.phone}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>

                </td>

                <td className="p-4">
                  {lead.assignedOwner}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onEdit(lead)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onArchive(lead.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Archive
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default LeadTable;