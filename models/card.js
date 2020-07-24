const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => /^(https?:\/\/)((((www\.)?[\w\d](([\w\d.-]+)*)[\w\d]*\.[a-z]{2,6})|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[[0-9]|250-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(:(?=[1-9]{2,5})([1-9][0-9]{0,3}|[1-5][{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?)?)(\/(?!\/)[\w\d]*)*?#?$/.test(v),
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
