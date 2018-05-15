import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser } from '../../actions/actions';
import signupPresent from './signup-presentational';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user_id: state.auth.user_id,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ signUpUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(signupPresent);
