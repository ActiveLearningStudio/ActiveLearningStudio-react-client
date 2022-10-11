/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable  */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import updateImg from '../../../assets/images/update1.svg';
import { updateOrgGcrSettings } from 'store/actions/organization';
const Index = ({ msTeamTab }) => {
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
              gcr_activity_visibility: activeOrganization?.gcr_activity_visibility,
              gcr_playlist_visibility: activeOrganization?.gcr_playlist_visibility,
              gcr_project_visibility: activeOrganization?.gcr_project_visibility,
              msp_activity: true,
              msp_playlist: false,
              msp_project: true,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              if (msTeamTab) {
                console.log('values', values);
              } else {
                const response = await dispatch(updateOrgGcrSettings(values, activeOrganization?.id));
              }
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
                      <div className="media-field-checkbox align-items-baseline">
                        <div>
                          <input
                            name="publish_all"
                            type="checkbox"
                            label="Selectall"
                            checked={values.gcr_activity_visibility && values.gcr_playlist_visibility && values.gcr_project_visibility ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue('gcr_activity_visibility', true);
                                setFieldValue('gcr_playlist_visibility', true);
                                setFieldValue('gcr_project_visibility', true);
                              } else {
                                setFieldValue('gcr_activity_visibility', false);
                                setFieldValue('gcr_playlist_visibility', false);
                                setFieldValue('gcr_project_visibility', false);
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                        {msTeamTab && (
                          <div className="ms-team-lti-heading">
                            <h3>LTI information</h3>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="gcr-pblishing-feature">
                      <div className="gcr-checkboxes">
                        <div className="sources-sub">
                          <div>
                            <div className="media-version-options">
                              <div className="media-field-checkbox">
                                <input
                                  name="gcr_activity_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes "
                                  checked={values.gcr_activity_visibility}
                                  onChange={(e) => {
                                    setFieldValue('gcr_activity_visibility', !values.gcr_activity_visibility);
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
                                  name="gcr_playlist_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes"
                                  checked={values.gcr_playlist_visibility}
                                  onChange={(e) => {
                                    setFieldValue('gcr_playlist_visibility', !values.gcr_playlist_visibility);
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
                                  name="gcr_project_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes"
                                  checked={values.gcr_project_visibility}
                                  onChange={(e) => {
                                    setFieldValue('gcr_project_visibility', !values.gcr_project_visibility);
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
                      {msTeamTab && (
                        <div className="ms-team-settings">
                          <div className="ms-team-lti-info">
                            <label>LTI client ID</label>
                            <input name="ms_client_id" value="" />
                          </div>
                          <div className="ms-team-lti-info">
                            <label>LMS name</label>
                            <input name="ms_client_id" value="" />
                          </div>
                          <div className="ms-team-lti-info">
                            <label>Access key</label>
                            <input name="ms_client_id" value="" />
                          </div>
                          <div className="ms-team-lti-info">
                            <label>Secret key</label>
                            <input name="ms_client_id" value="" />
                          </div>
                        </div>
                      )}
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
