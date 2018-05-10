// @flow

import React from 'react';

type Props = {
  // eslint-disable-next-line no-undef
  createNewPoll: (poll: newPoll) => mixed,
  user_id: string,
  username: string,
};

type State = {
  question: string,
  answers: Array<string>,
};

export default class Create extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      question: '',
      answers: [],
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
    const pollObj = {
      user_id: this.props.user_id,
      username: this.props.username,
      question: this.state.question,
      answers: this.state.answers,
    }
    this.props.createNewPoll(pollObj);
  }

  render() {
    return (
      <div id='create'>
        <h3>Create New Poll</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Question:
            <input
            />
          </label>
          <br />
          <label>
            Answers:
            <input
            />
          </label>
          <br />
          <input type='submit' value='submit' />
        </form>
        <div className='show-status'>
          <p>Username: {this.props.username}</p>
          <p>User ID: {this.props.user_id}</p>
        </div>
      </div>
    );
  }
}
