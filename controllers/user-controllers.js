const { User } = require("../models")

const userController = {
    //get all users 
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400),json(err);
        });
    },

    //get user by ID 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .select('-_v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a new user 
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    
    //update user 
    updateUser({ params, body }, res) {
        //add validators so updated users are validated 
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!'});
                return;
            }
            res.json(dbUSerData);
        })
        .catch(err => res.status(404).json(err));
    },

    //delete a user 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(404).json(err));
    },
}

module.exports = userController;

