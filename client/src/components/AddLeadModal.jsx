import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../services/api";

function AddLeadModal({ open, onClose, refreshLeads, lead }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (lead) {
      reset(lead);
    } else {
      reset({
        parentName: "",
        childName: "",
        childAge: "",
        phone: "",
        email: "",
        preferredCentre: "",
        assignedOwner: "",
        status: "New",
      });
    }
  }, [lead, reset]);

  const onSubmit = async (data) => {
    try {
      if (lead) {
        await api.put(`/leads/${lead.id}`, data);
        toast.success("Lead updated successfully");
      } else {
        await api.post("/leads", {
          ...data,
          source: "Website",
        });
        toast.success("Lead added successfully");
      }

      refreshLeads();
      reset();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {lead ? "Edit Lead" : "Add Lead"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            {...register("parentName")}
            placeholder="Parent Name"
            className="border rounded-lg p-3"
          />

          <input
            {...register("childName")}
            placeholder="Child Name"
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            {...register("childAge")}
            placeholder="Child Age"
            className="border rounded-lg p-3"
          />

          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            {...register("preferredCentre")}
            placeholder="Preferred Centre"
            className="border rounded-lg p-3"
          />

          <input
            {...register("assignedOwner")}
            placeholder="Assigned Owner"
            className="border rounded-lg p-3"
          />

          {/* Status Dropdown */}
          <select
            {...register("status")}
            className="border rounded-lg p-3"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Demo Scheduled">Demo Scheduled</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {lead ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLeadModal;