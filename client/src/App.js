import React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "semantic-ui-react";
import Home from "./components/home";
import client from "./apollo";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import UserDetails from "./components/auth/UserDetails";

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/userdetails" component={UserDetails} />
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
