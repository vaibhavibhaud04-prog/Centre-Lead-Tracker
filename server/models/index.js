const Lead = require("./Lead");
const FollowUp = require("./FollowUp");

Lead.hasMany(FollowUp, {
  foreignKey: "leadId",
  onDelete: "CASCADE",
});

FollowUp.belongsTo(Lead, {
  foreignKey: "leadId",
});

module.exports = {
  Lead,
  FollowUp,
};