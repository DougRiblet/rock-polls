import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Create from '../components/Create/create-presentational';

jest.mock('random-id', () => {
  let val = 1;
  return () => ("abcdefghijklmnop" + val++);
});

describe('Create', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Create
      createNewPoll={() => jest.fn()}
      user_id=''
      username=''
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Create
      createNewPoll={() => jest.fn()}
      user_id=''
      username=''
    />, div);
  });
});
