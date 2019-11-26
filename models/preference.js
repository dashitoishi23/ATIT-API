const mongoose = require("mongoose");
let preferenceSchema = new mongoose.Schema({
  preference: [
    {
      department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      preferenceNumber: {
        type: Number,
        required: true
      }
    }
  ],
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("preference", preferenceSchema);
