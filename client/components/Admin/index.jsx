import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grabMyPolls } from '../../actions/actions';
import adminPresent from './admin-presentational';

const mapStateToProps = state => ({
  user_id: state.auth.user_id,
  username: state.auth.username,
});

const mapDispatchToProps = dispatch => bindActionCreators({ grabMyPolls }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(adminPresent);

