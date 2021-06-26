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


router.put('/:id', function(req, res){
    Thought.findOneAndUpdate(
        {_id:req.params.id},
        req.body,
        {new:true}
    ).then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message: 'Thought with this id wasnt found'})
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        consoel.log(err);
        res.json(err);
    })
})

router.delete('/:id', function(req, res){
    Thought.findOneAndDelete({_id:req.params.id})
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message: 'No Thought with this id'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.json(err);
    })
});


router.post('/:thoughtId/reactions', function(req,res){
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$push : {reactions : req.body}},
        {new:true}
    ).then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message:'No thought with this id'});
            returnl;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


router.delete('/:thoughtId/reactions/:reactionId', function(req, res){
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions : {_id : req.params.reactionId}}},
        {new:true}
    )
    .then(dbThoughtData => {
        if(!dbThoughtData){
            res.status(404).json({message: 'No Thought with this id'});
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status
    })
})

module.exports = router;
