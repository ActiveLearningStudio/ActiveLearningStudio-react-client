import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';

import ShareProject from './ShareProject';
import EmbedProject from './EmbedProject';

import './style.scss';

function SharePreviewPopup(url, projectName) {
  confirmAlert({
    // eslint-disable-next-line react/prop-types
    customUI: ({ onClose }) => (
      <div className="share-project-preview-url project-share-check">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="profile" title="Share Your Project">
            <ShareProject
              url={url}
              projectName={projectName}
              onClose={onClose}
            />
          </Tab>

          <Tab eventKey="home" title="Embed Your Project">
            <EmbedProject
              url={url}
              projectName={projectName}
              onClose={onClose}
            />
          </Tab>
        </Tabs>
      </div>
    ),
  });

  return <div />;
}

export default SharePreviewPopup;
