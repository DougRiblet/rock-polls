import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grabSinglePoll, castVote, addAltAnswer } from '../../actions/actions';
import singlePresent from './single-presentational';

const mapStateToProps = state => ({
  allPolls: state.allpolls,
  allAnswers: state.answers,
  authenticated: state.auth.authenticated,
  user_id: state.auth.user_id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  grabSinglePoll,
  castVote,
  addAltAnswer,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(singlePresent);
