"use strict"
import React, {Component} from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {postBook} from '../../actions/booksActions';

class BookForm extends Component {
  state = {
    images: [{}],
    img: ''
  }

  componentDidMount() {
    
  }

  handleSubmit = () => {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBook(book);
  };


  onDelete = () => {};

  handleSelect = () => {};

  resetForm = () => {};

  

  render() {
    const renderButton = () => (
      <Button
        onClick={(!this.props.msg ? (this.handleSubmit) : (this.resetForm))}
        bsStyle={(!this.props.style) ? ("primary") : (this.props.style)}
      >
        {(!this.props.msg) ? "Save Book" : this.props.msg}
      </Button>
    );

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
              </InputGroup>
            </Panel>
          </Col>

          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title"
                validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter Title"
                  ref="title"
                />
                <FormControl.Feedback/>
              </FormGroup>

              <FormGroup controlId="description"
                validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl  
                  type="text"
                  placeholder="Enter Description"
                  ref="description"
                />
                <FormControl.Feedback/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Price</ControlLabel>
                <FormControl  
                  type="text"
                  placeholder="Enter Price"
                  ref="price"
                />
                <FormControl.Feedback/>
              </FormGroup>
              {renderButton()}
            </Panel>
          </Col>
        </Row>
      </Well>

    );
  }
}

const mapStateToProps = ({books}) => ({
  books: books.books,
  msg: books.msg,
  style: books.style,
  validation: books.validation
});

const mapDispatchToProps = (dispatch) => ({
  postBook: (book) => dispatch(postBook(book))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);