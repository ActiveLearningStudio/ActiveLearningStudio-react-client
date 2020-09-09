import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const OpenRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    exact
    render={(props) => <Component {...props} {...rest} />}
  />
);

OpenRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default OpenRoute;
