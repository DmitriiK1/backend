const Card = require('../models/card');
const NotFoundError = require('../error/not-found-err');
const IncorrectError = require('../error/incorrect-error');
const NoRightsError = require('../error/no-rights-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new IncorrectError()));
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new IncorrectError()));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError('Вы не владелец');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardToRemove) => res.send({ data: cardToRemove }))
        .catch(next);
    })
    .catch(next);
};
