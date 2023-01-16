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
import PlusXlSvg from 'iconLibrary/mainContainer/PlusXlSvg';
import HelpXlSvg from 'iconLibrary/mainContainer/HelpXlSvg';

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
            <PlusXlSvg primaryColor={primaryColor} />

            <span>{createBtnTitle}</span>
          </div>
          <a href="https://www.currikistudio.org/help/" rel="noreferrer" target="_blank" className="section-btn ">
            <HelpXlSvg primaryColor={primaryColor} />
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
