"use strict"

const initialState = {
  books: [],
  msg: '',
  style: '',
  validation: ''
}

export function booksReducer(state = {books: []}, action) {
  switch(action.type) {
    case "GET_BOOKS":
      return {...state, books: [...action.payload]};
      break;

    case "POST_BOOK_REJECTED":
      return {
        ...state,
        msg: action.payload,
        style: 'danger',
        validation: 'error'
      }
      break;
    
    default:
      return state;
  }
}