const { Lead } = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const getDashboardStats = async (req, res) => {
  try {

    const totalLeads = await Lead.count({
      where: {
        isArchived: false,
      },
    });

    const overdueLeads = await Lead.count({
      where: {
        isArchived: false,
        status: {
          [Op.notIn]: ["Converted", "Lost"],
        },
        nextFollowUp: {
          [Op.lt]: new Date(),
        },
      },
    });

    const demoScheduled = await Lead.count({
      where: {
        status: "Demo Scheduled",
        isArchived: false,
      },
    });

    const converted = await Lead.count({
      where: {
        status: "Converted",
      },
    });

    res.json({
      success: true,
      data: {
        totalLeads,
        overdueLeads,
        demoScheduled,
        converted,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// get status counts for dashboard
const getStatusChart = async (req, res) => {
  try {

    const leads = await Lead.findAll({
      where: {
        isArchived: false,
      },
    });

    const statusCount = {};

    leads.forEach((lead) => {
      if (statusCount[lead.status]) {
        statusCount[lead.status]++;
      } else {
        statusCount[lead.status] = 1;
      }
    });

    const chartData = Object.keys(statusCount).map((status) => ({
      status,
      count: statusCount[status],
    }));

    res.json({
      success: true,
      data: chartData,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getDashboardStats,
  getStatusChart,
};