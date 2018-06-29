import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Login from '../components/Login/login-presentational';

describe('Login', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Login
      logInUser={() => jest.fn()}
      authenticated={false}
      username=''
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login
      logInUser={() => jest.fn()}
      authenticated={false}
      username=''
    />, div);
  });
});
