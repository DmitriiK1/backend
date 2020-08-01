const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card && card.owner.toString() !== req.user._id) {
        res.status(401).send({ message: 'Вы не владелец' });
        return;
      } if (!card || card.owner.toString() !== req.user._id) {
        res.status(404).send({ message: 'Нет карточки с таким id' });
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((cardToRemove) => res.send({ data: cardToRemove }))
        .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
    })
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
