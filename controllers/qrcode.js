const Qr = require("qrcode")
const QRCode = require("../models/qrcode");
const User = require("../models/user");
require("dotenv").config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const expiryDate = process.env.EXPIRY_DATE


const generateQrCode = async (req,res) =>{
try{


    const user = await User.findById(req.user.id);

    // Validate is user exist
    if (!user) {
      res.status(400).send("User not found");
    }
    const userId = user._id
    const qrExist = await QRCode.findOne({ userId });


    if (!qrExist) {


        const encryptedData = jwt.sign(
            { userId: user._id, },
            secret,
            {
              expiresIn: expiryDate,
            }
          );
      
          // Generate qr code
          const dataImage = await Qr.toDataURL(encryptedData);
          await QRCode.create({ userId: req.user.id,qrCodeDataImage:dataImage });
          return res.status(200).json({ status:"Success",message:`qr code for ${req.user.id}`,data:dataImage });
    }else{
        return res.status(400).json({ message:"you already have a qr code attached to your profile" });
   
    }
}catch(err){
console.log(err)

}
}


const getProfile = async (req,res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send("Token and deviceInformation is required");
    }

    const decoded = jwt.verify(token, secret);

    const qrCode = await QRCode.findOne({
      userId: decoded.userId
    });

    if (!qrCode) {
      return res.status(400).send("QR Code not found");
    }

    User.findById(decoded.userId, function(err,user) {

        if(!user) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
        }
  
        if(!err) {
           return res.json({status:"Success",message:user});
        } else {
  
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})

        }

})

}
module.exports = {generateQrCode,getProfile}