const router = require('express').Router();
const users = require('../data/users');

router.get('/', (req, res) => {
  res.json(users);
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item._id === id);
  if (!user) {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.json(user);
});

module.exports = router;
