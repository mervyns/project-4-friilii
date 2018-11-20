import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import { GET_CURRENT_USER } from "./../queries";
import * as Cookies from "es-cookie";

import Login from "../components/auth/Login";

const withAuth = conditionFunc => Component => props => {
  if (props.unitTesting === "true") {
    return <Component {...props} />;
  }

  return (
    <Query query={GET_CURRENT_USER}>
      {({ data, loading, error, refetch }) => {
        if (loading) return null;

        if (typeof document !== undefined) {
          const tokenExpired = Cookies.get("jsonwebtoken");

          if (tokenExpired === undefined)
          console.log("token expired")
            return <Login {...props} refetch={refetch} />;
        }

        if (props.session.getCurrentUser == null){
        console.log("no user session found")
          return <Login {...props} refetch={refetch} />;
        }
        return conditionFunc(data) ? (
          <Component {...props} />,
          console.log("rendering component")
        ) : (
            console.log("redirect"),
          <Redirect to="/login" />
        );
      }}
    </Query>
  );
};

export default withAuth;
