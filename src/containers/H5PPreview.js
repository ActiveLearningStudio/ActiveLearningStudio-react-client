import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import gifloader from 'assets/images/276.gif';
import {
  loadH5pResourceSettings,
  loadH5pResourceSettingsOpen,
  loadH5pResourceSettingsShared,
} from 'store/actions/resource';

// TODO: need to convert to functional component
// move API call to service
class H5PPreview extends React.Component {
  constructor(props) {
    super(props);

    this.h5pLib = props.resource.editor; // "H5P.Audio 1.4";

    this.state = {
      shared: true,
    };
  }

  componentDidMount() {
    const { activityId, showLtiPreview, showActivityPreview } = this.props;

    if (showLtiPreview) {
      this.loadResourceLti(activityId);
    } else if (showActivityPreview) {
      this.loadResourceActivity(activityId);
    } else {
      this.loadResource(activityId);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { activityId, showLtiPreview, showActivityPreview } = this.props;
    if (activityId !== props.activityId) {
      const h5pIFrame = document.getElementsByClassName('h5p-iframe');
      if (h5pIFrame.length) {
        h5pIFrame[0].remove();
      }

      if (showLtiPreview) {
        this.loadResourceLti(props.activityId);
      } else if (showActivityPreview) {
        this.loadResourceActivity(props.activityId);
      } else {
        this.loadResource(props.activityId);
      }
    }
  }

  loadResource = async (activityId) => {
    if (activityId === 0) {
      return;
    }

    try {
      const response = await loadH5pResourceSettings(activityId);
      await this.resourceLoaded(response);
    } catch (e) {
      this.setState({
        shared: false,
      });
    }
  };

  loadResourceLti = async (activityId) => {
    if (activityId === 0) {
      return;
    }

    try {
      const response = await loadH5pResourceSettingsOpen(activityId);
      await this.resourceLoaded(response);
    } catch (e) {
      this.setState({
        shared: false,
      });
    }
  };

  loadResourceActivity = async (activityId) => {
    if (activityId === 0) {
      return;
    }

    try {
      const response = await loadH5pResourceSettingsShared(activityId);
      await this.resourceLoaded(response);
    } catch (e) {
      this.setState({
        shared: false,
      });
    }
  };

  resourceLoaded = async (response) => {
    window.H5PIntegration = response.data.data.h5p.settings;

    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = response.data.data.h5p.embed_code.trim();

    await Promise.all(
      response.data.data.h5p.settings.loadedCss.forEach((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }),
    );

    const newScripts = response.data.data.h5p.settings.core.scripts.concat(
      response.data.data.h5p.settings.loadedJs,
    );

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  };

  render() {
    const { shared } = this.state;
    return (
      <>
        {!shared ? (
          <div id="curriki-h5p-wrapper">
            <div className="loader_gif" style={{ color: 'black' }}>
              Activity Resource is not sharable
            </div>
          </div>
        ) : (
          <div id="curriki-h5p-wrapper">
            <div className="loader_gif">
              <img src={gifloader} alt="" />
            </div>
          </div>
        )}
      </>
    );
  }
}

H5PPreview.propTypes = {
  resource: PropTypes.object.isRequired,
  activityId: PropTypes.number.isRequired,
  showLtiPreview: PropTypes.bool,
  showActivityPreview: PropTypes.bool,
};

H5PPreview.defaultProps = {
  showLtiPreview: false,
  showActivityPreview: false,
};

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(connect(mapStateToProps)(H5PPreview));
