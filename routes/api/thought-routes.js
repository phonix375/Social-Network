const router = require('express').Router();
const  { Thought, User } = require('../../moduls')

//get all thoughts 
router.get('/', function(req, res){
    Thought.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(500).json(err);
    });
    
});

//add new thoght 
router.post('/', function ({ body }, res) {
    const newThought = {thoughtText : body.thoughtText, username: body.username}
    Thought.create(newThought)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {_id:body.userId},
                {$push: {thoughts: dbThoughtData._id} },
                {new:true}
            ).then(dbUserData => {
                if(!dbUserData){
                    res.status(500).json({message: 'User not found'})
                }
                res.json(dbThoughtData);
            })
            .catch(console.error)
        })
        .catch(err => res.json(err));
});

//find one thought by id
router.get('/:id', function ({ params }, res) {
    Thought.findOne({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});


module.exports = router;
