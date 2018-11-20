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
        <Menu.Item as={Link} to="/login" 
          name="Login"
          active={activeItem === "Login"}
          onClick={this.handleItemClick}
        >
        Login
        </Menu.Item>
      </Menu>
    );
  }
}
