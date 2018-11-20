import {
  gql
} from 'apollo-boost';

export const CREATE_NEW_USER = gql `
  mutation CreateUser(
    $username: String!
    $email: String!
    $password: String!
    $role: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      username
      email
      role
      token
    }
  }
`;

export const LOGIN_USER = gql `
mutation login(
  $username: String!
  $password: String!
  ) {
    login(
      username: $username
      password: $password
      ) {
      username
      token
    }
  }
`;


export const GET_CURRENT_USER = gql `
    query($username: String!) {
        getCurrentUser(username: $username) {
          id
          username
          email
        }
    }
`;

export const CHANGE_EMAIL = gql `
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            username
            email
        }
    }
`;

export const CREATE_USER_PROFILE = gql `
mutation($firstName: String!, $lastName: String!, $birthDate: String!, $userId:String!){
  createProfile(firstName: $firstName, lastName: $lastName, birthDate: $birthDate, userId: $userId){
    firstName
    lastName
  }
}
`;

export const CREATE_USER_PLAN = gql `
mutation($planName: String!, $sumInsured: String!, $premium: String, $dateStart: String!, $dateEnd: String!, $userId: String!){
  createPlan(planName: $planName, sumInsured: $sumInsured, premium: $premium, dateStart: $dateStart, dateEnd: $dateEnd, userId: $userId){
    planName
    sumInsured
    premium
  }
}
`;