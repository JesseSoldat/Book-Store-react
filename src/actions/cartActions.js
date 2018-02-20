"use strict"
import axios from 'axios';

export function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then(res => {
        dispatch({type: "GET_CART", payload: res.data})
      })
      .catch((err) => {
        dispatch({type: "GET_CART_REJECTED", msg: "Error when getting the cart from session"})
      });
  }
}

export function addToCart(cart) {
  return (dispatch) => {
    axios.post('/api/cart', cart)
      .then(res => {
        dispatch({type: "ADD_TO_CART", payload: res.data});
      })
      .catch(err => {
        dispatch({type: 'ADD_TO_CART_REJECTED', msg: 'Error adding to cart'});
      });
  }
}

export function updateCart(_id, unit, cart) {
  const cartArray = cart;
  const indexToUpdate = cartArray.findIndex((item) => item._id === _id);
  
  const newBookToUpdate = {
    ...cartArray[indexToUpdate],
    quantity: cart[indexToUpdate].quantity + unit
  };

  const cartUpdate = [
    ...cartArray.slice(0, indexToUpdate),
    newBookToUpdate,
    ...cartArray.slice(indexToUpdate + 1)
  ];

  return (dispatch) => {
    axios.post('/api/cart', cartUpdate)
      .then((res) => {
        dispatch({type: 'UPDATE_CART', payload: res.data});
      })
      .catch(err => {
        dispatch({type: 'UPDATE_CART_REJECTED', msg: 'Error when adding to the cart'});
      });
  }

}

export function deleteCartItem(cart) {
  return (dispatch) => {
    axios.post("/api/cart", cart)
      .then(res => {
        dispatch({type: "DELETE_CART_ITEM", payload: res.data});
      })
      .catch(err => {
        dispatch({type: "DELETE_CART_ITEM_REJECTED", msg: 'Error when deleting an item from the cart'})
      });
  }
}