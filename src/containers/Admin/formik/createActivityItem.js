import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import imgAvatar from 'assets/images/img-avatar.png';
import { removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import {
  createActivityItem,
  editActivityItem,
  getActivityItems,
  uploadActivityItemThumbAction,
} from 'store/actions/resource';

export default function CreateActivityItem(props) {
  const { editMode } = props;
  const [imageActive, setImgActive] = useState(null);
  const imgUpload = useRef();
  const dispatch = useDispatch();
  const activityTypes = useSelector((state) => state.admin.activityTypes);
  const selectedItem = useSelector((state) => state.resource.selectedItem);
  const { activePage } = useSelector((state) => state.organization);
  useEffect(() => {
    if (editMode) {
      setImgActive(selectedItem?.image);
    } else {
      setImgActive(null);
    }
  }, [editMode, selectedItem]);
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          title: editMode ? selectedItem.title : '',
          description: editMode ? selectedItem.description : '',
          activity_type_id: editMode ? selectedItem.activityType?.id : '',
          type: editMode ? selectedItem.type : '',
          h5pLib: editMode ? selectedItem.h5pLib : '',
          demo_activity_id: editMode ? selectedItem.demo_activity_id : '',
          demo_video_id: editMode ? selectedItem.demo_video_id : '',
          image: editMode ? selectedItem.image : '',
          order: editMode ? selectedItem.order : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title || values.title.length > 255) {
            errors.title = values.title.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (!values.activity_type_id) {
            errors.activity_type_id = 'Required';
          }
          if (!values.type) {
            errors.type = 'Required';
          }
          if (!values.h5pLib) {
            errors.h5pLib = 'The h5pLib field is required when type is h5p.';
          }
          if (!values.demo_activity_id) {
            errors.demo_activity_id = 'Required';
          }
          if (!values.demo_video_id) {
            errors.demo_video_id = 'Required';
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
          console.log(values);
          if (editMode) {
            Swal.fire({
              title: 'Activity',
              icon: 'info',
              text: 'Updating activity item...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(editActivityItem(values, selectedItem.id));
            if (response) {
              Swal.fire({
                text: 'You have successfully updated the activity item',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                  dispatch(getActivityItems('', activePage));
                }
              });
            }
          } else {
            Swal.fire({
              title: 'Activity',
              icon: 'info',
              text: 'Creating new activity item...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(createActivityItem(values));
            if (response) {
              Swal.fire({
                text: 'You have successfully created the activity item',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                  dispatch(getActivityItems('', activePage));
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
              Activity Item
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
              <h3>Description</h3>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <div className="error">
                {errors.description && touched.description && errors.description}
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
                        const imgurl = dispatch(uploadActivityItemThumbAction(formData));
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
            <div className="form-group-create">
              <h3>Activity Type</h3>
              <select name="activity_type_id" onChange={handleChange} onBlur={handleBlur} value={values.activity_type_id}>
                <option value="">{' '}</option>
                {activityTypes?.length > 0 && activityTypes?.map((type) => (
                  <option value={type?.id} key={type?.id}>{type?.title}</option>
                ))}
              </select>
              <div className="error">
                {errors.activity_type_id && touched.activity_type_id && errors.activity_type_id}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Category</h3>
              <input
                type="text"
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
              />
              <div className="error">
                {errors.type && touched.type && errors.type}
              </div>
            </div>
            <div className="form-group-create">
              <h3>H5P Lib</h3>
              <input
                type="text"
                name="h5pLib"
                placeholder="H5P.InteractiveVideo 1.21"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.h5pLib}
              />
              <div className="error">
                {errors.h5pLib && touched.h5pLib && errors.h5pLib}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Demo Video ID</h3>
              <input
                type="text"
                name="demo_video_id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.demo_video_id}
              />
              <div className="error">
                {errors.demo_video_id && touched.demo_video_id && errors.demo_video_id}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Demo Activity ID</h3>
              <input
                type="text"
                name="demo_activity_id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.demo_activity_id}
              />
              <div className="error">
                {errors.demo_activity_id && touched.demo_activity_id && errors.demo_activity_id}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">
                {editMode ? 'Edit' : 'Create'}
                {' '}
                Activity Item
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

CreateActivityItem.propTypes = {
  editMode: PropTypes.bool,
};
CreateActivityItem.defaultProps = {
  editMode: false,
};
