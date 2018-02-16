"use strict"
console.log('app works;');

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers/index';

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

const Main = () => <div>Main</div>;

export const history = createHistory();

const Routes = (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={Main} />
          
        </Switch>
      </div>
    </Router>
  </Provider>
);

render(Routes, document.getElementById('app'));