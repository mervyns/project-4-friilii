import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import InfoBox from "../layout/InfoBox";
import ShowPlans from "./ShowPlans";
import ShowProfile from "./ShowProfile";
import CreateClaim from "./CreateClaim";
import CreatePlan from './CreatePlan';
import { Grid } from "semantic-ui-react";

const initialState = {
  username: "",
  email: "",
  newEmail: "",
  password: "",
  passwordConfirm: "",
  error: "",
  passwordMatch: null
};

class Dashboard extends React.Component {
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
            let currentUserId = data.getCurrentUser.id;
            return (
              <Grid divided="vertically" celled>
                <Grid.Row color='orange'>
                <Grid.Column>
                  <InfoBox username={data.getCurrentUser.username} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <ShowProfile props={data.getCurrentUser.profile} />
                  </Grid.Column>
                  <Grid.Column>
                    <CreatePlan />
                  </Grid.Column>
                  <Grid.Column>
                    <CreateClaim />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <ShowPlans props={data.getCurrentUser.plans} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withRouter(Dashboard);
