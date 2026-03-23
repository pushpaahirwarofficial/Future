const express = require("express");
const router = express.Router();
const {
  saveFlow,
  getFlows,
  generateText
} = require("../controllers/flowController");

router.post("/save", saveFlow);
router.get("/", getFlows);
router.post("/ask-ai", generateText);

module.exports = router;