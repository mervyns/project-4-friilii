import React from "react";
import { ApolloProvider } from "react-apollo";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "semantic-ui-react";
import Home from "./components/home";
import client from "./apollo";
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UserDetails from './components/auth/UserDetails'
import CreateProfile from './components/user/CreateProfile'
import CreatePlan from './components/user/CreatePlan'
import ShowProfile from './components/user/ShowProfile'
import Dashboard from './components/user/Dashboard'
import AdminDashboard from './components/user/AdminDashboard'


const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/userdetails" component={UserDetails} />
        <Route exact path="/createprofile" component={CreateProfile} />
        <Route exact path="/createplan" component={CreatePlan} />
            <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/admin" component={AdminDashboard} />
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
