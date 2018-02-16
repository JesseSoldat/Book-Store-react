"use strict"
import React, {Component} from 'react';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <a href="/">JBook Store</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>        
            <NavItem eventKey={1} href="/about">About</NavItem>
            <NavItem eventKey={2} href="/contacts">Contact Us</NavItem> 
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="/admin">Admin</NavItem>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    );
  }
}

export default Menu;