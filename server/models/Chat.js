const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  from: String,
  content: String,
  createdAt: String
});

module.exports = mongoose.model('Chat', chatSchema)