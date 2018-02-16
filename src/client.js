"use strict"
console.log('app works;');

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

import Menu from './components/menu';
import BooksList from './components/pages/booksList';
import Footer from './components/footer';

export const history = createHistory();

const About = () => <div>About</div>;
const Contact = () => <div>Contact</div>;
const Admin = () => <div>Admin</div>;


const Routes = (
  <Provider store={store}>
      <Router history={history}>
        <div>
          <Menu />
          <Switch>
            <Route path="/" component={BooksList} exact={true} />
            <Route path="/about" component={About} />
            <Route path="/contacts" component={Contact} />
            <Route path="/admin" component={Admin} />
          </Switch>
          <Footer />   
        </div>
      </Router>
  </Provider>
);

render(Routes, document.getElementById('app'));