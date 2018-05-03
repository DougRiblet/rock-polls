import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../../actions/actions';
import loginPresent from './login-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logInUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(loginPresent);

