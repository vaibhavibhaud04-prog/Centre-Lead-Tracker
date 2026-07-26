import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

import LeadToolbar from "../components/LeadToolbar";
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";
import AddLeadModal from "../components/AddLeadModal";

function Leads() {
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads");
      setLeads(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch leads");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Archive Lead
  const handleArchive = async (id) => {
    const confirmArchive = window.confirm(
      "Are you sure you want to archive this lead?"
    );

    if (!confirmArchive) return;

    try {
      await api.patch(`/leads/${id}/archive`);

      toast.success("Lead archived successfully");

      fetchLeads();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to archive lead"
      );
    }
  };

  // Export CSV
  const handleExport = async () => {
    try {
      const response = await api.get("/leads/export/csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "leads.csv");

      document.body.appendChild(link);

      link.click();

      link.remove();

      toast.success("CSV Downloaded");
    } catch (error) {
      toast.error("CSV Download Failed");
    }
  };

  // Search + Filter
  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      lead.parentName?.toLowerCase().includes(searchText) ||
      lead.childName?.toLowerCase().includes(searchText) ||
      lead.phone?.includes(search);

    const matchesStatus =
      statusFilter === "" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      <LeadToolbar
        onAdd={() => {
          setSelectedLead(null);
          setOpen(true);
        }}
        onExport={handleExport}
      />

      <LeadFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <LeadTable
        leads={filteredLeads}
        onEdit={(lead) => {
          setSelectedLead(lead);
          setOpen(true);
        }}
        onArchive={handleArchive}
      />

      <AddLeadModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedLead(null);
        }}
        refreshLeads={fetchLeads}
        lead={selectedLead}
      />
    </div>
  );
}

export default Leads;