// @flow

import React from 'react';

type Props = {
};

type State = {
};

export default class Login extends React.Component<Props, State> {
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
  }

  render() {
    return (
      <div id='login'>
        <form onSubmit={this.handleSubmit}>
          <input
            id='username-input'
            type='text'
            ref={(input) => { this.textInput = input; }}
            value={this.state.username}
            minLength='4'
            maxLength='15'
            size='20'
            onChange={this.handleChangeUsername}
          />
          <br/>
          <input
            id='password-input'
            type='text'
            ref={(input) => { this.textInput = input; }}
            value={this.state.password}
            minLength='6'
            maxLength='19'
            size='20'
            onChange={this.handleChangeUsername}
          />
        </form>
      </div>
    );
  }
}
