"use strict"
import React, {Component} from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class BookItem extends Component {
  state = {
    isClicked: false
  };

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>

          </Col>
          <Col xs={6} sm={8}>
            <h6></h6>
            <p></p>
            <h6>usd. </h6>
          
          </Col>
        </Row>
      </Well>
    );
  }
}

const mapStateToProps = ({cart}) => ({
  cart: cart.cart
});

export default connect(mapStateToProps)(BookItem);