// @flow

import React from 'react';

type Props = {
  grabAllPolls: () => mixed,
  allPolls: Object,
};

export default class Listing extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.showLoading = this.showLoading.bind(this);
    this.showListing = this.showListing.bind(this);
  }

  componentDidMount(){
    this.props.grabAllPolls();
  }

  showLoading(){
    return <p className='loading'>L O A D I N G</p>
  }

  showListing(allPolls){
    let polls = [];
    for (let key in allPolls) {
      let obj = allPolls[key];
      obj.id = key;
      polls.push(obj);
    }
    return polls
      .sort((a, b)=> new Date(b.date) - new Date(a.date))
      .map(p => <li key={p.id}>{p.question}</li>);
  }

  render() {
    if (!this.props.allPolls || !Object.keys(this.props.allPolls).length) {
      return (
        <div id='show-all-polls'>
          { this.showLoading() }
        </div>
      )
    }

    return (
      <div id='show-all-polls'>
        <ul>
          { this.showListing(this.props.allPolls) }
        </ul>
      </div>
    );
  }
}
