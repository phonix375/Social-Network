const router = require('express').Router();
const  { Thought } = require('../../moduls')

// /api/pizzas
router.get('/', function(req, res){
    Thought.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err);
    });
    
});

router.post('/', function ({ body }, res) {
    Thought.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

module.exports = router;
