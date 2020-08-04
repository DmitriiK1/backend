const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, celebrate({
  headers: Joi.object().keys({
    userId: Joi.objectId().required(),
  }),
}), getUser);

module.exports = router;
