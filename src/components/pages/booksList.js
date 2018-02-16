"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

class BooksList extends Component {
  render() {
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
        </Row>
        <Row>
        </Row>
      </Grid>
    )
  }
}

export default BooksList;