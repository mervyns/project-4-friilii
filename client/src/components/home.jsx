import React from "react";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header as="h1">
        frillii testing
        </Header>{" "}
        <p>
          Test to see render
        </p>
      </div>
    );
  }
}

export default Home;
