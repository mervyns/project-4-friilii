const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
  planName: String,
  sumInsured: Number,
  premium: Number,
  dateStart: Date,
  dateEnd: Date,
  userId: String,
});

module.exports = mongoose.model('Plan', planSchema)