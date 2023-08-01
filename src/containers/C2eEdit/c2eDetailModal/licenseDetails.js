/*eslint-disable*/
import React, { useState } from "react";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import TabsHeading from "utils/Tabs/tabs";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import Buttons from "utils/Buttons/buttons";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

import "../style.scss";
import "../../Videos/style.scss";
import { Formik } from "formik";

const LicenseDetails = ({ handleCloseProjectModal, setStape }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ActivePage, setActivePage] = useState(1);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className="h-100">
      <div className="add-c2e-form-tabs">
        <TabsHeading text="1. Metadata" />
        <TabsHeading text="2. Manifest" />
        <TabsHeading text="3. License" tabActive />
      </div>
      <Headings
        text="C2E License Details"
        headingType="h3"
        color="#084892"
      />

      <h5 className="c2e-content-heading">Royalty-Based Content</h5>

      <div
        className="myvideomain mb-3  "
        style={{
          height: "48px",
        }}
      >
        <div className="inner-content c2e-license-detail">
          <div className="video-cards-top-search-filter c2e-search-filter">
            <div className="search-bar-clear-btn">
              <div className="search-bar">
                <input
                  className=""
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActivePage(1);
                  }}
                  placeholder="Search C2E’s..."
                />
                <SearchInputMdSvg
                  primaryColor={primaryColor}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <Buttons
                  text="Clear"
                  className="clr-btn"
                  onClick={() => {
                    setSearchQuery("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="license-details-form">
        <div className="lic-cards">
          <div className="c2e-linc-card">
            <p>Financial Year 2023 Chart</p>
            <div
              className="lic-bg-image"
              style={{
                backgroundImage: `url(${""})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h4>Terms $10/year Unlimited </h4>
          </div>
        </div>

        <Formik
          initialValues={{
            copyrightTitle: "",
            copyrightDescription: "",
            copyrightYear: "",
            toppings: [],
          }}
          validate={(values) => {
            const errors = {};

            if (!values.copyrightTitle) {
              errors.copyrightTitle = "Required";
            }
            if (!values.copyrightDescription) {
              errors.copyrightDescription = "Required";
            }
            if (!values.copyrightYear) {
              errors.copyrightYear = "Required";
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
            <form
              className="mt-3 w-100 license-detail-form"
              onSubmit={handleSubmit}
            >
              <div className="">
                <div className="mb-3">
                  <label>Set Usage Type</label>
                  <div className="d-flex">
                    <div>
                      <input
                        type="checkbox"
                        name="toppings"
                        value="Purchased"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.toppings.includes(
                          "Purchased",
                        )}
                      />
                      <label className="ml-2">Purchased</label>
                    </div>
                    <div className="mx-3">
                      <input
                        type="checkbox"
                        name="toppings"
                        value="Subscription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.toppings.includes(
                          "Subscription",
                        )}
                      />
                      <label className="ml-2">Subscription</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="toppings"
                        value="Open"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.toppings.includes("Open")}
                      />
                      <label className="ml-2">Open</label>
                    </div>
                  </div>
                </div>

                <div className="form-inputs w-100">
                  <div className="">
                    <label>Copyright Title</label>
                    <input
                      type="text"
                      name="copyrightTitle"
                      placeholder="C2E Copyright Title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.copyrightTitle}
                    />
                    <span className="validation-error">
                      {" "}
                      {errors.copyrightTitle &&
                        touched.copyrightTitle &&
                        errors.copyrightTitle}{" "}
                    </span>
                  </div>
                  <div className="">
                    <label>Copyright copyrightDescription</label>
                    <textarea
                      type="text"
                      name="copyrightDescription"
                      placeholder="Enter a brief Copyright Description of your activity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.copyrightDescription}
                    />

                    <span className="validation-error">
                      {" "}
                      {errors.copyrightDescription &&
                        touched.copyrightDescription &&
                        errors.copyrightDescription}{" "}
                    </span>
                  </div>

                  <div className="w-100">
                    <label>Copyright Year</label>
                    <input
                      type="text"
                      name="copyrightYear"
                      placeholder="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.copyrightYear}
                    />

                    <span className="validation-error">
                      {" "}
                      {errors.copyrightYear &&
                        touched.copyrightYear &&
                        errors.copyrightYear}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <Buttons
                  text="Back"
                  secondary={true}
                  width="auto"
                  height="32px"
                  hover={true}
                  type="button"
                  onClick={() => setStape(2)}
                />
                <Buttons
                  text="Cancel"
                  secondary={true}
                  width="auto"
                  height="32px"
                  onClick={() => handleCloseProjectModal(false)}
                  hover={true}
                  className="mx-3"
                  type="button"
                />
                <Buttons
                  text="Save & Close"
                  primary={true}
                  width="auto"
                  height="32px"
                  hover={true}
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => handleCloseProjectModal(false)}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default LicenseDetails;
