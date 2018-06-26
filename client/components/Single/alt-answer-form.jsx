// @flow

import React from 'react';

type Props = {
  handleAlt: (string, string) => mixed,
  pollid: string,
};

type State = {
  answer: string,
};

export default class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      answer: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit: Function;
  handleChange: Function;

  // eslint-disable-next-line no-undef
  handleChange(event: SyntheticInputEvent<*>) {
    this.setState({ answer: event.target.value });
  }

  // eslint-disable-next-line no-undef
  handleSubmit(event: SyntheticInputEvent<*>) {
    event.preventDefault();
    this.props.handleAlt(this.props.pollid, this.state.answer);
    this.setState({ answer: '' });
  }

  render() {
    return (
      <div id='alt-answer'>
        <p className='alt-suggest'>
          Click your choice to vote, or use the write-in ballot below.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              id='alt-input'
              type='text'
              value={this.state.answer}
              maxLength='99'
              size='80'
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
}
