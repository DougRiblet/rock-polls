import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../../actions/actions';
import loginPresent from './login-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user_id: state.user_id,
  username: state.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logInUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(loginPresent);

