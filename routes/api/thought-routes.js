const router = require('express').Router();


const {
    allThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought
} = require('../../controllers/thought-controllers');


router
    .route('/')
    .get(allThoughts)
    .post(addThought);


router
    .route('/:Id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);



module.exports = router;