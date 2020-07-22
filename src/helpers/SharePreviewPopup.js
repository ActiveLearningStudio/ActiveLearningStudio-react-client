import React from 'react';
import {
  EmailShareButton,
  // FacebookShareButton,
  // TwitterShareButton,
  EmailIcon,
  // FacebookIcon,
  // TwitterIcon,
} from 'react-share';
import { confirmAlert } from 'react-confirm-alert';

const SharePreviewPopup = (url, projectName) => {
  confirmAlert({
    // eslint-disable-next-line react/prop-types
    customUI: ({ onClose }) => (
      <div className="share-project-preview-url">
        <h1>
          Your can now share project
          <strong>
            {`"${projectName}"`}
          </strong>
          <br />
          Anyone with the link below can access your project:
          <br />
          <br />
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          <br />
        </h1>

        <hr />

        {/* <div className="margin-bottom-20">
          <span>
            <FacebookShareButton url={url} className="share">
              <FacebookIcon size={32} />
            </FacebookShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project on Facebook</span>
        </div> */}

        {/* <div className="margin-bottom-20">
          <span>
            <TwitterShareButton
              url={url}
              title="test"
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} />
            </TwitterShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project on Twitter</span>
        </div> */}

        <div className="margin-bottom-20">
          <span>
            <div id="croom">
              <div className="g-sharetoclassroom" data-size="32" data-url={url}>Loading Classroom...</div>
              <span className="margin-left-20 inline-block">Share this project on Google Classroom</span>
            </div>
          </span>
        </div>

        <div className="margin-bottom-20">
          <span>
            <EmailShareButton
              url={url}
              subject={projectName}
              className="email-share"
            >
              <EmailIcon size={32} />
            </EmailShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project through email</span>
        </div>

        <div className="close-btn">
          <button type="button" onClick={onClose}>Ok</button>
        </div>

        <div className="google-script">
          {setTimeout(() => {
            window.gapi.sharetoclassroom.go('croom');
          }, 1)}
        </div>
      </div>
    ),
  });
};

export default SharePreviewPopup;
