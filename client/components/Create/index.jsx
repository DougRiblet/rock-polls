import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewPoll } from '../../actions/actions';
import createPresent from './create-presentational';

const mapStateToProps = state => ({
  user_id: state.auth.user_id,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ createNewPoll }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(createPresent);
