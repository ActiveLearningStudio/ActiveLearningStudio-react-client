import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import ShareProject from './Share';
import EmbedProject from './Embed';

import './style.scss';

function SharePreviewPopup(url, projectName, playlistName = null) {
  confirmAlert({
    // eslint-disable-next-line react/prop-types
    customUI: ({ onClose }) => (
      <div className="share-project-preview-url project-share-check">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="profile" title={`Share Your ${playlistName ? 'Playlist' : 'Project'}`}>
            {playlistName ? (
              <ShareProject
                url={url}
                playlistName={playlistName}
                onClose={onClose}
              />

            ) : (<ShareProject url={url} projectName={projectName} onClose={onClose} />)}
          </Tab>

          <Tab eventKey="home" title={`Embed Your ${playlistName ? 'Playlist' : 'Project'}`}>
            {playlistName ? (
              <EmbedProject
                url={url}
                playlistName={playlistName}
                onClose={onClose}
              />
            ) : (
              <EmbedProject
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
