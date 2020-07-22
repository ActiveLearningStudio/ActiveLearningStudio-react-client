import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import gifloader from 'assets/images/276.gif';

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
    const { resourceId, showLtiPreview, showActivityPreview } = this.props;

    if (showLtiPreview) {
      this.loadResourceLti(resourceId);
    } else if (showActivityPreview) {
      this.loadResourceActivity(resourceId);
    } else {
      this.loadResource(resourceId);
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const { resourceId, showLtiPreview, showActivityPreview } = this.props;
    if (resourceId !== props.resourceId) {
      const h5pIFrame = document.getElementsByClassName('h5p-iframe');
      if (h5pIFrame.length) {
        h5pIFrame[0].remove();
      }

      if (showLtiPreview) {
        this.loadResourceLti(props.resourceId);
      } else if (showActivityPreview) {
        this.loadResourceActivity(props.resourceId);
      } else {
        this.loadResource(props.resourceId);
      }
    }
  }

  loadResource = (resourceId) => {
    if (resourceId === 0) {
      return;
    }

    const { token } = JSON.parse(localStorage.getItem('auth'));

    axios
      .post(
        `${global.config.laravelAPIUrl}/h5p-resource-settings`,
        { resourceId },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadResourceLti = (resourceId) => {
    if (resourceId === 0) {
      return;
    }

    axios
      .post(
        `${global.config.laravelAPIUrl}/h5p-resource-settings-open`,
        { resourceId },
      )
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadResourceActivity = (resourceId) => {
    if (resourceId === 0) {
      return;
    }

    axios
      .post(
        `${global.config.laravelAPIUrl}/h5p-resource-settings-shared`,
        { resourceId },
      )
      .then((response) => {
        this.resourceLoaded(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  resourceLoaded = async (response) => {
    if (response.data.status === 'fail') {
      this.setState({
        shared: false,
      });
      return;
    }

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
  }

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
  resourceId: PropTypes.number.isRequired,
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
