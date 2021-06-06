/* eslint-disable react/no-this-in-sfc */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gifloader from 'assets/images/dotsloader.gif';
import { loadH5PSettingsAction } from 'store/actions/LMS/genericLMS';
import './style.scss';

const Activity = (props) => {
  const {
    activityId,
    h5pSettings,
    loadH5pSettings,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(activityId);
  }, [activityId]);

  // Load H5P
  useEffect(() => {
    if (h5pSettings === null) return;

    window.H5PIntegration = h5pSettings.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = h5pSettings.h5p.embed_code.trim();
    const newCss = h5pSettings.h5p.settings.core.styles.concat(
      h5pSettings.h5p.settings.loadedCss,
    );

    Promise.all(
      newCss.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      }),
    );

    const newScripts = h5pSettings.h5p.settings.core.scripts.concat(
      h5pSettings.h5p.settings.loadedJs,
    );

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  }, [h5pSettings]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

Activity.propTypes = {
  activityId: PropTypes.string.isRequired,
  h5pSettings: PropTypes.object.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  h5pSettings: state.genericLMS.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId) => dispatch(loadH5PSettingsAction(activityId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
