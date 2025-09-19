const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: 2
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: 2
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email']
  },
  favoriteColor: {
    type: String,
    enum: ['Red', 'Green', 'Blue', 'Purple', 'Orange', 'Teal']
  },
  birthday: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('contact', contactSchema);
