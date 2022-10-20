/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable  */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import updateImg from '../../../assets/images/update1.svg';
import { updateOrgGcrSettings } from 'store/actions/organization';
const MsTeamPublishing = () => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, permission } = organization;

  return (
    <>
      <div className="media-section">
        <div className="box-group">
          <Formik
            initialValues={{
              msteam_project_visibility: activeOrganization?.msteam_project_visibility,
              msteam_playlist_visibility: activeOrganization?.msteam_playlist_visibility,
              msteam_activity_visibility: activeOrganization?.msteam_activity_visibility,
              msteam_client_id: activeOrganization?.msteam_client_id,
              msteam_tenant_id: activeOrganization?.msteam_tenant_id,
              msteam_secret_id: activeOrganization?.msteam_secret_id,
              msteam_secret_id_expiry: activeOrganization?.msteam_secret_id_expiry,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              await dispatch(updateOrgGcrSettings(values, activeOrganization?.id, false));
            }}
          >
            {({ handleSubmit, handleBlur, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="sources-section">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3>Permissions to publish</h3>
                    {permission?.Organization.includes('organization:edit-microsoft-team') && (
                      <div className="button-group">
                        <button type="submit" className="update-permission">
                          <img src={updateImg} alt="update" />
                          <span>Update</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="sources-options">
                    <div className="sources-options-all">
                      <div className="media-field-checkbox align-items-baseline">
                        <div>
                          <input
                            name="publish_all"
                            type="checkbox"
                            label="Selectall"
                            checked={values.msteam_project_visibility && values.msteam_playlist_visibility && values.msteam_activity_visibility ? true : false}
                            onChange={(e) => {
                              if (permission?.Organization.includes('organization:edit-microsoft-team')) {
                                if (e.target.checked) {
                                  setFieldValue('msteam_activity_visibility', true);
                                  setFieldValue('msteam_playlist_visibility', true);
                                  setFieldValue('msteam_project_visibility', true);
                                } else {
                                  setFieldValue('msteam_project_visibility', false);
                                  setFieldValue('msteam_playlist_visibility', false);
                                  setFieldValue('msteam_activity_visibility', false);
                                }
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>

                        <div className="ms-team-lti-heading">
                          <h3>LTI information</h3>
                        </div>
                      </div>
                    </div>

                    <div className="gcr-pblishing-feature">
                      <div className="gcr-checkboxes">
                        <div className="sources-sub">
                          <div>
                            <div className="media-version-options">
                              <div className="media-field-checkbox">
                                <input
                                  name="msteam_activity_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes "
                                  checked={values.msteam_activity_visibility}
                                  onChange={(e) => {
                                    if (permission?.Organization.includes('organization:edit-microsoft-team')) {
                                      setFieldValue('msteam_activity_visibility', !values.msteam_activity_visibility);
                                    }
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
                                  name="msteam_playlist_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes"
                                  checked={values.msteam_playlist_visibility}
                                  onChange={(e) => {
                                    if (permission?.Organization.includes('organization:edit-microsoft-team')) {
                                      setFieldValue('msteam_playlist_visibility', !values.msteam_playlist_visibility);
                                    }
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
                                  name="msteam_project_visibility"
                                  type="checkbox"
                                  className="media-sources-checkboxes"
                                  checked={values.msteam_project_visibility}
                                  onChange={(e) => {
                                    if (permission?.Organization.includes('organization:edit-microsoft-team')) {
                                      setFieldValue('msteam_project_visibility', !values.msteam_project_visibility);
                                    }
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

                      <div className="ms-team-settings">
                        <div className="ms-team-lti-info">
                          <label>MS client ID</label>
                          <input
                            name="msteam_client_id"
                            value={values.msteam_client_id}
                            onChange={(e) => setFieldValue('msteam_client_id', e.target.value)}
                            readOnly={permission?.Organization.includes('organization:edit-microsoft-team') ? false : true}
                          />
                        </div>
                        <div className="ms-team-lti-info">
                          <label>MS Tenant ID</label>
                          <input
                            name="msteam_tenant_id"
                            value={values.msteam_tenant_id}
                            onChange={(e) => setFieldValue('msteam_tenant_id', e.target.value)}
                            readOnly={permission?.Organization.includes('organization:edit-microsoft-team') ? false : true}
                          />
                        </div>
                        <div className="ms-team-lti-info">
                          <label>MS Secret ID</label>
                          <input
                            name="msteam_secret_id"
                            value={values.msteam_secret_id}
                            onChange={(e) => setFieldValue('msteam_secret_id', e.target.value)}
                            readOnly={permission?.Organization.includes('organization:edit-microsoft-team') ? false : true}
                          />
                        </div>
                        <div className="ms-team-lti-info">
                          <label>MS Secret ID Expiry</label>
                          <input
                            name="msteam_secret_id_expiry"
                            value={values.msteam_secret_id_expiry}
                            onChange={(e) => setFieldValue('msteam_secret_id_expiry', e.target.value)}
                            readOnly={permission?.Organization.includes('organization:edit-microsoft-team') ? false : true}
                          />
                        </div>
                        {/* <div className="ms-team-lti-info">
                          <label>Secret key</label>
                          <input name="ms_client_id" value="" />
                        </div> */}
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

export default MsTeamPublishing;
