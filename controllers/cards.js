const Cards = require('../models/cards')


const addCards = (req, res) => {
 
    const card = req.body;
    const newCard = new Cards({  
         userId: req.user.id,
        cardName: card.cardName,
        cardNumber:card.cardNumber,
        cardDate:card.cardDate,
        cardType:card.cardType,
        csv:card.csv
       });
    newCard.save((err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})
        } else {
            res.json({status:"Success",message:result});
        }
    });
}

const getMyCards = async (req, res) => {
    try{
        const cards = await Cards.find({ userId: req.user.id }).sort('createdAt')
        res.status(200).json({ cards, count: cards.length })
    }catch(err){
        console.log(err.message)
        console.error(err)
        res.json({Error:err.message})

    }
   
  }




const getCard = (req,res) => {
    const CardId = req.params.id
    Cards.findById(CardId, function(err,card) {

        if(!card) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
        }
  
        if(!err) {
           return res.json({status:"Success",message:card});
        } else {
  
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})

        }

})
}

const updateCard = (req, res) => {
    const CardId = req.params.id
    const card = req.body
    User.updateOne({ _id: CardId}, {
        userId: req.user.id,
        cardName: card.cardName,
        cardNumber:card.cardNumber,
        cardDate:card.cardDate,
        cardType:card.cardType,
        csv:card.csv
      
    }, function (err, affected, resp) {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})
        } else {
            return res.json({ status:"Success", message: "Card updated with id "+CardId })

        }
    })
}
const deleteCard = (req, res) => {
    const CardId = req.params.id;
    Cards.deleteOne({ _id: CardId }, (err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({ Error: err.message })
        } else {
            return res.json({ status:"Success", message: "Card deleted with id "+CardId })

       

        }
    });
}



module.exports = {
    addCards,
    getCard,
    getMyCards,
    updateCard,
    deleteCard
}