const Link = require('../models/links')


const createLink = (req, res) => {
 
    const link = req.body;
    const newLink = new Link({ 
        userId: req.user.id,
        linkUrl: link.linkUrl, 
         description: link.description
       });
    newLink.save((err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})
        } else {
            res.json({status:"Success",message:result});
        }
    });
}

const getMyLinks = async (req, res) => {
    try{
        const links = await Link.find({ userId: req.user.id }).sort('createdAt')
        res.status(200).json({ links, count: links.length })
    }catch(err){
         console.log(err.message)
        console.error(err)
        res.json({Error:err.message})

    }
   
  }




const getLink = (req,res) => {
    const LinkId = req.params.id
    Link.findById(LinkId, function(err,link) {

        if(!link) {
          res.statusCode = 404;
          return res.send({ error: 'Not found' });
        }
  
        if(!err) {
           return res.json({status:"Success",message:link});
        } else {
  
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})

        }

})
}

const updateLink = (req, res) => {
    const LinkId = req.params.id
    const link = req.body
    User.updateOne({ _id: LinkId}, {
        userId: req.user._id,
        linkUrl: link.linkUrl, 
        description: link.description
      
    }, function (err, affected, resp) {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({Error:err.message})
        } else {
            return res.json({ status:"Success", message: "Link updated with id "+LinkId })

        }
    })
}
const deleteLink = (req, res) => {
    const LinkId = req.params.id;
    Link.deleteOne({ _id: LinkId }, (err, result) => {
        if (err) {
            console.log(err.message)
            console.error(err)
            res.json({ Error: err.message })
        } else {
            return res.json({ status:"Success", message: "Link deleted with id "+LinkId })

       

        }
    });
}



module.exports = {
    createLink,
    deleteLink,
    getLink,
    getMyLinks,
    updateLink
}