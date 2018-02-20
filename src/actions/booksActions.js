"use-strict"
import axios from 'axios';

export function getBooks() {
  return (dispatch) => { 
    axios.get("/api/books")
      .then((res) => {      
        dispatch({type: 'GET_BOOKS', payload: res.data});
      })
      .catch((err) => {
        dispatch({type: 'GET_BOOKS_REJECTED', payloade: err});
      });
  }
}

export function postBook(book) {
  return (dispatch) => {
    axios.post("/api/books", book)
      .then((res) => {
        dispatch({type: 'POST_BOOK', payload: res.data});
      })
      .catch((err) => {
        dispatch({type: 'POST_BOOK_REJECTED', payload: 'There was an error while posting a new book'});
      });
  }
}

export function deleteBook(id) {
  return (dispatch) => {
    axios.delete('/api/books/' + id)
      .then((res) => {
        dispatch({type: 'DELETE_BOOK', payload: id})
      })
      .catch((err) => {
        dispatch({type: 'DELETE_BOOK_REJECTED', payload: err})
      })
  }
}

export function resetButton() {
  return {
    type: 'RESET_BUTTON'
  }
}