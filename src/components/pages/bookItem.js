"use strict"
import React, {Component} from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class BookItem extends Component {
  state = {
    isClicked: false
  };

  handleCart = () => {}

    
  onReadMore = () => {
    this.setState(() => ({isClicked:true}));
  }
  

  render() {
    const renderDescription = () => (
      (this.props.description.length > 50 && this.state.isClicked === false) 
      ? (this.props.description.substring(0,50))
      : (this.props.description)
    );

    const renderButton = () => (
      <button className="link"
        onClick={this.onReadMore}
      >
      {
        (this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)
        ? ('...read more')
        : ('')
      }
      </button>
    );

  
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>

          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>
              {renderDescription()}
              {renderButton()}
            </p>
            <h6>usd. {this.props.price}</h6>
            <Button bsStyle='primary'
              onClick={this.handleCart}>
              Buy now
            </Button>
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