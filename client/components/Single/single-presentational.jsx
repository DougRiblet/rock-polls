// @flow

import React from 'react';
import AnswerItemVote from './answer-item-vote';
import AltAnswerForm from './alt-answer-form';
import DisplayResults from './display-results';

type Props = {
  castVote: (string) => mixed,
  grabSinglePoll: (string) => mixed,
  addAltAnswer: (string, string, string) => mixed,
  authenticated: boolean,
  user_id: string,
  allPolls: Object,
  allAnswers: Object,
  match: Object,
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
    this.handleAlt = this.handleAlt.bind(this);
  }

  componentDidMount() {
    this.props.grabSinglePoll(this.props.match.params.pollid);
  }

  displayQuestion(pollid: string) {
    if (this.props.allPolls[pollid].question) {
      return this.props.allPolls[pollid].question;
    }
    return '';
  }

  displayAnswers(pollid: string) {
    const { answers } = this.props.allPolls[pollid];
    if (answers) {
      return answers.map((aId) => {
        const aInfo = this.props.allAnswers[aId];
        if (aInfo) {
          return (
            <AnswerItemVote
              key={aId}
              aId={aId}
              aInfo={aInfo}
              handleVote={this.handleVote}
            />
          );
        }
      });
    }
  }

  displayAlt(pollid: string) {
    if (this.props.authenticated) {
      return (
        <AltAnswerForm
          handleAlt={this.handleAlt}
          pollid={pollid}
        />
      );
    }
    return <p>Login or signup to add your own answer.</p>;
  }

  handleAlt(pollId: string, answerText: string) {
    this.props.addAltAnswer(pollId, answerText, this.props.user_id);
  }

  handleVote(answerid: string) {
    this.props.castVote(answerid);
    this.setState({ hasVoted: true });
  }

  render() {
    const { pollid } = this.props.match.params;
    return (
      <div id='single'>
        <h2>
          { this.displayQuestion(pollid) }
        </h2>
        {
          this.state.hasVoted
          ?
            <div>
              <DisplayResults
                pollid={pollid}
                allPolls={this.props.allPolls}
                allAnswers={this.props.allAnswers}
              />
            </div>
          :
            <div>
              <ul>
                { this.displayAnswers(pollid) }
              </ul>
              <div>
                { this.displayAlt(pollid) }
              </div>
            </div>
        }
      </div>
    );
  }
}

