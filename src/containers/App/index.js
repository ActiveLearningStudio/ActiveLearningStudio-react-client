import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getUserAction } from 'store/actions/auth';
import AppRouter from 'routers/AppRouter';

import './style.scss';

function App(props) {
  const { getUser } = props;
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>

      <div className="need_help">Need Help ?</div>

      <AppRouter />
    </div>
  );
}

App.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (data) => dispatch(getUserAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
