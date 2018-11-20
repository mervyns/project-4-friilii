const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  userId: String
});

module.exports = mongoose.model('Profile', profileSchema)