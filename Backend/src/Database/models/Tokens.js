const { Schema, model } = require("mongoose");

const verificationTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "30m", // Establece el tiempo de expiración a 30 minutos
  },
});

module.exports = model("VerificationToken", verificationTokenSchema);