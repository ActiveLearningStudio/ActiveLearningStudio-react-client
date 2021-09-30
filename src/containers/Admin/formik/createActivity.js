// /* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import imgAvatar from 'assets/images/img-avatar.png';
import { removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import {
  createActivityType,
  editActivityType,
  loadResourceTypesAction,
  uploadActivityTypeThumbAction,
}
from 'store/actions/resource';

export default function CreateActivity(props) {
  const { editMode } = props;
  const [imageActive, setImgActive] = useState(null);
  const imgUpload = useRef();
  const dispatch = useDispatch();
  const selectedType = useSelector((state) => state.resource.selectedType);
  const { activePage } = useSelector((state) => state.organization);
  useEffect(() => {
    if (editMode) {
      setImgActive(selectedType?.image);
    } else {
      setImgActive(null);
    }
  }, [editMode]);
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          title: editMode ? selectedType.title : '',
          image: editMode ? selectedType.image : '',
          order: editMode ? selectedType.order : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title || values.title.length > 255) {
            errors.title = values.title.length > 255 ? 'Length must be 255 characters or less' : 'Required';
          }
          if (!values.image) {
            errors.image = 'Required';
          }
          if (!values.order || (values.order < 0 && values.order !== 0)) {
            errors.order = values.order < 0 ? 'Negative Order is not allowed' : values.order !== 0 && 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode) {
            Swal.fire({
              title: 'Activity',
              icon: 'info',
              text: 'Updating activity type...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(editActivityType(values, selectedType.id));
            if (response) {
              Swal.fire({
                text: 'You have successfully updated the activity type',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                  dispatch(loadResourceTypesAction('', activePage));
                }
              });
            }
          } else {
            Swal.fire({
              title: 'Activity',
              icon: 'info',
              text: 'Creating new activity type...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(createActivityType(values));
            if (response) {
              Swal.fire({
                text: 'You have successfully created the activity type',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                  dispatch(loadResourceTypesAction('', activePage));
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>
              {editMode ? 'Edit' : 'Add'}
              {' '}
              Activity Type
            </h2>
            <div className="form-group-create">
              <h3>Title</h3>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <div className="error">
                {errors.title && touched.title && errors.title}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Image</h3>
              <div
                className="img-upload-form"
                onClick={() => imgUpload.current.click()}
              >
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    if (
                      !(
                        e.target.files[0].type.includes('png')
                        || e.target.files[0].type.includes('jpg')
                        || e.target.files[0].type.includes('gif')
                        || e.target.files[0].type.includes('jpeg')
                      )
                    ) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Invalid file selected.',
                      });
                    } else if (e.target.files[0].size > 100000000) {
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Selected file size should be less then 100MB.',
                      });
                    } else {
                      const formData = new FormData();
                      try {
                        formData.append('image', e.target.files[0]);
                        const imgurl = dispatch(uploadActivityTypeThumbAction(formData));
                        imgurl.then((img) => {
                          setImgActive(img);
                          setFieldValue('image', img);
                        });
                      } catch (err) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Image upload failed, kindly try again.',
                        });
                      }
                    }
                  }}
                  onBlur={handleBlur}
                  ref={imgUpload}
                  style={{ display: 'none' }}
                />
                {imageActive ? (
                  <>
                    <div
                      className="playimg"
                      style={{
                        backgroundImage: `url(${global.config.resourceUrl}${imageActive})`,
                      }}
                    />
                    <div
                      className="update-img"
                      onClick={() => imgUpload.current.click()}
                    >
                      Update Image
                    </div>
                  </>
                ) : (
                  <>
                    <img src={imgAvatar} alt="" />
                    <p>Upload Image</p>
                  </>
                )}
                <div className="error">
                  {errors.image && touched.image && errors.image}
                </div>
              </div>
            </div>
            <div className="form-group-create">
              <h3>Order</h3>
              <input
                type="number"
                name="order"
                min="0"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (['-', '+', 'e', 'E', '.'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onBlur={handleBlur}
                value={values.order}
              />
              <div className="error">
                {errors.order && touched.order && errors.order}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">
                {editMode ? 'Edit' : 'Create'}
                {' '}
                Activity Type
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

CreateActivity.propTypes = {
  editMode: PropTypes.bool,
};
CreateActivity.defaultProps = {
  editMode: false,
};
