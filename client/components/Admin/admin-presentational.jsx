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
  grabMyPolls: () => mixed,
  myPolls: PollOptions,
  user_id: string,
  username: string,
};

export default class Admin extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.showLoading = this.showLoading.bind(this);
    this.showListing = this.showListing.bind(this);
  }

  componentDidMount() {
    this.props.grabMyPolls(this.props.user_id);
  }

  showLoading() {
    return <p className='loading'>L O A D I N G</p>;
  }

  showListing(myPolls: PollOptions) {
    const mp = Object.entries(myPolls);
    return mp
      .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
      .map(p => (
        <li key={p[0]}>
          <Link to={`/admin/${p[0]}`}>{p[1].question}</Link>
          <span className='polldate'> posted on {p[1].date.slice(0, 10)}</span>
        </li>
      ));
  }

  render() {
    const notReady = !this.props.myPolls || !Object.keys(this.props.myPolls).length;
    return (
      <div id='show-my-polls'>
        <div id='admin-head'>
          <h1>My Polls</h1>
        </div>
        <div id='admin-list'>
          {
            notReady
            ? this.showLoading()
            : <ul>{ this.showListing(this.props.myPolls) }</ul>
          }
        </div>
        <div>
          <Link to='/admin/create'>Create New Poll</Link>
        </div>
      </div>
    );


  }
}

//  <span className='polldate'> {p[1].date.slice(0, 10)}</span>
