import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function ReqAuth(ComposedComponent) {
  // eslint-disable-next-line react/prefer-stateless-function
  class Authentication extends Component {
    render() {
      if (!this.props.authenticated) {
        return <Redirect to='/' />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
}
