/* eslint-disable comma-dangle */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  bullets: {
    type: Number,
    default: 0
  },
  customerId: '',
  picks: []
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
