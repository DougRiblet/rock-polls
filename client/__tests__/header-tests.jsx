import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Header from '../components/Header/header-presentational';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('Header', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Header
      authenticated={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header
      authenticated={false}
    />, div);
  });
});
