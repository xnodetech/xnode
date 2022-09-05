const express = require("express")
const router = express.Router()
const LinkController = require("../controllers/links")
const { authenticateUser } = require('../middlewares/authentication')


router.get("/",authenticateUser,LinkController.getMyLinks)
router.get("/:id",authenticateUser,LinkController.getLink)
router.post("/",authenticateUser,LinkController.createLink)
router.put("/:id",authenticateUser,LinkController.updateLink)
router.delete("/:id",authenticateUser,LinkController.deleteLink)

module.exports = router;