import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Login from '../components/Login/login-presentational';

describe('Login', () => {
  test('Snapshot', () => {
    const Login_tree = renderer.create(<Login
      logInUser={() => logInUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />).toJSON();
    expect(Login_tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login
      logInUser={() => logInUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />, div);
  });

});
