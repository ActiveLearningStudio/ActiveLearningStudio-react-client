/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import TabsHeading from 'utils/Tabs/tabs';
import { Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import AddVideoImage from 'assets/images/svg/addvidobright.svg';
import AddVideoTube from 'assets/images/svg/youtube.svg';
import Buttons from 'utils/Buttons/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import BrightcoveModel from '../model/brightmodel';
const AddVideo = ({ setScreenStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  return (
    <>
      <BrightcoveModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        setSelectedVideoId={setSelectedVideoId}
      />
      <div className="add-video-form">
        <div className="add-video-tabs">
          <TabsHeading text="1. Add a video" tabActive={true} />
          <TabsHeading text="2. Describe video" className="ml-10" />
          <TabsHeading text="3. Add interactions" className="ml-10" />
        </div>
        <div className="add-video-title-select">
          <div className="add-video-title">
            <HeadingTwo text="Add a video" color="#084892" />
          </div>
          {/* <div className="add-video-tour">
            <span>
              <FontAwesomeIcon icon={faClock} color="#084892" className="ml-9" />
              Tour
            </span>
          </div> */}
        </div>
        <div className="add-video-form-tabs">
          <Tabs className="main-tabs" defaultActiveKey="default" id="uncontrolled-tab-example">
            <Tab eventKey="default" title="BrightCove">
              <FormikVideo selectedVideoId={selectedVideoId} type={AddVideoImage} setScreenStatus={setScreenStatus} showBrowse setModalShow={setModalShow} />
            </Tab>
            {/* <Tab eventKey="Mydevice" title="My device"></Tab> */}
            <Tab eventKey="YouTube" title="YouTube">
              <FormikVideo type={AddVideoTube} setScreenStatus={setScreenStatus} />
            </Tab>
            {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
            <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AddVideo;

const FormikVideo = ({ type, selectedVideoId, showBrowse, setScreenStatus, setModalShow }) => {
  const dispatch = useDispatch();
  return (
    <div className="add-video-layout-formik">
      <Formik
        initialValues={{
          videoUrl: selectedVideoId,
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.videoUrl) {
            errors.videoUrl = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          setScreenStatus('DescribeVideo');
          dispatch({
            type: 'ADD_VIDEO_URL',
            payload: values.videoUrl,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="layout-title-formik-textField">
              <img src={type} />
              <input type="text" name="videoUrl" placeholder="Enter video ID" onChange={handleChange} onBlur={handleBlur} value={values.videoUrl} />

              {showBrowse && (
                <Buttons type="button" primary={true} text="Browse videos" width="146px" height="35px" hover={true} className="ml-32" onClick={() => setModalShow(true)} />
              )}
            </div>
            <div className="error" style={{ color: 'red' }}>
              {errors.videoUrl && touched.videoUrl && errors.videoUrl}
            </div>
            <div className="describe-video">
              <Buttons type="submit" primary={true} text="Describe Video" width="149px" height="35px" hover={true} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
