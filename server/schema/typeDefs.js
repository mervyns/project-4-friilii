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
    birthDate: Date
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

  type Query {
    getUsers: [User]
    getCurrentUser(username: String): User
    getUser(id: ID!): User
    getProfile(userId: String): Profile
    getPlans(userId: String): [Plan]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!, role: String): User
    login(username: String!, password: String!): User
    createProfile(firstName: String!, lastName: String!, birthDate: String!): Profile
    createPlan(planName: String!, sumInsured: Int!, premium: Int, dateStart: Date, dateEnd: Date) : Plan
    changeEmail(email: String): User
  }
  `;

  module.exports = typeDefs
