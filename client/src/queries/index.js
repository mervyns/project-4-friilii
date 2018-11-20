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


export const GET_CURRENT_USER = gql`
    query {
        getCurrentUser {
            username
            email
        }
    }
`;

export const CHANGE_EMAIL = gql`
    mutation($currentEmail: String!, $newEmail: String!){
        changeEmail(currentEmail: $currentEmail, newEmail: $newEmail){
            username
            email
        }
    }
`;
