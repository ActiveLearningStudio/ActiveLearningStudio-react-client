/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllMediaSources } from "store/actions/admin";

const Media = () => {
  const dispatch = useDispatch();
  const { allMediaSources } = useSelector((state) => state.admin);
  const MyCustomFieldTick = ({ field }) => {
    return (
      <>
        <label className="checkbox_section_media">
          <input type="checkbox" {...field} className="bg-tick" />
          <span></span>
        </label>
      </>
    );
  };
  const MyCustomFieldMinus = ({ field }) => {
    return (
      <>
        <label className="checkbox_section_media">
          <input type="checkbox" {...field} className="bg-minus" />
          <span></span>
        </label>
      </>
    );
  };
  useEffect(() => {
    (async () => {
      await dispatch(getAllMediaSources());
    })();
  }, []);
  console.log("all", allMediaSources);
  return (
    <>
      <div className="media-section">
        <div className="box-group">
          <Formik
            initialValues={{
              mydivice: false,
              YouTube: false,
              Kaltura: false,
              SafariMontage: false,
              BrightCove: false,
              Vimeo: false,
              mydivice_image: false,
              Pexels: false,
              SafariMontage_i: false,
              others: false,
              imageall: false,
              videoall: false,
            }}
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
                          <Field
                            name="videoall"
                            type="checkbox"
                            label="Selectall"
                            component={MyCustomFieldMinus}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                      {/* Option video sources */}
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Video?.map(
                            (source) => {
                              return (
                                <div className="media-field-checkbox">
                                  <Field
                                    name={source.name}
                                    type="checkbox"
                                    component={MyCustomFieldTick}
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
                    <Alert variant="warning">No media Source Found</Alert>
                  )}
                </div>

                {/* Image sources */}
                <div className="sources-section">
                  <h3>Image sources</h3>
                  {allMediaSources.mediaSources?.Image ? (
                    <div className="sources-options">
                      <div className="sources-options-all">
                        <div className="media-field-checkbox">
                          <Field
                            name="imageall"
                            type="checkbox"
                            label="Selectall"
                            component={MyCustomFieldMinus}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                      </div>
                      {/* Option video sources */}
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Image?.map(
                            (source) => {
                              return (
                                <div className="media-field-checkbox">
                                  <Field
                                    name={source.name}
                                    type="checkbox"
                                    component={MyCustomFieldTick}
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
                    <Alert variant="warning">No Image Source Found</Alert>
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
