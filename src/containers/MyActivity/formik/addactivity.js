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
import { faAngleDown, faAngleUp, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../../assets/images/left-arrow.svg';
import UploadFile from 'utils/uploadselectfile/uploadfile';
import { useSelector, useDispatch } from 'react-redux';
import { editResourceMetaDataAction } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';
import { getSubjects, getEducationLevel, getAuthorTag } from 'store/actions/admin';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import OverlayTriggerPop from 'utils/OverlayTiggerPop/overlaytiggerpop';
import BackToSmSvg from 'iconLibrary/mainContainer/BackToSmSvg';

// const withOutExplore = [
//   "Interactive Video",
//   "Course Presentation",
//   "Column Layout",
//   "Quiz",
//   "Interactive Book",
// ];

const AddActivity = (props) => {
  const { setActivityMethod, changeScreenHandler, setUploadImageStatus, activtyMethod, activityPreview, redirecttoactivity, fullWidth } = props;
  const { layout, selectedLayout, activity, singleLayout } = useSelector((state) => state.myactivities);

  const [modalShow, setModalShow] = useState(false);
  const [upload, setupload] = useState(false);
  const [activeRadio, setActiveRadio] = useState('');
  const organization = useSelector((state) => state.organization);
  const activityLayouts = useSelector((state) => state.myactivities.layout);

  const [title, setTitle] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const [existingActivity, setExistingActivity] = useState(false);
  const [formData, setFormData] = useState('');
  const [subjects, setSubjects] = useState(null);
  const [authorTags, setAuthorTags] = useState(null);
  const [educationLevels, setEducationLevels] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const [selecteAuthorTags, setSelecteAuthorTags] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [exploreCheck, setExploreCheck] = useState(true);
  const [showSmythsonianModal, setshowSmythsonianModal] = useState(false);
  useEffect(() => {
    // Check if selectedLayout is selected from explore or not
    setExploreCheck(true);

    if (activityLayouts?.find((item) => item.title === selectedLayout.title)) {
      setExploreCheck(false);
    }
  }, [selectedLayout]);
  const formRef = useRef();
  var counter;
  const parser = new DOMParser();

  const formatApiData = (data) => {
    let ids = [];
    data.map((datum) => {
      ids.push(datum.id);
    });
    return ids;
  };

  useEffect(() => {
    if (!subjects) {
      const result_sub = dispatch(getSubjects(organization?.activeOrganization?.id));
      result_sub.then((data) => {
        let subj_array = [];
        data?.data.map((subject) => {
          let sub = { value: subject.id, label: subject.name };
          subj_array.push(sub);
        });
        setSubjects(subj_array);
      });
    }
  }, [subjects]);

  useEffect(() => {
    if (!educationLevels) {
      const result_edu = dispatch(getEducationLevel(organization?.activeOrganization?.id));
      result_edu.then((data) => {
        let edu_array = [];
        data?.data.map((edu_lvl) => {
          let edu = { value: edu_lvl.id, label: edu_lvl.name };
          edu_array.push(edu);
        });
        setEducationLevels(edu_array);
      });
    }
  }, [educationLevels]);

  useEffect(() => {
    if (!authorTags) {
      const result_tag = dispatch(getAuthorTag(organization?.activeOrganization?.id));
      result_tag.then((data) => {
        let tag_array = [];
        data?.data.map((tag) => {
          let auth_tag = { value: tag.id, label: tag.name };
          tag_array.push(auth_tag);
        });
        setAuthorTags(tag_array);
      });
    }
  }, [authorTags]);

  useEffect(() => {
    if (activity?.subjects && !selectedSubjects) {
      let output = subjects?.filter((obj) => formatApiData(activity?.subjects).indexOf(obj.value) !== -1);
      setSelectedSubjects(output);
    }
    if (activity?.author_tags && !selecteAuthorTags) {
      let output = authorTags?.filter((obj) => formatApiData(activity?.author_tags).indexOf(obj.value) !== -1);
      setSelecteAuthorTags(output);
    }

    if (activity?.education_levels && !selectedEducationLevel) {
      let output = educationLevels?.filter((obj) => formatApiData(activity?.education_levels).indexOf(obj.value) !== -1);
      setSelectedEducationLevel(output);
    }
  });
  useEffect(() => {
    if (selectedLayout) {
      setTitle(selectedLayout.title);
    }
  }, [selectedLayout]);
  useEffect(() => {
    if (activity && setActivityMethod) {
      setActivityMethod('create');
    }
  }, [activity]);
  successMessage &&
    setInterval(() => {
      setSuccessMessage(false);
    }, 5000);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <PreviewLayoutModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        activityPreview={activityPreview}
        formData={formData}
        searchName="abstract"
        setSuccessMessage={setSuccessMessage}
        redirecttoactivity={redirecttoactivity}
        fullWidth={fullWidth}
      />
      <div className="add-activity-form">
        {activtyMethod === 'upload' ? (
          <div className="add-activity-tabs">
            <Tabs text="1. Describe and upload activity" tabActive={true} />
          </div>
        ) : (
          <div className="add-activity-tabs">
            <Tabs text="1. Select Activity" tabActive={true} />
            {
              ((counter = 0),
              layout?.map((data) => {
                if (data.id === selectedLayout?.id && counter == 0) {
                  counter++;
                  return (
                    <>
                      <Tabs text="2. Describe and  create layout" className="ml-10" tabActive={true} />
                    </>
                  );
                }
              }))
            }
            {counter === 0 && (
              <>
                {/* <Tabs text="2. Select activity" className="ml-10" tabActive={true} /> */}
                <Tabs text="2. Describe and Create Activity" className="ml-10" tabActive={true} />
              </>
            )}
          </div>
        )}

        {!activity && (
          <div className="add-activity-title-select upload-back-button">
            <div className="add-activity-title ">
              <div>
                <HeadingTwo text={activtyMethod === 'upload' ? 'Upload activity' : title} color="#084892" className="add_activity_title_h2_style" />
              </div>
            </div>
            <div
              className="back-button"
              id="back-button-none-bg"
              onClick={() => {
                changeScreenHandler('layout', 'create');
              }}
            >
              <BackToSmSvg primaryColor={primaryColor} />
              <p style={{ marginLeft: '8px' }}>Cancel</p>
            </div>
            {/* {activtyMethod !== 'upload' && singleLayout === null && (
              <div className="activity-title-change-layout">
                <select
                  onChange={(e) => {
                    dispatch({
                      type: actionTypes.SET_SELECTED_ACTIVITY,
                      payload: JSON.parse(e.target.value),
                    });
                  }}
                >

                  {layout?.map((data) => {
                    return (
                      <option key="" selected={data.title === title ? true : false} value={JSON.stringify(data)}>
                        {data.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            )} */}
          </div>
        )}
        {/* {!activity && (
          <form className="radio-group">
            <div className={activtyMethod !== 'upload' ? 'radio-button active-radio' : 'radio-button'}>
              <input
                onClick={() => {
                  changeScreenHandler('layout', 'create');
                }}
                name="selecttype"
                type="radio"
                className="input"
                id="Create new activity"
                checked={activtyMethod !== 'upload' ? true : false}
              />
              <label for="Create new activity">Create new activity</label>
            </div>
            <div className={activtyMethod === 'upload' ? 'radio-button active-radio' : 'radio-button'}>
              <input
                onClick={() => {
                  changeScreenHandler('addactivity', 'upload');
                }}
                name="selecttype"
                type="radio"
                className="input"
                checked={activtyMethod === 'upload' ? true : false}
                id="Upload activity"
              />
              <label for="Upload activity">Upload activity</label>
            </div>
          </form>
        )} */}
        <div className="add-activity-layout-formik-videoTag">
          <div className="add-activity-layout-formik">
            <Formik
              initialValues={{
                author_tag_id: selecteAuthorTags || '',
                education_level_id: selectedEducationLevel || '',
                subject_id: selectedSubjects || '',
                thumb_url: activity?.thumb_url || 'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
                title: activity?.title || '',
                description: activity?.description || '',
              }}
              enableReinitialize
              innerRef={formRef}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = 'Required';
                } else if (values.title.length > 255) {
                  errors.title = 'Length should be less then 255';
                }

                return errors;
              }}
              onSubmit={(values) => {
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
                setFieldValue,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  {/* <h4 className="interactive-video-heading-two">Describe {exploreCheck ? 'Activity' : 'layout'}</h4> */}
                  <h4 className="interactive-video-heading-two">Activity Details</h4>
                  <div className="layout-title-formik-textField">
                    <div className="d-flex">
                      <HeadingThree text="Title" color="#515151" className="textField-title" />
                      <OverlayTriggerPop showMessage={'right'} icon={faExclamationCircle}>
                        Used for searching, reports and copyright information
                      </OverlayTriggerPop>
                    </div>
                    {/* <HeadingText text="Used for searching, reports and copyright information" color="#515151" className="textField-detailText" /> */}
                    <input
                      type="text"
                      name="title"
                      placeholder="Give your activity a name..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={parser.parseFromString(values.title, 'text/html').body.textContent}
                    />
                    <div style={{ color: 'red' }}>{errors.title && touched.title && errors.title}</div>
                  </div>
                  <div className="dec-title-formik-textField">
                    <span>Description</span>
                    <textarea
                      rows="4"
                      cols="4"
                      name="description"
                      placeholder="Enter a brief description of your activity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>
                  <div className="layout-formik-select" id="layout-formik-select-id-btn">
                    <div className="formik-select mr-16">
                      <HeadingText text="Subject" className="formik-select-title" />
                      <ReactMultiSelectCheckboxes
                        name="subject_id"
                        hideSearch
                        options={subjects}
                        onChange={(e) => {
                          setFieldValue('subject_id', e);
                        }}
                        value={values.subject_id}
                      />
                    </div>

                    <div className="formik-select mr-16">
                      <HeadingText text="Education Level" className="formik-select-title" />
                      <ReactMultiSelectCheckboxes
                        name="education_level_id"
                        hideSearch
                        options={educationLevels}
                        onChange={(e) => {
                          setFieldValue('education_level_id', e);
                        }}
                        value={values.education_level_id}
                      />
                    </div>

                    <div className="formik-select">
                      <HeadingText text="Author Tags" className="formik-select-title" />
                      <ReactMultiSelectCheckboxes
                        name="author_tag_id"
                        hideSearch
                        options={authorTags}
                        onChange={(e) => {
                          setFieldValue('author_tag_id', e);
                        }}
                        value={values.author_tag_id}
                      />
                    </div>
                  </div>
                  <div className="formik-uploadimage">
                    <UploadImageV2
                      formRef={formRef}
                      setUploadImageStatus={setUploadImageStatus}
                      thumb_url={activity?.thumb_url}
                      containerType="Activity"
                      setshowSmythsonianModal={setshowSmythsonianModal}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="add-activity-layout-videoTag">
            <HeadingThree
              // text={activtyMethod === 'upload' ? 'Upload existing activity' : activity ? 'Edit layout' : `Create ${exploreCheck ? 'Activity' : 'layout'}`}
              text="Launch Activity Editor"
              color="#084892"
              className="layout-add-activity-title"
            />

            <HeadingText
              // text={
              //   activtyMethod === 'upload'
              //     ? 'Upload an activity from an existing H5P file. '
              //     : activity
              //     ? 'Start editing activity by opening the editor. Once you finish, hit the Save & Close button to see your results.'
              //     : 'Start adding activity by opening the editor. Once you finish, hit the Save & Close button to see your results.'
              // }
              text={`It's time to create your activity! Follow the on-screen prompts by adding content, media, and learner feedback.`}
              color="#515151"
            />
            <div className="d-flex">
              {activtyMethod !== 'upload' && (
                <div className="add-activity-btns">
                  <Buttons
                    text="Open Editor"
                    primary={true}
                    width="142px"
                    height="35px"
                    onClick={() => {
                      formRef.current.handleSubmit();
                      if (formRef.current.values.title && formRef.current.values.title.length < 255) {
                        if (!showSmythsonianModal) {
                          setModalShow(true);
                        }
                      }
                    }}
                    hover={true}
                    className="mr-10"
                  />
                </div>
              )}
              {activity && (
                <div className="add-activity-btns">
                  <Buttons
                    text="Save"
                    secondary={true}
                    width="142px"
                    height="35px"
                    onClick={async () => {
                      await formRef.current.handleSubmit();
                      if (formRef.current.values.title && formRef.current.values.title.length < 255) {
                        dispatch(editResourceMetaDataAction(activity, formRef.current.values));
                      }
                    }}
                    hover={true}
                    className="ml-3"
                  />
                </div>
              )}
            </div>

            {activtyMethod === 'upload' && (
              <div className="existing-activity-dialog">
                <UploadFile metadata={formData} formRef={formRef} activityPreview={activityPreview} />
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
