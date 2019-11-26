const mongoose = require("mongoose");
let FeeSchema = new mongoose.Schema({
  admissionFee: {
    amount: {
      type: Number,
      required: true
    },
    paid: Boolean,
    paidDate: Date
  },
  termFee: {
    amount: {
      type: Number,
      required: true
    },
    paid: Boolean,
    paidDate: Date
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Fee", FeeSchema);
