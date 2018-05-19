// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { grabAllPolls } from '../../actions/actions';
// import singlePresent from './single-presentational';

// const mapStateToProps = state => ({
//   allPolls: state.allpolls,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({ grabAllPolls }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(singlePresent);

import React from 'react';

const Single = ({ match }) => (
  <div>
    <h2>## SINGLE POLL: { match.params.pollid }</h2>
  </div>
);

export default Single;
