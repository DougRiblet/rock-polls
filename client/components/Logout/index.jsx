import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOutUser } from '../../actions/actions';
import logoutPresent from './logout-presentational';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logOutUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(logoutPresent);
