const router = require('express').Router();


const {
    allThoughts,
    getThoughtById,
    addThought,
    removeThought,
    updateThought,
    addReaction,
    deleteReaction
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


router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);




module.exports = router;