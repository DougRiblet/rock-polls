// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/admin'>Admin</Link></li>
        <li><Link to='/listing'>Listing</Link></li>
        <li><Link to='/create'>Create</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/logout'>Logout</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
