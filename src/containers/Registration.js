import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';

import { registrationAction } from 'store/actions/auth';

const Registration = () => {
  const [captcha, setCaptcha] = useState();
  useEffect(() => {
    try {
      document
        .getElementsByTagName('body')[0]
        .classList.add('registration-body-page');
    } catch (e) {
      // console.log(e);
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          LastName: '',
          emails: '',
          passwords: '',
          phone: '',
          jobTitle: '',
          school: '',
          websiteUrl: '',
          organization: '',
          message: '',
          password_confirmation: '',
          captchaGoogle: captcha,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.emails) {
            errors.emails = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emails)
          ) {
            errors.emails = 'Invalid email address';
          }
          if (!values.passwords) {
            errors.passwords = 'Required';
          }
          if (!values.password_confirmation) {
            errors.password_confirmation = 'Required';
          }
          if (values.passwords !== values.password_confirmation) {
            errors.password_confirmation = 'Password and Renter Password Must match';
          }
          if (values.passwords.length < 8) {
            errors.passwords = 'Password must be at least 8 characters long';
          }

          if (!values.firstName) {
            errors.firstName = 'Required';
          }

          if (!values.LastName) {
            errors.LastName = 'Required';
          }
          if (!values.school) {
            errors.school = 'Required';
          }

          // if (values.phone.length < 7 ) {
          //   errors.phone = "phone number length must be 7 or greater";
          // }

          return errors;
        }}
        onSubmit={(values) => {
          if (!captcha) {
            Swal.fire({
              title: 'Captcha required',
            });
          } else {
            Swal.fire({
              title: 'Sending...',
              onOpen: () => {
                Swal.showLoading();
              },
            });
            registrationAction(
              values.firstName,
              values.LastName,
              values.emails,
              values.passwords,
              values.phone,
              values.jobTitle,
              values.school,
              values.websiteUrl,
              values.organization,
              values.message,
              // eslint-disable-next-line no-param-reassign
              (values.captchaGoogle = captcha),
            );
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          // isSubmitting,
          /* and other goodies */
        }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="formRegister"
          >
            <div className="half-group">
              <div className="form-group">
                <label>
                  First Name
                  {' '}
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  autoComplete="off"
                />
                {errors.firstName && touched.firstName && (
                  <div className="error">
                    {errors.firstName}
                    {' '}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>
                  Last Name
                  {' '}
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="LastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.LastName}
                  autoComplete="off"
                />
                {errors.LastName && touched.LastName && (
                  <div className="error">
                    {' '}
                    {errors.LastName}
                    {' '}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  Email
                  {' '}
                  <span>*</span>
                </label>
                <input
                  type="email"
                  name="emails"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emails}
                  autoComplete="off"
                />
                {errors.emails && touched.emails && (
                  <div className="error">{errors.emails}</div>
                )}
              </div>
              <div className="form-group">
                <label>Phone number (optional):</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  autoComplete="off"
                />
                {errors.phone && touched.phone && errors.phone}
              </div>
              <div className="form-group">
                <label>
                  Password
                  {' '}
                  <span>*</span>
                </label>
                <input
                  type="password"
                  name="passwords"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwords}
                  autoComplete="new-password"
                />
                {errors.passwords && touched.passwords && (
                  <div className="error">{errors.passwords}</div>
                )}
              </div>
              <div className="form-group">
                <label>
                  Re-enter Password
                  {' '}
                  <span>*</span>
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password_confirmation}
                  autoComplete="off"
                />
                {errors.password_confirmation && touched.password_confirmation && (
                  <div className="error">{errors.password_confirmation}</div>
                )}
              </div>
            </div>
            {/* <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
              />
            </div> */}
            <div className="form-group">
              <label>
                School/District/Organization
                {' '}
                <span>*</span>
              </label>

              <input
                type="text"
                name="school"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.school}
                autoComplete="off"
              />
              {errors.school && touched.school && (
                <div className="error">
                  {errors.school}
                  {' '}
                </div>
              )}
            </div>
            {/* <div className="form-group">
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
              <select
                name="organization"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organization}
              >
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
            </div> */}
            <div className="form-group">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA}
                onChange={(el) => {
                  setCaptcha(el);
                }}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
