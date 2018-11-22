import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";

const InfoBox = ({ username }) => (
  <Fragment>
      <Header as="h2" textAlign='center'>
      <p>
    Hello {username}</p>
    <p>
      Welcome to your dashboard. You can view your profile, create a claim, and
      view your Plans here.
      </p>
    </Header>
  </Fragment>
);

export default InfoBox;
