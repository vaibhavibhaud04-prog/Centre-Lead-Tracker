const express = require("express");

const router = express.Router();

const {
  addFollowUp,
  getFollowUps,
} = require("../controllers/followUpController");

router.post("/", addFollowUp);

router.get("/:id", getFollowUps);

module.exports = router;