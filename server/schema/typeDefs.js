const {
  gql
} = require('apollo-server-express')

const typeDefs = gql`
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
    plan: Plan!
    reason: String
  }


  type Chat {
    id: ID!
    from: String
    content: String!
    createdAt: String
  }

  type Query {
    getUsers: [User]
    getCurrentUser(username: String): User
    getUser(id: ID!): User
    getProfile(userId: String): Profile
    getPlans(userId: String): [Plan]
    getPlansByName(planName: String): [Plan]
    allChats: [Chat]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): User
    login(username: String!, password: String!): User
    createProfile(firstName: String!, lastName: String!, birthDate: String!, userId: String!): Profile
    createPlan(planName: String!, sumInsured: String!, premium: String, dateStart: String!, dateEnd: String!, userId: String!): Plan
    createClaim(planName: String!, amountClaimed: String!, reason: String!) : Claim
    changeEmail(email: String): User
    createChat(from: String, content: String!, createdAt: String): Chat
  }

  type Subscription {
    newChat: Chat
  }
  `;

  module.exports = typeDefs
