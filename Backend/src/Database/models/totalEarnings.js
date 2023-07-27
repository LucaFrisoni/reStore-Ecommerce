const { Schema, model } = require("mongoose");

const TotalEarningsSchema = new Schema({
  earnings: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Earnings", TotalEarningsSchema);
