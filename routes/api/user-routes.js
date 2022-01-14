const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers');

//set up get and post routes 
router 
    .route('/')
    .get(getAllUser)
    .post(createUser);

    //set up put delete and id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


//add and delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

    module.exports = router;
