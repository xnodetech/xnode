const mongoose = require("mongoose")
const { Schema } = mongoose

const LinkSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    linkUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);
LinkSchema.path('linkUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');
module.exports = mongoose.model('Link', LinkSchema);