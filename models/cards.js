const mongoose = require("mongoose")
const { Schema } = mongoose

const CardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    cardName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:String,
        required:true
    },
    cardDate:{
        type:String,
        required:true
    },
    cardType:{
        type:String,
        required:true,
        enum:["Verve","Mastercard","Visa"]
    },
   csv:{
       type:String,
       required:true
   }

  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', CardSchema);