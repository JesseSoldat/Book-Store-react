"use strict"

const initialState = {
  books: [],
  msg: null,
  style: 'primary',
  validation: null
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

    case "RESET_BUTTON":
      return {
        ...state,
        msg: null,
        validation: null
      }
      break;
    
    case 'DELETE_BOOK':
      const booksCopy = [...state.books];
      const indexToDelete = booksCopy.findIndex((book) => book._id == action.payload);

      return {
        ...state,
        books: [...booksCopy.slice(0, indexToDelete), ...booksCopy.slice(indexToDelete + 1)]
      };
      break;
    
    default:
      return state;
  }
}