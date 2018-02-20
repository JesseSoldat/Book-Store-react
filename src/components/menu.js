"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {getCart} from '../actions/cartActions';

class Menu extends Component {
  componentDidMount() {
    this.props.getCart();
  }

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
            <LinkContainer to="/about">
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
            <LinkContainer to="/contacts">
              <NavItem eventKey={2}>Contact Us</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/admin">
              <NavItem eventKey={1}>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to="/cart">
              <NavItem eventKey={2}>Your Cart</NavItem>
            </LinkContainer>
            <LinkContainer to="/cart">
              <NavItem eventKey={3}>
                {
                  (this.props.totalQty > 0) 
                  ? (<Badge className="badge">{this.props.totalQty}</Badge>)
                  : ('')
                }
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        
      </Navbar>
    );
  }
}

const mapStateToProps = ({cart}) => ({
  totalQty: cart.totalQty
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);