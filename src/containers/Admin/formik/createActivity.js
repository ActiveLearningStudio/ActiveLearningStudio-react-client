// /* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import imgAvatar from 'assets/images/img-avatar.png';
import { uploadImage } from 'store/actions/organization';
import { removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import { createActivityType, editActivityType } from 'store/actions/resource';

export default function CreateActivity(props) {
  const { editMode } = props;
  const [imageActive, setImgActive] = useState(null);
  const imgUpload = useRef();
  const dispatch = useDispatch();
  const allListState = useSelector((state) => state.organization);
  const selectedType = useSelector((state) => state.resource.selectedType);
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
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.image) {
            errors.image = 'Required';
          }
          if (!values.order) {
            errors.order = 'Required';
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
            await dispatch(editActivityType(values, selectedType.id));
            Swal.close();
            dispatch(removeActiveAdminForm());
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
            await dispatch(createActivityType(values));
            Swal.close();
            dispatch(removeActiveAdminForm());
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
                        formData.append('thumb', e.target.files[0]);
                        const imgurl = dispatch(uploadImage(allListState.currentOrganization?.id, formData));
                        imgurl.then((img) => {
                          setImgActive(img.data?.thumbUrl);
                          setFieldValue('image', img.data?.thumbUrl);
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
                onChange={handleChange}
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
