import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';
import ReqAuth from './Auth/require-authentication';

export default class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/admin' component={ReqAuth(Admin)} />
          <Route path='/login' component={Login} />
        </Switch>
      </main>
    );
  }
}
