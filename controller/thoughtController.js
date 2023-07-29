const { Thought, User } = require("../models");

const thoughtController = {
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$push:{ thoughts:dbThoughtData._id}},
                {new:true}
            )   
        })
        .then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },
    // Get single thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
                // if no thought is found
                if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found" });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((thought) => {
            !thought ? res.status(404).json({message: "No thought found"}) : res.json(thought);
        }).catch((err) => res.status(500).json(err));
    },
    // Delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought) => {
            if(!thought){
                res.status(404).json({message: "No thought found"}) 
            } return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$pull:{thoughts:thought._id}},
                {new:true}
            )
        }).then(() => res.json({message: "Thought deleted!"})).catch((err) => res.status(500).json(err));
    },


// Add Reaction
addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: "No friend found" })
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},


// Delete Reaction

deleteReaction(req, res) {
console.log(req.params)

    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId} } },
        { runValidators: true, new: true }
    )
    .then((thought) =>
        !thought
            ? res
                .status(404)
                .json({ message: "No thought found" })
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
    },
}

module.exports = thoughtController;