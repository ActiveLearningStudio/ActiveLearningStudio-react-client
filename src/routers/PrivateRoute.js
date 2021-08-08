/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

import SubscribePage from 'containers/Auth/SubscribePage';

const PrivateRoute = ({
  component: Component,
  id,
  isLoading,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      let newId = id;
      if (props.match.params.activityId) {
        newId = props.match.params.activityId;
      } else if (props.match.params.playlistId) {
        newId = props.match.params.playlistId;
      } else if (props.match.params.projectId) {
        newId = props.match.params.projectId;
      }

      if (!isLoading && !isAuthenticated) {
        return (
          <Redirect to="/studio/login" />
        );
      }

      if (user && !user.subscribed) {
        return (
          <SubscribePage />
        );
      }

      return (
        <Component {...props} {...rest} key={newId} />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  id: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

PrivateRoute.defaultProps = {
  id: '',
  user: null,
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: !!state.auth.user,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
