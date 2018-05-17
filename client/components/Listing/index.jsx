import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { grabAllPolls } from '../../actions/actions';
import listingPresent from './listing-presentational';

const mapStateToProps = state => ({
  allPolls: state.allpolls,
});

const mapDispatchToProps = dispatch => bindActionCreators({ grabAllPolls }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(listingPresent);

