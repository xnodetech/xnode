const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrCodeSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    qrCodeDataImage: {
      type: String,
      required: true,
    }
  });
  
  module.exports = mongoose.model("qrCode", qrCodeSchema);
