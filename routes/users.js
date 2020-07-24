const router = require('express').Router();

const { getUsers, createUser, createuserId } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', createuserId);
router.post('/users', createUser);

module.exports = router;
