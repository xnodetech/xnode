const Wallet = require('../models/wallet')


const createWallet = (req, res) => {

   
    const newWallet = new Link({ 
        userId: req.user.id,
        amount: "0"
       });
    newWallet.save((err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})
        } else {
            res.json({status:"Success",message:result});
        }
    });


}

const topup = (req, res) => {


}

const withdraw = (req, res) => {


}

const transferByUsername = (req, res) => {

}

const transferByQrcode = (req, res) => {

}





module.exports = {
    createWallet,
    topup,
    withdraw,
    transferByUsername,
    transferByQrcode
}