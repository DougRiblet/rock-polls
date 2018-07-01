import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Admin from '../components/Admin/admin-presentational';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('Admin', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Admin
      grabMyPolls={() => jest.fn()}
      myPolls={{}}
      user_id=''
      username=''
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Admin
      grabMyPolls={() => jest.fn()}
      myPolls={{}}
      user_id=''
      username=''
    />, div);
  });
});
