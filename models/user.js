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
    alidate: {
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

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // hash the password using our new salt
  return bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    // override the cleartext password with the hashed one
    user.password = hash;
    return next();
  });
}
userSchema.pre('save', preSave);

module.exports = mongoose.model('user', userSchema);
