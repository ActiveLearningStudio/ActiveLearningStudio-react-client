import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import gifLoader from 'assets/images/276.gif';
import {
  loadH5pResource,
  loadH5pResourceSettingsOpen,
} from 'store/actions/resource';

const H5PPreview = (props) => {
  const [loading, setLoading] = useState(true);

  const [resourceId, setResourceId] = useState(null);

  const {
    activityId,
    loadH5pResourceProp,
    showLtiPreview,
  } = props;

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

  const loadResource = async (activityResourceId) => {
    if (!activityResourceId) {
      return;
    }

    try {
      const response = await loadH5pResourceProp(activityResourceId);
      if (response.activity) {
        await resourceLoaded(response.activity);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const loadResourceLti = async (activityResourceId) => {
    if (!activityResourceId) {
      return;
    }

    try {
      const response = await loadH5pResourceSettingsOpen(activityResourceId);
      await resourceLoaded(response);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('resourceId: ', resourceId);
    console.log('activityId: ', activityId);
    if (resourceId !== activityId) {
      if (showLtiPreview) {
        loadResourceLti(activityId);
      } else {
        loadResource(activityId);
      }

      setResourceId(activityId);
    }
  }, [resourceId, activityId, showLtiPreview, loadResourceLti, loadResource]);

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
  activityId: PropTypes.number.isRequired,
  showLtiPreview: PropTypes.bool,
  // showActivityPreview: PropTypes.bool,
  loadH5pResourceProp: PropTypes.func.isRequired,
};

H5PPreview.defaultProps = {
  showLtiPreview: false,
  // showActivityPreview: false,
};

const mapDispatchToProps = (dispatch) => ({
  loadH5pResourceProp: (activityId) => dispatch(loadH5pResource(activityId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(H5PPreview));
