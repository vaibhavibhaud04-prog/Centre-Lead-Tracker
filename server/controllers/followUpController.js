const { FollowUp, Lead } = require("../models");

// Add Follow Up

const addFollowUp = async (req, res) => {
  try {
    const {
      leadId,
      followUpDate,
      channel,
      outcome,
      notes,
      nextFollowUp,
    } = req.body;

    // Check if lead exists
    const lead = await Lead.findByPk(leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Don't allow follow-up on archived leads
    if (lead.isArchived) {
      return res.status(400).json({
        success: false,
        message: "Cannot add follow-up to an archived lead.",
      });
    }

    // Create follow-up
    const followUp = await FollowUp.create({
      leadId,
      followUpDate,
      channel,
      outcome,
      notes,
      nextFollowUp,
    });

    // Update Lead's next follow-up date
    lead.nextFollowUp = nextFollowUp;
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Follow-up added successfully.",
      data: followUp,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Follow Up History

const getFollowUps = async (req, res) => {

  try {

    const followUps = await FollowUp.findAll({

      where: {
        leadId: req.params.id,
      },

      order: [["followUpDate", "DESC"]],

    });

    res.status(200).json({
      success: true,
      count: followUps.length,
      data: followUps,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  addFollowUp,
  getFollowUps,
};