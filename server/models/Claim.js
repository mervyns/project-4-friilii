const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  amountClaimed: Number,
  planName: String,
  reason: String
});

module.exports = mongoose.model('Claim', claimSchema)