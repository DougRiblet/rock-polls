import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../../actions/actions';
import loginPresent from './login-presentational';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logInUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(loginPresent);

