const mongoose = require("mongoose");
const planetsSchems = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Planet", planetsSchems);
