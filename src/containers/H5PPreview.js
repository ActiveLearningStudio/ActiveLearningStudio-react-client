/* eslint-disable */
import React, { useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import gifLoader from 'assets/images/276.gif';
import { loadH5pResource, loadH5pResourceSettingsOpen, loadH5pResourceSettingsShared, loadH5pResourceXapi } from 'store/actions/resource';
import videoServices from 'services/videos.services';
import indServices from 'services/indActivities.service';
import * as xAPIHelper from 'helpers/xapi';
import useH5PPreviewResizer from '../helpers/useH5PPreviewResizer';

let counter = 0;

const H5PPreview = (props) => {
  const [loading, setLoading] = useState(true);
  const { activeOrganization } = useSelector((state) => state.organization);
  const [resourceId, setResourceId] = useState(null);
  const currikiH5PWrapper = useRef(null);
  const adjustedWidth = useH5PPreviewResizer(currikiH5PWrapper);
  const { activityId, loadH5pResourceProp, showLtiPreview, showActivityPreview, showvideoH5p, activities } = props;
  const initialActivityState = {
    intervalId: null,
    assets: [],
    assetsLoaded: [],
    h5pObject: null,
  };

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
      case 'RESET_STATE':
        return initialActivityState;
      default:
        return activityState;
    }
  };

  // We do use it with the reducer
  /* eslint-disable-next-line no-unused-vars */
  const [activityState, dispatch] = useReducer(reducer, initialActivityState);

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

  const resourceLoaded = async (data) => {
    window.H5P = window.H5P || {};
    window.H5P.preventInit = true;
    window.H5PIntegration = data.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = data.h5p.embed_code.trim();
    const newStyles = data.h5p.settings.core.styles.concat(data.h5p.settings.loadedCss);
    const newScripts = data.h5p.settings.core.scripts.concat(data.h5p.settings.loadedJs);

    // Load H5P assets
    dispatch({ type: 'SET_ASSETS', assets: newScripts });
    loadAssets(newStyles, newScripts);

    // Loops until H5P object and dispatcher are ready
    const intervalId = setInterval(() => {
      dispatch({ type: 'CHECK_ASSETS' });
    }, 500);
    dispatch({ type: 'SET_INTERVAL', intervalId });
    setLoading(false);
  };

  useEffect(() => {
    if (resourceId !== activityId) {
      const h5pIFrame = document.getElementsByClassName('h5p-iframe');
      if (h5pIFrame.length) {
        h5pIFrame[0].remove();
      }

      if (activityId === null || activityId === undefined) {
        return;
      }

      const loadResource = async () => {
        try {
          if (showLtiPreview) {
            const response = await loadH5pResourceSettingsOpen(activityId);
            if (response.h5p_activity) {
              window.brightcoveAccountId = response.h5p_activity?.brightcoveData?.accountId;
              await resourceLoaded(response.h5p_activity);
            }
          } else if (showActivityPreview) {
            const response = await loadH5pResourceSettingsShared(activityId);
            if (response.activity) {
              await resourceLoaded(response.activity);
            }
          } else if (showvideoH5p) {
            if (activities) {
              const response = await indServices.renderh5pIndependent(activeOrganization.id, activityId);
              if (response?.['independent-activity']?.brightcoveData) {
                window.brightcoveAccountId = response.activity?.brightcoveData?.accountId;
              }
              if (response?.['independent-activity']) {
                await resourceLoaded(response['independent-activity']);
              }
            } else {
              const response = await videoServices.renderh5pvideo(activeOrganization.id, activityId);
              if (response.activity?.brightcoveData) {
                window.brightcoveAccountId = response.activity?.brightcoveData?.accountId;
              }
              if (response.activity) {
                await resourceLoaded(response.activity);
              }
            }
          } else {
            const response = await loadH5pResourceProp(activityId);
            if (response.activity) {
              await resourceLoaded(response.activity);
            }
          }
        } catch (e) {
          setLoading(false);
        }
      };

      dispatch({ type: 'RESET_STATE' });
      loadResource();

      setResourceId(activityId);
    }
  }, [resourceId, activityId, showLtiPreview, showActivityPreview, loadH5pResourceProp]);

  // Init h5p Object once it is ready
  useEffect(() => {
    if (!activityState.h5pObject) {
      console.log('H5P object not ready');
      return;
    }
    if (activityState.h5pObject.externalDispatcher && xAPIHelper.isxAPINeeded(props.match.path)) {
      // eslint-disable-next-line no-use-before-define
      activityState.h5pObject.externalDispatcher.on('xAPI', (event) => {
        if (event.ignoreStatement) {
          return;
        }
        if (counter > 0) {
          dispatch(loadH5pResourceXapi(JSON.stringify(xAPIHelper.extendStatement(event.data.statement, { ...props }))));
        }
        counter += 1;
      });
    }
    activityState.h5pObject.init();
  }, [activityState.h5pObject]);

  useEffect(() => {
    const h5pLibData = activityState.h5pObject && window.H5PIntegration ? Object.values(window.H5PIntegration.contents) : null;
    const h5pLib = Array.isArray(h5pLibData) && h5pLibData.length > 0 ? h5pLibData[0].library.split(' ')[0] : null;
    const resizeFor = ['H5P.InteractiveVideo', 'H5P.CurrikiInteractiveVideo', 'H5P.BrightcoveInteractiveVideo'];
    const isActvityResizeable = resizeFor.find((lib) => lib === h5pLib) ? true : false;

    if (currikiH5PWrapper && currikiH5PWrapper.current && isActvityResizeable) {
      const aspectRatio = 1.778; // standard aspect ratio of video width and height
      const currentHeight = currikiH5PWrapper.current.offsetHeight - 65; // current height with some margin
      const adjustedWidthVal = currentHeight * aspectRatio;
      const parentWidth = currikiH5PWrapper.current.parentElement.offsetWidth;
      if (adjustedWidthVal < parentWidth) {
        currikiH5PWrapper.current.style.width = `${adjustedWidthVal}px`; // eslint-disable-line no-param-reassign
      } else {
        currikiH5PWrapper.current.style.width = `${parentWidth - 10}px`; // eslint-disable-line no-param-reassign
      }
    }
  }, [currikiH5PWrapper, activityState.h5pObject]);

  return (
    <>
      {!loading ? (
        <div
          id="curriki-h5p-wrapper"
          ref={(el) => {
            if (el) {
              currikiH5PWrapper.current = el;
            }
          }}
          className="interactivevideoreferce"
        >
          <div className="loader_gif" style={{ color: 'black' }}>
            Unable to Load Activity
          </div>
        </div>
      ) : (
        <div
          id="curriki-h5p-wrapper"
          ref={(el) => {
            if (el) {
              currikiH5PWrapper.current = el;
            }
          }}
        >
          <div className="loader_gif">
            <img src={gifLoader} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

H5PPreview.propTypes = {
  match: PropTypes.shape({ path: PropTypes.string }),
  activityId: PropTypes.number.isRequired,
  showLtiPreview: PropTypes.bool,
  showActivityPreview: PropTypes.bool,
  loadH5pResourceProp: PropTypes.func.isRequired,
};

H5PPreview.defaultProps = {
  showLtiPreview: false,
  showActivityPreview: false,
  match: PropTypes.shape({ path: PropTypes.string }),
};

const mapDispatchToProps = (dispatch) => ({
  loadH5pResourceProp: (activityId) => dispatch(loadH5pResource(activityId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
  parentPlaylist: state.playlist.selectedPlaylist,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PPreview));
