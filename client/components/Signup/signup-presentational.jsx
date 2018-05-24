// @flow

import React from 'react';

type Props = {
  signUpUser: (string, string) => mixed,
  authenticated: boolean,
  user_id: string,
  username: string,
};

type State = {
  username: string,
  password: string,
};

export default class Signup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleSubmit: Function;
  handleChangeUsername: Function;
  handleChangePassword: Function;

  // eslint-disable-next-line no-undef
  handleChangeUsername(event: SyntheticInputEvent<*>) {
    this.setState({ username: event.target.value });
  }

  // eslint-disable-next-line no-undef
  handleChangePassword(event: SyntheticInputEvent<*>) {
    this.setState({ password: event.target.value });
  }

  // eslint-disable-next-line no-undef
  handleSubmit(event: SyntheticInputEvent<*>) {
    event.preventDefault();
    this.props.signUpUser(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <div id='signup'>
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              id='username-input'
              type='text'
              value={this.state.username}
              minLength='4'
              maxLength='15'
              size='20'
              onChange={this.handleChangeUsername}
            />
          </label>
          <br />
          <label>
          Password:
            <input
              id='password-input'
              type='text'
              value={this.state.password}
              minLength='6'
              maxLength='19'
              size='20'
              onChange={this.handleChangePassword}
            />
          </label>
          <br />
          <input type='submit' value='submit' />
        </form>
        <div className='show-status'>
          <p>Authenticated: {String(this.props.authenticated)}</p>
          <p>Username: {this.props.username}</p>
          <p>User ID: {this.props.user_id}</p>
        </div>
      </div>

    );
  }
}
