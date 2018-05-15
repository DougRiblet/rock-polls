import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser } from '../../actions/actions';
import signupPresent from './signup-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user_id: state.user_id,
  username: state.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signUpUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(signupPresent);
