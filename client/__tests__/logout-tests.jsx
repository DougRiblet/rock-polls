import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Logout from '../components/Logout/logout-presentational';

describe('Logout', () => {
  test('Snapshot', () => {
    const Logout_tree = renderer.create(<Logout
      logOutUser={() => logOutUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />).toJSON();
    expect(Logout_tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Logout
      logOutUser={() => logOutUser()}
      authenticated={false}
      user_id={''}
      username={''}
    />, div);
  });

});
