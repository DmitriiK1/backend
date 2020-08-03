const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
// const express = require('express');
const {
  createUser,
  login,
} = require('../controllers/users');

const validateUrl = require('../regex/validate-url');
const validatePass = require('../regex/validate-pass');

const AuthError = require('../error/auth-err');
const IncorrectError = require('../error/incorrect-error');

// const app = express();

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(validatePass).error(() => new AuthError('Необходимо задать пароль, содержащий строчные латинские буквы и цифры длинной не менее 8 символов')),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(validatePass).error(() => new AuthError('Необходимо задать пароль, содержащий строчные латинские буквы и цифры длинной не менее 8 символов')),
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().uri().pattern(validateUrl).error(() => new IncorrectError('Неверный URL')),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;
