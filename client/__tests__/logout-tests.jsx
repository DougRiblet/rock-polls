import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Logout from '../components/Logout/logout-presentational';

describe('Logout', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Logout
      logOutUser={() => jest.fn()}
      authenticated={false}
      username=''
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Logout
      logOutUser={() => jest.fn()}
      authenticated={false}
      username=''
    />, div);
  });
});
