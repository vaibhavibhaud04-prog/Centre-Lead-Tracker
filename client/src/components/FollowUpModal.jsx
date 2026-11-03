
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function FollowUpModal({ open, onClose, lead, refreshLeads }) {
  const [followUpDate, setFollowUpDate] = useState(getTodayDate());
  const [channel, setChannel] = useState("Call");
  const [outcome, setOutcome] = useState("");
  const [notes, setNotes] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!lead?.id) return;

    try {
      const res = await api.get(`/followups/${lead.id}`);
      setHistory(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load follow-up history");
    }
  };

  useEffect(() => {
    if (open && lead?.id) {
      fetchHistory();
    }
  }, [open, lead?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!outcome.trim()) {
      toast.error("Please enter follow-up outcome");
      return;
    }

    try {
      setLoading(true);

      await api.post("/followups", {
        leadId: lead.id,
        followUpDate,
        channel,
        outcome,
        notes,
        nextFollowUp: nextFollowUp || null,
      });

      toast.success("Follow-up added successfully");

      setOutcome("");
      setNotes("");
      setNextFollowUp("");

      await fetchHistory();

      if (refreshLeads) {
        refreshLeads();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add follow-up"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open || !lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Follow-up Details
            </h2>
            <p className="text-sm text-gray-500">
              Lead: {lead.parentName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-1">
                Follow-up Date *
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Channel *
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="Call">Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Visit">Visit</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Outcome *
              </label>
              <input
                type="text"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="e.g. Interested, Not Interested"
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Next Follow-up Date
              </label>
              <input
                type="date"
                value={nextFollowUp}
                onChange={(e) => setNextFollowUp(e.target.value)}
                min={followUpDate}
                className="w-full border rounded-lg p-2"
              />
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter follow-up notes..."
              rows="3"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Close
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Follow-up"}
            </button>
          </div>

        </form>

        <hr className="my-6" />

        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Follow-up History
        </h3>

        {history.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No follow-up history available.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 bg-slate-50"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <span className="font-semibold text-slate-800">
                    {item.channel}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.followUpDate}
                  </span>
                </div>

                <p className="text-sm mt-2">
                  <strong>Outcome:</strong> {item.outcome}
                </p>

                {item.notes && (
                  <p className="text-sm mt-1">
                    <strong>Notes:</strong> {item.notes}
                  </p>
                )}

                {item.nextFollowUp && (
                  <p className="text-sm mt-1 text-green-700">
                    <strong>Next Follow-up:</strong>{" "}
                    {item.nextFollowUp}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default FollowUpModal;
