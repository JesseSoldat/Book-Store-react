"use strict"

export function cartReducer(state = {cart: []}, action) {
  switch (action.type) {
    case "GET_CART":
      // console.log('GET_CART', action);    
      return {
        ...state,
        cart: action.payload,
        totalAmount: totalAmount(action.payload).amount,
        totalQty: totalQty(action.payload).qty
      }
      break;

    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totalAmount(action.payload).amount,
        totalQty: totalQty(action.payload).qty
      }
      break;

    case "UPDATE_CART":
      // console.log('UPDATE_CART', action.payload);     
      return {
        ...state,
        cart: action.payload,
        totalAmount: totalAmount(action.payload).amount,
        totalQty: totalQty(action.payload).qty
      };
      break;

    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totalAmount(action.payload).amount,
        totalQty: totalQty(action.payload).qty
      }
   
    default:
      return state;
      break;
  }
}

export const totalAmount = (payload) => {
  const totalAmount = payload.map((cart) => cart.price * cart.quantity) 
    .reduce((a,b) => a + b);

  return { amount: totalAmount.toFixed(2) };
}

export const totalQty = (payload) => {
  const qty = payload.map((qty) => qty.quantity)
    .reduce((a,b) => a + b);

  return { qty };
}

