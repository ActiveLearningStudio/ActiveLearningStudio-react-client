/*eslint-disable*/
import React from "react";
import { Formik } from "formik";
import Buttons from "utils/Buttons/buttons";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import TabsHeading from "utils/Tabs/tabs";

import "../style.scss";

const MatadataForm = ({ handleCloseProjectModal }) => {
  return (
    <div className="w-100 h-100">
      <div className="add-c2e-form-tabs">
        <TabsHeading text="1. Metadata" tabActive />
        <TabsHeading text="2. Manifest" className="ml-10" />
        <TabsHeading text="3. License" className="ml-10" />
      </div>

      <Headings
        text="C2E Metadata Details"
        headingType="h3"
        color="#084892"
      />
      <Formik
        initialValues={{
          authorEmail: "",
          title: "",
          description: "",
          authorName: "",
          authorUrl: "",
          publisherName: "",
          publisherEmail: "",
          publisherUrl: "",
          version: "",
          price: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.authorEmail) {
            errors.authorEmail = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.authorEmail
            )
          ) {
            errors.authorEmail = "Invalid email address";
          }

          if (!values.publisherEmail) {
            errors.publisherEmail = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.publisherEmail
            )
          ) {
            errors.publisherEmail = "Invalid email address";
          }
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.description) {
            errors.description = "Required";
          }
          if (!values.authorName) {
            errors.authorName = "Required";
          }

          if (!values.authorUrl) {
            errors.authorUrl = "Required";
          }
          if (!values.publisherName) {
            errors.publisherName = "Required";
          }
          if (!values.publisherUrl) {
            errors.publisherUrl = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="form-inputs">
              <div className="">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="C2E Title #1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <span className="validation-error">
                  {" "}
                  {errors.title && touched.title && errors.title}{" "}
                </span>
              </div>
              <div className="">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Enter a brief description of your activity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />

                <span className="validation-error">
                  {" "}
                  {errors.description &&
                    touched.description &&
                    errors.description}{" "}
                </span>
              </div>
              <div className="w-100 d-flex align-items-start flex-input">
                <div className="w-100">
                  <label>Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    placeholder="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.authorName}
                  />

                  <span className="validation-error">
                    {" "}
                    {errors.authorName &&
                      touched.authorName &&
                      errors.authorName}{" "}
                  </span>
                </div>
                <div className="w-100">
                  <label>Author Email</label>
                  <input
                    type="email"
                    name="authorEmail"
                    placeholder="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.authorEmail}
                  />

                  <span className="validation-error">
                    {" "}
                    {errors.authorEmail &&
                      touched.authorEmail &&
                      errors.authorEmail}{" "}
                  </span>
                </div>
              </div>
              <div className="">
                <label>Author Url</label>

                <input
                  type="text"
                  name="authorUrl"
                  placeholder="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.authorUrl}
                />

                <span className="validation-error">
                  {" "}
                  {errors.authorUrl &&
                    touched.authorUrl &&
                    errors.authorUrl}{" "}
                </span>
              </div>
              <div className="w-100 d-flex align-items-start flex-input">
                <div className="w-100">
                  <label>Publisher Name</label>
                  <input
                    type="text"
                    name="publisherName"
                    placeholder="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.publisherName}
                  />

                  <span className="validation-error">
                    {" "}
                    {errors.publisherName &&
                      touched.publisherName &&
                      errors.publisherName}{" "}
                  </span>
                </div>
                <div className="w-100">
                  <label>Publisher Email</label>
                  <input
                    type="email"
                    name="publisherEmail"
                    placeholder="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.publisherEmail}
                  />

                  <span className="validation-error">
                    {" "}
                    {errors.publisherEmail &&
                      touched.publisherEmail &&
                      errors.publisherEmail}{" "}
                  </span>
                </div>
              </div>
              <div className="">
                <label>Publisher Url</label>
                <input
                  type="text"
                  name="publisherUrl"
                  placeholder="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.publisherUrl}
                />

                <span className="validation-error">
                  {" "}
                  {errors.publisherUrl &&
                    touched.publisherUrl &&
                    errors.publisherUrl}{" "}
                </span>
              </div>
              <div className="">
                <label>Version</label>

                <input
                  type="text"
                  name="version"
                  placeholder="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.version}
                />
              </div>

              <div className="">
                <label>Price</label>

                <input
                  type="text"
                  name="price"
                  placeholder="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />

                <span className="validation-error">
                  {" "}
                  {errors.price && touched.price && errors.price}{" "}
                </span>
              </div>
            </div>
            {/* <button type="submit" disabled={isSubmitting}>
                  Submit
                </button> */}
            <div className="d-flex align-items-center justify-content-end">
              <Buttons
                text="Cancel"
                secondary={true}
                width="auto"
                height="32px"
                onClick={() => handleCloseProjectModal(false)}
                hover={true}
                type="button"
              />
              <Buttons
                text="Save & Next"
                primary={true}
                width="auto"
                height="32px"
                hover={true}
                className="ml-3"
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default MatadataForm;
