const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const validateUrl = require('../regex/validate-url');
const IncorrectError = require('../error/incorrect-error');

const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(validateUrl).error(() => new IncorrectError('Неверный URL')),
  }),
}), createCard);
router.delete('/:cardId', auth, deleteCard);

module.exports = router;
