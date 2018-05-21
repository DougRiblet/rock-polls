// @flow

import React from 'react';

type Props = {
  // castVote: (answerId) => mixed,
  grabSinglePoll: (pollId) => mixed,
  authenticated: boolean,
  user_id: string,
  allPolls: Object,
  allAnswers: Object,
};

type State = {
  hasVoted: boolean,
};

export default class Single extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasVoted: false,
    };
  this.displayQuestion = this.displayQuestion.bind(this);
  this.displayAnswers = this.displayAnswers.bind(this);
  // this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.props.grabSinglePoll(this.props.match.params.pollid);
  }

  displayQuestion(pollid) {
    return this.props.allPolls[pollid].question;
  }

  displayAnswers(pollid) {
    const answers = this.props.allPolls[pollid].answers;
    if (answers) {
      return answers.map(answerId => {
        const a = this.props.allAnswers[answerId];
        return <li key={answerId} name={answerId}>{ a.answer }</li>;
      });
    }
    return <li></li>
  }

  // handleVote() {

  // }

  render() {
    const pollid = this.props.match.params.pollid;
    return (
      <div id='single'>
        <h2>
          { this.displayQuestion(pollid) }
        </h2>
        <ul>
          { this.displayAnswers(pollid) }
        </ul>

      </div>
    );
  }
}

