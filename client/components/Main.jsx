import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Login from './Login';
import Signup from './Signup';
import ReqAuth from './Auth/require-authentication';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/admin' component={ReqAuth(Admin)} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </Switch>
  </main>
);

export default Main;
