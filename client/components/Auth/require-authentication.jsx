import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function ReqAuth(ComposedComponent) {
  const Authentication = () => {
    if (!this.props.authenticated) {
      return <Redirect to='/' />;
    }
    return <ComposedComponent {...this.props} />;
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
}
