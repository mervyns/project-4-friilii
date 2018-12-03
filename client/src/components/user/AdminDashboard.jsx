import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PLANS, GET_USERS } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import InfoBox from "../layout/InfoBox";
import ShowPlans from "./ShowPlans";
import ShowUsers from "./ShowUsers";
import ShowProfile from "./ShowProfile";
import CreateClaim from "./CreateClaim";
import CreatePlan from "./CreatePlan";
import ChatBox from "./ChatBox";
import { Grid, Table } from "semantic-ui-react";

const initialState = {
  username: "",
  email: "",
  newEmail: "",
  password: "",
  passwordConfirm: "",
  error: "",
  passwordMatch: null
};

class AdminDashboard extends React.Component {
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
        <Query query={GET_USERS}>
          {({ data, loading, error }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) return <h1>Error</h1>;

            return (
              <Grid divided="vertically" celled>
                <Grid.Row color="olive">
                  <Grid.Column>
                    <ShowUsers props={data.getUsers} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          }}
        </Query>
        <Query query={GET_ALL_PLANS}>
          {({ data, loading, error }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) return <h1>Error</h1>;
            return (
              <Grid divided="vertically" celled>
                <Grid.Row color="orange">
                  <Grid.Column>
                    <ShowPlans props={data.getAllPlans} />
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

export default withRouter(AdminDashboard);
