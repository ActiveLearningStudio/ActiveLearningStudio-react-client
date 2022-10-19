/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gifloader from 'assets/images/dotsloader.gif';
import { loadH5pResourceSettings } from 'store/actions/gapi';
import './styles.scss';

const reducer = (activityState, action) => {
  switch (action.type) {
    case 'SET_INTERVAL':
      return {
        ...activityState,
        intervalId: action.intervalId,
      };

      case 'ASSETS_LOADED':
        return {
          ...activityState,
          assetsLoaded: [...activityState.assetsLoaded, action.asset],
        };

      case 'CHECK_ASSETS':
        console.log('checking assets');
        if (typeof window.H5P === 'undefined' || !window.H5P.externalDispatcher) {
          console.log('H5P is not ready yet...');
          return activityState;
        }

        if (activityState.assets.length !== activityState.assetsLoaded.length) {
          console.log(`Assets not ready. ${activityState.assetsLoaded.length} of ${activityState.assets.length} loaded`);
          return activityState;
        }

        clearInterval(activityState.intervalId);
        return {
          ...activityState,
          h5pObject: window.H5P,
          intervalId: null,
        };

      case 'SET_ASSETS':
        return {
          ...activityState,
          assets: action.assets,
        };

      default:
        return activityState;
  }
};

const MsTeamsActivity = (props) => {
  const {
    activityId,
    h5pSettings,
    loadH5pSettings,
  } = props;

  // We do use it with the reducer
  /* eslint-disable-next-line no-unused-vars */
  const [activityState, dispatch] = useReducer(reducer, {
    intervalId: null,
    assets: [],
    assetsLoaded: [],
    h5pObject: null,
  });

  const loadAssets = (styles, scripts) => {
    styles.forEach((style) => {
      const link = document.createElement('link');
      link.href = style;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
    scripts.forEach((script) => {
      const element = document.createElement('script');
      element.onload = () => {
        dispatch({ type: 'ASSETS_LOADED', asset: element.src });
        console.log(`Assets loaded: ${element.src}`);
      };
      element.src = script;
      element.async = false;
      document.body.appendChild(element);
    });
  };

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(activityId);
  }, [activityId]);

  // Load H5P core
  useEffect(() => {
    if (h5pSettings === null) return;

    window.H5P = window.H5P || {};
    window.H5P.preventInit = true;
    window.H5PIntegration = h5pSettings.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = h5pSettings.h5p.embed_code.trim();

    // Load H5P assets
    const styles = h5pSettings.h5p.settings.core.styles.concat(h5pSettings.h5p.settings.loadedCss);
    const scripts = h5pSettings.h5p.settings.core.scripts.concat(h5pSettings.h5p.settings.loadedJs);
    dispatch({ type: 'SET_ASSETS', assets: scripts });
    loadAssets(styles, scripts);

    // Loops until H5P object and dispatcher are ready
    const intervalId = setInterval(() => {
      dispatch({ type: 'CHECK_ASSETS' });
    }, 500);
    dispatch({ type: 'SET_INTERVAL', intervalId });
  }, [h5pSettings]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

MsTeamsActivity.defaultProps = {
  h5pSettings: null,
};

MsTeamsActivity.propTypes = {
  activityId: PropTypes.string.isRequired,
  h5pSettings: PropTypes.object,
  loadH5pSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  h5pSettings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId, studentId, submissionId) => dispatch(loadH5pResourceSettings(activityId, studentId, submissionId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MsTeamsActivity));
