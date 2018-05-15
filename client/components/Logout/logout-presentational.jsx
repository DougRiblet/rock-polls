// @flow

import React from 'react';

type Props = {
  logOutUser: () => mixed,
  authenticated: boolean,
  user_id: string,
  username: string,
};

export default class Logout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogOut: Function;

  // eslint-disable-next-line no-undef
  handleLogout() {
    this.props.logOutUser();
  }

  render() {
    return (
      <div id='logout'>
        <div>
          <button onClick={this.handleLogout}>
            Log Out
          </button>
        </div>
        <div className='show-status'>
          <p>Authenticated: {String(this.props.authenticated)}</p>
          <p>Username: {this.props.username}</p>
          <p>User ID: {this.props.user_id}</p>
        </div>
      </div>
    );
  }
}
