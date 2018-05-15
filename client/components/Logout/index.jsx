import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../actions/actions';
import logoutPresent from './logout-presentational';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  user_id: state.auth.user_id,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logOutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(logoutPresent);
