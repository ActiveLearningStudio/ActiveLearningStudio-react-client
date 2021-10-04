/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import { Formik } from "formik";
import HeadingThree from "utils/HeadingThree/headingthree";
import VideoTagImage from "../../../assets/images/Group 616.png";
import { Link } from "react-router-dom";
import H5PEditor from "components/ResourceCard/AddResource/Editors/H5PEditorV2";
import UploadImage from "utils/UploadImage/uploadimage";
import PreviewLayoutModel from "containers/MyProject/model/previewlayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImageV2 from "utils/uploadimagev2/uploadimagev2";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import UploadFile from "utils/uploadselectfile/uploadfile";
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
// import { subjects, educationLevels } from 'components/ac /dropdownData';

const AddActivity = (props) => {
  const { changeScreenHandler, setUploadImageStatus } = props;
  const {layout, selectedLayout, activity } =  useSelector((state) => state.myactivities);
  const [modalShow, setModalShow] = useState(false);
  const [upload, setupload] = useState(false);

  const [title, setTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const [existingActivity, setExistingActivity] = useState(false);
  const [formData, setFormData] =  useState('');
  const formRef = useRef()
  useEffect(() => {
    if(selectedLayout)  {
      setTitle(selectedLayout.title)
    }
  }, [selectedLayout])

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
          <Tabs
            text="2.Layout description + activities"
            className="ml-10"
            tabActive={true}
          />
          {/* <Tabs text="3. Preview Layout" className="ml-10" /> */}
        </div>
        <div className="add-activity-title-select">
          <div className="add-activity-title">
            <HeadingTwo text={title} color="#084892" />
          </div>

          <div className="activity-title-change-layout">
            <select onChange={(e) => {
              console.log(e.target.value);
              
              dispatch({
                type:actionTypes.SET_SELECTED_ACTIVITY,
                payload: JSON.parse(e.target.value),
              })
            }}>
              {/* <option value="">Change Layout</option> */}
              {layout?.map((data) => {
                return (
                  <option key="" selected={data.title === title ? true : false} value={JSON.stringify(data)}>{data.title}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="add-activity-selection">
          {/* <HeadingThree text="Create New" color="#084892" /> */}
          {/* <button>
            Create New
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button>
          <button
            className="upload-btn"
            onClick={() => changeScreenHandler("uploadinteractivevideo")}
          >
            Upload
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button> */}
        </div>
        <div className="add-activity-layout-formik-videoTag">
          <div className="add-activity-layout-formik">
            <Formik
              initialValues={{
                education_level_id: "",
                subject_id: "",
                thumb_url:  activity?.thumb_url || "",
                title: activity?.title || "",
              }}
              enableReinitialize
              innerRef={formRef}
              validate={values => {
                const errors = {};
                if (!values.title) {
                  errors.title = 'Required';
                }
              
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
                setFormData(values)
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
                  <HeadingThree
                    text="Layout Title"
                    color="#515151"
                    className="textField-title"
                  />
                  <HeadingText
                    text="Used for searching, reports and copyright information"
                    color="#515151"
                    className="textField-detailText"
                  />
                  <input
                    type="text"
                    name="title"
                    placeholder="Give your layout a name..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                   <div>{errors.title && touched.title && errors.title}</div>
                </div>
                <div className="layout-formik-select">
                  <div className="formik-select mr-32">
                    <HeadingText
                      text="Subject"
                      className="formik-select-title"
                      
                    />
                    <select
                      name="subject_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject_id}
                      
                    >
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="formik-select ">
                    <HeadingText
                      text="Education level"
                      className="formik-select-title"
                    />
                    <select>
                      <option
                        name="education_level_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.education_level_id}
                      
                      >Select</option>
                    </select>
                  </div>
                </div>
                <div className="formik-uploadimage">
                  <UploadImageV2 setUploadImageStatus={setUploadImageStatus} />
                </div>
              </form>
              )}
            </Formik>
          </div>
          <div className="add-activity-layout-videoTag">
            {/* <div className="videoTag">
              <div className="videoTag-link">
                <Link to="/">View Demo</Link>
              </div>
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/ngXSzWNYzU4"
                title="https://youtu.be/ngXSzWNYzU4"
              ></iframe>
            </div> */}
            <HeadingThree
              text="Add Activities"
              color="#084892"
              className="layout-add-activity-title"
            />
            {/* <HeadingTwo
              text="Add Activities"
              color="#084892"
              className="layout-add-activity-title"
            /> */}
            <HeadingText
              text="Start adding activities by opening the editor. Once you finish, hit the Preview Layout button to see your results."
              color="#515151"
            />
            <div className="add-activity-btns">
              <Buttons
                text="Open editor"
                primary={true}
                width="142px"
                height="35px"
                onClick={() => {
                  setModalShow(true)
                }}
                hover={true}
                className="mr-10"
              />
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
                  setExistingActivity(!existingActivity)
                }}
                hover={true}
              />
              {/* <Buttons
                text="Preview Layout"
                secondary={true}
                width="159px"
                height="36px"
                // disabled={layout ? false : true}
                onClick={() => changeScreenHandler("preview")}
                hover={true}
              /> */}
            </div>
            {existingActivity && (
              <div className="existing-activity-dialog">
                <UploadFile
                  metadata={formData}
                  
                />

                <div style={{ marginTop: "30px" }}>
                  <Buttons
                    text="upload"
                    primary={true}
                    width="142px"
                    height="35px"
                    hover={true}
                    onClick={() => changeScreenHandler("")}
                  />
                </div>
              </div>
            )}

            {successMessage && (
              <div className="successMessage">
                <HeadingThree
                  text="Changes saved succesfully!"
                  color="#12B347"
                />
                <HeadingText
                  text="To continue editing Open the editor again."
                  color="#12B347"
                />
              </div>
            )}
          </div>
        </div>

        {/* <div className="layout-colums-box">
        <HeadingThree
          text="List of column content"
          color="#084892"
          className="box-title"
        />
        <div className="layout-colums-inner-box">
          <H5PEditor upload={upload} />
        </div>
      </div> */}

        {/* <div className="open-editor-box">
          <div className="editor-title">
            <HeadingTwo text="Open Editor" color="#084892" />
          </div>
          <Link
            onClick={() => setModalShow(true)}
            className="editor-preview-link"
          >
            Preview Layout
          </Link>
        </div> */}

        {/* <div className="add-activity-btns">
          <Buttons
            text="Cancel"
            secondary={true}
            width="110px"
            height="35px"
            onClick={() => changeScreenHandler("layout")}
          />
          <Buttons
          text="Next"
          primary={true}
          width="132px"
          height="36px"
          // disabled={layout ? false : true}
          onClick={() => changeScreenHandler("preview")}
          hover={true}
        />
        </div> */}
      </div>
    </>
  );
};

export default AddActivity;
