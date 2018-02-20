"use strict"
import React, {Component} from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import {findDOMNode} from 'react-dom';
import {postBook, deleteBook, getBooks, resetButton} from '../../actions/booksActions';

class BookForm extends Component {
  state = {
    images: [],
    img: ''
  }

  componentDidMount() {
    this.props.getBooks();

    axios.get('/api/images')
      .then(res => {
        this.setState(() => ({images: res.data}));  
      })
      .catch(err => {
        this.setState(() => ({images: [], img: ''}))
      });
  }

  handleSubmit = () => {
    const book = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value
    }];
    this.props.postBook(book);
  };


  onDelete = () => {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBook(bookId);
  };

  handleSelect = (img) => {
    this.setState(() => ({img: '/images/'+ img}))
  };

  resetForm = () => {
    this.props.resetButton();
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState(() => ({img: ''}));
  }; 

  render() {
    // console.log('FORM PROPS', this.props);
    
    const renderButton = () => (
      <Button
        onClick={(!this.props.msg ? (this.handleSubmit) : (this.resetForm))}
        bsStyle={(!this.props.style) ? ("primary") : (this.props.style)}
      >
        {(!this.props.msg) ? "Save Book" : this.props.msg}
      </Button>
    );

    const bookList = this.props.books.map((book) => (
      <option key={book._id} value={book._id}>{book.title}</option>
    ));

    const imgList = this.state.images.map((img, i) => (
      <MenuItem key={i} eventKey={img.name}
        onClick={() => this.handleSelect(img.name)}>
        {img.name}
      </MenuItem>
    ));

    return(
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image"
                  value={this.state.img} />
                  <DropdownButton componentClass={InputGroup.Button}
                    id="input-dropdown-addon"
                    title="Select an image"
                    bsStyle="primary"
                  >
                    {imgList}                  
                  </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
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

            <Panel>
              <FormGroup controlId="formControlSelect">
                <ControlLabel>
                  Select a book to delete
                </ControlLabel>
                <FormControl ref="delete"
                  componentClass="select"
                  placeholder="select">
                  <option value="select">select</option>
                  {bookList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete}
                bsStyle="danger">
                Delete Book
              </Button>
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
  postBook: (book) => dispatch(postBook(book)),
  deleteBook: (id) => dispatch(deleteBook(id)),
  getBooks: () => dispatch(getBooks()),
  resetButton: () => dispatch(resetButton())
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);