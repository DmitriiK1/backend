const Card = require('../models/card');
const NotFoundError = require('../error/not-found-err');
const IncorrectError = require('../error/incorrect-error');
const AuthError = require('../error/auth-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new IncorrectError()));
  //  .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new IncorrectError()));
  //  .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card && card.owner.toString() !== req.user._id) {
        throw new AuthError('Вы не владелец');
      } if (!card || card.owner.toString() !== req.user._id) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardToRemove) => res.send({ data: cardToRemove }))
        .catch(next);
    })
    .catch(next);
};
