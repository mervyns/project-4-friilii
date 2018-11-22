import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../../queries";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";
import * as Cookies from "es-cookie";
import InfoBox from "../layout/InfoBox";
import ShowPlans from './ShowPlans'
import ShowProfile from './ShowProfile'


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
  render() { return(
<Fragment>
  
</Fragment>
  )}
}

  export default withRouter(ShowAllPlans)