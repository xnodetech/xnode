const Wallet = require('../models/wallet')
const User = require('../models/user')
const QRCode = require("../models/qrcode");
require("dotenv").config()
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const expiryDate = process.env.EXPIRY_DATE

const createWallet = (req, res) => {


    const newWallet = new Wallet({
        userId: req.user.id,
        amount: "100000"
    });
    newWallet.save((err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({ Error: err.message })
        } else {
            res.json({ status: "Success", message: result });
        }
    });


}

const topup = (req, res) => {


}

const withdraw = (req, res) => {




}

const transferByUsername = async (req, res) => {
    let { username,amount } = req.body
    let sender_id = req.user.id
    const user = await User.findOne({
        username: username
    });
    if (!user) {
        return res.status(400).json({ status: "failure", message: "User not found" })
    }
    let wallet = await Wallet.findOne({
        userId: user._id
    });
    if(!wallet){
        return res.status(400).json({ status: "failure", message: "User has not created his wallet" })
  
    }
    let prevBalance = Number(wallet.amount)
    let amountToBeAdded = Number(amount)

    let updatedAmount = prevBalance + amountToBeAdded
    
    Wallet.updateOne({ userId: user._id }, {
        $set: {
       amount:updatedAmount
       
    }}, async function (err, affected, resp) {
        if (err) {
            console.log(err.message)
            console.error(err)
            return res.json({ Error: err.message })
        } else {
            
            let wallet = await Wallet.findOne({
                userId: sender_id
            });
            if(!wallet){
                return res.status(400).json({ status: "failure", message: "User has not created his wallet" })
          
            } 
       
            let prevBalance = Number(wallet.amount)
    let amountToBeAdded = Number(amount)
      if(prevBalance => amountToBeAdded){
        let updatedAmount = prevBalance - amountToBeAdded



        Wallet.updateOne({ userId: sender_id }, {
            $set: {
           amount:updatedAmount
           
        }}, function (err, affected, resp) {
            if (err) {
                console.log(err.message)
                console.error(err)
                res.json({ Error: err.message })
            } else {
                return res.json({ status:"Success",message: "Transfer Successful" })
        
           
            }
        })









      }
      else{
        return res.status(400).json({ status: "failure", message: "Insufficint funds" })
           
      }
  
        }
    })
}

const transferByQrcode = async (req, res) => {
    const { token,amount } = req.body;
    const sender_id = req.user.id
    if (!token) {
      return res.status(400).send("Token  is required");
    }

    const decoded = jwt.verify(token, secret);
    const receiver_id = decoded.userId
    const qrCode = await QRCode.findOne({
      userId: decoded.userId
    });

    if (!qrCode) {
      return res.status(400).send("QR Code not found");
    }

   



    let wallet = await Wallet.findOne({
        userId: receiver_id
    });
    if(!wallet){
        return res.status(400).json({ status: "failure", message: "User has not created his wallet" })
  
    }
    let prevBalance = Number(wallet.amount)
    let amountToBeAdded = Number(amount)

    let updatedAmount = prevBalance + amountToBeAdded
    
    Wallet.updateOne({ userId: receiver_id }, {
        $set: {
       amount:updatedAmount
       
    }}, async function (err, affected, resp) {
        if (err) {
            console.log(err.message)
            console.error(err)
            return res.json({ Error: err.message })
        } else {
            
            let wallet = await Wallet.findOne({
                userId: sender_id
            });
            if(!wallet){
                return res.status(400).json({ status: "failure", message: "User has not created his wallet" })
          
            } 
       
            let prevBalance = Number(wallet.amount)
    let amountToBeAdded = Number(amount)
      if(prevBalance => amountToBeAdded){
        let updatedAmount = prevBalance - amountToBeAdded



        Wallet.updateOne({ userId: sender_id }, {
            $set: {
           amount:updatedAmount
           
        }}, function (err, affected, resp) {
            if (err) {
                console.log(err.message)
                console.error(err)
                res.json({ Error: err.message })
            } else {
                return res.json({ status:"Success",message: "Transfer Successful" })
        
           
            }
        })









      }
      else{
        return res.status(400).json({ status: "failure", message: "Insufficint funds" })
           
      }
  
        }
    })








}

const getBalance = async (req,res) => {
    const user_id = req.user.id

    const wallet = await Wallet.findOne({
        userId: user_id
    });
    if(!wallet){
        return res.status(400).json({ status: "failure", message: "User has not created his wallet" })
  
    }
    return res.status(200).json({status:"Success",amount:wallet.amount})
}





module.exports = {
    createWallet,
    topup,
    withdraw,
    transferByUsername,
    transferByQrcode,
    getBalance

}