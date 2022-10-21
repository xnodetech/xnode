const express = require("express")
const router = express.Router()
const CardController = require("../controllers/cards")
const { authenticateUser } = require('../middlewares/authentication')


router.get("/",authenticateUser,CardController.getMyCards)
router.get("/:id",authenticateUser,CardController.getCard)
router.post("/create",authenticateUser,CardController.addCards)
router.put("/update/:id",authenticateUser,CardController.updateCard)
router.delete("/delete/:id",authenticateUser,CardController.deleteCard)

module.exports = router;