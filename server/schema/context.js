const {
  AuthenticationError
} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();


const context = ({
  req
}) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return undefined;

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return {
      loggedInUser: decoded.username,
      role: decoded.role
    };

  } catch (error) {
    console.log(error);
    throw new AuthenticationError('invalid token');
  }
};

module.exports = context;