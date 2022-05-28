const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find({})
        .then(userData => {
            res.json(userData);
        })
        .catch(err => {
            res.json(err)
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
            res.json(userData)
        })
        .catch(err => {
            res.json(err)
        })
    },

    newUser(req, res) {
        User.create(req.body)
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            res.json(err)
        })
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            {
                _id: req.params.id
            },
            body,
            {
                new: true, runValidators: true
            }
        )
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: 'There is not a user with that id.' })
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            res.json(err)
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
            res.json(userData)
        })
        .catch(err => {
            res.json(err)
        })
    }



}