import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';


import { getUserAction } from 'store/actions/auth';
import AppRouter from 'routers/AppRouter';
import logo from 'assets/images/tfa-logo.png';

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
      {

        (!window.location.href.includes('/shared') && !window.location.href.includes('/lti') && !window.location.href.includes('/embed'))
         && (
          <div className="mobile-app-alert">
            <img src={logo} alt="" />
            <div className="text-description">
              {/* <h2>CurrikiStudio</h2> */}
              <p>
                We are changing the way the world creates and interacts with learning content.
                Currently it is not possible to build the world&apos;s most immersive learning experiences on a mobile phone,
                tablet or iPad.  We recommend that you use either a desktop or laptop computer.
              </p>
              {/* <p>
                If you don&apos;t already have a CurrikiStudio account
              </p>
              <a href="https://curriki.org">CLICK HERE TO LEARN MORE</a>
             */}
             </div>
          </div>
          )
      }

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