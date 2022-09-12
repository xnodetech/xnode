const express = require("express")
const router = express.Router()
const QRController = require("../controllers/qrcode")
const { authenticateUser } = require('../middlewares/authentication')


router.post("/generate",authenticateUser,QRController.generateQrCode)
router.get("/profile",QRController.getProfile)

module.exports = router;