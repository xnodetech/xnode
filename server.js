const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./routes/authRouter")
const LinkRouter = require("./routes/linkRouter")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/auth",authRouter)
app.use("/link",LinkRouter)
// Root route of express app
app.get("/", (req, res) => {
    res.send("WELCOME TO XNODE BACKEND SERVICE");
  });
 app.get("*", (req, res) => {
  
   
    res.send("PAGE NOT FOUND");
  });
    

connectDB(app,port)
