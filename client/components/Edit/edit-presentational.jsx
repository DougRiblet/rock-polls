// @flow

import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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

class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      askDelete: false,
    };
    this.displayQuestion = this.displayQuestion.bind(this);
    this.displayAnswers = this.displayAnswers.bind(this);
    this.deleteForever = this.deleteForever.bind(this);
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

  deleteForever() {
    const { mypollid } = this.props.match.params;
    this.props.deletePoll(mypollid, this.props.user_id);
    this.props.history.push('/admin');
  }

  render() {
    const { mypollid } = this.props.match.params;
    return (
      <div id='edit'>
        <div className='backlink'>
          <Link to='/admin'>back to my polls</Link>
        </div>
        <h2>
          { this.displayQuestion(mypollid) }
        </h2>
        <div>
          <ul>
            { this.displayAnswers(mypollid) }
          </ul>
        </div>
        <div className='delete-button'>
          {
            this.state.askDelete
            ?
              <div>
              <p>Are you sure you wish to delete this poll? This step cannot be undone.</p>
              <p>
                <button id='cancel-delete-button' onClick={this.cancelDelete}>
                  Cancel, Keep This Poll
                </button>
                <button id='delete-forever-button' onClick={this.deleteForever}>
                  Delete This Poll Forever
                </button>
              </p>
              </div>
            :
              <p>
                <button id='ask-delete-button' onClick={this.askForDelete}>
                  Delete Poll
                </button>
              </p>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
