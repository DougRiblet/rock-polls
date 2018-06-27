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

  showListing() {
    const mp = Object.entries(this.props.myPolls);
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
          <h2>Polls Created by {this.props.username}</h2>
        </div>
        <div id='admin-list'>
          {
            notReady
            ? <p className='loading'>No Polls Found</p>
            : <ul>{ this.showListing() }</ul>
          }
        </div>
        <div id='add-new-poll'>
          <Link to='/admin/create'>
            <button id='create-new-button'>Create New Poll</button>
          </Link>
        </div>
      </div>
    );
  }
}
