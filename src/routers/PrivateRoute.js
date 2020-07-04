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
      if (props.match.params.resourceid) {
        newId = props.match.params.resourceid;
      } else if (props.match.params.playlistid) {
        newId = props.match.params.playlistid;
      } else if (props.match.params.projectid) {
        newId = props.match.params.projectid;
      }

      return (
        isAuthenticated ? (
          <div>
            <Component {...props} {...rest} key={newId} />
          </div>
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
