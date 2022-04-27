/* eslint-disable */
import React from "react";
import { Field, Formik } from "formik";

const Media = () => {
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
                        <div className="media-field-checkbox">
                          <Field
                            name="mydivice"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.mydivice && "span-sub-selected"}
                            className="span-sub"
                          >
                            My device
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="YouTube"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.YouTube && "span-sub-selected"}
                            className="span-sub"
                          >
                            YouTube
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="Kaltura"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.Kaltura && "span-sub-selected"}
                            className="span-sub"
                          >
                            Kaltura
                          </span>
                        </div>
                      </div>
                      <div className="ml-106">
                        <div className="media-field-checkbox">
                          <Field
                            name="SafariMontage"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.SafariMontage && "span-sub-selected"}
                            className="span-sub"
                          >
                            Safari Montage
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="BrightCove"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.BrightCove && "span-sub-selected"}
                            className="span-sub"
                          >
                            BrightCove
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="Vimeo"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.Vimeo && "span-sub-selected"}
                            className="span-sub"
                          >
                            Vimeo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image sources */}
                <div className="sources-section">
                  <h3>Image sources</h3>
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
                        <div className="media-field-checkbox">
                          <Field
                            name="mydivice_image"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.mydivice_image && "span-sub-selected"}
                            className="span-sub"
                          >
                            My device
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="Pexels"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.Pexels && "span-sub-selected"}
                            className="span-sub"
                          >
                            Pexels
                          </span>
                        </div>
                        <div className="media-field-checkbox">
                          <Field
                            name="SafariMontage_i"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.SafariMontage_i && "span-sub-selected"}
                            className="span-sub"
                          >
                            Safari Montage
                          </span>
                        </div>
                      </div>
                      <div className="ml-106">
                        <div className="media-field-checkbox">
                          <Field
                            name="others"
                            type="checkbox"
                            component={MyCustomFieldTick}
                          />
                          <span
                            id={values.others && "span-sub-selected"}
                            className="span-sub"
                          >
                            Others
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
