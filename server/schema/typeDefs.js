const {
  gql
} = require('apollo-server-express')

const typeDefs = gql `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
    role: String
    profile: Profile
    plans: [Plan!]
  }

scalar Date

  type Profile {
    id: ID!
    firstName: String!
    lastName: String!
    birthDate: String!
    userId: String!
    user: User!
  }

  type Plan {
    id: ID!
    planName: String!
    sumInsured: Int!
    premium: Int!
    dateStart: Date
    dateEnd: Date
    userId: String!
    user: User!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Claim {
    id: ID!
    amountClaimed: Int!
    planName: String
    reason: String
  }


  type Chat {
    id: ID!
    from: String
    content: String!
    createdAt: String
  }

  type Message {
    author : String
    content : String
  }

  type Query {
    getUsers: [User]
    getCurrentUser(username: String): User
    getUser(id: ID!): User
    getProfile(userId: String): Profile
    getAllPlans: [Plan]
    getPlans(userId: String): [Plan]
    getPlansByName(planName: String): [Plan]
    getAllClaims: [Claim]
    allChats: [Chat]
    getAllMessages: [Message]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): User
    login(username: String!, password: String!): User
    createProfile(firstName: String!, lastName: String!, birthDate: String!, userId: String!): Profile
    createPlan(planName: String!, sumInsured: String!, premium: String, dateStart: String!, dateEnd: String!, userId: String!): Plan
    createClaim(planName: String!, amountClaimed: String!, reason: String!): Claim
    changeEmail(email: String): User
    createChat(from: String, content: String!, createdAt: String): Chat
    addMessage(author: String!, content:String!): [Message]
  }

  type Subscription {
    newChat: Chat
  }
  `;

module.exports = typeDefs