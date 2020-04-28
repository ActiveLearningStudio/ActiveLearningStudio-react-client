import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";



const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <div>
            <Component {...props} />
          </div>
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

export default withRouter(connect(mapStateToProps,null)(PublicRoute));
