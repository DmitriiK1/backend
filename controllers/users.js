const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../error/not-found-err');
const IncorrectError = require('../error/incorrect-error');
const ConflictingRequest = require('../error/conflicting-request');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new IncorrectError()));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        next(err);
      } else {
        next(new IncorrectError());
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return User.create({
    name,
    about,
    avatar,
    email,
    password,
  })
    .then(() => res.send({
      name,
      about,
      avatar,
      email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictingRequest());
      }
      return next(new IncorrectError());
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findCheckPassword(email, password).then((user) => {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
      { expiresIn: '7d' },
    );
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
    return res.send({ token });
  })
    .catch(next);
};
