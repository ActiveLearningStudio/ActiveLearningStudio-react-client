import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import ShareProject from './Share';
import Embed from './Embed';

import './style.scss';

function SharePreviewPopup(url, projectName, playlistName = null) {
  confirmAlert({
    // eslint-disable-next-line react/prop-types
    customUI: ({ onClose }) => (
      <div className="share-project-preview-url project-share-check">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="profile" title="Share">
            {playlistName ? (
              <ShareProject
                url={url}
                playlistName={playlistName}
                onClose={onClose}
              />

            ) : (<ShareProject url={url} projectName={projectName} onClose={onClose} />)}
          </Tab>

          <Tab eventKey="home" title="Embed">
            {playlistName ? (
              <Embed
                url={url}
                playlistName={playlistName}
                onClose={onClose}
              />
            ) : (
              <Embed
                url={url}
                projectName={projectName}
                onClose={onClose}
              />
            )}
          </Tab>
        </Tabs>
      </div>
    ),
  });

  return <div />;
}

export default SharePreviewPopup;
