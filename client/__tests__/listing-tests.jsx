import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Listing from '../components/Listing/listing-presentational';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('Listing', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Listing
      grabAllPolls={() => jest.fn()}
      allPolls={{}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Listing
      grabAllPolls={() => jest.fn()}
      allPolls={{}}
    />, div);
  });
});
