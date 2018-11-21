import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import {NavLink} from 'react-router-dom'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
          <Menu.Item as={Link} to="/"
          name="Home"
          active={activeItem === "Home"}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/signup"
          name="Sign Up"
          active={activeItem === "Sign Up"}
          onClick={this.handleItemClick}
        >
        Sign Up
        </Menu.Item>
        <Menu.Item as={Link} to="/login"
          name="Login"
          active={activeItem === "Login"}
          onClick={this.handleItemClick}
        >
        Login
        </Menu.Item>
        <Menu.Item as={Link} to="/createprofile"
          name="Create Profile"
          active={activeItem === "Create Profile"}
          onClick={this.handleItemClick}
        >
        Create Profile
        </Menu.Item>
        <Menu.Item as={Link} to="/createplan"
          name="Create Plan"
          active={activeItem === "Create Plan"}
          onClick={this.handleItemClick}
        >
        Get Insured
        </Menu.Item>
      </Menu>
    );
  }
}
