import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import { GET_CURRENT_USER, CREATE_USER_PLAN } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import { Feed, Button, Segment, Input } from "semantic-ui-react";

const initialState = {
  planName: "",
  sumInsured: "",
  premium: "",
  dateStart: "",
  dateEnd: "",
  userId: "",
  error: ""
};

class ChatBox extends React.Component {
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
    return (
      <Fragment>
        <Segment color="teal">
          <Feed>
            <Feed.Event>
              <Feed.Content
                date={"Today"}
                summary={"New Chat"}
                extraText={"Hello, this is a chat box."}
              />
            </Feed.Event>
            <Feed.Event>
              <Feed.Content
                date={"Today"}
                summary={"New Chat"}
                extraText={"Hello, this is a chat box."}
              />
            </Feed.Event>
            <Feed.Event>
              <Feed.Content
                date={"Today"}
                summary={"New Chat"}
                extraText={"Hello, this is a chat box."}
              />
            </Feed.Event>
            <Feed.Event>
              <Feed.Content
                date={"Today"}
                summary={"New Chat"}
                extraText={"Hello, this is a chat box."}
              />
            </Feed.Event>
            <Feed.Event>
              <Feed.Content
                date={"Today"}
                summary={"New Chat"}
                extraText={"Hello, this is a chat box."}
              />
            </Feed.Event>
            <Input fluid>
            <input />
            <Button type='submit'>Send</Button>
            </Input>
          </Feed>
        </Segment>
      </Fragment>
    );
  }
}

export default withRouter(ChatBox);
