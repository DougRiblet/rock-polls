import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Signup from '../components/Signup/signup-presentational';

describe('Signup', () => {
  test('Snapshot', () => {
    const Signup_tree = renderer.create(<Signup
      signUpUser={() => signUpUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />).toJSON();
    expect(Signup_tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup
      signUpUser={() => signUpUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />, div);
  });
});
