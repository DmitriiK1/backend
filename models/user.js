const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
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
    trim: true,
    required: true,
    minlength: 2,
    maxlength: 30,
    select: false,
  },
});
function preSave(next) {
  const user = this;

  // только хэширование пароля, если он был изменен (или является новым)
  if (!user.isModified('password')) return next();

  // хэшируйте пароль, используя нашу новую соль
  return bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    // переопределяем пароль открытого текста хешированным
    user.password = hash;
    return next();
  });
}
userSchema.pre('save', preSave);

module.exports = mongoose.model('user', userSchema);
