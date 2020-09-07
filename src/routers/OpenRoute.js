import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const OpenRoute = ({ component: Component, path, previewType }) => (
  <Route
    path={path}
    exact
    render={() => <Component previewType={previewType} />}
  />
);

OpenRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
  previewType: PropTypes.string.isRequired,
};

export default OpenRoute;
