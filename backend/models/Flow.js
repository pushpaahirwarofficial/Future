const mongoose = require("mongoose");

const flowSchema = new mongoose.Schema({
  nodes: Array,
  edges: Array,
  input: String,
  output: String
}, { timestamps: true });

module.exports = mongoose.model("Flow", flowSchema);