import React, { Component, Fragment } from "react";
import { Mutation } from "react-apollo";
import { CREATE_NEW_USER } from '../../queries'
import * as Cookies from 'es-cookie';
import {
  Input,
  Button,
  Form,
  Container,
  Grid,
  Divider,
  Segment,
  Label,
  Header
} from "semantic-ui-react";

const initialState = {
  insuredAmount: "",
  error: false,
  username: "",
  email: "",
  password: "",
  role: "member"}

export default class WelcomeActions extends Component {
  constructor() {
    super();

    this.state = {
      ...initialState
    };
    this.onChange = this.onChange.bind(this);
  }
// Action taken when submitting the form
// after user is created, data will be returned and set as token.

  handleSubmit = (event, createUser) => {
    event.preventDefault();
    createUser()
      .then(async ({ data }) => {
        Cookies.set("token", data.createUser.token);
        // await this.props.refetch();
        this.setState({username:""})
        // this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error)
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
    let expectedPremium = (this.state.insuredAmount / 15).toFixed(0);
    const { username, email, password } = this.state;
    return (
      <Fragment>
        <Container>
          <Grid verticalAlign="middle" textAlign="center">
            <Grid.Column width={14}>
              <Segment>
                <Header as="h2">
                  Check to see how much insurance coverage you have to pay!
                </Header>
              </Segment>
              <Segment>
                <div>
                  For a desired daily coverage of
                  <Input
                    name="insuredAmount"
                    labelPosition="left"
                    error={this.state.error}
                    placeholder="Your insured amount"
                    onChange={this.onChange}
                  >
                    <Label>$</Label>
                    <input />
                  </Input>
                </div>
                You would only need to pay ${expectedPremium} daily
                {this.state.error && "Please enter a numerical value"}
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid verticalAlign="middle" textAlign="center">
            <Grid.Column width={8}>
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
        </Container>
      </Fragment>
    );
  }
}
