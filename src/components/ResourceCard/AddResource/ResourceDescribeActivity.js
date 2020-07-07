import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  showBuildActivityAction,
  onSubmitDescribeActivityAction,
  showSelectActivity,
  uploadResourceThumbnailAction,
} from 'store/actions/resource';
import AddResourceSidebar from './AddResourceSidebar';
import MetaTitleInputField from '../fields/MetaTitleInputField';
import MetaSubjectsField from '../fields/MetaSubjectsField';
import MetaEducationLevelInputField from '../fields/MetaEducationLevelInputField';

import './style.scss';

const fadeAnimation = keyframes`${fadeIn}`;

const FadeDiv = styled.div`
  animation: 0.5s ${fadeAnimation};
`;

const required = (value) => (value ? undefined : '* Required');

// TODO: need to refactor code, remove constants

const subjects = [
  { subject: 'Arts', value: 'Arts' },
  {
    subject: 'Career & Technical Education',
    value: 'CareerTechnicalEducation',
  },
  { subject: 'Computer Science', value: 'ComputerScience' },
  { subject: 'Language Arts', value: 'LanguageArts' },
  { subject: 'Mathematics', value: 'Mathematics' },
  { subject: 'Science', value: 'Science' },
  { subject: 'Social Studies', value: 'SocialStudies' },
];

const educationLevels = [
  { name: 'Preschool (Ages 0-4)', value: '1' },
  { name: 'Kindergarten-Grade 2 (Ages 5-7)', value: '2' },
  { name: 'Grades 3-5 (Ages 8-10)', value: '3' },
  { name: 'Grades 6-8 (Ages 11-13)', value: '4' },
  { name: 'Grades 9-10 (Ages 14-16)', value: '5' },
  { name: 'Grades 11-12 (Ages 16-18)', value: '6' },
  { name: 'College & Beyond', value: '7' },
  { name: 'Professional Development', value: '8' },
  { name: 'Special Education', value: '9' },
];

let imageValidation = '';

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('uploads', e.target.files[0]);
    imageValidation = '';
    await props.uploadResourceThumbnail(formData);
  } catch (err) {
    console.log(err);
  }
};

let ResourceDescribeActivity = (props) => {
  const { resource, handleSubmit, goBackToActivity } = props;

  return (
    <div className="row">
      <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div>

      <div className="col-md-9">
        <div className="resource-question">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">
                  <div className="back-button" onClick={goBackToActivity}>
                    <FontAwesomeIcon icon="chevron-left" />
                    Back
                  </div>
                  Describe Activity:
                </h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="describe-activity-wrapper">
                  <form
                    className="meta-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="meta-title">
                          <Field
                            name="metaTitle"
                            component={MetaTitleInputField}
                            type="text"
                            label="Title"
                            validate={[required]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="upload-thumbnail">
                          <h2>Upload thumbnail</h2>

                          <label>
                            <input
                              type="file"
                              onChange={(e) => uploadThumb(e, props)}
                              accept="image/x-png,image/jpeg"
                            />
                            <span>Upload</span>
                          </label>

                          <span className="validation-error">
                            {imageValidation}
                          </span>

                          {resource.progress}

                          {resource.newResource.metadata.thumb_url && (
                            <div className="thumb-display">
                              <div
                                className="success"
                                style={{
                                  color: 'green',
                                  marginBottom: '20px',
                                  fontSize: '20px',
                                }}
                              >
                                Image Uploaded:
                              </div>

                              <div className="thumb">
                                <img
                                  src={`${global.config.laravelAPIUrl}${resource.newResource.metadata.thumb_url}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="meta-subjects">
                          <label>
                            <h2>Subject</h2>
                          </label>

                          <Field
                            name="metaSubject"
                            component={MetaSubjectsField}
                            data={subjects}
                            valueField="value"
                            textField="subject"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="meta-education-levels">
                          <label>
                            <h2>Education Level</h2>
                          </label>

                          <Field
                            name="metaEducationLevels"
                            component={MetaEducationLevelInputField}
                            data={educationLevels}
                            valueField="value"
                            textField="name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="submit" className="add-resource-continue-btn">
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceDescribeActivity.propTypes = {
  resource: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  goBackToActivity: PropTypes.func.isRequired,
};

ResourceDescribeActivity = reduxForm({
  form: 'describeActivityForm',
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    const { resource, showBuildActivity, onSubmitDescribeActivity } = props;

    try {
      // image validation
      if (!resource.newResource.metadata.thumb_url) {
        imageValidation = '* Required';
        return false;
      }
      onSubmitDescribeActivity(values);
      showBuildActivity(
        resource.newResource.activity.h5pLib,
        resource.newResource.activity.type,
      );
    } catch (e) {
      console.log(e.message);
    }
  },
})(ResourceDescribeActivity);

const mapDispatchToProps = (dispatch) => ({
  showBuildActivity: (editor, editorType) => dispatch(showBuildActivityAction(editor, editorType)),
  onSubmitDescribeActivity: (metadata) => dispatch(onSubmitDescribeActivityAction(metadata)),
  uploadResourceThumbnail: (formData) => dispatch(uploadResourceThumbnailAction(formData)),
  goBackToActivity: () => dispatch(showSelectActivity()),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceDescribeActivity),
);
