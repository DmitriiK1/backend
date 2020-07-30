const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^(https?:\/\/)((((www\.)?[\w\d](([\w\d.-]+)*)[\w\d]*\.[a-z]{2,6})|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[[0-9]|250-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(:(?=[1-9]{2,5})([1-9][0-9]{0,3}|[1-5][{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])?)?)(\/(?!\/)[\w\d]*)*?#?$/.test(v),
    },
    required: true,
  },

  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
