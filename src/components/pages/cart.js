"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {addToCart, getCart, updateCart, deleteCartItem} from '../../actions/cartActions';

class Cart extends Component {
  state = { showModal: false }

  componentDidMount() { this.props.getCart();}

  onDelete = (_id) => {
    const cartArray = this.props.cart;
    const indexToDelete = cartArray.findIndex(item => (item._id === _id));
    const cartAfterDelete = [
      ...cartArray.slice(0, indexToDelete),
      ...cartArray.slice(indexToDelete + 1)
    ];
    this.props.deleteCartItem(cartAfterDelete);
  };

  onIncrement = (_id) => {
    this.props.updateCart(_id, 1, this.props.cart);
  };

  onDecrement = (_id, quantity) => {
    if(quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart);
    }
  };

  open = () => { this.setState(() => ({showModal: true}));}

  close = () => { this.setState(() => ({showModal: false}));}

  render = () => {
    if(this.props.cart[0]) {
      return this.renderCart();
    }
    return this.renderEmpty();
  }

  renderEmpty = () => (<div></div>);

  renderCart = () => {
    const cartItemsList = this.props.cart.map(item => (
      <Panel key={item._id}>
        <Row>
          <Col xs={12} sm={4}>
            <h6>{item.title}</h6><span>    </span>
          </Col>
          <Col xs={12} sm={2}>
            <h6>usd. {item.price}</h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>qty. <Label bsStyle="success">{item.quantity}</Label>
            </h6>
          </Col>
          <Col xs={12} sm={4}>
            <ButtonGroup style={{minWidth: '300px'}}>
              <Button bsStyle="default" bsSize="small"
                onClick={() => this.onDecrement(item._id, item.quantity)}
              > -
              </Button>
              <Button bsStyle="default" bsSize="small"
                onClick={() => this.onIncrement(item._id, item.quantity)}
              > +
              </Button>
              <span>    </span>
              <Button bsStyle="danger" bsSize="small"
                onClick={() => this.onDelete(item._id)}
              >
                DELETE
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    ));


    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total Amount: {this.props.totalAmount}</h6>
            <Button onClick={this.open} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>

        <Modal show={this.state.showModal}
          onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Thank You!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
        
      </Panel>
    );
  }
}

const mapStateToProps = ({cart}) => ({
  cart: cart.cart,
  totalAmount: cart.totalAmount
});

const mapDispatchToProps = (dispatch) => ({
  getCart: () => dispatch(getCart()),
  addToCart: (cart) => dispatch(addToCart(cart)),
  updateCart: (id, qty, cart) => dispatch(updateCart(id, qty, cart)),
  deleteCartItem: (cart) => dispatch(deleteCartItem(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);