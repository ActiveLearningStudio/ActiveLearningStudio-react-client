/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  id,
  isLoading,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      let newId = id;
      if (props.match.params.resourceId) {
        newId = props.match.params.resourceId;
      } else if (props.match.params.playlistId) {
        newId = props.match.params.playlistId;
      } else if (props.match.params.projectId) {
        newId = props.match.params.projectId;
      }

      return (
        (isLoading || isAuthenticated) ? (
          <Component {...props} {...rest} key={newId} />
        ) : (
          <Redirect to="/login" />
        )
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
};

PrivateRoute.defaultProps = {
  id: '',
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: !!state.auth.user,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
