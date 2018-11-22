import React from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from "../../queries";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  Message,
  Grid,
  Segment,
  Header
} from "semantic-ui-react";

const initialState = {
  username: "",
  password: "",
  error: ""
};

class Login extends React.Component {
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

  handleSubmit(event, login) {
    event.preventDefault();
    login()
      .then(async ({ data }) => {
        Cookies.set("token", data.login.token);
        // await this.props.refetch();
        this.clearState();
        // this.props.history.push('/dashboard');
        this.forceUpdate()
      })
      .catch(error => {
        this.setState({
          error: error
        });
        console.log(error);
      });
  }

  validateForm() {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  }

  render() {
    const { username, password } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
             Log-in to your account
          </Header>
          <Mutation mutation={LOGIN_USER} variables={{ username, password }}>
            {(login, { data, loading, error }) => {
              return (
                <Form
                  size="large"
                  className="form"
                  onSubmit={event => this.handleSubmit(event, login)}
                >
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      type="username"
                      name="username"
                      placeholder="username"
                      value={username}
                      onChange={this.handleChange.bind(this)}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={this.handleChange.bind(this)}
                    />
                    <Button color="teal" fluid size="large">
                      Login
                    </Button>
                  </Segment>
                </Form>
              );
            }}
          </Mutation>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
export default withRouter(Login);
