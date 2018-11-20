import React, { Component } from "react";
import { Grid, Container, Image } from "semantic-ui-react";
import WelcomeActions from './WelcomeActions'

export default class Landing extends Component {
render () {
  return  <Grid>
          <Grid.Row>
          <Grid.Column width={11}>
          <Image src={"../../../landing.jpg"} alt="test" style={{ height: '60rem'}} />
          </Grid.Column>
        <Grid.Column width={5}><WelcomeActions /></Grid.Column>
      </Grid.Row>
        </Grid>
}
}