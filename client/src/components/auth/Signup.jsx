import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_NEW_USER } from "../../queries";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import { Grid, Header, Button, Form, Input, Message } from "semantic-ui-react";

const initialState = {
  username: "",
  email: "",
  password: "",
  role: "member"
};

class Signup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ...initialState
    };
  }
  // Action taken when submitting the form
  // after user is created, data will be returned and set as token.
  handleSubmit = (event, createUser) => {
    event.preventDefault();
    createUser()
      .then(async ({ data }) => {
        Cookies.set("token", data.createUser.token);
        // await this.props.refetch();
        this.setState({ username: "", email:'', password:'' });
        // this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (isNaN(this.state.insuredAmount)) {
      this.setState({ error: true });
      this.expectedPremium = "hey";
    } else {
      this.setState({ error: false });
    }
  };
  render() {
    const { username, email, password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign Up for your account today
          </Header>
          <Mutation
            mutation={CREATE_NEW_USER}
            variables={{
              username: username,
              email: email,
              password: password
            }}
          >
            {(createUser, { data, loading, error }) => (
              <Form onSubmit={e => this.handleSubmit(e, createUser)}>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    name="username"
                    value={username}
                    placeholder="Choose a username"
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>E-Mail Address</label>
                  <Input
                    name="email"
                    value={email}
                    placeholder="you@youremail.com"
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Choose a password"
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Button type="submit">Sign Up</Button>
              </Form>
            )}
          </Mutation>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Signup);
