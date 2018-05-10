import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../actions/actions';
import logoutPresent from './logout-presentational';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
  user_id: state.user_id,
  username: state.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logOutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(logoutPresent);
