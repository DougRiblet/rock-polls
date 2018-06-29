import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Signup from '../components/Signup/signup-presentational';

describe('Signup', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Signup
      signUpUser={() => jest.fn()}
      authenticated={false}
      username=''
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Signup
      signUpUser={() => jest.fn()}
      authenticated={false}
      username=''
    />, div);
  });
});
