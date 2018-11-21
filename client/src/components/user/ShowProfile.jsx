import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER, GET_PROFILE } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";

const initialState = {
  username: "",
  email: "",
  newEmail: "",
  password: "",
  passwordConfirm: "",
  error: "",
  passwordMatch: null
};

class ShowProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...initialState
    };
  }
  clearState() {
    this.setState({ ...initialState });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    const { username, password, newEmail } = this.state;
    const token = Cookies.get("token");
    const decodedToken = decode(token);
    console.log(decodedToken);
    return (
      <Fragment>
        <Query
          query={GET_CURRENT_USER}
          variables={{
            username: decodedToken.username
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) return <h1>Error</h1>;
            let currentUserId = data.getCurrentUser.id
            console.log(data);
            return (
              <div>
                <h1>{data.getCurrentUser.profile.firstName}</h1>
                <h1>{data.getCurrentUser.profile.lastName}</h1>
                <h1>{data.getCurrentUser.plans[0].planName}</h1>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(ShowProfile);
