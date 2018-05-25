// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <div id='header-full'>
        <div id='header-container'>
          <div className='nav-left'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/polls'>Polls</Link></li>
            </ul>
          </div>
          <div className='nav-right'>
            <ul>
              <li><Link to='/admin'>Admin</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/logout'>Logout</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
