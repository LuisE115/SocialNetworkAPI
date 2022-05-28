const { Thought, User } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getThoughtwId(req, res) {
        Thought.findOne({
            _id: req.params.id
        })
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .then(thoughtData => {
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { 
                    username: req.body.username
                },
                { 
                    $push: { thoughts: _id } 
                },
                { 
                    new: true
                }
            );
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(400).json({ message: 'There is not a user with that username.' })
                return;
            }
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            {
                new: true, runValidators: true
            }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(400).json({ message: 'There is not a thought with that id.' })
                return;
            }
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.id
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(400).json({ message: 'There is not a thought with that id.' })
                return;
            }
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { 
                _id: req.params.thoughtId
            },
            { 
                $push: { reactions: req.body } 
            },
            { 
                new: true 
            }
        )
        .then(thoughtData => {
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { 
                _id: req.params.thoughtId
            },
            { 
                $pull: { reactions: { reactionId: req.params.reactionId } } 
            },
            { 
                new: true 
            }
        )
        .then(thoughtData => {
            res.status(200).json(thoughtData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = thoughtController;