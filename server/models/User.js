const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

dotenv.config();

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username required'],
    unique: [true, 'username already exists']
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique: [true, 'email already exists']
  },
  password: {
    type: String,
    required: [true, 'password required']
  },
  role: String
});

UserSchema.methods.newJwt = function newJwt() {
  return jwt.sign({
    username: this.username,
    role: this.role
  }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

UserSchema.methods.verifyPassword = function verifyPassword(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema)