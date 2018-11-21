import React, { Component, Fragment } from "react";

import Tabs from "./Tabs";
import Signup from "../auth/Signup";
import {
  Input,
  Container,
  Grid,
  Divider,
  Segment,
  Label,
  Header
} from "semantic-ui-react";

const initialState = {
  insuredAmount: "",
  error: false
};

export default class WelcomeActions extends Component {
  constructor() {
    super();
    this.state = {
      ...initialState
    };
  }

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
    return (
      <Fragment>
        <Container>
          <Grid container verticalAlign="middle" textAlign="center">
            <Grid.Column width={15}>
              <Segment>
                <Tabs tabWidth={2} />
              </Segment>
              <Segment>
                <Header as="h2">
                  Check to see how much insurance coverage you have to pay!
                </Header>
                <div>
                  <p>For a desired daily coverage of</p>
                  <p>
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
                  </p>
                  <p>
                    You would only need to pay ${expectedPremium} daily
                    {this.state.error && "Please enter a numerical value"}
                  </p>
                </div>
              </Segment>
            </Grid.Column>
          </Grid>
          <Divider />
          <Grid verticalAlign="middle" textAlign="center">
            <Grid.Column width={8}>
              <Signup />
            </Grid.Column>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
