import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { UserView } from './components/UserView';
import { AdminView } from './components/AdminView';
import { NotFound } from './components/NotFound';



import './custom.css'

export default class App extends Component {

  render () {
      return (
          <Router>
              <Switch>
                  <Route exact path='/' component={UserView} />
                  <Route exact path='/:key' component={AdminView} />
                  <Route component={NotFound} />
              </Switch>
          </Router>
    );
  }
}
