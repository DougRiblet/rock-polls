// @flow

import React from 'react';

type Props = {
  grabSinglePoll: (string) => mixed,
  deletePoll: (string, string) => mixed,
  authenticated: boolean,
  user_id: string,
  myPolls: Object,
  allAnswers: Object,
  match: Object,
};

type State = {
  askDelete: boolean,
};

export default class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      askDelete: false,
    };
    this.displayQuestion = this.displayQuestion.bind(this);
    this.displayAnswers = this.displayAnswers.bind(this);
    this.askForDelete = this.askForDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
  }

  componentDidMount() {
    this.props.grabSinglePoll(this.props.match.params.mypollid);
  }

  displayQuestion(pollid: string) {
    if (this.props.myPolls[pollid]) {
      return this.props.myPolls[pollid].question;
    }
    return '';
  }

  displayAnswers(pollid: string) {
    if (this.props.myPolls[pollid]) {
      const { answers } = this.props.myPolls[pollid];
      if (answers) {
        return answers.map((aId) => {
          const aInfo = this.props.allAnswers[aId];
          if (aInfo) {
            return (
              <li key={ aId }>{ aInfo.answer }</li>
            );
          }
        });
      }
    }
  }

  askForDelete() {
    this.setState({ askDelete: true });
  }

  cancelDelete() {
    this.setState({ askDelete: false });
  }

  render() {
    const { mypollid } = this.props.match.params;
    return (
      <div id='single'>
        <h2>
          { this.displayQuestion(mypollid) }
        </h2>
        <div>
          <ul>
            { this.displayAnswers(mypollid) }
          </ul>
        </div>
        <div className='delete-button'>
          <button onClick={this.askForDelete}>Delete Poll</button>
          <button onClick={this.cancelDelete}>Cancel Delete</button>
        </div>
      </div>
    );
  }
}

