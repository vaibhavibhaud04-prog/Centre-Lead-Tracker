const { Lead } = require("../models");
const { Op } = require("sequelize");
const { Parser } = require("json2csv");

// Create Lead
const createLead = async (req, res) => {
  try {
    const {
      parentName,
      childName,
      childAge,
      phone,
      email,
      preferredCentre,
      source,
      assignedOwner,
      status,
      nextFollowUp,
      notes,
    } = req.body;

    // Normalize phone number
    const normalizedPhone = phone.replace(/\D/g, "").slice(-10);

    // Check duplicate active lead
        const existingLead = await Lead.findOne({
        where: {
            phone: normalizedPhone,
            isArchived: false,
            status: {
            [Op.notIn]: ["Converted", "Lost"],
            },
        },
        });

        if (existingLead) {
        return res.status(400).json({
            success: false,
            message: "An active lead with this phone number already exists.",
        });
        }

    const lead = await Lead.create({
      parentName,
      childName,
      childAge,
      phone: normalizedPhone,
      email,
      preferredCentre,
      source,
      assignedOwner,
      status,
      nextFollowUp,
      notes,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Leads
const getLeads = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      owner,
      centre,
    } = req.query;

    const where = {
      isArchived: false,
    };

    if (status) {
      where.status = status;
    }

    if (owner) {
      where.assignedOwner = owner;
    }

    if (centre) {
      where.preferredCentre = centre;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Lead.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get single lead 
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (["Converted", "Lost"].includes(lead.status)) {
        if (req.body.notes) {
            lead.notes = req.body.notes;
            await lead.save();

            return res.json({
            success: true,
            message: "Notes updated successfully.",
            data: lead,
            });
        }

        return res.status(400).json({
            success: false,
            message: "Converted or Lost leads cannot be edited except notes.",
        });
        }

    await lead.update(req.body);

    res.json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Archive Lead
const archiveLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.isArchived = true;

    await lead.save();

    res.json({
      success: true,
      message: "Lead archived successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Bulk Archive Leads

const bulkStatusUpdate = async (req, res) => {
  try {

    const { leadIds, status } = req.body;

    // Validation
    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide lead IDs.",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status.",
      });
    }

    const allowedStatuses = [
    "New",
    "Contacted",
    "Demo Scheduled",
    "Demo Completed",
    "Converted",
    "Lost",
    ];

    if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
        success: false,
        message: "Invalid status.",
    });
    }

    const result = await Lead.update(
      { status },
      {
        where: {
          id: leadIds,
          isArchived: false,
        },
      }
    );

    res.json({
      success: true,
      message: `${result[0]} lead(s) updated successfully.`,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Export Leads CSV
const exportLeadsCSV = async (req, res) => {
  try {
    const { status, owner, centre } = req.query;

    const where = {
      isArchived: false,
    };

    if (status) {
      where.status = status;
    }

    if (owner) {
      where.assignedOwner = owner;
    }

    if (centre) {
      where.preferredCentre = centre;
    }

    const leads = await Lead.findAll({
      where,
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    // Convert timestamps to UTC ISO 8601
    const formattedLeads = leads.map((lead) => ({
      ...lead,
      nextFollowUp: lead.nextFollowUp
        ? new Date(lead.nextFollowUp).toISOString()
        : "",
    }));

    const fields = [
      "id",
      "parentName",
      "childName",
      "childAge",
      "phone",
      "email",
      "preferredCentre",
      "source",
      "assignedOwner",
      "status",
      "nextFollowUp",
      "notes",
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(formattedLeads);

    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");

    return res.send(csv);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  archiveLead,
  bulkStatusUpdate,
  exportLeadsCSV,
};