import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
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

class UpdateAccount extends React.Component {
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
        {this.head()}
        <div className="column column_12_12">
          <div className="signUp authForm">
            <h1 className="dark_headline">Update your email</h1>

            <Mutation
              mutation={CHANGE_EMAIL}
              variables={{
                currentEmail: this.props.session.getCurrentUser.email,
                newEmail
              }}
              refetchQueries={() => [{ query: GET_CURRENT_USER }]}
            >
              {(changeEmail, { data, loading, error }) => {
                return (
                  <form
                    onSubmit={event =>
                      this.handleChangeEmail(event, changeEmail)
                    }
                  >
                    <div className="form_wrap updateAccountEmailForm">
                      <div className="form_row">
                        <div className="form_item">
                          <p>
                            Username:{" "}
                            {this.props.session.getCurrentUser.userName}
                          </p>
                          <p>
                            Current email:{" "}
                            {this.props.session.getCurrentUser.email}
                          </p>
                          <div className="form_input">
                            <input
                              type="email"
                              name="newEmail"
                              placeholder="Email"
                              value={newEmail}
                              onChange={this.handleChange.bind(this)}
                            />
                            <span className="bottom_border" />
                          </div>
                        </div>
                      </div>

                      <div className="form_buttons">
                        <button
                          className="btn"
                          type="submit"
                          disabled={loading || this.validateEmail()}
                        >
                          Update email
                        </button>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Mutation>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(UpdateAccount)
);
