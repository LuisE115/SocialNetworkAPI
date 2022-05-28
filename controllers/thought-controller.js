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
    }
}