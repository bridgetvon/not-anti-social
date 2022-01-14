const { Thought, User } = require('../models');

const thoughtController = {
    //thoughts belong to users 
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                //push to add to array 
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(404).json(err));
    },

    allThoughts(req, res) {
        thoughts.find({})
        .populate({
            path: 'reactions', 
            select: '-_v'
        })
        .select('-_v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.status(404).json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-_v'
        })
        select('-_v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(404).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(404).json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thought with this id!'});
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(404).json(err));
    } 
};

module.exports = thoughtController;