const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./routes/authRouter")
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("swagger-jsdoc")
const LinkRouter = require("./routes/linkRouter")
const CardRouter = require("./routes/cardRouter")
const ProfileRouter = require("./routes/profileRouter")
const QRRouter = require("./routes/QrCodeRouter")
const WalletRouter = require("./routes/walletRouter")
const User = require('./models/user')
const app = express()
require('dotenv').config()
const { use } = require("express/lib/application")
const swaggerUI = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDoc = YAML.load('./api.yaml')
app.use(cors())
app.use(express.json())
app.use("/auth",authRouter)
app.use("/link",LinkRouter)
app.use("/card",CardRouter)
app.use("/profile",ProfileRouter)
app.use("/Qrcode",QRRouter)
app.use("/wallet",WalletRouter)

app.use("profiles/:username",async(req,res) => {
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
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc))
// Root route of express app
app.get("/", (req, res) => {
  res.send("<a href='/api-docs'>View Documentation</a>");
});
app.get("*", (req, res) => {

 res.send("PAGE NOT FOUND");
 
});
connectDB(app)
