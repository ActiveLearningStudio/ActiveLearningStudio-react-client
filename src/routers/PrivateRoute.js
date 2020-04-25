import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";



const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      {
        return (
          isAuthenticated ? (
            <div>
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        )
      }
    }
  />
);

const mapStateToProps = state => {
  return ({
    isAuthenticated: !!state.auth.id
  });
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));