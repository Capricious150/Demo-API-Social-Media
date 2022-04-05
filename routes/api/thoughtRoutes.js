const router = require('express').Router();
const thoughtOperations = require('../../controllers/thoughtController')

router.route('/').get(thoughtOperations.getThoughts).post(thoughtOperations.createThought);

router.route('/:id').get(thoughtOperations.getThoughtById)
                    .put(thoughtOperations.updateThought)
                    .delete(thoughtOperations.deleteThought);

router.route('/:thoughtId/reactions').post(thoughtOperations.react);

router.route('/:thoughtId/reactions/:reactionID').delete(thoughtOperations.reactRemove);

module.exports = router;