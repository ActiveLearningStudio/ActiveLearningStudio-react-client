
import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon,
  } from "react-share";

  import { confirmAlert } from 'react-confirm-alert'; // Import
  import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// const addBodyClass = className => document.body.classList.add(className);
// const removeBodyClass = className => document.body.classList.remove(className);

// export default function useBodyClass(className) {
//     useEffect(
//         () => {
//             // Set up
//             className instanceof Array ? className.map(addBodyClass) : addBodyClass(className);

//             // Clean up
//             return () => {
//                 className instanceof Array
//                     ? className.map(removeBodyClass)
//                     : removeBodyClass(className);
//             };
//         },
//         [className]
//     );
// }

const SharePreviewPopup = (url, projectName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='share-project-preview-url'>
            <h1>Your can now share project <strong>"{projectName}"</strong><br />
                                Anyone with the link below can access your project:<br />
        <br /><a target="_blank" href={url}>{url}</a><br /></h1>
        <hr />
        <div className="margin-bottom-20">
          <span>
            <FacebookShareButton url={url} className='share'>
              <FacebookIcon size={32} />
            </FacebookShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project on Facebook</span>
        </div>
        <div className="margin-bottom-20">
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
        </div>
        <div className="margin-bottom-20">
          <span>
          <EmailShareButton
                url={url}
                title='test'
                className="Demo__some-network__share-button">
                <EmailIcon
                  size={32}
                   />
              </EmailShareButton>
          </span>
          <span className="margin-left-20 inline-block">Share this project through email</span>
        </div>
  
        <div className="margin-bottom-20">
          <span>
            <div id="croom">
              <div class="g-sharetoclassroom" data-size="32" data-url={url} >Loading Classroom...</div>
              <span className="margin-left-20 inline-block">Share this project on Google Classroom</span>
            </div>
          </span>
          
        </div>
  
            <div className="close-btn">
              <button onClick={onClose}>Ok</button>
            </div>
            <div className="google-script">
            {
              setTimeout(function(){
                window.gapi.sharetoclassroom.go("croom")
              }, 1)
            }
            
            </div>
          </div>
        );
      }
    });
  };

  export default SharePreviewPopup