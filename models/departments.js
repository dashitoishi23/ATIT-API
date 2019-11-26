const mongoose = require("mongoose");
let departmentSchema = new mongoose.Schema({
  DeptName: {
    type: String,
    required: true,
    unique: true
  },
  DeptSeats: {
    type: Number,
    required: true
  },
  DeptYear: {
    type: Number,
    required: true
  },
  allocated: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("department", departmentSchema);
