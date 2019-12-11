const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true,
  }
});
module.exports = mongoose.model('user', UserSchema);