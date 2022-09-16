const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./routes/authRouter")
const LinkRouter = require("./routes/linkRouter")
const CardRouter = require("./routes/cardRouter")
const ProfileRouter = require("./routes/profileRouter")
const QRRouter = require("./routes/QrCodeRouter")
const WalletRouter = require("./routes/walletRouter")
const User = require('./models/user')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/auth",authRouter)
app.use("/link",LinkRouter)
app.use("/card",CardRouter)
app.use("/profile",ProfileRouter)
app.use("/Qrcode",QRRouter)
app.use("/wallet",WalletRouter)
app.use("/:username",async(req,res) => {
  const {username} = req.params
  
  try{
    const user = await User.findOne({ username: username}).sort('createdAt')
    res.status(200).json({ status:"Success", message:user })
}catch(err){
    console.log(err.message)
    console.error(err)
    res.json({Error:err.message})

}

})
// Root route of express app
app.get("/", (req, res) => {
    res.send("WELCOME TO XNODE BACKEND SERVICE");
  });
 app.get("*", (req, res) => {
  
   
    res.send("PAGE NOT FOUND");
  });
    

connectDB(app,port)
