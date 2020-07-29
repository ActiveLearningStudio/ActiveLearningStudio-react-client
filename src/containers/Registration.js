import React, { useState } from "react";
import { Formik } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { form_registration } from "../actions/auth";

const Registration = () => {
  const [capctha, setCaptcha] = useState("test");

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          LastName: "",
          email: "",
          phone: "",
          jobTitle: "",
          school: "",
          websiteUrl: "",
          organization: "",
          message: "",
          captcha_google: capctha,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.firstName) {
            errors.firstName = "Required";
          }

          if (!values.LastName) {
            errors.LastName = "Required";
          }
          if (!values.captcha_google) {
            errors.captcha_google = "Required";
          }

          // if (values.phone.length < 7 ) {
          //   errors.phone = "phone number length must be 7 or gretaer ";
          // }

          return errors;
        }}
        onSubmit={(values) => {
          Swal.fire({
            title: "Sending...",
            onOpen: () => {
              swal.showLoading();
            },
          });
          form_registration(
            values.firstName,
            values.LastName,
            values.email,
            values.phone,
            values.jobTitle,
            values.school,
            values.websiteUrl,
            values.organization,
            values.message,
            values.captcha_google
          );
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
          <form onSubmit={handleSubmit} className="formRegister">
            <div className="half-group">
              <div className="form-group">
                <label>
                  First Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <div className="error">{errors.firstName} </div>
                )}
              </div>
              <div className="form-group">
                <label>
                  Last Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="LastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.LastName}
                />
                {errors.LastName && touched.LastName && (
                  <div className="error"> {errors.LastName} </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors.phone && touched.phone && errors.phone}
              </div>
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
              />
            </div>
            <div className="form-group">
              <label>School/District/Organization</label>

              <input
                type="text"
                name="school"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.school}
              />
            </div>
            <div className="form-group">
              <label>Website URL</label>
              <input
                type="text"
                name="websiteUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.websiteUrl}
              />
            </div>
            <div className="form-group">
              <label>Organization type</label>
              <p>
                Which of the following best describes you or your organization?
              </p>
              <select>
                <option>Please Select</option>
                <option>Business organization</option>
                <option>Nonprofit</option>
                <option>Content provider</option>
                <option>Content creator</option>
                <option>Educator</option>
                <option>Instructional Technologist</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Please describe your interest in Curriki Studio</label>
              <p>
                This will help us follow-up with the best resources that fit
                your needs.
              </p>
              <textarea
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </div>
            <div className="form-group">
              <ReCAPTCHA
                sitekey="6Ld-p6QZAAAAAATSMPRa1Laqf11-AOz2_WTUrZ22 "
                onChange={(el) => {
                  setCaptcha(el);
                }}
              />
              {errors.captcha_google && touched.captcha_google && (
                <div className="error"> {errors.captcha_google} </div>
              )}
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
