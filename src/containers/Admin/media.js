/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMediaSources,
  getOrganizationMedaiSource,
  updateOrganizationMedaiSource,
} from "store/actions/admin";

const Media = () => {
  const dispatch = useDispatch();
  const { allMediaSources, orgMediaSources } = useSelector(
    (state) => state.admin
  );
  const organization = useSelector((state) => state.organization);
  const [allVideoSource, setallVideoSource] = useState([]);
  const [allImageSource, setallImageSource] = useState([]);
  const [orgVideoSource, setorgVideoSource] = useState([]);
  const [orgImageSource, setorgImageSource] = useState([]);
  const { activeOrganization, currentOrganization } = organization;
  useEffect(() => {
    if (activeOrganization?.id) {
      dispatch(getAllMediaSources());
      dispatch(getOrganizationMedaiSource(activeOrganization?.id));
    }
  }, [activeOrganization]);
  useEffect(() => {
    if (orgMediaSources?.mediaSources?.length > 0) {
      setorgVideoSource(
        orgMediaSources?.mediaSources?.filter(
          (videoSource) => videoSource.media_type === "Video"
        )
      );
    } else {
      setorgVideoSource([]);
    }
    if (orgMediaSources?.mediaSources?.length > 0) {
      setorgImageSource(
        orgMediaSources?.mediaSources?.filter(
          (videoSource) => videoSource.media_type === "Image"
        )
      );
    } else {
      setorgImageSource([]);
    }

    setallVideoSource(allMediaSources?.mediaSources?.Video);
    setallImageSource(allMediaSources?.mediaSources?.Image);
  }, [orgMediaSources, allMediaSources]);
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
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="sources-section">
                  <h3>Video sources</h3>
                  {allMediaSources?.mediaSources?.Video ? (
                    <div className="sources-options">
                      <div className="sources-options-all">
                        <div className="media-field-checkbox">
                          <input
                            name="videoall"
                            type="checkbox"
                            label="Selectall"
                            onChange={(e) => {
                              console.log("e", e.target.checked);
                              if (e.target.checked) {
                                setorgVideoSource([]);
                                setorgVideoSource(allVideoSource);
                              } else {
                                setorgVideoSource([]);
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                      {/* Option video sources */}
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Video?.map(
                            (source) => {
                              const isVideoSource = orgVideoSource?.filter(
                                (orgVideo) => orgVideo.name === source.name
                              );
                              return (
                                <div className="media-field-checkbox">
                                  <input
                                    name={source.name}
                                    type="checkbox"
                                    className="media-sources-checkboxes"
                                    checked={
                                      isVideoSource?.length > 0 ? true : false
                                    }
                                    onChange={(e) => {
                                      console.log("e", e.target.checked);
                                      const media_ids = orgVideoSource?.map(
                                        (orgSource) => {
                                          return orgSource.id;
                                        }
                                      );
                                      console.log("ids", media_ids);
                                      if (e.target.checked) {
                                        setorgVideoSource([
                                          ...orgVideoSource,
                                          source,
                                        ]);

                                        dispatch(
                                          updateOrganizationMedaiSource(
                                            activeOrganization?.id,
                                            media_ids
                                          )
                                        );
                                      } else {
                                        setorgVideoSource(
                                          orgVideoSource?.filter(
                                            (videoSource) =>
                                              videoSource.name !== source.name
                                          )
                                        );
                                        dispatch(
                                          updateOrganizationMedaiSource(
                                            activeOrganization?.id,
                                            media_ids
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <span
                                    id={source.name && "span-sub-selected"}
                                    className="span-sub"
                                  >
                                    {source.name}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert variant="warning">Loading...</Alert>
                  )}
                </div>

                {/* Image sources */}
                <div className="sources-section">
                  <h3>Image sources</h3>
                  {allMediaSources.mediaSources?.Image ? (
                    <div className="sources-options">
                      <div className="sources-options-all">
                        <div className="media-field-checkbox">
                          <input
                            name="imageall"
                            type="checkbox"
                            label="Selectall"
                            onChange={(e) => {
                              const media_ids = orgImageSource?.map(
                                (orgSource) => {
                                  return orgSource.id;
                                }
                              );
                              if (e.target.checked) {
                                setorgImageSource([]);
                                setorgImageSource(allImageSource);
                                dispatch(
                                  updateOrganizationMedaiSource(
                                    activeOrganization?.id,
                                    media_ids
                                  )
                                );
                              } else {
                                setorgImageSource([]);
                                dispatch(
                                  updateOrganizationMedaiSource(
                                    activeOrganization?.id,
                                    media_ids
                                  )
                                );
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                      {/* Option video sources */}
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Image?.map(
                            (source) => {
                              const isImageSource = orgImageSource?.filter(
                                (orgVideo) => orgVideo.name === source.name
                              );
                              return (
                                <div className="media-field-checkbox">
                                  <input
                                    name={source.name}
                                    type="checkbox"
                                    checked={
                                      isImageSource?.length > 0 ? true : false
                                    }
                                    onChange={(e) => {
                                      console.log("e", e.target.checked);
                                      if (e.target.checked) {
                                        setorgImageSource([
                                          ...orgImageSource,
                                          source,
                                        ]);
                                      } else {
                                        setorgImageSource(
                                          orgImageSource?.filter(
                                            (videoSource) =>
                                              videoSource.name !== source.name
                                          )
                                        );
                                      }
                                    }}
                                  />
                                  <span
                                    id={source.name && "span-sub-selected"}
                                    className="span-sub"
                                  >
                                    {source.name}
                                  </span>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert variant="warning">Loading...</Alert>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Media;
