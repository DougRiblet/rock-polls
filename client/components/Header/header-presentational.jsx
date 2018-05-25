// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  authenticated: boolean, 
};

const NavLoggedIn = () => (
  <ul>
    <li><Link to='/admin'>Admin</Link></li>
    <li><Link to='/logout'>Logout</Link></li>
  </ul>
);

const NavLoggedOut = () => (
  <ul>
    <li><Link to='/login'>Login</Link></li>
    <li><Link to='/signup'>Signup</Link></li>
  </ul>
);

const Header = ({ authenticated }: Props) => (
  <header>
    <nav>
      <div id='header-full'>
        <div id='header-container'>
          <div id='nav-left'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/polls'>Polls</Link></li>
            </ul>
          </div>
          <div id='nav-right'>
            {
              authenticated
              ? <NavLoggedIn />
              : <NavLoggedOut />
            }
          </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
