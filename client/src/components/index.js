import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Switch,
  Redirect
} from "react-router-dom";
import decode from "jwt-decode";

import Home from "./home";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  let xx = true;
  try {
    xx = decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return xx;
};
const signout = cb => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  setTimeout(cb, 100);
};
const Header = withRouter(({ history }) =>
  isAuthenticated() ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          signout(() => history.push("/"));
        }}
      >
        {" "}
        Sign out{" "}
      </button>{" "}
    </p>
  ) : (
    <p>
      {" "}
      You are not logged in . <Link to="/login"> Login </Link>
    </p>
  )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route
          exact path="/"
          render={props => <Home {...props} />}
        />
        <Route
          exact path="/login"
          render={props => <Home {...props} />}
        />
      </Switch>{" "}
    </div>{" "}
  </Router>
);
