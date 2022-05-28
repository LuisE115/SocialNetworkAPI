const router = require('express').Router();
const { 
    getUsers, 
    getUserwId, 
    newUser,
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getUsers)
    .post(newUser);

router
    .route('/:id')
    .get(getUserwId)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;