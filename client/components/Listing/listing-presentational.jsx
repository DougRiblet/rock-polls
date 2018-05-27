// @flow

import React from 'react';
import { Link } from 'react-router-dom';

type PollOption = {
  question: string,
  date: string,
};

type PollOptions = {
  [key: string]: PollOption
};

type Props = {
  grabAllPolls: () => mixed,
  allPolls: PollOptions,
};

export default class Listing extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.showLoading = this.showLoading.bind(this);
    this.showListing = this.showListing.bind(this);
  }

  componentDidMount() {
    this.props.grabAllPolls();
  }

  showLoading() {
    return <p className='loading'>L O A D I N G</p>;
  }

  showListing(allPolls: PollOptions) {
    const ap = Object.entries(allPolls);
    return ap
      .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
      .map(p => (
        <li key={p[0]}>
          <Link to={`/polls/${p[0]}`}>{p[1].question}</Link>
          <span className='polldate'> {p[1].date.slice(0, 10)}</span>
        </li>
      ));
  }

  render() {

    let notReady = !this.props.allPolls || !Object.keys(this.props.allPolls).length;
    return (
      <div id='show-all-polls'>
        <div id='listing-head'>
          Latest Polls
        </div>
        <div id='listing-list'>
          {
            notReady
            ? this.showLoading()
            : <ul>{ this.showListing(this.props.allPolls) }</ul>
          }
        </div>
      </div>
    );
  }
}
