const router = require('express').Router();
const { User } = require('../../moduls')

//get all users
router.get('/', function (req, res) {
    User.find({}).populate({path:'friends'}).populate({path:'thoughts'})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create new user 
router.post('/', function ({ body }, res) {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});


router.get('/:id', function ({ params }, res) {
    User.findOne({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
});

router.put('/:id', function ({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User with this id wasent found' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
})

router.post('/:userId/friends/:friendId', function (req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ messahe: 'User not found' });
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
});

router.delete('/:userId/friends/:friendId', function ({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' })
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
})

module.exports = router;
