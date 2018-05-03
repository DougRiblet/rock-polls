import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignUpUser } from '../../actions/actions';
import signupPresent from './signup-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ SignUpUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(signupPresent);

