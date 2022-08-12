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

const StartingPage = ({
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
  const currikiUtility = classNames('curriki-utility-startpage', className);
  const { activeOrganization } = useSelector((state) => state.organization);
  return (
    <div className={currikiUtility}>
      <div className="startpage-section">
        <div className="section-detail">
          <h1 className="section-heading-one">{welcome}</h1>
          <h2 className="create-section-h2-space">{createTitle}</h2>
          <p className="prap-space">{createDetail}</p>
          {type === 'activity' && (
            <>
              <h2 className="help-section-h2-heading">{helpTitle}</h2>
              <ul>
                <li>Select the type of activity you want to create.</li>
                <li>Follow the on-screen directions.</li>
                <li>Add content and media to enhance your experience.</li>
                <li>Save & Close your work to preview as a learner.</li>
              </ul>
              <h6>
                Later you can use
                <Link to={`/org/${activeOrganization?.domain}`}> &quot;My Projects&quot; </Link>
                option to organize your activities into folders
              </h6>
            </>
          )}
          <p className="help-text">
            Feeling lost?
            <strong> Go to our Help Center to learn more.</strong>
          </p>
        </div>
        <div>
          <div className="section-btn create-new-btn" onClick={onClick}>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 26C2.03441 26 34.0143 26.0003 50 26.0005" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26 50C26 49.9656 26 17.9857 26 2" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{createBtnTitle}</span>
          </div>
          <a href="https://support.curriki.org/" className="section-btn ">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54Z"
                stroke={primaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20.4336 20.2003C21.0449 18.4626 22.2514 16.9974 23.8395 16.064C25.4276 15.1307 27.2947 14.7895 29.1103 15.101C30.9258 15.4124 32.5725 16.3563 33.7588 17.7655C34.9451 19.1747 35.5943 20.9583 35.5916 22.8003C35.5916 28.0003 27.7916 30.6003 27.7916 30.6003"
                stroke={primaryColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M28 41H28.0348" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <span>{helpBtnTitle}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

StartingPage.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  primaryColor: PropTypes.string,
  // mainHeading: PropTypes.string,
  createBtnTitle: PropTypes.string,
  createTitle: PropTypes.string,
  createDetail: PropTypes.string,
  helpBtnTitle: PropTypes.string,
  helpTitle: PropTypes.string,
  helpDetail: PropTypes.string,
  onClick: PropTypes.func,
  welcome: PropTypes.string,
};

export default StartingPage;
