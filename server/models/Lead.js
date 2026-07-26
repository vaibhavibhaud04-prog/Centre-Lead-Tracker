const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Lead = sequelize.define(
  "Lead",
  {
    parentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    childName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    childAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
       allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    preferredCentre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    assignedOwner: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "New",
        "Contacted",
        "Demo Scheduled",
        "Demo Completed",
        "Converted",
        "Lost"
      ),
      defaultValue: "New",
    },

    nextFollowUp: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
    },

    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Lead;