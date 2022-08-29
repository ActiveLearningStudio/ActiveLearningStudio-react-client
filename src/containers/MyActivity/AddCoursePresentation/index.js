import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabsHeading from 'utils/Tabs/tabs';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import Buttons from 'utils/Buttons/buttons';
import CreateCoursePresentation from 'containers/MyActivity/AddCoursePresentation/CreateCoursePresentation';
import UploadCoursePresentation from 'containers/MyActivity/AddCoursePresentation/UploadCoursePresentation';
import DriveCoursePresentation from 'containers/MyActivity/AddCoursePresentation/DriveCoursePresentation';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import './style.scss';
import BackToSmSvg from 'iconLibrary/mainContainer/BackToSmSvg';

const AddCoursePresentation = ({ changeScreenHandler }) => {
  const primaryColor = getGlobalColor('--main-primary-color');
  const [activeKey, setActiveKey] = useState('new');
  const [enableDescribeBtn, setEnableDescribeBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem('coursePresentationFromFile');

    if (activeKey === 'new') {
      setEnableDescribeBtn(true);
    } else {
      setEnableDescribeBtn(false);
    }
  }, [activeKey]);

  return (
    <div className="add-video-form">
      <div className="add-video-tabs">
        <TabsHeading text="1. Add Presentation" tabActive />
        <TabsHeading text="2. Describe Layout" className="ml-10" />
        <TabsHeading text="3. Add Interactions" className="ml-10" />
      </div>
      <div className="add-video-title-select upload-back-button">
        <div className="add-video-title">
          <HeadingTwo text="Add Presentation" color="#084892" />
        </div>
        <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => changeScreenHandler('layout')}>
          <BackToSmSvg primaryColor={primaryColor} />
          <p style={{ color: primaryColor, marginBottom: '0px', marginLeft: '8px' }}>Back to options</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p>You can start with a blank template or load an existing presentation</p>
        </div>
      </div>
      <div className="add-video-form-tabs">
        <Tabs
          className="main-tabs"
          activeKey={activeKey}
          onSelect={(k) => {
            setActiveKey(k);
          }}
          id="controlled-tab-example"
        >
          <Tab eventKey="new" title="Create New">
            <CreateCoursePresentation />
          </Tab>
          <Tab eventKey="upload" title="My Device">
            <UploadCoursePresentation setEnableDescribeBtn={setEnableDescribeBtn} setLoading={setLoading} />
          </Tab>
          <Tab eventKey="drive" title="Google Drive">
            {activeKey === 'drive' && <DriveCoursePresentation setEnableDescribeBtn={setEnableDescribeBtn} setLoading={setLoading} />}
          </Tab>
        </Tabs>
        <div className={`loading ${loading ? '' : 'hide'}`}>
          <FontAwesomeIcon icon="spinner" />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <Buttons primary text="Describe Layout" className="cp-describe-layout-btn" hover onClick={() => changeScreenHandler('addactivity')} disabled={!enableDescribeBtn} />
        </div>
      </div>
    </div>
  );
};

AddCoursePresentation.propTypes = {
  changeScreenHandler: PropTypes.func.isRequired,
};

export default AddCoursePresentation;
