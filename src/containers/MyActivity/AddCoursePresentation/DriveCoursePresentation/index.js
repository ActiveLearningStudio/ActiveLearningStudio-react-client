/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import btnLogo from 'assets/images/googleBtnLogo.png';
import driveLogo from 'assets/images/googleDriveLogo.png';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import Buttons from 'utils/Buttons/buttons';
import gapiService from 'services/gapi.service';
import DriveModal from './DriveModal';
import './style.scss';

const DriveCoursePresentation = () => {
  const primaryColor = getGlobalColor('--main-primary-color');
  const [authData, setAuthData] = useState(null);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [previewImageSource, setPreviewImageSource] = useState(null);

  useEffect(() => {
    localStorage.removeItem('coursePresentationFromFile');
    if (authData === null) return;

    setShowDriveModal(true);
  }, [authData]);

  const handleLoginSuccess = (data) => {
    setAuthData(data);
  };

  const handleFileClick = (e) => {
    setShowDriveModal(false);
    setSelectedFileName(e.currentTarget.getAttribute('filename'));
    gapiService.getGoogleSlidesPDF(authData.accessToken, e.currentTarget.getAttribute('fileid'))
    .then((response) => {
      var blob = new Blob([response.data]);
      var reader = new FileReader();
      reader.onload = (event) => {
          var base64 = event.target.result;
          localStorage.setItem('coursePresentationFromFile', base64);
          const PDFJS = window.pdfjsLib;
          var _PDF_DOC = PDFJS.getDocument({ data: atob(base64.split(',')[1]) });
          _PDF_DOC.promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
              var scale = 1.5;
              var viewport = page.getViewport({scale: scale});
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              var render_context = {
                canvasContext: ctx,
                viewport: viewport
              };
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              var renderTask = page.render(render_context);
              renderTask.promise.then(() => {
                setPreviewImageSource(canvas.toDataURL('image/png'));
              });
            });
          });
      };
      reader.readAsDataURL(blob);
    });
    
  };
  
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3 className="google-drive-header" style={{color: primaryColor}}>
            <img src={driveLogo} alt="Google Drive logo"/> Google Drive
          </h3>
          <p>
            Add Google Slides presentations from your Google Drive account.
          </p>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col text-center">
          {authData && (
            <Buttons
              text="Browse Presentations"
              className="cp-browse-presentations-btn"
              hover
              onClick={() => setShowDriveModal(true)}
            />
          )}
          {authData === null && (
            <GoogleLogin
            clientId={global.config.gapiClientId}
            render={renderProps => (
              <button onClick={renderProps.onClick} 
                style={{width:"240px",height:"32px",borderRadius:"16px",background: "#FFFFFF", border: "1px solid #959595", boxShadow: "0px 2px 8px 1px rgba(81, 81, 81, 0.16)",padding:"6px 0"}}
                disabled={renderProps.disabled}>
                <img src={btnLogo} alt="" style={{padding: "0px 6px 2px 0px"}}/>
                Login with Google
              </button>
            )}
            onSuccess={handleLoginSuccess}
            scope="https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly"
            cookiePolicy="single_host_origin"
          >
          </GoogleLogin>
          )}
        </div>
        <div className="col">
          {previewImageSource !== null && (
            <div>
              <p>Preview:</p>
              <img className="google-drive-preview-image" src={previewImageSource} />
              <p>{selectedFileName}</p>
            </div>
          )}
        </div>
      </div>
      {showDriveModal && (
        <DriveModal token={authData.accessToken} fileSelectedCallback={handleFileClick} closeModalCallback={() => setShowDriveModal(false)}/>      
      )}
    </div>
  );
};

export default DriveCoursePresentation;
