import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grabSinglePoll, deletePoll } from '../../actions/actions';
import editPresent from './edit-presentational';

const mapStateToProps = state => ({
  myPolls: state.mypolls,
  allAnswers: state.answers,
  authenticated: state.auth.authenticated,
  user_id: state.auth.user_id,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  grabSinglePoll,
  deletePoll,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(editPresent);
