const express = require("express");

const router = express.Router();

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  archiveLead,
  bulkStatusUpdate,
  exportLeadsCSV,
} = require("../controllers/leadController");

router.post("/", createLead);

router.get("/", getLeads);

router.get("/export/csv", exportLeadsCSV);

router.patch("/bulk-status", bulkStatusUpdate);

router.get("/:id", getLeadById);

router.put("/:id", updateLead);

router.patch("/:id/archive", archiveLead);

module.exports = router;