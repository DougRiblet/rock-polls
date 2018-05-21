import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grabSinglePoll } from '../../actions/actions';
import singlePresent from './single-presentational';

const mapStateToProps = state => ({
  allPolls: state.allpolls,
  allAnswers: state.answers,
  authenticated: state.auth.authenticated,
  user_id: state.auth.user_id,
});

const mapDispatchToProps = dispatch => bindActionCreators({ grabSinglePoll }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(singlePresent);
