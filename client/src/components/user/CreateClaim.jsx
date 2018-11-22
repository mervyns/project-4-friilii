import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { CREATE_CLAIM, CREATE_USER_PLAN } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import {
  Button,
  Form,
  Message,
  Grid,
  Segment,
  Header,
  Dropdown,
  Select
} from "semantic-ui-react";

const initialState = {
  reason: "",
  amountClaimed: "",
  planName: "",
  error: ""
};

const planOptions = [
  {
    key: "incomeLoss",
    name: "incomeLoss",
    text: "Loss of Income Plan",
    value: "incomeLoss"
  },
  {
    key: "medicalPlan",
    name: "medicalPlan",
    text: "Medical Insurance Plan",
    value: "medicalPlan"
  },
  {
    key: "transportPlan",
    name: "transportPlan",
    text: "Transport Insurance Plan",
    value: "transportPlan"
  }
];

class CreateClaim extends React.Component {
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
    console.log(
      "changed",
      event.currentTarget.innerText,
      event.currentTarget.getAttribute("name")
    );
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
    const { planName, amountClaimed, reason } = this.state;
    return (
      <Fragment>
        <Mutation
          mutation={CREATE_CLAIM}
          variables={{
            planName,
            amountClaimed,
            reason
          }}
        >
          {(createClaim, { data, loading, error }) => {
            return (
              <Grid
                textAlign="center"
                style={{ height: "100%" }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" color="teal" textAlign="center">
                    Create a claim
                  </Header>
                  <Form
                    size="large"
                    className="form"
                    onSubmit={event => this.handleSubmit(event, createClaim)}
                  >
                    <Segment stacked>
                      <Form.Input name="planName">
                        <Dropdown
                          fluid
                          search
                          selection
                          name="planName"
                          type="text"
                          label="Select your plan"
                          options={planOptions}
                          onChange={this.handleChangeforDropdown.bind(this)}
                          placeholder="Select your Plan"
                        />
                      </Form.Input>
                      <Form.Input
                        fluid
                        icon="dollar"
                        iconPosition="left"
                        type="text"
                        name="amountClaimed"
                        placeholder="Amount that you wish to claim"
                        value={amountClaimed}
                        onChange={this.handleChange.bind(this)}
                      />

                      <Form.TextArea
                        fluid
                        type="text"
                        name="reason"
                        placeholder="Your reason for claiming"
                        value={reason}
                        onChange={this.handleChange.bind(this)}
                      />
                      <Button color="teal" fluid size="large">
                        Add Claim
                      </Button>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default withRouter(CreateClaim);
