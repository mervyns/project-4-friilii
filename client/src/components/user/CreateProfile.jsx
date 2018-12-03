import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_CURRENT_USER, CREATE_USER_PROFILE } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import {
  Button,
  Form,
  Message,
  Grid,
  Segment,
  Header
} from "semantic-ui-react";

const initialState = {
  userId: "",
  username: "",
  email: "",
  newEmail: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  password: "",
  passwordConfirm: "",
  error: "",
  passwordMatch: null
};

class CreateProfile extends React.Component {
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

  handleSubmit(event, createProfile) {
    event.preventDefault();
    createProfile()
      .then(async ({ data }) => {
        console.log(data);
        // Cookies.set("token", data.login.token);
        // await this.props.refetch();
        this.clearState();
        // this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState({
          error: error
        });
        console.log(error);
      });
  }
  render() {
    const {
      username,
      password,
      userId,
      firstName,
      lastName,
      birthDate
    } = this.state;
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
            return (
              <Mutation
                mutation={CREATE_USER_PROFILE}
                variables={{ userId: currentUserId, firstName, lastName, birthDate }}
              >
                {(createProfile, { data, loading, error }) => {
                  return (
                    <Grid
                      textAlign="center"
                      style={{ height: "100%" }}
                      verticalAlign="middle"
                    >
                      <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                          Create your profile
                        </Header>
                        <Form
                          size="large"
                          className="form"
                          onSubmit={event =>
                            this.handleSubmit(event, createProfile)
                          }
                        >
                          <Segment stacked>
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              type="text"
                              name="firstName"
                              placeholder="firstName"
                              value={firstName}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              type="text"
                              name="lastName"
                              placeholder="lastName"
                              value={lastName}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              type="date"
                              name="birthDate"
                              placeholder="birthDate"
                              value={birthDate}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Button color="teal" fluid size="large">
                              Create My Profile
                            </Button>
                          </Segment>
                        </Form>
                      </Grid.Column>
                    </Grid>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(CreateProfile);
