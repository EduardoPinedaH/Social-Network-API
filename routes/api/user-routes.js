const router = require('express').Router();

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controller/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/id/friends/:friendsid
router.route('/:id/friends/:friendsId').post(addFriend).delete(removeFriend);

module.exports = router;