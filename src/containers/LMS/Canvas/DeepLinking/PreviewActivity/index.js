import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { closePreviewAction, getH5pSettingsAction } from 'store/actions/canvas';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import './style.scss';

const PreviewActivity = (props) => {
  const {
    activity,
    closePreview,
    h5pSettings,
    getH5pSettings,
    match,
  } = props;

  // Init
  useEffect(() => {
    getH5pSettings(activity.id);
  }, [activity]);

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

  const addToLMS = () => {
    const finalUrl = `${decodeURIComponent(
      match.params.redirectUrl,
    )}&title=${encodeURIComponent(activity.title)}&entity=activity&id=${
      activity.id
    }`;
    Swal.fire({
      html: `You have selected <strong>Activity: ${activity.title}</strong><br>Do you want to continue ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        window.location.href = finalUrl;
      }
    });
  };

  return (
    <div className="activity-wrapper mt-2">
      <div className="row mb-2">
        <div className="col">
          <h2>
            {`Previewing: ${activity.title}`}
          </h2>
        </div>
        <div className="col text-right">
          <button type="button" className="btn close-preview-button m-1" onClick={addToLMS}>Add to Course</button>
          <button type="button" className="btn close-preview-button m-1" onClick={closePreview}>Close Preview</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {h5pSettings === null && (
            <div className="loader_gif">
              <img style={{ width: '50px' }} src={gifloader} alt="" />
            </div>
          )}
          {h5pSettings !== null && (
            <div id="curriki-h5p-wrapper" />
          )}
        </div>
      </div>
    </div>
  );
};

PreviewActivity.defaultProps = {
  h5pSettings: null,
};

PreviewActivity.propTypes = {
  activity: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object,
  getH5pSettings: PropTypes.func.isRequired,
  closePreview: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  activity: state.canvas.searchPreviewActivity,
  h5pSettings: state.canvas.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  closePreview: () => dispatch(closePreviewAction()),
  getH5pSettings: (id) => dispatch(getH5pSettingsAction(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreviewActivity));
