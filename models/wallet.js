const mongoose = require("mongoose")
const { Schema } = mongoose

const WalletSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
     amount:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', WalletSchema);