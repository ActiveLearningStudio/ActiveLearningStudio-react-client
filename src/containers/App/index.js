import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import logo from 'assets/images/logo.svg';
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

  useEffect(() => {
    const newScripts = [
      `${window.location.host}/api/storage/h5p/h5p-core/js/jquery.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-event-dispatcher.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-x-api-event.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-x-api.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-content-type.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-confirmation-dialog.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/h5p-action-bar.js`,
      `${window.location.host}/api/storage/h5p/h5p-core/js/request-queue.js`,
      `${window.location.host}/api/storage/h5p/h5p-editor/scripts/h5peditor-editor.js`,
      `${window.location.host}/api/storage/h5p/laravel-h5p/js/laravel-h5p.js`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9`,

      `${window.location.host}/api/storage/h5p/libraries/H5P.Question-1.4/scripts/question.js?ver=1.4.7`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.Question-1.4/scripts/explainer.js?ver=1.4.7`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.Question-1.4/scripts/score-points.js?ver=1.4.7`,
      `${window.location.host}/api/storage/h5p/libraries/Drop-1.0/js/drop.min.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.Transition-1.0/transition.js?ver=1.0.4`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebra3d-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebra3d-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraClassic-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraClassic-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraGeometry-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraGeometry-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraGraphing-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraGraphing-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraIM68Math-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${window.location.host}/api/storage/h5p/libraries/H5P.GeoGebraIM68Math-1.0/scripts/geogebra.js?ver=1.0.2`,

    ];

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
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

      {(!window.location.href.includes('/shared') && !window.location.href.includes('/lti') && !window.location.href.includes('/embed')) && (
        <div className="mobile-app-alert">
          <img src={logo} alt="" />

          <div className="text-description">
            <h2>CurrikiStudio</h2>

            <p>
              We are changing the way the world creates and interacts with learning content.
              Currently it is not possible to build the world&apos;s most immersive learning experiences on a mobile phone,
              tablet or iPad.  We recommend that you use either a desktop or laptop computer.
            </p>
            <p>
              If you don&apos;t already have a CurrikiStudio account
            </p>

            <a href="https://curriki.org">CLICK HERE TO LEARN MORE</a>
          </div>
        </div>
      )}
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
