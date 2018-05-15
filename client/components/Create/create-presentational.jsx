// @flow

import React from 'react';
import randomID from 'random-id';

type Props = {
  // eslint-disable-next-line no-undef
  createNewPoll: (poll: newPoll) => mixed,
  user_id: string,
  username: string,
};

type State = {
  question: string,
  answers: Array<string>,
  preview: boolean,
};

export default class Create extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      question: '',
      answers: [],
      preview: false,
    };
    this.handleSubmitPoll = this.handleSubmitPoll.bind(this);
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.showEditMode = this.showEditMode.bind(this);
    this.showPreviewMode = this.showPreviewMode.bind(this);
    this.addAnswerField = this.addAnswerField.bind(this);
    this.initializeBlankPoll = this.initializeBlankPoll.bind(this);
  }

  componentDidMount() {
    this.initializeBlankPoll();
  }

  handleSubmitPoll: Function;
  handleChangeAnswer: Function;
  handleChangeQuestion: Function;

  // eslint-disable-next-line no-undef
  handleChangeQuestion(event: SyntheticInputEvent<*>) {
    this.setState({ question: event.target.value });
  }

  // eslint-disable-next-line no-undef
  handleChangeAnswer(event: SyntheticInputEvent<*>) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmitPoll() {
    const answersArr = this.state.answers.map(str => this.state[str]);
    const pollObj = {
      user_id: this.props.user_id,
      username: this.props.username,
      question: this.state.question,
      answers: answersArr,
    };
    this.props.createNewPoll(pollObj);
  }

  togglePreview() {
    this.setState({ preview: !this.state.preview });
  }

  initializeBlankPoll() {
    const newId1 = randomID(18);
    const newId2 = randomID(18);
    this.setState({
      answers: this.state.answers.concat(newId1).concat(newId2),
      [newId1]: '',
      [newId2]: '',
    });
  }

  addAnswerField() {
    const newId = randomID(18);
    this.setState({
      answers: this.state.answers.concat(newId),
      [newId]: '',
    });
  }

  showEditMode() {
    return (
      <div>
        <h3>Create New Poll</h3>
        <h4 className='create-label'>Question:</h4>
        <label>
          <textarea
            id='question-input'
            ref={(input) => { this.textInput = input; }}
            value={this.state.question}
            maxLength='390'
            rows='5'
            cols='90'
            onChange={this.handleChangeQuestion}
          />
        </label>
        <br />
        <h4 className='create-label'>Answers:</h4>
        { this.state.answers.map(answerId => (
          <label key={answerId}>
            <input
              className='answer-input'
              ref={(input) => { this.textInput = input; }}
              value={this.state[answerId]}
              name={answerId}
              maxLength='99'
              size='80'
              onChange={this.handleChangeAnswer}
            />
          </label>
        ))}
        <div className='create-buttons'>
          <button onClick={this.addAnswerField}>Add Answer Field</button>
          <button onClick={this.togglePreview}>Preview Poll</button>
        </div>
        <div className='show-status'>
          <p>Username: {this.props.username}</p>
          <p>User ID: {this.props.user_id}</p>
        </div>
      </div>
    );
  }

  showPreviewMode() {
    return (
      <div>
        <h3>Preview New Poll</h3>
        <div id='create-preview'>
          <h4 id='preview-question'>{this.state.question}</h4>
          <ul>
            { this.state.answers.map(str => (
              <li key={str}>{this.state[str]}</li>
            ))}
          </ul>
        </div>
        <div className='create-buttons'>
          <button onClick={this.togglePreview}>Continue Editing</button>
          <button onClick={this.handleSubmitPoll}>Submit Poll</button>
        </div>
        <div className='show-status'>
          <p>Username: {this.props.username}</p>
          <p>User ID: {this.props.user_id}</p>
        </div>
      </div>
    );
  }

  render() {
    const previewStatus = this.state.preview;
    return (
      <div id='create'>
        { previewStatus ? this.showPreviewMode() : this.showEditMode() }
      </div>
    );
  }
}
