import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER, CHANGE_EMAIL } from "../../queries";
import { withRouter } from "react-router-dom";
import withAuth from "../../hoc/withAuth";
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

class UserDetails extends React.Component {
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

  confirmPW() {
    const { password, passwordConfirm } = this.state;
    const isMatch = password !== passwordConfirm && password.length <= 7;
    this.setState({
      passwordMatch: isMatch
    });
  }

  render() {
    const { username, password, newEmail } = this.state;

    return (
      <Fragment>
        <Query query={GET_CURRENT_USER}>
        {(getCurrentUser, { data, loading, error }) => {
          return (
            console.log(data)
          )
      }}
        
        </Query>
      </Fragment>
    );
  }
}

export default(
  withRouter(UserDetails)
);
