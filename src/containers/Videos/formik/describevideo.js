/*eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import TabsHeading from 'utils/Tabs/tabs';

import { Formik } from 'formik';
import Buttons from 'utils/Buttons/buttons';

import { useSelector, useDispatch } from 'react-redux';
import UploadImage from 'utils/uploadimagev2/uploadimagev2';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingThree from 'utils/HeadingThree/headingthree';
import DefaultUpload from 'assets/images/defaultUpload.png';
import PreviewLayoutModel from 'containers/MyProject/model/previewlayout';
import { getSubjects, getEducationLevel, getAuthorTag } from 'store/actions/admin';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const DescribeVideo = ({ setUploadImageStatus, setScreenStatus, setOpenVideo, showback, changeScreenHandler, reverseType, playlistPreview, activityPreview }) => {
  const [modalShow, setModalShow] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const { videoId, platform, editVideo, activecms } = useSelector((state) => state.videos);
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState(null);
  const [authorTags, setAuthorTags] = useState(null);
  const [educationLevels, setEducationLevels] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState(null);
  const [selecteAuthorTags, setSelecteAuthorTags] = useState(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
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
    if (editVideo?.subjects && !selectedSubjects) {
      let output = subjects?.filter((obj) => formatApiData(editVideo?.subjects).indexOf(obj.value) !== -1);
      setSelectedSubjects(output);
    }
    if (editVideo?.author_tags && !selecteAuthorTags) {
      let output = authorTags?.filter((obj) => formatApiData(editVideo?.author_tags).indexOf(obj.value) !== -1);
      setSelecteAuthorTags(output);
    }

    if (editVideo?.education_levels && !selectedEducationLevel) {
      let output = educationLevels?.filter((obj) => formatApiData(editVideo?.education_levels).indexOf(obj.value) !== -1);
      setSelectedEducationLevel(output);
    }
  });

  const primaryColor = getGlobalColor('--main-primary-color');
  const formRef = useRef();
  return (
    <>
      <PreviewLayoutModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        type={playlistPreview ? '' : 'videoModal'}
        activityPreview={activityPreview}
        title={videoTitle}
        video={videoId}
        formData={formRef.current?.values}
        editVideo={editVideo}
        setOpenVideo={setOpenVideo}
        accountId={activecms?.account_id}
        settingId={activecms?.id || editVideo?.brightcoveData?.apiSettingId}
        reverseType={reverseType}
      />
      <div className="add-describevideo-form">
        <div className="add-describevideo-tabs">
          <TabsHeading text={activityPreview ? '1. Add an activity' : '1. Add a video'} tabActive={true} />
          <TabsHeading text={activityPreview ? '1. Describe activity' : '2. Describe video'} className="ml-10" tabActive={true} />
          <TabsHeading text="3. Add interactions" className="ml-10" />
        </div>
        <div className="add-describevideo-title-select">
          <div className="add-video-title">
            <HeadingTwo text={activityPreview ? editVideo?.h5p_content?.library?.title : 'Interactive Video'} color="#084892" />
          </div>
          {!activityPreview && (
            <div
              className="back-button"
              id="back-button-none-bg"
              onClick={() => {
                if (showback) {
                  changeScreenHandler('addvideo');
                } else {
                  setScreenStatus('AddVideo');
                }
              }}
            >
              {/* <img src={BackButton} alt="back button " /> */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', marginTop: '4px' }}>
                <path d="M13 5L1 5" stroke={primaryColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5 1L1 5L5 9" stroke={primaryColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p className="">Back to options</p>
            </div>
          )}
          {/* <div className="add-describevideo-tour">
            <span>
              <FontAwesomeIcon icon={faClock} color="#084892" className="ml-9" />
              Tour
            </span>
          </div> */}
        </div>
        <div className="add-describevideo-section-layout-formik">
          <div className="add-describevideo-layout-formik">
            <Formik
              innerRef={formRef}
              enableReinitialize
              initialValues={{
                title: editVideo ? editVideo.title : '',
                description: editVideo ? editVideo.description || undefined : undefined,
                author_tag_id: selecteAuthorTags || '',
                education_level_id: selectedEducationLevel || '',
                subject_id: selectedSubjects || '',
                source_type: platform,
                source_url: videoId,
                thumb_url: editVideo?.thumb_url
                  ? editVideo.thumb_url
                  : 'https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = 'Required';
                }
                return errors;
              }}
              onSubmit={(values) => {
                setModalShow(true);
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <h4 className="interactive-video-heading-two">Describe layout</h4>
                  <div>
                    <div className="dec-title-formik-textField">
                      <HeadingThree text="Title" color="#515151" className="textField-title" />
                      <HeadingText text="Used for searching, reports and copyright information" color="#515151" className="textField-detailText" />
                      <input
                        type="text"
                        name="title"
                        placeholder="Give your layout a name..."
                        onChange={(e) => {
                          setFieldValue('title', e.target.value);
                          setVideoTitle(e.target.value);
                        }}
                        onBlur={handleBlur}
                        value={parser.parseFromString(values.title, 'text/html').body.textContent}
                      />
                    </div>
                    <div className="error" style={{ color: 'red' }}>
                      {errors.title && touched.title && errors.title}
                    </div>
                    <div className="dec-title-formik-textField">
                      <span>Description</span>
                      <textarea
                        rows="4"
                        cols="4"
                        name="description"
                        placeholder="What is this video about"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                      />
                    </div>
                    <div className="layout-formik-select">
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
                        <HeadingText text="Education level" className="formik-select-title" />
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
                      <UploadImage
                        title="Upload poster (Optional)"
                        defuaultImage={DefaultUpload}
                        className="uploadImage-describe-video"
                        setUploadImageStatus={setUploadImageStatus}
                        formRef={formRef}
                        thumb_url={editVideo?.thumb_url}
                      />
                    </div>
                  </div>
                  <div className="describe-video">
                    <h4 className="interactive-video-heading-two">Add Interactions</h4>
                    <p>Start adding activity by opening the editor. Once you finish, hit the Save & Close button to see your results."</p>
                    <Buttons primary={true} text="Add Interactions" width="162px" height="32px" hover={true} type="submit" />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescribeVideo;
