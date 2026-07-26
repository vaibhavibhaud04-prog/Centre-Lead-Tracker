const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FollowUp = sequelize.define(
  "FollowUp",
  {
    followUpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    channel: {
      type: DataTypes.ENUM(
        "Call",
        "WhatsApp",
        "Email",
        "Visit"
      ),
      allowNull: false,
    },

    outcome: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    notes: {
      type: DataTypes.TEXT,
    },

    nextFollowUp: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = FollowUp;