const router = require('express').Router();
const userOperations = require('../../controllers/userController');

router.route('/').get(userOperations.getUsers).post(userOperations.createUser);

router.route('/:id').get(userOperations.getUserById)
                    .put(userOperations.updateUser)
                    .delete(userOperations.deleteUser);

router.route('/:userId/friends/:friendId').post(userOperations.addFriend)
                                          .delete(userOperations.removeFriend);


module.exports = router;