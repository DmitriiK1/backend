const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers,
  createUser,
  getUser,
  login,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUser);
router.post('/', auth, createUser);

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
