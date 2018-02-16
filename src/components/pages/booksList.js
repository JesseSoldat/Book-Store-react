"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

class BooksList extends Component {
  render() {
    return (
      <Grid>
        <Row>
          Book List
        </Row>
      </Grid>
    )
  }
}

export default BooksList;