// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Listing from './Listing';
import Single from './Single';
import Admin from './Admin';
import Create from './Create';
import Edit from './Edit';
import Login from './Login';
import Logout from './Logout';
import Signup from './Signup';
import ReqAuth from './Auth/require-authentication';

const Polls = () => (
  <Switch>
    <Route exact path='/polls' component={Listing} />
    <Route path='/polls/:pollid' component={Single} />
  </Switch>
);

const MyAccount = () => (
  <Switch>
    <Route exact path='/admin' component={ReqAuth(Admin)} />
    <Route path='/admin/create' component={ReqAuth(Create)} />
    <Route path='/admin/:mypollid' component={ReqAuth(Edit)} />
  </Switch>
);

const Main = () => (
  <main>
    <div id='main-container'>
      <Switch>
        <Route exact path='/' component={Listing} />
        <Route path='/polls' component={Polls} />
        <Route path='/admin' component={MyAccount} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  </main>
);

export default Main;
