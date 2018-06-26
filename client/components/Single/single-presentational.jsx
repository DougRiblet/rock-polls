// @flow

import React from 'react';
import { Link } from 'react-router-dom';
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
    const hop = Object.prototype.hasOwnProperty.call(this.props.allPolls, pollid);
    if (hop) {
      const { question } = this.props.allPolls[pollid];
      if (question) {
        return question;
      }
    }
    return '';
  }

  displayAnswers(pollid: string) {
    const hop = Object.prototype.hasOwnProperty.call(this.props.allPolls, pollid);
    if (hop) {
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
          return '';
        });
      }
      return '';
    }
    return '';
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
    return (
      <p className='alt-suggest'>
        Click your choice to vote. Logged-in users have a write-in option.
      </p>
    );
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
      <div className='single'>
        <div className='backlink'>
          <Link to='/'>back to polls list</Link>
        </div>
        <div className='single-body'>
          <h1>
            { this.displayQuestion(pollid) }
          </h1>
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
      </div>
    );
  }
}

