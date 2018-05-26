// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  authenticated: boolean, 
};

const NavLoggedIn = () => (
  <div>
    <Link to='/admin'><button>Admin</button></Link>
    <Link to='/admin/create'><button>Create</button></Link>
    <Link to='/logout'><button>Logout</button></Link>
  </div>
);

const NavLoggedOut = () => (
  <div>
    <Link to='/login'><button>Login</button></Link>
    <Link to='/signup'><button>Signup</button></Link>
  </div>
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

/*
<ul>
  <li><Link to='/login'>Login</Link></li>
  <li><Link to='/signup'>Signup</Link></li>
</ul>
*/

