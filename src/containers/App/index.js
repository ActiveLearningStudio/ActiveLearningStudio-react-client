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

  useEffect(() => {
    if (window.HubSpotConversations) {
      // console.log('The api is ready already');
    } else {
      window.hsConversationsOnReady = [
        () => {
          // console.log('Now the api is ready');
          window.HubSpotConversations.widget.load();
        },
      ];
    }
  }, []);

  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />

        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={`//js.hs-scripts.com/${process.env.REACT_APP_HUBSPOT}.js`}
        />
      </Helmet>

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
