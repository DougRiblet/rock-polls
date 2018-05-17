// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Listing from './Listing';
import Admin from './Admin';
import Create from './Create';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import ReqAuth from './Auth/require-authentication';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/listing' component={Listing} />
      <Route path='/admin' component={ReqAuth(Admin)} />
      <Route path='/create' component={ReqAuth(Create)} />
      <Route path='/login' component={Login} />
      <Route path='/logout' component={Logout} />
      <Route path='/signup' component={Signup} />
    </Switch>
  </main>
);

export default Main;
