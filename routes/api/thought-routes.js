const router = require('express').Router();
const  { Thought } = require('../../moduls')

// /api/pizzas
router.get('/', function(req, res){
    Thought.find({})
    .then(result => {
        res.status(200).json(result.json)
    })
    .catch(err=>{
        res.status(500).json(err);
    });
    
});


module.exports = router;
