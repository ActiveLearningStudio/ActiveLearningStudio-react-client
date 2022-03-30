/* eslint-disable */
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "store/actionTypes";
import {
  uploadImage,
  createOrganizationNew,
  checkBranding,
  updateOrganization,
} from "store/actions/organization";
import { removeActiveAdminForm } from "store/actions/admin";

import Swal from "sweetalert2";
import loader from "assets/images/dotsloader.gif";

import { alphabetsOnly } from "utils";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TermsModal from "components/models/TermsModal";
import PolicyModal from "components/models/PolicyModal";
import ResetImg from "assets/images/svg/reset.svg";

import Angle from "assets/images/svg/angledown.svg";
import { Editor } from "@tinymce/tinymce-react";

import faviconDefault from "../../../assets/images/svg/Globe.svg";
import BrandingPage from "containers/Branding";

export default function CreateOrg(prop) {
  const { editMode } = prop;
  const [imageActive, setImgActive] = useState(null);
  const imgUpload = useRef();
  const allListState = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [loaderImg, setLoaderImg] = useState(false);
  const { activeEdit, activeOrganization, currentOrganization } = allListState;
  const [checkedActivity, setCheckedActivty] = useState(false);
  const [checkedPlaylist, setCheckedPlaylist] = useState(false);
  const [checkedProject, setCheckedProject] = useState(false);
  const [checkedTosParent, setCheckedTosParent] = useState(true);
  const [checkedTosUrl, setCheckedTosUrl] = useState(false);
  const [checkedPpParent, setCheckedPpParent] = useState(true);
  const [checkedPpUrl, setCheckedPpUrl] = useState(false);
  const [show, setShow] = useState(false);
  const [ppShow, setPpShow] = useState(false);
  const [tosContentValue, setTosContentValue] = useState(null);
  const [ppContentValue, setPpContentValue] = useState(null);
  const [checkedTosContent, setCheckedTosContent] = useState(null);
  const [checkedPpContent, setCheckedPpContent] = useState(null);

  useEffect(() => {
    if (editMode) {
      console.log("Edit Mode", editMode);
      console.log("Active Mode", activeEdit);
      setImgActive(activeEdit?.image);
      setCheckedActivty(activeEdit?.gcr_activity_visibility);
      setCheckedPlaylist(activeEdit?.gcr_playlist_visibility);
      setCheckedProject(activeEdit?.gcr_project_visibility);
      setTosContentValue(activeEdit?.tos_content);
      setPpContentValue(activeEdit?.privacy_policy_content);
      if (activeEdit.tos_type == "Parent") {
        setCheckedTosUrl(false);
        setCheckedTosParent(true);
      } else if (activeEdit.tos_type == "URL") {
        setCheckedTosParent(false);
        setCheckedTosUrl(true);
      } else if (activeEdit.tos_type == "Content") {
        setCheckedTosParent(false);
        setCheckedTosUrl(false);
        setCheckedTosContent(true);
      }

      if (activeEdit.privacy_policy_type == "Parent") {
        setCheckedPpUrl(false);
        setCheckedPpParent(true);
      } else if (activeEdit.privacy_policy_type == "URL") {
        setCheckedPpParent(false);
        setCheckedPpUrl(true);
      } else if (activeEdit.privacy_policy_type == "Content") {
        setCheckedPpParent(false);
        setCheckedPpUrl(false);
        setCheckedPpContent(true);
      }
    } else {
      setImgActive(null);
    }
  }, [editMode, activeEdit]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const ppHandleShow = () => {
    setPpShow(true);
  };

  const ppHandleClose = () => {
    setPpShow(false);
  };
  const handleTermsEditorChange = (content) => {
    setTosContentValue(content);
  };
  const handlePolicyEditorChange = (content) => {
    setPpContentValue(content);
  };
  const [selectTab, setSelectTab] = useState("Description");
  const [selectPreview, setSelectPreview] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [editorContentPolicy, setEditorContentPolicy] = useState("");
  const [editorContentTerms, setEditorContentTerms] = useState("");

  const saveChangesPolicy = () => {
    handlePolicyEditorChange(editorContentPolicy);
  };
  const saveChangesTerms = () => {
    handleTermsEditorChange(editorContentTerms);
  };

  const updatePreviewScreen = (
    primaryColor,
    secondaryColor,
    teritaryColor,
    primaryFont,
    secondaryFont
  ) => {
    document
      .querySelector(":root")
      .style.setProperty("--main-preview-primary-color", primaryColor);
    document
      .querySelector(":root")
      .style.setProperty("--main-preview-secondary-color", secondaryColor);
    document
      .querySelector(":root")
      .style.setProperty("--main-preview-paragraph-text-color", teritaryColor);
    document
      .querySelector(":root")
      .style.setProperty("--main-preview-heading-font", primaryFont);
    document
      .querySelector(":root")
      .style.setProperty("--main-preview-text-font", secondaryFont);
  };

  useEffect(() => {
    if (editMode) {
      updatePreviewScreen(
        activeEdit?.branding.primary_color,
        activeEdit?.branding.secondary_color,
        activeEdit?.branding.tertiary_color,
        activeEdit?.branding.primary_font_family,
        activeEdit?.branding.secondary_font_family
      );
    }
  }, [activeEdit, editMode]);

  return (
    <div className="create-form">
      <Formik
        enableReinitialize
        initialValues={{
          image: editMode
            ? activeEdit.image
            : "https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
          image_favicon: editMode ? activeEdit?.image_favicon : faviconDefault,
          name: editMode ? activeEdit?.name : "",
          description: editMode ? activeEdit?.description : "",
          domain: editMode ? activeEdit?.domain : "",
          account_id: editMode ? activeEdit?.account_id : undefined,
          api_key: editMode ? activeEdit?.api_key : undefined,
          unit_path: editMode ? activeEdit?.unit_path : undefined,
          self_registration: editMode ? activeEdit?.self_registration : false,
          noovo_client_id: editMode ? activeEdit?.noovo_client_id : undefined,
          gcr_project_visibility: editMode
            ? activeEdit?.gcr_project_visibility
            : false,
          gcr_playlist_visibility: editMode
            ? activeEdit?.gcr_playlist_visibility
            : false,
          gcr_activity_visibility: editMode
            ? activeEdit?.gcr_activity_visibility
            : false,
          tos_type: editMode
            ? !activeEdit?.tos_type
              ? "Parent"
              : activeEdit?.tos_type
            : "Parent",
          tos_url: editMode ? activeEdit?.tos_url : "",
          tos_content: editMode ? activeEdit?.tos_content : "",
          privacy_policy_type: editMode
            ? !activeEdit?.privacy_policy_type
              ? "Parent"
              : activeEdit?.privacy_policy_type
            : "Parent",
          privacy_policy_url: editMode ? activeEdit?.privacy_policy_url : "",
          privacy_policy_content: editMode
            ? activeEdit?.privacy_policy_content
            : "",
          primary_color: editMode
            ? activeEdit?.branding.primary_color
              ? activeEdit?.branding.primary_color
              : "#084892"
            : "#084892",
          secondary_color: editMode
            ? activeEdit?.branding.secondary_color
              ? activeEdit?.branding.secondary_color
              : "#F8AF2C"
            : "#F8AF2C",
          tertiary_color: editMode
            ? activeEdit?.branding.tertiary_color
              ? activeEdit?.branding.tertiary_color
              : "#515151"
            : "#515151",
          primary_font_family: editMode
            ? activeEdit?.branding.primary_font_family
            : "rubic",
          secondary_font_family: editMode
            ? activeEdit?.branding.secondary_font_family
            : "Open Sans",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name || values.name.length > 255) {
            errors.name =
              values.name.length > 255
                ? "Length must be 255 characters or less."
                : "Required";
          }
          if (!values.description || values.description.length > 255) {
            errors.description =
              values.description.length > 255
                ? "Length must be 255 characters or less."
                : "Required";
          }
          if (!values.domain) {
            errors.domain = "Required";
          } else if (values.domain?.length < 2 || values.domain?.length > 255) {
            errors.domain =
              "Character limit should be greater than one and less than 255";
          }
          if (!values.image) {
            errors.image = "Required";
          }
          if (!values.image_favicon) {
            errors.image_favicon = "Required";
          }
          if (!values.tos_type) {
            errors.tos_type = "Required";
          }
          if (values.tos_type == "URL" && !values.tos_url) {
            errors.tos_url = "Terms of service URL required!";
          }
          if (!values.privacy_policy_type) {
            errors.privacy_policy_type = "Required";
          }
          if (
            values.privacy_policy_type == "URL" &&
            !values.privacy_policy_url
          ) {
            errors.privacy_policy_url = "Privacy policy URL required!";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (values.privacy_policy_type === "Parent") {
            delete values.privacy_policy_url;
            delete values.privacy_policy_content;
          } else if (values.privacy_policy_type === "URL") {
            delete values.privacy_policy_content;
          } else if (values.privacy_policy_type === "Content") {
            delete values.privacy_policy_url;
          }

          if (values.tos_type === "Parent") {
            delete values.tos_url;
            delete values.tos_content;
          } else if (values.tos_type === "URL") {
            delete values.tos_content;
          } else if (values.tos_type === "Content") {
            delete values.tos_url;
          }

          Swal.fire({
            title: "Please Wait !",
            html: editMode
              ? "Updating Organization ... "
              : "Creating Organization ... ",
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          if (editMode) {
            const response = await dispatch(
              updateOrganization(
                activeEdit.id,
                values,
                activeEdit.parent ? activeEdit.parent.id : undefined
              )
            );

            // if (response?.suborganization.id === currentOrganization.id) {
            //   DynamicBrandingApply(response?.suborganization);
            // }
            if (response) {
              Swal.fire({
                text: "Organization edited successfully",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              }).then(async (result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                }
              });
            }
          } else {
            Swal.fire({
              icon: "info",
              text: "Creating new organization...",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(
              createOrganizationNew(activeOrganization.id, values)
            );
            if (response) {
              Swal.fire({
                text: "Organization added successfully",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                }
              });
            }
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
          setFieldValue,
          setErrors,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>{editMode ? "Edit " : "Add "} organization</h2>
            <FontAwesomeIcon
              icon="times"
              className="cross-all-pop"
              onClick={() => {
                dispatch(removeActiveAdminForm());
              }}
            />

            {/* -------- */}
            <Tabs
              defaultActiveKey={selectTab}
              activeKey={selectTab}
              id="uncontrolled-tab-example"
              onSelect={(k) => setSelectTab(k)}
            >
              <Tab eventKey="Description" title="Description">
                <div className="tab-section">
                  <div className="tab-inner-section">
                    <div className="update-Form-style">
                      <div className="tab-form-section">
                        <div className="tab-form-section-left">
                          <div className="form-group-create">
                            <h3>Organization Name</h3>
                            <input
                              type="text"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                            />
                            <div className="error">
                              {errors.name && touched.name && errors.name}
                            </div>
                          </div>

                          <div className="form-group-create">
                            <h3>Description</h3>
                            <textarea
                              type="text"
                              name="description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            <div className="error">
                              {errors.description &&
                                touched.description &&
                                errors.description}
                            </div>
                          </div>
                        </div>
                        <div className="tab-form-section-right">
                          <div className="form-group-create">
                            <h3>Domain</h3>
                            <input
                              type="text"
                              name="domain"
                              autoComplete="off"
                              disabled={editMode ? true : false}
                              value={values.domain}
                              onChange={async (e) => {
                                if (
                                  alphabetsOnly(e.target.value) &&
                                  !e.target.value.includes("@")
                                ) {
                                  setFieldValue("domain", e.target?.value);
                                  if (e.target.value.length > 1) {
                                    setLoaderImg(true);
                                    const result = dispatch(
                                      checkBranding(e.target.value)
                                    );
                                    result
                                      .then((res) => {
                                        console.log(res);
                                        if (res.organization) {
                                          setLoaderImg(false);
                                          setErrors({
                                            domain: "*Domian already in use",
                                          });
                                        }
                                      })
                                      .catch((err) => {
                                        if (err.errors) {
                                          setLoaderImg(false);
                                        }
                                      });
                                  }
                                }
                              }}
                              onBlur={handleBlur}
                              // value={values.admin}
                            />
                            <img
                              src={loader}
                              style={{
                                width: "25px",
                                marginTop: "5px",
                                visibility: loaderImg ? "visible" : "hidden",
                              }}
                              alt=""
                              className="loader"
                            />
                            <div className="error">
                              {errors.domain && touched.domain && errors.domain}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-middle-optional-title">
                        <h3>Optional Information</h3>
                      </div>
                      <div className="tab-form-section">
                        <div className="tab-form-section-left">
                          <div className="form-group-create">
                            <h3>LearnSafe Account ID</h3>
                            <input
                              type="text"
                              name="account_id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.account_id}
                            />
                          </div>
                          <div className="form-group-create">
                            <h3>LearnSafe Unit Path </h3>
                            <input
                              type="text"
                              name="unit_path"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.unit_path}
                            />
                          </div>

                          <div className="toggle-group-button">
                            <div className="form-group-create">
                              <h3>Google classroom publishing</h3>
                              <div className="create-form-inputs-toggles">
                                <div className="custom-toggle-button">
                                  <Switch
                                    checked={values.gcr_activity_visibility}
                                    onChange={() => {
                                      setCheckedActivty(!checkedActivity);
                                      setFieldValue(
                                        "gcr_activity_visibility",
                                        !checkedActivity
                                      );
                                    }}
                                    className="react-switch"
                                    handleDiameter={30}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    offColor="#888"
                                    onColor="#ffca70"
                                    onHandleColor="#e89e21"
                                    offHandleColor="#666"
                                  />
                                  <h3>Activity</h3>
                                </div>

                                {/* <Switch
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                        setFieldValue("published", !checked);
                      }}
                    /> */}
                                <div className="custom-toggle-button">
                                  <Switch
                                    checked={values.gcr_playlist_visibility}
                                    onChange={() => {
                                      setCheckedPlaylist(!checkedPlaylist);
                                      setFieldValue(
                                        "gcr_playlist_visibility",
                                        !checkedPlaylist
                                      );
                                    }}
                                    className="react-switch"
                                    handleDiameter={30}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    offColor="#888"
                                    onColor="#ffca70"
                                    onHandleColor="#e89e21"
                                    offHandleColor="#666"
                                  />
                                  <h3>Playlist</h3>
                                </div>
                                <div className="custom-toggle-button">
                                  <Switch
                                    checked={values.gcr_project_visibility}
                                    onChange={() => {
                                      setCheckedProject(!checkedProject);
                                      setFieldValue(
                                        "gcr_project_visibility",
                                        !checkedProject
                                      );
                                    }}
                                    className="react-switch"
                                    handleDiameter={30}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    offColor="#888"
                                    onColor="#ffca70"
                                    onHandleColor="#e89e21"
                                    offHandleColor="#666"
                                  />
                                  <h3>Project</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-form-section-right">
                          <div className="form-group-create">
                            <h3>LearnSafe API Key</h3>
                            <input
                              type="text"
                              name="api_key"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.api_key}
                            />
                          </div>
                          <div className="form-group-create">
                            <h3>Noovo client ID </h3>
                            <input
                              type="text"
                              name="noovo_client_id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.noovo_client_id}
                            />
                          </div>

                          <div className="form-group-create">
                            <h3>Self Registration</h3>
                            <div className="custom-toggle-button">
                              <Switch
                                checked={values.self_registration}
                                onChange={() => {
                                  setFieldValue(
                                    "self_registration",
                                    !values.self_registration
                                  );
                                }}
                                className="react-switch"
                                handleDiameter={30}
                                offColor="#888"
                                onColor="#ffca70"
                                onHandleColor="#e89e21"
                                offHandleColor="#666"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="ToS & PP" title="ToS & PP">
                <div className="tab-section">
                  <div className="tab-tospp-section">
                    <div className="tab-inner-tospp-section mr-16">
                      {/* Terms of service*/}
                      <div className="tab_inner-tossp_header">
                        <h1>Terms of service</h1>
                      </div>
                      <div className="tos-pp">
                        <div className="tos-pss-container">
                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedTosUrl(false);
                                setCheckedTosContent(false);
                                setCheckedTosParent(true);
                                setFieldValue("tos_type", "Parent");
                              }}
                              type="radio"
                              name="tos_type"
                              id="TosParent"
                              checked={checkedTosParent}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="TosParent"
                            >
                              Use from the parent organization
                            </label>
                          </div>

                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedTosParent(false);
                                setCheckedTosContent(false);
                                setCheckedTosUrl(true);
                                setFieldValue("tos_type", "URL");
                              }}
                              type="radio"
                              name="tos_type"
                              id="TosURL"
                              checked={checkedTosUrl}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="TosURL"
                            >
                              Add from a URL
                            </label>
                            {checkedTosUrl && (
                              <div className="form-group-create tos-pp-url">
                                <h3>Terms of service URL</h3>
                                <input
                                  type="text"
                                  name="tos_url"
                                  onChange={handleChange}
                                  value={values.tos_url}
                                  placeholder="https://www.example.com"
                                />
                                <div className="error">
                                  {errors.tos_url &&
                                    touched.tos_url &&
                                    errors.tos_url}
                                </div>
                              </div>
                            )}
                            <div className="error">
                              {errors.tos_type &&
                                touched.tos_type &&
                                errors.tos_type}
                            </div>
                          </div>
                          {/* Adding Radion button */}
                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedTosContent(true);
                                setCheckedTosUrl(false);
                                setCheckedTosParent(false);
                                setFieldValue("tos_type", "Content");
                                // handleShow();
                              }}
                              type="radio"
                              name="tos_type"
                              id="TosContent"
                              checked={checkedTosContent}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="TosContent"
                            >
                              Build my Terms of service
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* privacy_policy_type */}
                    <div className="tab-inner-tospp-section">
                      <div className="tab_inner-tossp_header">
                        <h1>Privacy policy</h1>
                      </div>
                      <div className="tos-pp">
                        <div className="tos-pss-container">
                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedPpUrl(false);
                                setCheckedPpContent(false);
                                setCheckedPpParent(true);
                                setFieldValue("privacy_policy_type", "Parent");
                              }}
                              type="radio"
                              name="privacy_policy_type"
                              id="PpParent"
                              checked={checkedPpParent}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="PpParent"
                            >
                              Use from the parent organization
                            </label>
                          </div>

                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedPpParent(false);
                                setCheckedPpContent(false);
                                setCheckedPpUrl(true);
                                setFieldValue("privacy_policy_type", "URL");
                              }}
                              type="radio"
                              name="privacy_policy_type"
                              id="PpURL"
                              checked={checkedPpUrl}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="PpURL"
                            >
                              Add from a URL
                            </label>
                            <div className="error">
                              {errors.privacy_policy_type &&
                                touched.privacy_policy_type &&
                                errors.privacy_policy_type}
                            </div>
                          </div>
                          {checkedPpUrl && (
                            <div className="form-group-create tos-pp-url">
                              <h3>Privacy policy URL</h3>
                              <input
                                type="text"
                                name="privacy_policy_url"
                                onChange={handleChange}
                                value={values.privacy_policy_url}
                                placeholder="https://www.example.com"
                              />
                              <div className="error">
                                {errors.privacy_policy_url &&
                                  touched.privacy_policy_url &&
                                  errors.privacy_policy_url}
                              </div>
                            </div>
                          )}
                          <div
                            className="form-check"
                            style={{ paddingLeft: "0" }}
                          >
                            <input
                              className="form-check-input radio-custom"
                              onClick={() => {
                                setCheckedPpContent(true);
                                setCheckedPpUrl(false);
                                setCheckedPpParent(false);
                                setFieldValue("privacy_policy_type", "Content");
                                // ppHandleShow();
                              }}
                              type="radio"
                              name="privacy_policy_type"
                              id="TosPPContent"
                              checked={checkedPpContent}
                            />
                            <label
                              className="form-check-label radio-custom-label"
                              for="TosPPContent"
                            >
                              Build my Privacy policy
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {checkedPpContent && (
                    <>
                      <div className="tab-tossp-detail">
                        <div className="tab_inner_header">
                          <h1>Privacy policy</h1>
                        </div>
                        <Editor
                          apiKey="alzppk5y87xyqziy9mfltp1e63bg9jexd40he2sfraajyr1q"
                          initialValue={ppContentValue ? ppContentValue : ""}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={setEditorContentPolicy}
                        />
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            saveChangesPolicy();
                          }}
                        >
                          Save Policy
                        </button>
                      </div>
                    </>
                  )}
                  {checkedTosContent && (
                    <>
                      <div className="tab-tossp-detail">
                        <div className="tab_inner_header">
                          <h1>Terms of service</h1>
                        </div>
                        <Editor
                          apiKey="alzppk5y87xyqziy9mfltp1e63bg9jexd40he2sfraajyr1q"
                          initialValue={tosContentValue ? tosContentValue : ""}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | bold italic backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent | removeformat | help",
                          }}
                          onEditorChange={setEditorContentTerms}
                        />
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            saveChangesTerms();
                          }}
                        >
                          Save Terms
                        </button>
                      </div>
                    </>
                  )}
                  <div className="error">
                    {errors.tos_url && touched.tos_url && errors.tos_url}
                  </div>
                  <div className="error">
                    {errors.privacy_policy_url &&
                      touched.privacy_policy_url &&
                      errors.privacy_policy_url}
                  </div>
                </div>
              </Tab>
              <Tab eventKey="Theming options" title="Theming options">
                <div className="tab-section">
                  <div className="tab-inner-section mb-16">
                    <div className="form-group-create">
                      <div className="tab-theming-section">
                        {/* Upload Logo */}
                        <div
                          className=""
                          onClick={() => imgUpload.current.click()}
                        >
                          <input
                            type="file"
                            name="image"
                            onChange={(e) => {
                              if (
                                !(
                                  e.target.files[0].type.includes("png") ||
                                  e.target.files[0].type.includes("jpg") ||
                                  e.target.files[0].type.includes("gif") ||
                                  e.target.files[0].type.includes("jpeg") ||
                                  e.target.files[0].type.includes("svg")
                                )
                              ) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Invalid file selected.",
                                });
                              } else if (e.target.files[0].size > 100000000) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Selected file size should be less then 100MB.",
                                });
                              } else {
                                const formData = new FormData();
                                try {
                                  formData.append("thumb", e.target.files[0]);
                                  const imgurl = dispatch(
                                    uploadImage(
                                      allListState.currentOrganization?.id,
                                      formData
                                    )
                                  );
                                  imgurl.then((img) => {
                                    setImgActive(img.data?.thumbUrl);
                                    setFieldValue("image", img.data?.thumbUrl);
                                  });
                                } catch (err) {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Image upload failed, kindly try again.",
                                  });
                                }
                              }
                            }}
                            onBlur={handleBlur}
                            ref={imgUpload}
                            style={{ display: "none" }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <img
                                src={
                                  imageActive
                                    ? imageActive.includes("pexels.com")
                                      ? imageActive
                                      : `${global.config.resourceUrl}${imageActive}`
                                    : values.image
                                }
                                style={{
                                  width: "120px",
                                  height: "72px",
                                  borderRadius: "8px",
                                  border: "1px solid #DDDDDD",
                                }}
                              />
                            </div>
                            <div>
                              <div
                                className="button-group tab-theming-btn-icon"
                                style={{ paddingBottom: "0px" }}
                              >
                                {" "}
                                <button type="button" className="mr-16">
                                  <FontAwesomeIcon
                                    icon="upload"
                                    style={{ marginRight: "16px" }}
                                  />
                                  Upload logo
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="dimensions-detail">
                            <p>Max. dimensions: 48px height</p>
                          </div>

                          <div className="error">
                            {errors.image && touched.image && errors.image}
                          </div>
                        </div>
                        {/* Upload Favicon */}
                        <div
                          className="mr-100"
                          onClick={() => imgUpload.current.click()}
                        >
                          <input
                            type="file"
                            name="image_favicon"
                            onChange={(e) => {
                              if (
                                !(
                                  e.target.files[0].type.includes("png") ||
                                  e.target.files[0].type.includes("jpg") ||
                                  e.target.files[0].type.includes("gif") ||
                                  e.target.files[0].type.includes("jpeg") ||
                                  e.target.files[0].type.includes("svg")
                                )
                              ) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Invalid file selected.",
                                });
                              } else if (e.target.files[0].size > 100000000) {
                                Swal.fire({
                                  icon: "error",
                                  title: "Error",
                                  text: "Selected file size should be less then 100MB.",
                                });
                              } else {
                                const formData = new FormData();
                                try {
                                  formData.append("thumb", e.target.files[0]);
                                  const imgurl = dispatch(
                                    uploadImage(
                                      allListState.currentOrganization?.id,
                                      formData
                                    )
                                  );
                                  imgurl.then((img) => {
                                    setImgActive(img.data?.thumbUrl);
                                    setFieldValue(
                                      "image_favicon",
                                      img.data?.thumbUrl
                                    );
                                  });
                                } catch (err) {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Image upload failed, kindly try again.",
                                  });
                                }
                              }
                            }}
                            onBlur={handleBlur}
                            ref={imgUpload}
                            style={{ display: "none" }}
                          />

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <img
                                src={
                                  imageActive
                                    ? imageActive.includes("pexels.com")
                                      ? imageActive
                                      : `${global.config.resourceUrl}${imageActive}`
                                    : values.image_favicon
                                }
                                style={{
                                  width: "72px",
                                  height: "72px",
                                  borderRadius: "8px",
                                  border: "1px solid #DDDDDD",
                                }}
                              />
                            </div>
                            <div>
                              <div
                                className="button-group tab-theming-btn-icon"
                                style={{ paddingBottom: "0px" }}
                              >
                                {" "}
                                <button
                                  type="button"
                                  className="favicon-btn mr-16"
                                >
                                  <FontAwesomeIcon
                                    icon="upload"
                                    style={{ marginRight: "16px" }}
                                  />
                                  Upload favicon
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="dimensions-detail">
                            <p>Max. dimensions: 16px or 32px height</p>
                          </div>

                          <div className="error">
                            {errors.image_favicon &&
                              touched.image_favicon &&
                              errors.image_favicon}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-inner-section mb-16 ">
                    <div className="tab_inner_header">
                      <h1>Color</h1>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("primary_color", "#084892");
                          setFieldValue("secondary_color", "#F8AF2C");
                          setFieldValue("tertiary_color", "#515151");
                          updatePreviewScreen(
                            "#084892",
                            "#F8AF2C",
                            "#515151",
                            values.primary_font_family,
                            values.secondary_font_family
                          );
                        }}
                      >
                        <img src={ResetImg} alt="" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <section className="tab_inner_color_section">
                      <div className="tab_inner_color">
                        <h4>Primary </h4>
                        <div>
                          {/* <input type="color" value="#084892" /> */}

                          <input
                            type="color"
                            name="primary_color"
                            onChange={(e) => {
                              handleChange(e);
                              updatePreviewScreen(
                                e.target.value,
                                values.secondary_color,
                                values.tertiary_color,
                                values.primary_font_family,
                                values.secondary_font_family
                              );
                            }}
                            onBlur={handleBlur}
                            value={values.primary_color}
                          />
                          <input type="text" value={values.primary_color} />
                          <div className="error">
                            {errors.name && touched.name && errors.name}
                          </div>
                        </div>
                        <p>
                          Use this color for Displays, Headings, Link texts, and
                          some components in a default state if it says so on
                          their own specs.
                        </p>
                      </div>
                      <div className="tab_inner_color tab_inner_color_secondry">
                        <h4>Secondary </h4>
                        <div>
                          {/* <input type="color" value="#F8AF2C" /> */}
                          <input
                            type="color"
                            name="secondary_color"
                            onChange={(e) => {
                              handleChange(e);
                              updatePreviewScreen(
                                values.primary_color,
                                e.target.value,
                                values.tertiary_color,
                                values.primary_font_family,
                                values.secondary_font_family
                              );
                            }}
                            onBlur={handleBlur}
                            value={values.secondary_color}
                          />
                          <input type="text" value={values.secondary_color} />
                        </div>
                        <p>
                          This color should be use for details that we want to
                          highlitght or that we want to make more visible for
                          users.
                        </p>
                      </div>
                      <div className="tab_inner_color tab_inner_color_tertiary">
                        <h4>Tertiary </h4>
                        <div>
                          {/* <input type="color" value="#515151" /> */}
                          <input
                            type="color"
                            name="tertiary_color"
                            onChange={(e) => {
                              handleChange(e);
                              updatePreviewScreen(
                                values.primary_color,
                                values.secondary_color,
                                e.target.value,
                                values.primary_font_family,
                                values.secondary_font_family
                              );
                            }}
                            onBlur={handleBlur}
                            value={values.tertiary_color}
                          />
                          <input type="text" value={values.tertiary_color} />
                        </div>
                        <p>
                          This color should be use for most of the body texts
                          and some details that we want to highlitght or that we
                          want to make more visible for users.
                        </p>
                      </div>
                    </section>
                  </div>
                  <div className="tab-inner-section mb-16 ">
                    <div className="tab_inner_header">
                      <h1>Font</h1>
                      <button
                        type="button"
                        onClick={() => {
                          setFieldValue("primary_font_family", "rubic");
                          setFieldValue("secondary_font_family", "Open Sans");
                          updatePreviewScreen(
                            values.primary_color,
                            values.secondary_color,
                            values.tertiary_color,
                            "rubic",
                            "Open Sans"
                          );
                        }}
                      >
                        <img src={ResetImg} alt="" />
                        <span>Reset</span>
                      </button>
                    </div>
                    <section className="tab_inner_font_section">
                      <div className="tab_inner_font_primary">
                        <h4>Primary </h4>
                        <select
                          name="primary_font_family"
                          onChange={(e) => {
                            handleChange(e);
                            updatePreviewScreen(
                              values.primary_color,
                              values.secondary_color,
                              values.tertiary_color,
                              e.target.value,
                              values.secondary_font_family
                            );
                          }}
                          onBlur={handleBlur}
                          value={values.primary_font_family}
                        >
                          <option value="rubic">Rubic</option>
                          <option value="SmoochSans">SmoochSans</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Fredoka">Fredoka</option>
                          <option value="BhuTukaExpandedOne">
                            BhuTukaExpandedOne
                          </option>
                        </select>
                      </div>
                      <div className="tab_inner_font_primary">
                        <h4>Secondary </h4>
                        <select
                          name="secondary_font_family"
                          onChange={(e) => {
                            handleChange(e);
                            updatePreviewScreen(
                              values.primary_color,
                              values.secondary_color,
                              e.target.value,
                              values.primary_font_family,
                              e.target.value
                            );
                          }}
                          onBlur={handleBlur}
                          value={values.secondary_font_family}
                        >
                          <option value="rubic">Rubic</option>
                          <option value="SmoochSans">SmoochSans</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Fredoka">Fredoka</option>
                          <option value="BhuTukaExpandedOne">
                            BhuTukaExpandedOne
                          </option>
                        </select>
                      </div>
                      {/* <div className="tab_inner_font_upload">
                        <div>
                          <img src={UploadImg} />
                        </div>
                        <div className="tab_inner_font_text">
                          <h6>Upload Custom Fonts</h6>
                          <p>Drag {"&"} drop or browse</p>
                        </div>
                      </div> */}
                    </section>
                  </div>

                  <div className="tab-inner-section tab-inner-section-preview ">
                    <div className="tab_inner_header">
                      <h1>Preview</h1>
                      <div>
                        <img
                          src={Angle}
                          alt=""
                          onClick={() => {
                            setSelectPreview(!selectPreview);
                          }}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        selectPreview
                          ? "tab-inner-preview-hidden"
                          : "tab-inner-preview"
                      }
                    >
                      {/* <h1>Preview {selectPreview}</h1> */}
                      {/* <div width="100%" height="100%">
                        <ProjectsPage />
                      </div> */}

                      <div style={{ width: "100%" }}>
                        <BrandingPage getShow={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>

            <div className="tab-common-btns">
              <div className="button-group button-group-tabs">
                <button
                  type="button"
                  className="cancel mr-16"
                  onClick={() => {
                    dispatch(removeActiveAdminForm());
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setFieldValue("tos_content", tosContentValue);
                    setFieldValue("privacy_policy_content", ppContentValue);
                  }}
                >
                  {editMode ? "Save " : "Save"} Organization
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      <TermsModal
        initialVal={tosContentValue}
        show={show} // {props.show}
        onHide={handleClose}
        handleTermsEditorChange={handleTermsEditorChange}
      />
      <PolicyModal
        initialVal={ppContentValue}
        show={ppShow} // {props.show}
        onHide={ppHandleClose}
        handlePolicyEditorChange={handlePolicyEditorChange}
      />
    </div>
  );
}

CreateOrg.propTypes = {};
