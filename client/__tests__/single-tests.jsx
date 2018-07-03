import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Single from '../components/Single/single-presentational';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

describe('Single', () => {
  test('Snapshot', () => {
    const tree = renderer.create(<Single
      castVote={() => jest.fn()}
      grabSinglePoll={() => jest.fn()}
      addAltAnswer={() => jest.fn()}
      allPolls={{}}
      allAnswers={{}}
      authenticated={false}
      user_id=''
      match={{ params: { pollid: 'abcdef' } }}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Single
      castVote={() => jest.fn()}
      grabSinglePoll={() => jest.fn()}
      addAltAnswer={() => jest.fn()}
      allPolls={{}}
      allAnswers={{}}
      authenticated={false}
      user_id=''
      match={{ params: { pollid: 'abcdef' } }}
    />, div);
  });
});
