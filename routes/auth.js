const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

router.post('/signup', createUser);

module.exports = router;
