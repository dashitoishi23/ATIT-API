const mongoose = require("mongoose");
let MeritListSchema = new mongoose.Schema({
meritList:{
    type: Object,
    required: true
}
});

module.exports = mongoose.model("Merit List", MeritListSchema);