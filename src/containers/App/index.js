import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import logo from 'assets/images/logo.svg';
import { getUserAction } from 'store/actions/auth';
import { cloneDuplicationRequest } from 'store/actions/notification';
import AppRouter from 'routers/AppRouter';

import './style.scss';

function App(props) {
  const dispatch = useDispatch();
  const { getUser } = props;

  const userDetails = useSelector((state) => state.auth.user);
  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (userDetails) {
      dispatch(cloneDuplicationRequest(userDetails.id));
    }
  }, [dispatch, userDetails]);

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
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/jquery.js`,
      // `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-event-dispatcher.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-x-api-event.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-x-api.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-content-type.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-confirmation-dialog.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/h5p-action-bar.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-core/js/request-queue.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/h5p-editor/scripts/h5peditor-editor.js`,
      // `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/laravel-h5p/js/laravel-h5p.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9`,

      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.Question-1.4/scripts/question.js?ver=1.4.7`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.Question-1.4/scripts/explainer.js?ver=1.4.7`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.Question-1.4/scripts/score-points.js?ver=1.4.7`,
      // `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/Drop-1.0/js/drop.min.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.Transition-1.0/transition.js?ver=1.0.4`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?ver=1.3.9`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebra3d-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebra3d-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraClassic-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraClassic-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraGeometry-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraGeometry-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraGraphing-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraGraphing-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraIM68Math-1.0/scripts/deployggb.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.GeoGebraIM68Math-1.0/scripts/geogebra.js?ver=1.0.2`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.DocumentsUpload-1.0/scripts/DocumentsUpload.js`,
      `${process.env.REACT_APP_RESOURCE_URL}/storage/h5p/libraries/H5P.MemoryGame-1.3/memory-game.js?ver=1.3.5`,
      'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=TeX-MML-AM_CHTML',
    ];

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  }, []);
  useEffect(() => {
    function myStopFunction() {
      // eslint-disable-next-line no-use-before-define
      clearTimeout(timerMath);
    }

    const timerMath = setInterval(() => {
      try {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        myStopFunction();
      } catch (e) {
        console.log(e);
      }
    }, 1000);
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

          <a className="reg-btn" href="/register">CLICK HERE TO REGISTER</a>
          <br />
          <p>
            To learn more click here
            <a href="https://curriki.org"> curriki</a>
          </p>
        </div>
      </div>
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
