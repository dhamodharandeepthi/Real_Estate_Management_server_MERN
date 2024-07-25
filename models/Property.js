const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "available",
  },
});

module.exports = mongoose.model("Property", PropertySchema);
