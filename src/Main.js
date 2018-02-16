"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from './components/menu';
import Footer from './components/footer';

class Main extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Footer/>
      </div>
    );
  }
}

export default connect(undefined)(Main);