const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
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
      console.log(err);
      res.status(400).send({ message: 'Произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          // аутентификация успешна
          // const token = jwt.sign(
          //   { _id: user._id },
          //   'super-strong-secret',
          //   { expiresIn: '7d' },
          // );
          const { NODE_ENV, JWT_SECRET } = process.env;
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
            { expiresIn: '7d' },
          );
          res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 7 * 24 * 3600000 });
          return res.send({ token });
        })
        .catch(() => {
          res.status(401).send({ message: 'Неправильные почта или пароль' });
        });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    });
};
