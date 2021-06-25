const router = require('express').Router();
const  { User } = require('../../moduls')

// /api/pizzas
router.get('/', function(req, res){
    User.find({})
    .then(result => {
        res.status(200).json(result.json)
        return;
    })
    .catch(err=>{
        res.status(500).json(err);
    });
});


module.exports = router;
