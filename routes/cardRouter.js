const express = require("express")
const router = express.Router()
const CardController = require("../controllers/cards")
const { authenticateUser } = require('../middlewares/authentication')


router.get("/",authenticateUser,CardController.getMyCards)
router.get("/:id",authenticateUser,CardController.getCard)
router.post("/",authenticateUser,CardController.addCards)
router.put("/:id",authenticateUser,CardController.updateCard)
router.delete("/:id",authenticateUser,CardController.deleteCard)

module.exports = router;