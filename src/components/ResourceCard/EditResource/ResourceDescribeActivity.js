import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Swal from 'sweetalert2';

import { required, FadeDiv } from 'utils';
import {
  uploadResourceThumbnailAction,
  showBuildActivityAction,
  onSubmitDescribeActivityAction,
  uploadResourceThumbnail,
} from 'store/actions/resource';
import PexelsAPI from 'components/models/pexels';
import { subjects, educationLevels } from 'components/ResourceCard/AddResource/dropdownData';
import computer from 'assets/images/computer.svg';
import pexel from 'assets/images/pexel.png';
import EditResourceSidebar from './EditResourceSidebar';
import MetaTitleInputField from '../fields/MetaTitleInputField';
import MetaSubjectsField from '../fields/MetaSubjectsField';
import MetaEducationLevelInputField from '../fields/MetaEducationLevelInputField';

export const uploadThumb = async (e, props) => {
  const formData = new FormData();
  try {
    formData.append('thumb', e.target.files[0]);
    await props.uploadResourceThumbnail(formData);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Image upload failed, kindly try again',
    });
  }
};

const imageValidation = '';
const onSubmit = async (values, dispatch, props) => {
  if (values.metaTitle.length > 80) {
    Swal.fire('Title must be 80 characters or less');
    return;
  }
  try {
    props.onSubmitDescribeActivity(values, props.match.params.activityId);
    dispatch(props.showBuildActivity(null, null, props.match.params.activityId)); // show create resource activity wizard
  } catch (e) {
    // console.log(e.message);
  }
};

let ResourceDescribeActivity = (props) => {
  const { resource, handleSubmit, uploadResourceThumbnailDefault } = props;
  const [modalShow, setModalShow] = useState(false);
  const openFile = useRef();

  useEffect(() => {
    uploadResourceThumbnailDefault(resource.editResource.metadata.thumbUrl);
  }, [resource.editResource.metadata.thumbUrl, uploadResourceThumbnailDefault]);

  return (
    <div className="row">
      <div className="col-md-3">
        <EditResourceSidebar {...props} />
      </div>

      <div className="col-md-9">
        <div className="resource-question">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Describe Activity:</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="describe-activity-wrapper">
                  <form className="meta-form" onSubmit={handleSubmit} autoComplete="off">
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
                          <label><h2>Subject</h2></label>
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
                          <label><h2>Education Level</h2></label>
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

                          {resource.editResource.metadata.thumbUrl ? (
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
                                  backgroundImage: resource.editResource.metadata.thumbUrl.includes('pexels.com')
                                    ? `url(${resource.editResource.metadata.thumbUrl})`
                                    : `url(${global.config.resourceUrl}${resource.editResource.metadata.thumbUrl})`,
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
                        <button type="submit" className="add-resource-continue-btn">Continue</button>
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
        searchName="abstract"
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

ResourceDescribeActivity.propTypes = {
  resource: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  uploadResourceThumbnailDefault: PropTypes.func.isRequired,
};

ResourceDescribeActivity = reduxForm({
  form: 'describeActivityForm',
  enableReinitialize: true,
  onSubmit,
})(ResourceDescribeActivity);

const mapDispatchToProps = (dispatch) => ({
  showBuildActivity: (editor, editorType, id) => dispatch(showBuildActivityAction(editor, editorType, id)),
  onSubmitDescribeActivity: (metadata, id) => dispatch(onSubmitDescribeActivityAction(metadata, id)),
  uploadResourceThumbnailDefault: (url) => dispatch(uploadResourceThumbnail(url)),
  uploadResourceThumbnail: (formData) => dispatch(uploadResourceThumbnailAction(formData)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
  initialValues: {
    metaTitle: state.resource.editResource.metadata.title,
    metaSubject: state.resource.editResource.metadata.subjectId,
    metaEducationLevels: state.resource.editResource.metadata.educationLevelId,
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceDescribeActivity),
);
