const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
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

    module.exports = router;
    