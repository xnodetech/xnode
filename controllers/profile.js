const User = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
require('dotenv').config()
const { cloud_name,api_key,api_secret } = process.env



const UploadPhoto = (req, res) => {
 

    const {id} = req.user

    console.log(req.file);
    if(!req.file) {
      res.status(500);
 
    }
   console.log('http://localhost:3000/images/' + req.file.filename)
   // SEND FILE TO CLOUDINARY
   const cloudinary = require('cloudinary').v2
   cloudinary.config({
     cloud_name: cloud_name,
     api_key: api_key,
     api_secret: api_secret
   })
   
   const path = req.file.path
   const uniqueFilename = new Date().toISOString()

   cloudinary.uploader.upload(
     path,
     { public_id: `ProfilePicture/${uniqueFilename}`, tags: `profile` }, // directory and tags are optional
     function(err, image) {
       if (err) return res.send(err)
       console.log('file uploaded to Cloudinary')
       // remove file from server
       const fs = require('fs')
       fs.unlinkSync(path)
       // return image details
       //res.json(image)



       User.updateOne({ _id: id }, {
        $set: {
       profilePhoto:image.secure_url
       
    }}, function (err, affected, resp) {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({ Error: err.message })
        } else {
            return res.json({ status:"Success",message: "Profile photo added" })

       
        }
    })
     




     }
   )



       
}

const getProfilePhoto = async (req,res) => {

    try{
        const user = await User.findOne({ _id: req.user.id }).sort('createdAt')
        res.status(200).json({ profilephoto: user.profilePhoto })
    }catch(err){
        console.log(err.message)
        console.error(err)
        res.json({Error:err.message})

    }
    
}

const setPin = async (req,res) => {
const {pin} = req.body
const {id} = req.user
const hashedPin = await bcrypt.hash(pin, saltRounds);

User.updateOne({ _id: id }, {
    $set: {
   pin:hashedPin
   
}}, function (err, affected, resp) {
    if (err) {
        console.log(err.message)
        console.error(err)
        res.json({ Error: err.message })
    } else {
        return res.json({ status:"Success",message: "pin added" })

   
    }
})



}

const verifyPin = async (req,res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
    
        if (user) {
          const cmp = await bcrypt.compare(req.body.pin, user.pin);
          if (cmp) {
            //   ..... further code to maintain authentication like jwt or sessions
            res.send({status:"Success", message:"Pin verification successful"});
          } else {
            res.send({status:"Failure", message:"Wrong Pin"});
          }
        } else {
          res.send({status:"Failure", message:"Wrong Pin"});
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
}

const getProfile = async (req,res) => {


    try{
        const user = await User.findOne({ _id: req.user.id }).sort('createdAt')
        res.status(200).json({ status:"Success", message:user })
    }catch(err){
        console.log(err.message)
        console.error(err)
        res.json({Error:err.message})

    }

}




module.exports = {
     
     UploadPhoto,
     getProfilePhoto,
     getProfile,
     setPin,
     verifyPin
}