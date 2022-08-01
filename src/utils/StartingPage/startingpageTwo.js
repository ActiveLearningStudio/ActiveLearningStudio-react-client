/* eslint-disable react/require-default-props */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './startingpage.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StartingPageTwo = ({
  type,
  welcome,
  className,
  primaryColor = '#2E68BF',
  createBtnTitle,
  createTitle,
  createDetail,
  helpBtnTitle,
  helpTitle,
  helpDetail,
  onClick = () => {},
}) => {
  const currikiUtility = classNames('curriki-utility-startpage curriki-utility-startpage-two', className);
  const { activeOrganization } = useSelector((state) => state.organization);
  return (
    <div className={currikiUtility}>
      <div className="startpage-section startpage-section-two ">
        <div className="create-project-card">
          <div className="section-btn" onClick={onClick}>
            <svg width="48" height="48" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 26C2.03441 26 34.0143 26.0003 50 26.0005" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26 50C26 49.9656 26 17.9857 26 2" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{createBtnTitle}</span>
          </div>

          <div className="create-project-popup">
            <h5 className="popup-heading">Create your First Project!</h5>
            <p className="popup-discription">Projects enables authors to group Activities into a collection.</p>
            <div className="divider" />
            <h6 className="popup-use-project">You can use Projects to:</h6>

            <div className="lists">
              <svg width="14px" height="12px" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1.875L4.75 10.125L1 6.375" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="list-text">Organize Activities of a common topic into a folder.</p>
            </div>
            <div className="lists">
              <svg width="14px" height="12px" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1.875L4.75 10.125L1 6.375" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="list-text">Create a set of Activities utilizing a Playlist.</p>
            </div>
            <div className="lists">
              <svg width="14px" height="12px" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1.875L4.75 10.125L1 6.375" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p className="list-text">Assemble Activities and Playlists into a complete course.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StartingPageTwo.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  primaryColor: PropTypes.string,
  createBtnTitle: PropTypes.string,
  createTitle: PropTypes.string,
  createDetail: PropTypes.string,
  helpBtnTitle: PropTypes.string,
  helpTitle: PropTypes.string,
  helpDetail: PropTypes.string,
  onClick: PropTypes.func,
  welcome: PropTypes.string,
};

export default StartingPageTwo;
