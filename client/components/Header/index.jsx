import { connect } from 'react-redux';
import headerPresent from './header-presentational';

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(headerPresent);
