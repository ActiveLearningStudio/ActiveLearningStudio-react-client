/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import btnLogo from 'assets/images/googleBtnLogo.png';
import driveLogo from 'assets/images/googleDriveLogo.png';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import Buttons from 'utils/Buttons/buttons';
import gapiService from 'services/gapi.service';
import DriveModal from './DriveModal';
import FilePreviewAndStore from '../FilePreviewAndStore';
import './style.scss';

const DriveCoursePresentation = ({ setEnableDescribeBtn, setLoading }) => {
  const primaryColor = getGlobalColor('--main-primary-color');
  const [authData, setAuthData] = useState(null);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    localStorage.removeItem('coursePresentationFromFile');
    if (authData === null) return;

    setShowDriveModal(true);
  }, [authData]);

  const handleLoginSuccess = (data) => {
    setAuthData(data);
  };

  const handleFileClick = (e) => {
    const filename = e.currentTarget.getAttribute('filename');
    setShowDriveModal(false);
    setLoading(true);
    gapiService.getGoogleSlidesPDF(authData.accessToken, e.currentTarget.getAttribute('fileid'))
    .then((response) => {
      setLoading(false);
      const file = new File([response.data], filename);
      setSelectedFile(file);
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
          <FilePreviewAndStore file={selectedFile} setEnableDescribeBtn={setEnableDescribeBtn} setLoading={setLoading} />
        </div>
      </div>
      {showDriveModal && (
        <DriveModal token={authData.accessToken} fileSelectedCallback={handleFileClick} closeModalCallback={() => setShowDriveModal(false)}/>      
      )}
    </div>
  );
};

export default DriveCoursePresentation;
