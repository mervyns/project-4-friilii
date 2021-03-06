import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import * as Cookies from "es-cookie";
import withSession from "../../hoc/withSession";

const dotenv = require("dotenv");

dotenv.config();

const initialState = {
  activeItem: "",
  loggedIn: false
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  componentWillMount() {
    const token = Cookies.get("token");
    if (token) {
      return this.setState({ loggedIn: true });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logOut = e => {
    Cookies.remove("token");
    window.location.href = ("/")
  };

  render() {
    const { activeItem, loggedIn } = this.state;
    console.log(this.props);
    return (
      <Menu inverted color="teal">
        {loggedIn == false ? (
          <Menu.Item
            as={Link}
            to="/"
            name="Home"
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
        ) : (
          <Menu.Item
            as={Link}
            to="/dashboard"
            name="Home"
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
        )}
        {loggedIn == false && (
          <Menu.Item
            as={Link}
            to="/signup"
            name="Sign Up"
            active={activeItem === "Sign Up"}
            onClick={this.handleItemClick}
          >
            Sign Up
          </Menu.Item>
        )}
        {loggedIn == false && (
          <Menu.Item
            as={Link}
            to="/login"
            name="Login"
            active={activeItem === "Login"}
            onClick={this.handleItemClick}
          >
            Login
          </Menu.Item>
        )}
        {loggedIn == true && (
          <Menu.Item
            as={Link}
            to="/createprofile"
            name="Create Profile"
            active={activeItem === "Create Profile"}
            onClick={this.handleItemClick}
          >
            Create Profile
          </Menu.Item>
        )}

        {loggedIn == true && (
          <Menu.Item
            as={Link}
            to="/createplan"
            name="Create Plan"
            active={activeItem === "Create Plan"}
            onClick={this.handleItemClick}
          >
            Get Insured
          </Menu.Item>
        )}

        {loggedIn == true && (
          <Menu.Item name="Log Out" onClick={this.logOut}>
            Log Out
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

export default withSession(Header);
