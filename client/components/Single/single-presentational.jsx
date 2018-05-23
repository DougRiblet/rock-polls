// @flow

import React from 'react';
import AnswerItemVote from './answer-item-vote';
import AltAnswerForm from './alt-answer-form';

type Props = {
  castVote: (answerId) => mixed,
  grabSinglePoll: (pollId) => mixed,
  addAltAnswer: (pollId, answer, user_id) => mixed,
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
  this.displayAlt = this.displayAlt.bind(this);
  this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.props.grabSinglePoll(this.props.match.params.pollid);
  }

  displayQuestion(pollid) {
    if (this.props.allPolls[pollid].question) {
      return this.props.allPolls[pollid].question;
    }
    return '';
  }

  displayAnswers(pollid) {
    const answers = this.props.allPolls[pollid].answers;
    if (answers) {
      return answers.map(aId => {
        const aInfo = this.props.allAnswers[aId];
        return <AnswerItemVote
            key={aId}
            aId={aId}
            aInfo={aInfo}
            handleVote={this.handleVote}
          />
      });
    }
    return <li></li>
  }

  displayAlt(pollid) {
    if (this.props.authenticated) {
      return <AltAnswerForm
        handleAlt={this.handleAlt}
        pollid={pollid}
        />
    }
    return <p>Don't like these options? Login or signup to add your own answer.</p>;
  }

  handleAlt(pollId, answerText) {
    this.props.addAltAnswer(pollId, answerText, this.props.user_id);
  }

  handleVote(answerid) {
    this.props.castVote(answerid);
    this.setState({ hasVoted: true });
  }

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
        <div>
          { this.displayAlt(pollid) }
        </div>
      </div>
    );
  }
}

