const router = require('express').Router();

const { getUsers, createUser, createuserId } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', createuserId);
router.post('/', createUser);

module.exports = router;
