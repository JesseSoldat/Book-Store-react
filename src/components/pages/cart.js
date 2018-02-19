"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';

class Cart extends Component {
  state = {
    showModal: false
  }

  onDelete = (_id) => {};

  onIncrement = (_id) => {};

  onDecrement = (_id, quantity) => {};

  open = () => {
    this.setState(() => ({showModal: true}));
  }

  close = () => {
    this.setState(() => ({showModal: false}));    
  }

  render = () => {
    if(true) {
      return this.renderCart();
    }
    return this.renderEmpty();
  }

  renderEmpty = () => (<div></div>);

  renderCart = () => {
    return (
      <Panel header="Cart" bsStyle="primary">
        <Row>
          <Col xs={12}>
            <h6>Total Amount: </h6>
            <Button onClick={this.open} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        
      </Panel>
    );
  }
}

const mapStateToProps = ({cart}) => ({
  cart: cart.cart
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);