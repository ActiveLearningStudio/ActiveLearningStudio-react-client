import React, { useRef } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import Swal from "sweetalert2";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function SharePreviewPopup(url, projectName) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="share-project-preview-url project-share-check">
          <h1>
            Your can now share project <strong>"{projectName}"</strong>
            <br />
            Anyone with the link below can access your project:
            <br />
            <br />
            <a target="_blank" href={url}>
              <input id="urllink_clip" value={url} />
            </a>
            <i
              title="copy to clipboard"
              className="fa fa-clipboard"
              aria-hidden="true"
              onClick={() => {
                /* Get the text field */
                var copyText = document.getElementById("urllink_clip");
                alert;
                /* Select the text field */
                copyText.focus();
                copyText.select();
                //  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                /* Copy the text inside the text field */
                document.execCommand("copy");

                /* Alert the copied text */
                Swal.fire({
                  title: "Link Copied",
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 1500,
                  allowOutsideClick: false,
                });
              }}
            ></i>
            <br />
          </h1>
          <hr />
          {/* <div className="margin-bottom-20">
          <span>
            <FacebookShareButton url={url} className='share'>
              <FacebookIcon size={32} />
            </FacebookShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project on Facebook</span>
        </div> */}
          {/* <div className="margin-bottom-20">
          <span>
            <TwitterShareButton
                url={url}
                title='test'
                className="Demo__some-network__share-button">
                <TwitterIcon
                  size={32}
                   />
              </TwitterShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project on Twitter</span>
        </div> */}
          <div className="margin-bottom-20">
            <span>
              <div id="croom">
                <div class="g-sharetoclassroom" data-size="32" data-url={url}>
                  Loading Classroom...
                </div>
                <span className="margin-left-20 inline-block">
                  Share this project on Google Classroom
                </span>
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
            <span className="margin-left-20 inline-block">
              Share this project through email
            </span>
          </div>

          <div className="close-btn">
            <button onClick={onClose}>Ok</button>
          </div>
          <div className="google-script">
            {setTimeout(function () {
              window.gapi.sharetoclassroom.go("croom");
            }, 1)}
          </div>
        </div>
      );
    },
  });
  return <div />;
}
