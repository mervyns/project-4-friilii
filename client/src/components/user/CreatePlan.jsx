import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_CURRENT_USER, CREATE_USER_PLAN } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import {
  Button,
  Form,
  Grid,
  Segment,
  Header,
  Dropdown
} from "semantic-ui-react";

const initialState = {
  planName: "",
  sumInsured: "",
  premium: "",
  dateStart: "",
  dateEnd: "",
  userId: "",
  error: ""
};

const planOptions = [
  {key: 'incomeLoss', name:'incomeLoss', text:'Loss of Income Plan', value: 'incomeLoss'},
  {key: 'medicalPlan', name: 'medicalPlan',text:'Medical Insurance Plan', value: 'medicalPlan'},
  {key: 'transportPlan', name:'transportPlan', text:'Transport Insurance Plan', value: 'transportPlan'}
]

class CreatePlan extends React.Component {
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
    console.log("changed", event.currentTarget.innerText, event.currentTarget.getAttribute('name'))
    this.setState({
      [name]: value
    });
  }

  handleChangeforDropdown(event) {
    const value = event.currentTarget.innerText;
    this.setState({
      planName: value
    });
  }

  handleSubmit(event, createProfile) {
    // event.preventDefault();
    createProfile()
      .then(async ({ data }) => {
        console.log(data);
        // Cookies.set("token", data.login.token);
        // await this.props.refetch();
        this.clearState();
        // this.props.history.push('/dashboard');
        window.location.reload();
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
      planName,
      sumInsured,
      dateStart,
      dateEnd
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
            let calculatedPremium = parseInt(sumInsured / 45).toFixed(0)
            return (
              <Mutation
                mutation={CREATE_USER_PLAN}
                variables={{
                  userId: currentUserId,
                  planName,
                  sumInsured,
                  premium: calculatedPremium,
                  dateStart,
                  dateEnd
                }}
              >
                {(createPlan, { data, loading, error }) => {
                  return (
                    <Grid
                      textAlign="center"
                      style={{ height: "100%" }}
                      verticalAlign="middle"
                    >
                      <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h2" color="teal" textAlign="center">
                          Insure yourself with a plan!
                        </Header>
                        <Form
                          size="large"
                          className="form"
                          onSubmit={event =>
                            this.handleSubmit(event, createPlan)
                          }
                        >
                          <Segment stacked>
                              <Form.Input name="planName">
                        <Dropdown
                            fluid
                            search
                            selection
                            name="planName"
                            type="text"
                            label='Select your plan'
                            options={planOptions}
                            onChange={this.handleChangeforDropdown.bind(this)}
                            placeholder='Select your Plan'
                            />
                        </Form.Input>
                            <Form.Input
                              fluid
                              icon="dollar"
                              iconPosition="left"
                              type="text"
                              name="sumInsured"
                              placeholder="Amount that you wish to insure yourself for"
                              value={sumInsured}
                              onChange={this.handleChange.bind(this)}
                            />

                            <Form.Input
                                readOnly
                              fluid
                              icon="dollar"
                              iconPosition="left"
                              type="text"
                              name="premium"
                              placeholder="premium"
                              value={calculatedPremium}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              type="date"
                              name="dateStart"
                              placeholder="dateStart"
                              value={dateStart}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              type="date"
                              name="dateEnd"
                              placeholder="dateEnd"
                              value={dateEnd}
                              onChange={this.handleChange.bind(this)}
                            />
                            <Button color="teal" fluid size="large">
                              Add Plan
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

export default withRouter(CreatePlan);
