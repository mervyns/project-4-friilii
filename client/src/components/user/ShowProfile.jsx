import React, { Fragment } from "react";
import moment from "moment";
import { Form, Header, Grid, Button } from "semantic-ui-react";

const ShowProfile = ({ props }) => (
  <div>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Your Profile
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First name"
              placeholder="First name"
              value={props.firstName}
            />
            <Form.Input
              fluid
              label="Last name"
              placeholder="Last name"
              value={props.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Birth Date"
              value={moment(parseInt(props.birthDate)).format("DD/MM/YYYY")}
            />
          </Form.Group>
                <Button type="submit" color="teal" fluid size="large">Update Profile</Button>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
);

export default ShowProfile;
