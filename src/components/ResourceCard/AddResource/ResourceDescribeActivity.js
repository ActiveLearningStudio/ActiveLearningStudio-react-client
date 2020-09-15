import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import { required, FadeDiv } from 'utils';
import {
  showBuildActivityAction,
  onSubmitDescribeActivityAction,
  showSelectActivityAction,
  uploadResourceThumbnail,
  uploadResourceThumbnailAction,
} from 'store/actions/resource';
import MetaTitleInputField from 'components/ResourceCard/fields/MetaTitleInputField';
import MetaSubjectsField from 'components/ResourceCard/fields/MetaSubjectsField';
import MetaEducationLevelInputField from 'components/ResourceCard/fields/MetaEducationLevelInputField';
import PexelsAPI from 'components/models/pexels';

import computer from 'assets/images/computer.svg';
import pexel from 'assets/images/pexel.png';
import { subjects, educationLevels } from './dropdownData';
import AddResourceSidebar from './AddResourceSidebar';

import './style.scss';

let imageValidation = '';

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('thumb', e.target.files[0]);

    imageValidation = '';
    const result = props.uploadResourceThumbnailAction(formData);
    result.then().catch((err) => {
      if (err.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.errors[0],
        });
      }
    });
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Invalid Image',
    });
  }
};

let ResourceDescribeActivity = (props) => {
  const { resource, handleSubmit, goBackToActivity } = props;
  const [modalShow, setModalShow] = useState(false);
  const openFile = useRef();

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
                    <FontAwesomeIcon icon="chevron-left" className="mr-2" />
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
                    <div className="flex-form-imag-upload">
                      <div className="">
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
                      </div>
                    </div>

                    <div className="upload-thumbnail check">
                      <div className="upload_placeholder">
                        <label style={{ display: 'none' }}>
                          <input
                            ref={openFile}
                            type="file"
                            onChange={(e) => {
                              if (e.target.files.length === 0) {
                                return true;
                              } if (!(e.target.files[0].type.includes('png') || e.target.files[0].type.includes('jpg')
                                || e.target.files[0].type.includes('gif') || e.target.files[0].type.includes('jpeg'))) {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Error',
                                  text: 'Invalid file selected',
                                });
                              } else if (e.target.files[0].size > 100000) {
                                Swal.fire({
                                  icon: 'error',
                                  title: 'Error',
                                  text: 'Selected file size should be less then 100KB',
                                });
                              } else {
                                uploadThumb(e, props);
                              }
                            }}
                            accept="image/x-png,image/jpeg"
                          />
                          <span>Upload</span>
                        </label>

                        <span className="validation-error">
                          {imageValidation}
                        </span>

                        <div>
                          {resource.progress}

                          {resource.newResource.metadata.thumbUrl ? (
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

                              <div
                                className="imgbox"
                                style={{
                                  backgroundImage: resource.newResource.metadata.thumbUrl.includes('pexels.com')
                                    ? `url(${resource.newResource.metadata.thumbUrl})`
                                    : `url(${global.config.resourceUrl}${resource.newResource.metadata.thumbUrl})`,
                                }}
                              />
                            </div>
                          ) : (
                            <div className="new-box">
                              <h2>Default Selected thumbnail</h2>
                              <div className="imgbox">
                                {/* eslint-disable-next-line max-len */}
                                <img
                                  src="https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280"
                                  alt=""
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="button-flex">
                          <h2>Change thumbnail from below options</h2>

                          <div
                            className="pexel"
                            onClick={() => setModalShow(true)}
                          >
                            <img src={pexel} alt="pexel" />
                            <p>Select from Pexels</p>
                          </div>

                          <div
                            className="gallery"
                            onClick={() => {
                              openFile.current.click();
                            }}
                          >
                            <img src={computer} alt="" />
                            <p>Upload a Photo From your computer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="disclaimer">
                      Activity Image dimension should be
                      {' '}
                      <strong>290px width and 200px height. </strong>
                      Maximun File size allowed is
                      {' '}
                      <strong>100KB.</strong>
                    </p>
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

      <PexelsAPI
        show={modalShow}
        resourceName={
          resource
          && resource.newResource
          && resource.newResource.activity
          && resource.newResource.activity.title
        }
        searchName={
          resource
          && resource.newResource
          && resource.newResource.activity
          && !!resource.newResource.activity.activity_thumbnail_text
            ? resource.newResource.activity.activity_thumbnail_text
            : resource.newResource.activity.title
        }
        onHide={() => setModalShow(false)}
      />
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

    if (values.metaTitle.length > 80) {
      Swal.fire('Title must be 80 characters or less');
      return;
    }

    try {
      // image validation
      if (!resource.newResource.metadata.thumbUrl) {
        props.uploadResourceThumbnail(
          'https://images.pexels.com/photos/3694708/pexels-photo-3694708.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
        );
      }
      onSubmitDescribeActivity(values);
      showBuildActivity(
        resource.newResource.activity.h5pLib,
        resource.newResource.activity.type,
      );
    } catch (e) {
      // console.log(e.message);
    }
  },
})(ResourceDescribeActivity);

const mapDispatchToProps = (dispatch) => ({
  showBuildActivity: (editor, editorType) => dispatch(showBuildActivityAction(editor, editorType)),
  onSubmitDescribeActivity: (metadata) => dispatch(onSubmitDescribeActivityAction(metadata)),
  uploadResourceThumbnail: (url) => dispatch(uploadResourceThumbnail(url)),
  uploadResourceThumbnailAction: (formData) => dispatch(uploadResourceThumbnailAction(formData)),
  goBackToActivity: () => dispatch(showSelectActivityAction()),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceDescribeActivity),
);
