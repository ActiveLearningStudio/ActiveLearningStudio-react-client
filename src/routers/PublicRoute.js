import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  path,
  ...rest
}) => (
  <Route
    {...rest}
    path={path}
    render={(props) => (
      isAuthenticated ? (
        <Redirect to="/studio" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    )}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.user,
});

export default withRouter(connect(mapStateToProps, null)(PublicRoute));
