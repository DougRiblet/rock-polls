// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  authenticated: boolean,
};

const NavLoggedIn = () => (
  <div>
    <Link to='/admin'>admin</Link>
    <Link to='/logout'>logout</Link>
  </div>
);

const NavLoggedOut = () => (
  <div>
    <Link to='/login'>login</Link>
    <Link to='/signup'>signup</Link>
  </div>
);

const Header = ({ authenticated }: Props) => (
  <header>
    <nav>
      <div id='header-full'>
        <div id='header-container'>
          <div id='nav-left'>
            <Link to='/polls'>Coding Polls</Link>
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

/*
<ul>
  <li><Link to='/login'>Login</Link></li>
  <li><Link to='/signup'>Signup</Link></li>
</ul>
*/

