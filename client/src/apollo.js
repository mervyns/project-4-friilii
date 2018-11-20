import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const hostname = window && window.location && window.location.hostname;
const graphqlHost =
  hostname === "friilii.herokuapp.com"
    ? "https://friilii.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";

const httpLink = createHttpLink({
  uri: graphqlHost,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});
const AUTH_TOKEN = "token";
const REFRESH_TOKEN = "refreshToken";

const middleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const refresh_token = localStorage.getItem(REFRESH_TOKEN);
  if (token) {
    operation.setContext({
      headers: {
        "x-token": token,
        "x-refresh-token": refresh_token
      }
    });
  }
  return forward(operation);
});

const afterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    console.log(context)
    const {
      response: { headers }
    } = context;
    if (headers) {
      const token = headers.get("x-token");
      const refresh_token = headers.get("x-refresh-token");
      if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem(REFRESH_TOKEN, refresh_token);
      }
    }

    //Redirect in case of Error
    if (response.errors && response.errors.length > 0) {
      if (response.errors[0].message === "Not authenticated") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location = "/login";
      }
    }
    return response;
  });
});

const link = afterware.concat(middleware.concat(httpLink));

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  onError: (e) => { console.log(e.graphQLErrors) }
});
