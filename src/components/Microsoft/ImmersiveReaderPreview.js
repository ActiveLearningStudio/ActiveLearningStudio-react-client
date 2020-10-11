import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { launchAsync } from '@microsoft/immersive-reader-sdk';

import './style.scss';

class ImmersiveReaderPreview extends React.Component {
  doLaunch = () => {
    const { activity } = this.props;
    const { token } = JSON.parse(localStorage.getItem('auth'));
    axios
      .get(`${global.config.laravelAPIUrl}/immersive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const subdomain = 'curriki';
        const data = {
          title: activity.metadata.title,
          chunks: [
            {
              content: activity.textContent,
              mimeType: 'text/html',
            },
          ],
        };

        launchAsync(response.data.access_token, subdomain, data);
      });
  };

  render() {
    const { activity } = this.props;
    return (
      <div className="immersiveReaderViewer">
        <h1>{activity.metadata.title}</h1>
        <button type="button" onClick={this.doLaunch}>Launch Immersive Reader</button>
        <div
          dangerouslySetInnerHTML={{ __html: activity.textContent }}
        />
      </div>
    );
  }
}

ImmersiveReaderPreview.propTypes = {
  activity: PropTypes.object.isRequired,
};

export default withRouter(ImmersiveReaderPreview);
