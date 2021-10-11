/*eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import Tabs from 'utils/Tabs/tabs';
import Buttons from 'utils/Buttons/buttons';
import { Formik } from 'formik';
import HeadingThree from 'utils/HeadingThree/headingthree';

import PreviewLayoutModel from 'containers/MyProject/model/previewlayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UploadImageV2 from 'utils/uploadimagev2/uploadimagev2';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import UploadFile from 'utils/uploadselectfile/uploadfile';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import { educationLevels, subjects } from 'components/ResourceCard/AddResource/dropdownData';
// import { subjects, educationLevels } from 'components/ac /dropdownData';

const AddActivity = (props) => {
  const { changeScreenHandler, setUploadImageStatus, activtyMethod } = props;
  const { layout, selectedLayout, activity } = useSelector((state) => state.myactivities);
  const [modalShow, setModalShow] = useState(false);
  const [upload, setupload] = useState(false);

  const [title, setTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const [existingActivity, setExistingActivity] = useState(false);
  const [formData, setFormData] = useState('');
  const formRef = useRef();
  useEffect(() => {
    if (selectedLayout) {
      setTitle(selectedLayout.title);
    }
  }, [selectedLayout]);

  successMessage &&
    setInterval(() => {
      setSuccessMessage(false);
    }, 5000);
  return (
    <>
      <PreviewLayoutModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        formData={formData}
        searchName="abstract"
        setSuccessMessage={setSuccessMessage}
      />
      <div className="add-activity-form">
        <div className="add-activity-tabs">
          <Tabs text="1. Select a layout" tabActive={true} />
          <Tabs text="2.Layout description + activities" className="ml-10" tabActive={true} />
          {/* <Tabs text="3. Preview Layout" className="ml-10" /> */}
        </div>
        {!activity && (
          <div className="add-activity-title-select">
            <div className="add-activity-title">
              <HeadingTwo text={activtyMethod === 'upload' ? 'Upload Activity' : title} color="#084892" />
            </div>
            {activtyMethod !== 'upload' && (
              <div className="activity-title-change-layout">
                <select
                  onChange={(e) => {
                    dispatch({
                      type: actionTypes.SET_SELECTED_ACTIVITY,
                      payload: JSON.parse(e.target.value),
                    });
                  }}
                >
                  {/* <option value="">Change Layout</option> */}
                  {layout?.map((data) => {
                    return (
                      <option key="" selected={data.title === title ? true : false} value={JSON.stringify(data)}>
                        {data.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        )}
        <div className="add-activity-selection"></div>
        <form className="radio-group">
          <div className="radio-button">
            <input
              onClick={() => {
                changeScreenHandler('layout', 'create');
              }}
              name="selecttype"
              type="radio"
              className="input"
            />
            <HeadingText text="Create new activity" color="#515151" />
          </div>
          <div className="radio-button">
            <input name="selecttype" type="radio" className="input" checked />
            <HeadingText text="Upload activity" color="#515151" />
          </div>
        </form>
        <div className="add-activity-layout-formik-videoTag">
          <div className="add-activity-layout-formik">
            <Formik
              initialValues={{
                education_level_id: activity?.education_level_id || '',
                subject_id: activity?.subject_id || '',
                thumb_url: activity?.thumb_url || 'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
                title: activity?.title || '',
              }}
              enableReinitialize
              innerRef={formRef}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = 'Required';
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setFormData(values);
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
                <form>
                  <HeadingThree text="Layout description" color="#084892" />

                  <div className="layout-title-formik-textField">
                    <HeadingThree text="Layout Title" color="#515151" className="textField-title" />
                    <HeadingText text="Used for searching, reports and copyright information" color="#515151" className="textField-detailText" />
                    <input type="text" name="title" placeholder="Give your layout a name..." onChange={handleChange} onBlur={handleBlur} value={values.title} />
                    <div style={{ color: 'red' }}>{errors.title && touched.title && errors.title}</div>
                  </div>
                  <div className="layout-formik-select">
                    <div className="formik-select mr-32">
                      <HeadingText text="Subject" className="formik-select-title" />
                      <select name="subject_id" onChange={handleChange} onBlur={handleBlur} value={values.subject_id}>
                        <option hidden>Select</option>
                        {educationLevels.map((data) => (
                          <option key={data.value} value={data.name}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="formik-select ">
                      <HeadingText text="Education level" className="formik-select-title" />
                      <select name="education_level_id" onChange={handleChange} onBlur={handleBlur} value={values.education_level_id}>
                        <option hidden>Select</option>
                        {subjects.map((data) => (
                          <option key={data.value} value={data.subject}>
                            {data.subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="formik-uploadimage">
                    <UploadImageV2 formRef={formRef} setUploadImageStatus={setUploadImageStatus} thumb_url={activity?.thumb_url} />
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="add-activity-layout-videoTag">
            <HeadingThree text={activtyMethod === 'upload' ? 'Upload Activities' : 'Add Activities'} color="#084892" className="layout-add-activity-title" />

            <HeadingText text="Start adding activities by opening the editor. Once you finish, hit the Save & close button to see your results." color="#515151" />
            <div className="add-activity-btns">
              {activtyMethod !== 'upload' && (
                <Buttons
                  text="Open editor"
                  primary={true}
                  width="142px"
                  height="35px"
                  onClick={() => {
                    formRef.current.handleSubmit();
                    if (formRef.current.values.title) {
                      setModalShow(true);
                    }
                  }}
                  hover={true}
                  className="mr-10"
                />
              )}
              {activtyMethod === 'upload' && (
                <Buttons
                  icon={existingActivity ? faAngleUp : faAngleDown}
                  text="Upload existing Activity"
                  secondary={true}
                  width="200px"
                  height="36px"
                  // disabled={layout ? false : true}
                  // onClick={() => changeScreenHandler("uploadinteractivevideo")}
                  onClick={() => {
                    formRef.current.handleSubmit();
                    if (formRef.current.values.title) {
                      setExistingActivity(!existingActivity);
                    }
                  }}
                  hover={true}
                />
              )}
            </div>
            {existingActivity && (
              <div className="existing-activity-dialog">
                <UploadFile metadata={formData} />

                <div style={{ marginTop: '30px' }}>
                  <Buttons text="upload" primary={true} width="142px" height="35px" hover={true} onClick={() => changeScreenHandler('')} />
                </div>
              </div>
            )}

            {successMessage && (
              <div className="successMessage">
                <HeadingThree text="Changes saved succesfully!" color="#12B347" />
                <HeadingText text="To continue editing Open the editor again." color="#12B347" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
