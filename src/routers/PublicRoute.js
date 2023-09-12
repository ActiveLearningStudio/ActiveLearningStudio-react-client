/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (
        !window.location.pathname?.includes("admin-login") &&
        window.location?.host?.includes("my.currikistudio.org")
      ) {
        window.location.replace(
          "https://studio.frameworkconsulting.com"
        );
      }

      if (isAuthenticated) {
        window.location.replace("/org/");
      } else {
        return (
          <div>
            <Component {...props} />
          </div>
        );
      }
    }}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.user,
});

export default withRouter(
  connect(mapStateToProps, null)(PublicRoute)
);
