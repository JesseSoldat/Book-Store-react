"use strict"
import axios from 'axios';

export function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
  }
}