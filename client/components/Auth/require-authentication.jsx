import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.contextTypes = {
    router: PropTypes.object,
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
}
