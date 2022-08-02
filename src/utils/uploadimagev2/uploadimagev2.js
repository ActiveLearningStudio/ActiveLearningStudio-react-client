/*eslint-disable*/
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './uploadimagev2.scss';
import PexelsAPI from '../../components/models/pexels';
import PixelUpload from 'assets/images/svg/pixelupload.svg';
import ActivityDefaultImg from 'assets/images/defaultActivityImg.png';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { uploadResourceThumbnailAction } from 'store/actions/resource';
import computer from 'assets/images/computer1.svg';

const UploadImageV2 = ({ className, setUploadImageStatus, formRef, thumb_url }) => {
  const project = useSelector((state) => state.project);
  const mediaSources = useSelector((state) => state.admin.mediaSources);

  const [modalShow, setModalShow] = useState(false);
  const currikiUtility = classNames('curriki-utility-uploadimageV2', className);
  const dispatch = useDispatch();
  const openFile = useRef();
  const [uploadImage, setUploadImage] = useState(thumb_url);

  const uploadThumb = async (e) => {
    const formData = new FormData();
    try {
      formData.append('thumb', e.target.files[0]);
      const result = await dispatch(uploadResourceThumbnailAction(formData));
      setUploadImage(result);

      formRef.current.setFieldValue('thumb_url', result);
    } catch (err) {
      toast.error('Upload Failed', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
      });
    }
  };
  return (
    <>
      <PexelsAPI
        show={modalShow}
        project={project}
        onHide={() => {
          setModalShow(false);
          setUploadImageStatus(false);
        }}
        searchName="abstract"
        setUploadImage={setUploadImage}
        formRef={formRef}
      />
      <div className={currikiUtility}>
        <h3>Upload image</h3>
        <div
          className="uploadimage-box"
          style={{
            backgroundImage: !uploadImage ? `url(${ActivityDefaultImg})` : uploadImage.includes('pexels.com') ? `url(${uploadImage})` : `url(${global.config.resourceUrl}${uploadImage})`,
          }}
        ></div>
        <div className="uploadimage-option">
          <label style={{ display: 'none' }}>
            <input
              ref={openFile}
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (
                  !(
                    e.target.files[0].type.includes('png') ||
                    e.target.files[0].type.includes('jpg') ||
                    e.target.files[0].type.includes('gif') ||
                    e.target.files[0].type.includes('jpeg')
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
                  uploadThumb(e);
                }
              }}
            />
            <span>Upload</span>
          </label>
          {/* {alert(mediaSources.mediaSources.some((obj) => (obj.name === 'My device' && obj.media_type === 'Image')) ? "hi" : "bye")} */}
          {mediaSources.mediaSources.some((obj) => (obj.name === 'Pexels' && obj.media_type === 'Image')) && 
            <button
              type="button"
              onClick={() => {
                setModalShow(true);
                setUploadImageStatus(true);
              }}
              className="btn-mr-27"
            >
              <img src={PixelUpload} className="mr-20" />
              Pexels
            </button>
          }

          {mediaSources.mediaSources.some((obj) => (obj.name === 'My device' && obj.media_type === 'Image')) && 
            <button
              type="button"
              onClick={() => {
                openFile.current.click();
              }}
            
            >
              <img src={computer} className="mr-20" />
              My device
            </button>
          }
         
        </div>
      </div>
    </>
  );
};

UploadImageV2.propTypes = {
  className: PropTypes.string,
};

export default UploadImageV2;
