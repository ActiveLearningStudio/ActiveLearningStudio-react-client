/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  id,
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
        isAuthenticated ? (
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
  isAuthenticated: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
  id: '',
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.id,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
