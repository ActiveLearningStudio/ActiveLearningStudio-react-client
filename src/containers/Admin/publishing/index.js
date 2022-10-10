/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable  */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import updateImg from '../../../assets/images/update1.svg';
import { updateOrganizationGcrSettings } from 'store/actions/organization';
const Index = () => {
  const dispatch = useDispatch();
  const { allMediaSources, orgMediaSources, allIv } = useSelector((state) => state.admin);
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const [publish_Settings, setpublish_Settings] = useState([]);

  return (
    <>
      <div className="media-section">
        <div className="box-group">
          <Formik
            initialValues={{
              gcr_activity: activeOrganization?.gcr_activity_visibility,
              gcr_playlist: activeOrganization?.gcr_playlist_visibility,
              gcr_project: activeOrganization?.gcr_project_visibility,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              console.log('values', values);
              // const response = await dispatch(updateOrganizationGcrSettings(values, activeOrganization?.id));
            }}
          >
            {({ handleSubmit, handleBlur, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="sources-section">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3>Permissions to publish</h3>
                    <div className="button-group">
                      <button type="submit" className="update-permission">
                        <img src={updateImg} alt="update" />
                        <span>Update</span>
                      </button>
                    </div>
                  </div>

                  <div className="sources-options">
                    <div className="sources-options-all">
                      <div className="media-field-checkbox">
                        <div>
                          <input
                            name="publish_all"
                            type="checkbox"
                            label="Selectall"
                            checked={values.gcr_activity && values.gcr_playlist && values.gcr_project ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue('gcr_activity', true);
                                setFieldValue('gcr_playlist', true);
                                setFieldValue('gcr_project', true);
                              } else {
                                setFieldValue('gcr_activity', false);
                                setFieldValue('gcr_playlist', false);
                                setFieldValue('gcr_project', false);
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                    </div>

                    <div className="sources-sub">
                      <div>
                        <div className="media-version-options">
                          <div className="media-field-checkbox">
                            <input
                              name="activity"
                              type="checkbox"
                              className="media-sources-checkboxes "
                              checked={values.gcr_activity}
                              onChange={(e) => {
                                setFieldValue('gcr_activity', !values.gcr_activity);
                              }}
                            />
                            <span id="span-sub-selected" className="span-sub">
                              Activity
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sources-sub" style={{ marginTop: '14px' }}>
                      <div>
                        <div className="media-version-options">
                          <div className="media-field-checkbox">
                            <input
                              name="playlist"
                              type="checkbox"
                              className="media-sources-checkboxes"
                              checked={values.gcr_playlist}
                              onChange={(e) => {
                                setFieldValue('gcr_playlist', !values.gcr_playlist);
                              }}
                            />
                            <span id="span-sub-selected" className="span-sub">
                              Playlist
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sources-sub" style={{ marginTop: '14px' }}>
                      <div>
                        <div className="media-version-options">
                          <div className="media-field-checkbox">
                            <input
                              name="project"
                              type="checkbox"
                              className="media-sources-checkboxes"
                              checked={values.gcr_project}
                              onChange={(e) => {
                                setFieldValue('gcr_project', !values.gcr_project);
                              }}
                            />
                            <span id="span-sub-selected" className="span-sub">
                              Project
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <Alert variant="warning">Loading...</Alert> */}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
