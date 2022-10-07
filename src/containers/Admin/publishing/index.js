/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable array-callback-return */
/* eslint-disable  */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import updateImg from '../../../assets/images/update1.svg';
const gcr_publishing = [
  {
    name: 'gcr_activity',
    checked: true,
  },
  {
    name: 'gcr_playlist',
    checked: true,
  },
  {
    name: 'gcr_project',
    checked: true,
  },
];
const Index = () => {
  const dispatch = useDispatch();
  const { allMediaSources, orgMediaSources, allIv } = useSelector((state) => state.admin);
  const organization = useSelector((state) => state.organization);
  const { activeOrganization } = organization;
  const [publish_Settings, setpublish_Settings] = useState([]);
  useEffect(() => {
    setpublish_Settings(gcr_publishing);
  });
  return (
    <>
      <div className="media-section">
        <div className="box-group">
          <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async (values) => {
              alert(values.mydivice);
            }}
          >
            {({ handleSubmit, handleBlur, values }) => (
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
                            checked={true}
                            onChange={() => {
                              setpublish_Settings(publish_Settings?.filter((d) => d.checked === true));
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                    </div>
                    {publish_Settings &&
                      publish_Settings.map((publisher) => {
                        return (
                          <div className="sources-sub">
                            <div>
                              <div className="media-version-options">
                                <div className="media-field-checkbox">
                                  <input name={publisher.name} type="checkbox" className="media-sources-checkboxes " checked={publisher.checked} />
                                  <span id="span-sub-selected" className="span-sub">
                                    Activity
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
