// @flow

import React from 'react';

type Props = {
  castVote: (answerId) => mixed,
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
  this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.props.grabSinglePoll(this.props.match.params.pollid);
  }




}

