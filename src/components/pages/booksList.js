"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';
import {getBooks} from '../../actions/booksActions';

import Cart from './cart';
import BookItem from './bookItem';


class BooksList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    const booksList = this.props.books.map((book) => { 
      return(
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem _id={book._id}
            title={book.title}
            description={book.description}
            price={book.price}
          />
        </Col>
      );
    });

    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img src="/images/home1.jpg" 
                alt="900x300"
                width={900}
                height={300}
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/home2.jpg" 
                alt="900x300"
                width={900}
                height={300}
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          <Cart/>
        </Row>
        <Row style={{marginTop: '15px'}}>
          {booksList}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books.books,
  state: state,
  stateBooks: state.books,
});

const mapDispatchToProps = (dispatch) => ({
 getBooks: () => dispatch(getBooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);