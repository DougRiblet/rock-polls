import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createNewPoll } from '../../actions/actions';
import createPresent from './create-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user_id: state.user_id,
  username: state.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ createNewPoll }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(createPresent);

