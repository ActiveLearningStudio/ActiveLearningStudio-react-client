import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const OpenRoute = ({ component: Component, path, ...rest }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (path === '/lti-sso') return; // This route sets its own permissions

    dispatch({
      type: 'SET_ALL_PERSMISSION',
      payload: { loading: false },
    });
  });
  return (
    <Route
      path={path}
      exact
      render={(props) => <Component {...props} {...rest} />}
    />
  );
};

OpenRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  path: PropTypes.string.isRequired,
};

export default OpenRoute;
