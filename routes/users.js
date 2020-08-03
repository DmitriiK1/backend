const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);

module.exports = router;
