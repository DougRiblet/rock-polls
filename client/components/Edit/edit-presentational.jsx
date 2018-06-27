// @flow

import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {Bar} from 'react-chartjs-2';

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
    const hop = Object.prototype.hasOwnProperty.call(this.props.myPolls, pollid);
    if (hop) {
      return this.props.myPolls[pollid].question;
    }
    return '';
  }

  displayAnswers(pollid: string) {
    const hop = Object.prototype.hasOwnProperty.call(this.props.myPolls, pollid);
    if (hop) {
      const { answers } = this.props.myPolls[pollid];
      if (answers) {
        return answers.map((aId) => {
          const aInfo = this.props.allAnswers[aId];
          if (aInfo) {
            return (
              <li key={aId}>{ aInfo.answer }</li>
            );
          }
          return '';
        });
      }
      return '';
    }
    return '';
  }

  displayChart(pollid: string) {
    const allAns = this.props.allAnswers;
    const hop = Object.prototype.hasOwnProperty.call(this.props.myPolls, pollid);
    if (hop) {
      const { answers } = this.props.myPolls[pollid];
      if (answers) {
        const answerList = answers.map(function(aId){
          const ahop = Object.prototype.hasOwnProperty.call(allAns, aId);
          if (ahop) {
            const aInfo = allAns[aId];
            if (aInfo) {
              return {
                answer: aInfo.answer,
                count: aInfo.count,
              };
            }
          }
          return null;
        }).filter(x => x).sort((j, k) => k.count > j.count);
        console.log('### ANSWER LIST: ', answerList);
        const answerLabels = [];
        const countData = [];
        answerList.forEach(function(ans){
          answerLabels.push(ans.answer);
          countData.push(ans.count);
        });
        const dataProp = {
          labels: answerLabels,
          datasets: [{
            label: "Poll Results",
            backgroundColor: '#2E8B57',
            borderColor: '#2E8B57',
            data: countData,
          }],
        };
        return <Bar data={dataProp} />;
      }
      return <p></p>;
    }
    return <p></p>;
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
      <div className='single'>
        <div className='backlink'>
          <Link to='/admin'>back to my polls</Link>
        </div>
        <div className='single-body'>
          <h2>
            { this.displayQuestion(mypollid) }
          </h2>
          <div>
              { this.displayChart(mypollid) }
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
                  <div>
                    <p>
                      <button id='ask-delete-button' onClick={this.askForDelete}>
                        Delete Poll
                      </button>
                    </p>
                  </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Edit);
