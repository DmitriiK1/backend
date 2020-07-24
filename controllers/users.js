const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createuserId = (req, res) => {
  const { id } = req.params;
  const user = User.find((item) => item._id === id);
  if (!user) {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.json(user);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
