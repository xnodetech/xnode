const express = require("express")
const router = express.Router()
const ProfileController = require("../controllers/profile")
const { authenticateUser } = require('../middlewares/authentication')
const upload = require('../helpers/multer')


router.put("/addPhoto",authenticateUser,upload.single('file'),ProfileController.UploadPhoto)
router.get("/getProfilePhoto",authenticateUser,ProfileController.getProfilePhoto)
router.get("/getProfile",authenticateUser,ProfileController.getProfile)
router.put("/setPin",authenticateUser,ProfileController.setPin)
router.post("/verifyPin",authenticateUser,ProfileController.verifyPin)
module.exports = router;