const {
  AuthenticationError,
  ForbiddenError
} = require("apollo-server-express");
const {
  PubSub
} = require('graphql-subscriptions');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Plan = require("../models/Plan");
const Claim = require('../models/Claim')
const Chat = require('../models/Chat')
const {
  GraphQLScalarType
} = require("graphql");
const {
  Kind
} = require("graphql/language");

dotenv.config();
const pubsub = new PubSub();
// Empty variable to hold chatroom messages.  New messages will be pushed to the front of the array as they come in.
let roomContents = [{author: "mervyn", content:"testing"}]

const resolvers = {

  User: {
    profile: (root, args) =>
      Profile.findOne({
        userId: root.id
      }),
    plans: (root, args) =>
      Plan.find({
        userId: root.id
      })
  },
  Profile: {
    user: (root, args) =>
      User.findOne({
        id: root.userId
      })
  },
  Plan: {
    user: (root, args) =>
      User.findOne({
        id: root.userId
      })
  },
  Message: {
    author: (root, args) => root.author
  },
  Query: {
    getUsers: (root, args, context) => {
      // if (!context.loggedInUser)
      //   throw new ForbiddenError("You must be logged in!");
      return User.find({});
    },
    getCurrentUser: async (root, args, context) => {
      // if (!context.loggedInUser)
      // throw new ForbiddenError("You must be logged in!");

      const user = await User.findOne({
        username: args.username
      });
      return user;
    },
    getUser: (root, args, context) => {
      // if (!context.loggedInUser)
      //   throw new ForbiddenError("You must be logged in");
      return User.findById(args.id);
    },
    getProfile: (root, args, context) => {
      return Profile.findOne({
        userId: args.userId
      });
    },
    getAllPlans: (root, args) => {
      return Plan.find({});
    },
    getPlans: (root, args, context) => {
      return Plan.find({
        userId: args.userId
      });
    },
    getPlansByName: (root, args, context) => {
      return Plan.find({
        planName: args.planName
      });
    },
    getAllClaims: (root, args, context) => {
      return Claim.find({})
    },
    allChats: (root, args, context) => {
      return Chat.find({})
    },
    getAllMessages: (root, args, context) => {
      return roomContents
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      try {
        // Ensure that all the fields are valid before creating an entry
        if (!args.username || !args.email || !args.password)
          throw new AuthenticationError("Invalid Input");
        // Ensure that the username does not already exist in the database
        const checkUniqueUser = await User.findOne({
          username: args.username
        });
        if (checkUniqueUser)
          throw new AuthenticationError("This username already exists");

        const newUser = new User(args);
        const hashedPassword = bcrypt.hashSync(args.password, 10);
        newUser.password = hashedPassword;

        const user = await User.create(newUser);
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          // jsonwebtoken method defined in User Schema as a Schema Method
          token: user.newJwt()
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({
          username: args.username
        });
        if (!user) throw new Error("No such username was found");
        if (!user.verifyPassword(args.password))
          throw new Error("Wrong password");
        return {
          id: user.id,
          username: user.username,
          token: user.newJwt()
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    changeEmail: async (root, {
      currentEmail,
      newEmail
    }, {
      User
    }) => {
      const user = await User.findOneAndUpdate({
        email: currentEmail
      }, {
        $set: {
          email: newEmail
        }
      }, {
        new: true
      });
      if (!user) {
        throw new Error("User Not Found");
      }
      return user;
    },
    createProfile: (root, args, context) => {
      // Throw a error if user is not loggedIn
      // loggedIn comes from context passed into Apollo
      // if (!context.loggedInUser)
      //   throw new ForbiddenError(
      //     "You need to be logged in to create a profile"
      //   );
      return Profile.create(args);
    },
    createPlan: (root, args, context) => {
      // if (!context.loggedInUser)
      //   throw new ForbiddenError("You need to be logged in to create a Plan");
      return Plan.create(args);
    },
    createClaim: (root, args, context) => {
      // if (!context.loggedInUser)
      //   throw new ForbiddenError("You need to be logged in to create a Plan");
      return Claim.create(args);
    },
    createChat: (root, args) => {
      const newChat = {
        content: args.content
      }
      Chat.create(args)
      pubsub.publish('new chats', {
        newChat
      });
      return newChat
    },
    addMessage: (root, args) => {
      roomContents.unshift(args)
      return roomContents
    }
  },
  Subscription: {
    newChat: {
      subscribe: () => pubsub.asyncIterator('new chats')
    }
  },
  // Creating a new Scalar Type for Date
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = resolvers;