const { Thought, User } = require('../models');

const thoughtController = {
    //thoughts belong to users 
    // addThought({ params, body }, res) {
    //     console.log(body);
    //     Thought.create(body)
    //     .then(({ _id }) => {
    //         return User.findOneAndUpdate(
    //             { _id: params.userId },
    //             //push to add to array 
    //             { $push: { thoughts: _id } },
    //             { new: true }
    //         );
    //     })
    //     .then(dbThoughtsData => {
    //         if (!dbThoughtsData) {
    //             res.status(404).json({ message: 'No thought with this id!'});
    //             return;
    //         }
    //         res.json(dbThoughtsData);
    //     })
    //     .catch(err => res.status(404).json(err));
    // },

    addThought(req,res) {
        Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    allThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  
    },

    getThoughtById(req, res) {
        console.log(req.params);
        Thought.findOne({ _id: req.params.Id })
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