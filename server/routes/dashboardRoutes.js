const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getStatusChart,
} = require("../controllers/dashboardController");

router.get("/", getDashboardStats);
router.get("/status-chart", getStatusChart);

module.exports = router;