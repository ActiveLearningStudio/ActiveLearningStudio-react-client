import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import gifLoader from 'assets/images/276.gif';
import {
  loadH5pResource,
  loadH5pResourceSettingsOpen,
  loadH5pResourceSettingsShared,
  loadH5pResourceXapi,
} from 'store/actions/resource';
import * as xAPIHelper from 'helpers/xapi';

let counter = 0;

const H5PPreview = (props) => {
  const [loading, setLoading] = useState(true);

  const [resourceId, setResourceId] = useState(null);

  const {
    activityId,
    loadH5pResourceProp,
    showLtiPreview,
    showActivityPreview,
  } = props;

  const dispatch = useDispatch();

  const resourceLoaded = async (data) => {
    window.H5PIntegration = data.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = data.h5p.embed_code.trim();
    const newCss = data.h5p.settings.core.styles.concat(
      data.h5p.settings.loadedCss,
    );

    await Promise.all(
      newCss.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      }),
    );

    const newScripts = data.h5p.settings.core.scripts.concat(
      data.h5p.settings.loadedJs,
    );

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });

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
              await resourceLoaded(response.h5p_activity);
            }
          } else if (showActivityPreview) {
            const response = await loadH5pResourceSettingsShared(activityId);
            if (response.activity) {
              await resourceLoaded(response.activity);
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

        const checkXapi = setInterval(() => {
          try {
            const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
            if (x.H5P) {
              if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(props.match.path)) {
                // eslint-disable-next-line no-use-before-define
                stopXapi();

                x.H5P.externalDispatcher.on('xAPI', (event) => {
                  if (counter > 0) {
                    dispatch(loadH5pResourceXapi(JSON.stringify(xAPIHelper.extendStatement(event.data.statement, { ...props }))));
                  }
                  counter += 1;
                });
              }
            }
          } catch (e) {
            console.log(e);
          }
        });

        const stopXapi = () => clearInterval(checkXapi);
      };

      loadResource();

      setResourceId(activityId);
    }
  }, [resourceId, activityId, showLtiPreview, showActivityPreview, loadH5pResourceProp]);

  return (
    <>
      {!loading ? (
        <div id="curriki-h5p-wrapper">
          <div className="loader_gif" style={{ color: 'black' }}>
            Unable to Load Activity
          </div>
        </div>
      ) : (
        <div id="curriki-h5p-wrapper">
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
