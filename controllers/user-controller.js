const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
        .then(userData => {
            res.status(200).json(userData);
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getUserwId(req, res) {
        User.findOne({
            _id: req.params.id
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    newUser(req, res) {
        User.create(req.body)
        .then(userData => {
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            {
                new: true, runValidators: true
            }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'There is not a user with that id.' })
                return;
            }
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    deleteUser(req, res) {
        User.findOneAndDelete({
            _id: req.params.id
        })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'There is not a user with that id.' })
                return;
            }
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $push: { friends: req.params.friendId}
            },
            {
                new: true, runValidators: true
            }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'There is not a user with that id.' })
                return;
            }
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    },

    removeFriend(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $pull: { friends: req.params.friendId}
            },
            {
                new: true
            }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'There is not a user with that id.' })
                return;
            }
            res.status(200).json(userData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}

module.exports = userController;