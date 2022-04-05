const router = require('express').Router();
const userOperations = require('../../controllers/userController');


router.route('/:userId/friends/:friendId').post(userOperations.addFriend)
                                          .delete(userOperations.removeFriend);

router.route('/:id').get(userOperations.getUserById)
                    .put(userOperations.updateUser)
                    .delete(userOperations.deleteUser);

router.route('/').get(userOperations.getUsers).post(userOperations.createUser);

                    
module.exports = router;