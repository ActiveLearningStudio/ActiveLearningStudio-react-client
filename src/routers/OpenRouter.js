import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const OpenRouter = ({ component: Component, path, previewType }) => (
  <Route
    path={path}
    exact
    render={() => <Component previewType={previewType} />}
  />
);

OpenRouter.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
  previewType: PropTypes.string.isRequired,
};

export default OpenRouter;
