"use strict"
import React, {Component} from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">JBook Store</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

export default Menu;