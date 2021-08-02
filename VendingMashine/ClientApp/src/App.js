import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { UserView } from './components/UserView';
import { AdminView } from './components/AdminView';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';

import './custom.css'

export default class App extends Component {

  render () {
      return (
          <Router>
              <Switch>
        <Route exact path='/' component={UserView} />
                  <Route exact path='/:key' component={AdminView} />
              </Switch>
          </Router>
    );
  }
}
